"use client";

import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useStake } from "../../../providers";
import { useStakeTx } from "../../../hooks";
import { Notification } from "../../stake";

export const ClaimTab = () => {
  const {
    txConfirming,
    notification,
    walletInfoLoading,
    setTxConfirming,
    openNotification,
    refreshStakeWalletInfo,
    stakeWalletInfo,
  } = useStake();

  const { sendClaimTx } = useStakeTx();

  const [buttonLoadingColor, setButtonLoadingColor] = useState<boolean>(false);

  const loadingElement = () => {
    return <span className="loader-small ml-3"></span>;
  };

  const formatAsString = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 6 });
  };

  const handleInfo = (num: number) => {
    if (walletInfoLoading) {
      return loadingElement();
    } else if (num > 0) {
      return formatAsString(num);
    } else {
      return "-";
    }
  };

  const claimTxFlow = async () => {
    const button = document.getElementById("claim-button");

    if (stakeWalletInfo.claimable == 0) {
      button && (button.innerHTML = "claim");
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
          `You claimed ${formatAsString(stakeWalletInfo.claimable)} Porridge`,
          claimTx,
        );
        if (button) {
          button.innerHTML = "claim";
          setButtonLoadingColor(false);
        }
        refreshStakeWalletInfo();
        setTimeout(() => {
          openNotification(false, "", "", "");
        }, 10000);
      } else {
        if (button) {
          button.innerHTML = "claim";
          setButtonLoadingColor(false);
        }
        setTxConfirming(false);
      }
    }
  };

  return (
    <div className="absolute left-[10%] top-[15%] z-20 h-[60%] w-[80%] border-2 border-black bg-[#EEDCD2] md:left-[15%] md:top-[14%] md:w-[70%] lg:left-[25%] lg:top-[12%] lg:w-[50%] xl:left-[30%] xl:top-[11%] xl:w-[40%]">
      <div className="absolute left-0 top-3 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute right-0 top-3 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div
        className={`absolute inset-6 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}
      >
        {txConfirming ? (
          <img
            className="h-[100%] w-[100%]"
            src="/images/bg-transaction.png"
            alt="tx"
          />
        ) : notification.toggle ? (
          <Notification />
        ) : (
          <div className="relative flex h-[100%] w-[100%] flex-col items-center justify-around font-baloo text-[2.5vw] font-semibold lg:text-[1.5vw] xl:text-[1vw]">
            <div className="flex w-[70%] flex-col justify-between md:w-[80%]">
              <h1 className="text-center font-amaticbold text-[10vw] lg:text-[7vw] xl:text-[4vw]">
                claim yield
              </h1>
              <span className="mt-[2%] text-[3vw] text-[#9C4924] lg:text-[2vw] xl:text-[1.5vw]">
                Porridge Yield
              </span>
              <div className="flex w-[100%] flex-row justify-between">
                <span>Current Porridge Balance:</span>
                <span>{handleInfo(stakeWalletInfo.prg)}</span>
              </div>
              <div className="flex w-[100%] flex-row justify-between">
                <span>Available Porridge to Claim:</span>
                <span>{handleInfo(stakeWalletInfo.claimable)}</span>
              </div>
            </div>
            <ConnectButton.Custom>
              {({ account, chain, openChainModal, openConnectModal }) => {
                return (
                  <button
                    className={`h-[20%] w-[40%] font-amaticbold text-[5vw] lg:text-[4vw] xl:text-[2vw] ${buttonLoadingColor ? "bg-[#B35227] text-[#E7B941]" : "bg-[#E7B941] text-black"} flex items-center justify-center border-2 border-black hover:scale-110 hover:bg-[#B35227] hover:text-[#E7B941]`}
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
                    claim
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
