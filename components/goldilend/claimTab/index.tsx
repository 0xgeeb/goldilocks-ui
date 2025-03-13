"use client";

import { useState } from "react";

import { formatAsString } from "@/app/_components/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useGoldilendTx } from "../../../hooks";
import { useGoldilend } from "../../../providers";
import { LendNotification } from "../../goldilend";

export const ClaimTab = () => {
  const {
    txConfirming,
    setTxConfirming,
    notification,
    openNotification,
    walletInfoLoading,
    userBoost,
    refreshGoldilendWalletInfo,
    goldilendWalletInfo,
  } = useGoldilend();

  const { sendClaimTx } = useGoldilendTx();

  const [buttonLoadingColor, setButtonLoadingColor] = useState<boolean>(false);

  const loadingElement = () => {
    return <span className="loader-small ml-3 mt-2"></span>;
  };

  const formatAsClaimableString = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 6 });
  };

  const handleInfoClaimable = (num: number) => {
    if (walletInfoLoading) {
      return loadingElement();
    } else if (num > 0) {
      if (userBoost.partnerNFTs.length > 0) {
        const prgBoost =
          userBoost.boostMagnitude < 500 ? userBoost.boostMagnitude : 500;
        const boostedNum = (num * (1000 + prgBoost)) / 1000;
        return formatAsClaimableString(boostedNum);
      } else {
        return formatAsClaimableString(num);
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
        setButtonLoadingColor(true);
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
          setButtonLoadingColor(false);
        }
        refreshGoldilendWalletInfo();
        setTimeout(() => {
          openNotification(false, "", "", "");
        }, 10000);
      } else {
        if (button) {
          button.innerHTML = "claim yield";
          setButtonLoadingColor(false);
        }
        setTxConfirming(false);
      }
    }
  };

  return (
    <div className="absolute left-[20%] top-[14%] z-20 h-[65%] w-3/5 border-2 border-black bg-[#EEDCD2] xl:left-[39%] xl:h-[70%] xl:w-[28%]">
      <div className="absolute left-0 top-4 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 left-0 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute right-0 top-4 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 right-0 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div
        className={`absolute inset-8 ${txConfirming ? "border-x-2 border-black" : "border-2 border-black"} bg-[#D9C6BA]`}
      >
        {txConfirming ? (
          <img
            className="size-full"
            src="/images/bg-transaction.png"
            alt="tx"
          />
        ) : notification.toggle ? (
          <LendNotification />
        ) : (
          <div className="relative flex size-full flex-col items-center font-baloo text-[2vw] font-semibold lg:text-[1.5vw] xl:text-[1vw]">
            <h1 className="font-amaticbold text-[8vw] lg:text-[6vw] xl:text-[4vw]">
              claim yield
            </h1>
            <div className="flex w-4/5 flex-col justify-between">
              <span className="text-[#9C4924]">Porridge Yield</span>
              {/* <div className="w-[100%] flex flex-row justify-between">
                <span>Current Porridge Balance:</span>
                <span>{handleInfo(goldilendWalletInfo.prg)}</span>
              </div> */}
              <div className="flex w-full flex-row justify-between">
                <span>Available Porridge to Claim:</span>
                <span>
                  {handleInfoClaimable(goldilendWalletInfo.lendClaimable)}
                </span>
              </div>
            </div>
            <div className="mt-[2%] flex w-4/5 flex-col justify-between">
              <span className="text-[#9C4924]">
                Infrared iBGT Staking Yield
              </span>
              <div className="flex w-full flex-row justify-between">
                <span>Available Honey to Claim:</span>
                <span>
                  {handleInfoClaimable(
                    goldilendWalletInfo.lendInfraredClaimable,
                  )}
                </span>
              </div>
            </div>
            <ConnectButton.Custom>
              {({ account, chain, openChainModal, openConnectModal }) => {
                return (
                  <button
                    className={`mt-[7%] h-[12%] w-2/5 xl:w-3/5 ${buttonLoadingColor ? "bg-[#C9E3B9] text-black" : "bg-[#E7B941] text-black"} flex items-center justify-center border-2 border-black font-amaticbold text-[4vw] hover:scale-110 hover:bg-[#C9E3B9] hover:text-black xl:text-[1.9vw]`}
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
          </div>
        )}
      </div>
    </div>
  );
};
