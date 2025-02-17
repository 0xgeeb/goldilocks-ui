"use client";

import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useGoldilend } from "../../../providers";
import { useGoldilendTx } from "../../../hooks";
import { BorrowNotification } from "../../goldilend";
import { contracts } from "../../../utils/addressi";

export const BoostTab = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [boostedPartners, setBoostedPartners] = useState<boolean>(true);
  const [currentBoostIndex, setCurrentBoostIndex] = useState<number>(0);
  const [buttonLoadingColor, setButtonLoadingColor] = useState<boolean>(false);

  const {
    infoLoading,
    ownedPartners,
    selectedPartners,
    findSelectedPartnerIdxs,
    handlePartnerClick,
    updateBoostMag,
    boostMag,
    notification,
    txConfirming,
    setTxConfirming,
    openNotification,
    changeActiveToggle,
    userBoost,
    updateOwnedPartners,
    findBoost,
  } = useGoldilend();

  const {
    checkBoostAllowance,
    sendGoldilendNFTApproveTx,
    sendBoostTx,
    sendWithdrawBoostTx,
  } = useGoldilendTx();

  const { address, isConnected } = useAccount();

  useEffect(() => {
    updateBoostMag();
  }, [selectedPartners]);

  const loadingElement = () => {
    return <span className="loader-small m-auto"></span>;
  };

  const formatAsString = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

  const nextImages = () => {
    if (currentIndex + 4 < selectedPartners.length) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  const prevImages = () => {
    if (currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  const nextBoostImages = () => {
    if (currentBoostIndex + 4 < userBoost.partnerNFTs.length) {
      setCurrentBoostIndex(currentBoostIndex + 4);
    }
  };

  const prevBoostImages = () => {
    if (currentBoostIndex - 4 >= 0) {
      setCurrentBoostIndex(currentBoostIndex - 4);
    }
  };

  const checkSelected = (partnerName: string): boolean => {
    for (let i = 0; i < selectedPartners.length; i++) {
      if (selectedPartners[i].name === partnerName) {
        return true;
      }
    }

    return false;
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${month}-${day}-${year}`;
  };

  const handleButtonClick = async (toggle: string) => {
    const button = document.getElementById(
      toggle === "boost" ? "boost-button" : "boost-button-add",
    );
    if (selectedPartners.length == 0) {
      button && (button.innerHTML = "no boost");
      return;
    }
    const [combFlag, dromeFlag] = await checkBoostAllowance(
      address as `0x${string}`,
    );
    if (
      (combFlag || !checkSelected("HoneyComb")) &&
      (dromeFlag || !checkSelected("Beradrome"))
    ) {
      boostTxFlow(button);
    } else {
      button && (button.innerHTML = "approving...");
      setButtonLoadingColor(true);
      if (!combFlag && checkSelected("HoneyComb")) {
        await sendGoldilendNFTApproveTx(contracts.honeycomb.address);
      }
      if (!dromeFlag && checkSelected("Beradrome")) {
        await sendGoldilendNFTApproveTx(contracts.beradrome.address);
      }
      button && (button.innerHTML = "create boost");
      setButtonLoadingColor(false);
    }
  };

  const handleWithdrawButtonClick = async () => {
    const button = document.getElementById("boost-button-withdraw");
    if (userBoost.expiry > Math.floor(Date.now() / 1000)) {
      button && (button.innerHTML = "not expired");
      return;
    }
    setTxConfirming(true);
    if (button) {
      button.innerHTML = "confirming...";
      setButtonLoadingColor(true);
    }
    const withdrawBoostTx = await sendWithdrawBoostTx();
    if (withdrawBoostTx.substring(0, 2) === "0x") {
      setTxConfirming(false);
      openNotification(
        true,
        "You've successfully withdrew your boost",
        ``,
        withdrawBoostTx,
      );
      button && (button.innerHTML = "withdraw boost");
      setButtonLoadingColor(false);
      changeActiveToggle("BOOST");
      setTimeout(() => {
        openNotification(false, "", "", "");
      }, 10000);
    } else {
      button && (button.innerHTML = "withdraw boost");
      setButtonLoadingColor(false);
      changeActiveToggle("BOOST");
      setTxConfirming(false);
    }
  };

  const boostTxFlow = async (button: HTMLElement | null) => {
    setTxConfirming(true);
    if (button) {
      button.innerHTML = "confirming...";
      setButtonLoadingColor(true);
    }
    const boostTx = await sendBoostTx(selectedPartners);
    if (boostTx.substring(0, 2) === "0x") {
      setTxConfirming(false);
      openNotification(
        true,
        "You've successfully created a boost",
        `You created a boost with a magnitude of ${formatAsString(boostMag)}`,
        boostTx,
      );
      button && (button.innerHTML = "create boost");
      setButtonLoadingColor(false);
      updateOwnedPartners(selectedPartners);
      findBoost();
      changeActiveToggle("BOOST");
      setTimeout(() => {
        openNotification(false, "", "", "");
      }, 10000);
    } else {
      button && (button.innerHTML = "create boost");
      setButtonLoadingColor(false);
      changeActiveToggle("BOOST");
      setTxConfirming(false);
    }
  };

  return txConfirming ? (
    <img
      className="h-[100%] w-[100%]"
      src="/images/bg-transaction.png"
      alt="tx"
    />
  ) : notification.toggle ? (
    <BorrowNotification />
  ) : (
    <div className="flex h-[100%] w-[100%] flex-row">
      <div className="flex h-[100%] w-[100%] flex-col items-center border-r-2 border-black px-[0%]">
        <h1 className="mt-[2%] font-amaticbold text-[6vw] xl:text-[3vw]">
          select partner nfts
        </h1>
        <div
          className="flex h-[80%] w-[85%] flex-wrap overflow-y-auto"
          id="hide-scrollbar"
        >
          {infoLoading && isConnected ? (
            loadingElement()
          ) : !isConnected || ownedPartners.length == 0 ? (
            <div className="flex h-[100%] w-[100%] flex-col items-center justify-center opacity-50">
              <img
                className="mb-[5%] w-[70%]"
                src="/images/icon-not-found.png"
                alt="not-found"
              />
              <h1 className="font-amaticbold text-[5vw] xl:text-[3vw]">
                no partners
              </h1>
            </div>
          ) : (
            ownedPartners.map((partner, index) => (
              <div key={index} className="h-[45%] w-[50%] py-2">
                <img
                  className={`ml-[5%] h-[100%] w-[90%] border-2 border-black hover:scale-110 hover:cursor-pointer ${findSelectedPartnerIdxs().includes(partner.index) ? "border-4 border-black" : "opacity-75"}`}
                  onClick={() => {
                    setBoostedPartners(false);
                    handlePartnerClick(partner);
                  }}
                  src={
                    partner.name === "Beradrome"
                      ? "/images/icon-beradrome.png"
                      : "/images/icon-honeycomb.png"
                  }
                  alt="partner"
                />
              </div>
            ))
          )}
        </div>
      </div>
      <div className="flex h-[100%] w-[100%] flex-col items-center overflow-y-auto">
        {infoLoading && isConnected ? (
          loadingElement()
        ) : userBoost.partnerNFTs.length > 0 ? (
          <>
            <h1 className="mb-[4%] mt-[4%] font-amaticbold text-[9vw] xl:mb-[2%] xl:text-[4vw]">
              my boost
            </h1>
            <div className="relative flex h-[25%] w-[90%] flex-row items-start justify-between">
              <span
                className="absolute left-[3%] top-[-20%] cursor-pointer font-baloo text-[2vw] font-semibold hover:scale-125 xl:text-[1vw]"
                onClick={() => setBoostedPartners(!boostedPartners)}
              >
                {boostedPartners
                  ? "Currently Boosted NFTs:"
                  : "Selected Partner NFTs:"}
              </span>
              {boostedPartners ? (
                <>
                  <div
                    className="mt-[3%] cursor-pointer text-[3vw] hover:scale-125 xl:text-[2vw]"
                    onClick={() => prevBoostImages()}
                  >
                    &lt;
                  </div>
                  {userBoost.partnerNFTs
                    .slice(currentBoostIndex, currentBoostIndex + 4)
                    .map((partner, index) => (
                      <img
                        className="h-[50%] w-[20%] border-2 border-black xl:h-[70%]"
                        src={
                          partner === contracts.beradrome.address
                            ? "/images/icon-beradrome.png"
                            : "/images/icon-honeycomb.png"
                        }
                        alt="selectedpartner"
                        key={index}
                      />
                    ))}
                  <div
                    className="mt-[3%] cursor-pointer text-[3vw] hover:scale-125 xl:text-[2vw]"
                    onClick={() => nextBoostImages()}
                  >
                    &gt;
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="mt-[3%] cursor-pointer text-[3vw] hover:scale-125 xl:text-[2vw]"
                    onClick={() => prevImages()}
                  >
                    &lt;
                  </div>
                  {selectedPartners
                    .slice(currentIndex, currentIndex + 4)
                    .map((partner, index) => (
                      <img
                        className="h-[50%] w-[20%] cursor-pointer border-2 border-black hover:scale-110 xl:h-[70%]"
                        onClick={() => handlePartnerClick(partner)}
                        src={
                          partner.name === "Beradrome"
                            ? "/images/icon-beradrome.png"
                            : "/images/icon-honeycomb.png"
                        }
                        alt="selectedpartner"
                        key={index}
                      />
                    ))}
                  <div
                    className="mt-[3%] cursor-pointer text-[3vw] hover:scale-125 xl:text-[2vw]"
                    onClick={() => nextImages()}
                  >
                    &gt;
                  </div>
                </>
              )}
            </div>
            <h1 className="font-baloo text-[3vw] font-semibold text-[#9C4924] xl:text-[1.3vw]">
              {selectedPartners.length > 0 && "New"} Boost Amount:{" "}
              {userBoost.boostMagnitude + boostMag}%
            </h1>
            <h1 className="font-baloo text-[3vw] font-semibold text-[#9C4924] xl:text-[1.3vw]">
              {selectedPartners.length > 0 && "New"} Expiry:{" "}
              {selectedPartners.length > 0
                ? formatDate(userBoost.expiry + 86400 * 30)
                : formatDate(userBoost.expiry)}
            </h1>
            <ConnectButton.Custom>
              {({ account, chain, openChainModal, openConnectModal }) => {
                return (
                  <button
                    className={`h-[10%] w-[50%] border-2 border-black ${buttonLoadingColor ? "bg-[#C9E3B9] text-black" : "bg-[#E7B941] text-black"} mt-[4%] font-amaticbold text-[3.5vw] hover:scale-110 hover:bg-[#C9E3B9] hover:text-black xl:text-[1.5vw]`}
                    id="boost-button-add"
                    onClick={() => {
                      const button =
                        document.getElementById("boost-button-add");

                      if (!account) {
                        if (button && button.innerHTML === "connect wallet") {
                          openConnectModal();
                        } else {
                          button && (button.innerHTML = "connect wallet");
                        }
                      } else if (chain?.name !== "Berachain") {
                        if (button && button.innerHTML === "where berachain") {
                          openChainModal();
                        } else {
                          button && (button.innerHTML = "where berachain");
                        }
                      } else {
                        handleButtonClick("add");
                      }
                    }}
                  >
                    add to boost
                  </button>
                );
              }}
            </ConnectButton.Custom>
            <ConnectButton.Custom>
              {({ account, chain, openChainModal, openConnectModal }) => {
                return (
                  <button
                    className={`h-[10%] w-[50%] border-2 border-black ${buttonLoadingColor ? "bg-[#C9E3B9] text-black" : "bg-[#9C4924] text-[#E7B941]"} mt-[4%] font-amaticbold text-[3.5vw] hover:scale-110 hover:bg-[#C9E3B9] hover:text-black xl:text-[1.5vw]`}
                    id="boost-button-withdraw"
                    onClick={() => {
                      const button = document.getElementById(
                        "boost-button-withdraw",
                      );

                      if (!account) {
                        if (button && button.innerHTML === "connect wallet") {
                          openConnectModal();
                        } else {
                          button && (button.innerHTML = "connect wallet");
                        }
                      } else if (chain?.name !== "Berachain") {
                        if (button && button.innerHTML === "where berachain") {
                          openChainModal();
                        } else {
                          button && (button.innerHTML = "where berachain");
                        }
                      } else {
                        handleWithdrawButtonClick();
                      }
                    }}
                  >
                    withdraw boost
                  </button>
                );
              }}
            </ConnectButton.Custom>
          </>
        ) : (
          <>
            <h1 className="mb-[8%] mt-[4%] font-amaticbold text-[9vw] lg:text-[7vw] xl:text-[5vw]">
              create boost
            </h1>
            <div className="relative flex h-[25%] w-[90%] flex-row items-start justify-between">
              <span className="absolute left-[3%] top-[-20%] font-baloo text-[2vw] font-semibold xl:text-[1vw]">
                Selected Partner NFTs:
              </span>
              <div
                className="mt-[3%] cursor-pointer text-[3vw] hover:scale-125 xl:text-[2vw]"
                onClick={() => prevImages()}
              >
                &lt;
              </div>
              {selectedPartners
                .slice(currentIndex, currentIndex + 4)
                .map((partner, index) => (
                  <img
                    className="h-[50%] w-[20%] border-2 border-black xl:h-[70%]"
                    onClick={() => handlePartnerClick(partner)}
                    src={
                      partner.name === "Beradrome"
                        ? "/images/icon-beradrome.png"
                        : "/images/icon-honeycomb.png"
                    }
                    alt="selectedpartner"
                    key={index}
                  />
                ))}
              <div
                className="mt-[3%] cursor-pointer text-[3vw] hover:scale-125 xl:text-[2vw]"
                onClick={() => nextImages()}
              >
                &gt;
              </div>
            </div>
            <h1 className="font-baloo text-[3vw] font-semibold text-[#9C4924] xl:text-[1.25vw]">
              Boost Amount: {boostMag}%
            </h1>
            <h1 className="font-baloo text-[3vw] font-semibold text-[#9C4924] xl:text-[1.25vw]">
              Boost Expiry:{" "}
              {selectedPartners.length > 0
                ? formatDate(Math.floor(Date.now() / 1000) + 86400 * 30)
                : "-"}
            </h1>
            <ConnectButton.Custom>
              {({ account, chain, openChainModal, openConnectModal }) => {
                return (
                  <button
                    className={`h-[12.5%] w-[45%] border-2 border-black ${buttonLoadingColor ? "bg-[#C9E3B9] text-black" : "bg-[#E7B941] text-black"} mt-[2%] font-amaticbold text-[4vw] hover:scale-110 hover:bg-[#C9E3B9] hover:text-black xl:text-[1.5vw]`}
                    id="boost-button"
                    onClick={() => {
                      const button = document.getElementById("boost-button");

                      if (!account) {
                        if (button && button.innerHTML === "connect wallet") {
                          openConnectModal();
                        } else {
                          button && (button.innerHTML = "connect wallet");
                        }
                      } else if (chain?.name !== "Berachain") {
                        if (button && button.innerHTML === "where berachain") {
                          openChainModal();
                        } else {
                          button && (button.innerHTML = "where berachain");
                        }
                      } else {
                        handleButtonClick("boost");
                      }
                    }}
                  >
                    create boost
                  </button>
                );
              }}
            </ConnectButton.Custom>
          </>
        )}
      </div>
    </div>
  );
};
