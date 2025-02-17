"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useGoldilend } from "../../../providers";
import { LendNotificationMobile, LendWalletBalanceMobilePopup } from "../";
import { useGoldilendTx } from "../../../hooks";

export const ClaimTabMobile = () => {
  const {
    txConfirming,
    setTxConfirming,
    notification,
    openNotification,
    walletInfoLoading,
    balanceMobileToggle,
    userBoost,
    refreshGoldilendWalletInfo,
    goldilendWalletInfo,
  } = useGoldilend();

  // const { isConnected } = useAccount()

  const { sendClaimTx } = useGoldilendTx();

  // useEffect(() => {
  //   findBoost()
  // }, [isConnected])

  const loadingElement = () => {
    return <span className="loader-small-mobile mx-1"></span>;
  };

  const formatAsString = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

  const handleInfoClaimable = (num: number) => {
    if (walletInfoLoading) {
      return loadingElement();
    } else if (num > 0) {
      if (userBoost.partnerNFTs.length > 0) {
        const prgBoost =
          userBoost.boostMagnitude < 500 ? userBoost.boostMagnitude : 500;
        const boostedNum = (num * (1000 + prgBoost)) / 1000;
        return formatAsString(boostedNum);
      } else {
        return formatAsString(num);
      }
    } else {
      return "-";
    }
  };

  const claimTxFlow = async () => {
    const button = document.getElementById("claim-button");
    if (goldilendWalletInfo.lendClaimable == 0) {
      button && (button.innerHTML = "claim yield");
      return;
    } else {
      setTxConfirming(true);
      if (button) {
        button.innerHTML = "confirming...";
        button.style.backgroundColor = "#C9E3B9";
      }
      const claimTx = await sendClaimTx();
      if (claimTx.substring(0, 2) === "0x") {
        setTxConfirming(false);
        openNotification(
          true,
          "You've successfully claimed $PRG",
          `You claimed ${formatAsString(goldilendWalletInfo.lendClaimable)} Porridge and ${formatAsString(goldilendWalletInfo.lendInfraredClaimable)} Honey`,
          claimTx,
        );
        if (button) {
          button.innerHTML = "claim yield";
          button.style.backgroundColor = "#E7B941";
          button.style.color = "black";
        }
        refreshGoldilendWalletInfo();
        setTimeout(() => {
          openNotification(false, "", "", "");
        }, 10000);
      } else {
        if (button) {
          button.innerHTML = "claim yield";
          button.style.backgroundColor = "#E7B941";
          button.style.color = "black";
        }
        setTxConfirming(false);
      }
    }
  };

  return (
    <>
      <div className="absolute left-[15.5%] top-[7.5%] z-20 h-[55%] w-[69%] border-2 border-black bg-[#EEDCD2]">
        <div className="absolute left-0 top-3 w-6 skew-y-[45deg] border-b-2 border-black"></div>
        <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
        <div className="absolute right-0 top-3 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
        <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
        <div
          className={`absolute inset-3 ${txConfirming ? "border-l-2 border-r-2 border-black" : "border-2 border-black"} bg-[#D9C6BA]`}
        >
          {txConfirming ? (
            <img
              className="h-[100%] w-[100%]"
              src="/images/bg-transaction-mobile.png"
              alt="tx"
            />
          ) : notification.toggle ? (
            <LendNotificationMobile />
          ) : balanceMobileToggle ? (
            <LendWalletBalanceMobilePopup />
          ) : (
            <div className="relative flex h-[100%] w-[100%] flex-col items-center px-[4%] font-baloo font-semibold">
              <h1 className="font-amaticbold text-[14vw]">claim yield</h1>
              <div className="mt-[10%] flex w-[100%] flex-col justify-between">
                <span className="text-[4.5vw] text-[#9C4924]">
                  Porridge Yield
                </span>
                {/* <div className="w-[100%] flex flex-row justify-between text-[3.5vw] mt-[2%]">
                  <span>$PRG balance:</span>
                  <span>{handleInfo(balance.prg)}</span>
                </div> */}
                <div className="flex w-[100%] flex-row justify-between text-[3.5vw]">
                  <span>claimable $PRG:</span>
                  <span>
                    {handleInfoClaimable(goldilendWalletInfo.lendClaimable)}
                  </span>
                </div>
              </div>
              <div className="mt-[15%] flex w-[100%] flex-col justify-between">
                <span className="text-[4.5vw] text-[#9C4924]">
                  Infrared iBGT Staking Yield
                </span>
                <div className="flex w-[100%] flex-row justify-between">
                  <span>Available Honey to Claim:</span>
                  <span>
                    {handleInfoClaimable(
                      goldilendWalletInfo.lendInfraredClaimable,
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ConnectButton.Custom>
        {({ account, chain, openChainModal, openConnectModal }) => {
          return (
            <button
              className="absolute left-[22.5%] top-[67.5%] flex h-[7.5%] w-[55%] items-center justify-center border-2 border-black bg-[#E7B941] font-amaticbold text-[9vw] hover:scale-110 hover:bg-[#C9E3B9]"
              id="claim-button"
              onClick={() => {
                const button = document.getElementById("claim-button");

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
                  claimTxFlow();
                }
              }}
            >
              claim yield
            </button>
          );
        }}
      </ConnectButton.Custom>
    </>
  );
};
