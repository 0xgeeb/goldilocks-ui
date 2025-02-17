"use client";

import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useGovTx } from "../../../hooks";
import { useGov } from "../../../providers";

export const GovLocksBoxMobile = () => {
  const [buttonLoadingColor, setButtonLoadingColor] = useState<boolean>(false);

  const {
    refreshGovWalletInfo,
    govlocksActiveToggle,
    changeGovlocksActiveToggle,
    govlocksDisplayString,
    handleGovlocksChange,
    handleGovlocksBalance,
    walletInfoLoading,
    handleGovlocksBalanceClick,
    setGovlocksDisplayString,
    setWrap,
    setUnwrap,
    setDelegate,
    govlocksAllowanceButtons,
    setGovlocksAllowanceButtons,
    govWalletInfo,
    wrap,
    unwrap,
    delegate,
  } = useGov();

  const {
    checkAllowance,
    sendApproveTx,
    sendDepositTx,
    sendWithdrawTx,
    sendDelegateTx,
  } = useGovTx();

  const { address, isConnected } = useAccount();

  useEffect(() => {
    refreshGovWalletInfo();
  }, [isConnected]);

  const loadingElement = () => {
    return <span className="loader-small ml-3"></span>;
  };

  const refreshInfo = () => {
    setGovlocksDisplayString("");
    setWrap(0);
    setUnwrap(0);
    setDelegate("");
    refreshGovWalletInfo();
  };

  const handleLeftButtonClick = async () => {
    const govlocksButton = document.getElementById("govlocks-button");
    const leftButton = document.getElementById("left-approve-button");
    const rightButton = document.getElementById("right-approve-button");
    if (leftButton) {
      leftButton.innerHTML = "approving...";
      leftButton.style.backgroundColor = "#B35227";
      leftButton.style.color = "#E7B941";
    }
    if (rightButton) {
      rightButton.innerHTML = "approving...";
      rightButton.style.backgroundColor = "#B35227";
      rightButton.style.color = "#E7B941";
    }
    await sendApproveTx(wrap, false);
    govlocksButton && (govlocksButton.innerHTML = "wrap");
    setGovlocksAllowanceButtons(false);
  };

  const handleRightButtonClick = async () => {
    const govlocksButton = document.getElementById("govlocks-button");
    const rightButton = document.getElementById("right-approve-button");
    const leftButton = document.getElementById("left-approve-button");
    if (leftButton) {
      leftButton.innerHTML = "approving...";
      leftButton.style.backgroundColor = "#B35227";
      leftButton.style.color = "#E7B941";
    }
    if (rightButton) {
      rightButton.innerHTML = "approving...";
      rightButton.style.backgroundColor = "#B35227";
      rightButton.style.color = "#E7B941";
    }
    await sendApproveTx(0, true);
    govlocksButton && (govlocksButton.innerHTML = "wrap");
    setGovlocksAllowanceButtons(false);
  };

  const handleButtonClick = async () => {
    const button = document.getElementById("govlocks-button");
    if (govlocksActiveToggle === "WRAP") {
      wrapTxFlow(button);
    }
    if (govlocksActiveToggle === "UNWRAP") {
      unwrapTxFlow(button);
    }
    if (govlocksActiveToggle === "DELEGATE") {
      delegateTxFlow(button);
    }
  };

  const wrapTxFlow = async (button: HTMLElement | null) => {
    if (wrap == 0) {
      button && (button.innerHTML = "wrap");
      return;
    }
    if (wrap > govWalletInfo.locks) {
      button && (button.innerHTML = "not enough");
      return;
    } else {
      const sufficientAllowance: boolean | void = await checkAllowance(
        wrap,
        address as string,
      );
      if (sufficientAllowance) {
        if (button) {
          button.innerHTML = "confirming...";
          setButtonLoadingColor(true);
        }
        const depositTx = await sendDepositTx(wrap);
        if (depositTx.substring(0, 2) === "0x") {
          if (button) {
            button.innerHTML = "wrapped :)";
            setButtonLoadingColor(false);
          }
          refreshInfo();
          setTimeout(() => {
            if (button) {
              button.innerHTML = "wrap";
              setButtonLoadingColor(false);
            }
          }, 10000);
        } else {
          if (button) {
            button.innerHTML = "wrap";
            setButtonLoadingColor(false);
          }
          refreshInfo();
        }
      } else {
        setGovlocksAllowanceButtons(true);
      }
    }
  };

  const unwrapTxFlow = async (button: HTMLElement | null) => {
    if (unwrap == 0) {
      button && (button.innerHTML = "unwrap");
      return;
    }
    if (unwrap > govWalletInfo.govlocks) {
      button && (button.innerHTML = "not enough");
      return;
    } else {
      if (button) {
        button.innerHTML = "confirming...";
        setButtonLoadingColor(true);
      }
      const withdrawTx = await sendWithdrawTx(unwrap);
      if (withdrawTx.substring(0, 2) === "0x") {
        if (button) {
          button.innerHTML = "unwrapped :)";
          setButtonLoadingColor(false);
        }
        refreshInfo();
        setTimeout(() => {
          if (button) {
            button.innerHTML = "unwrap";
            setButtonLoadingColor(false);
          }
        }, 10000);
      } else {
        if (button) {
          button.innerHTML = "unwrap";
          setButtonLoadingColor(false);
        }
        refreshInfo();
      }
    }
  };

  const delegateTxFlow = async (button: HTMLElement | null) => {
    if (button) {
      button.innerHTML = "confirming...";
      setButtonLoadingColor(true);
    }
    const delegateTx = await sendDelegateTx(delegate);
    if (delegateTx.substring(0, 2) === "0x") {
      if (button) {
        button.innerHTML = "delegated :)";
        setButtonLoadingColor(false);
      }
      refreshInfo();
      setTimeout(() => {
        if (button) {
          button.innerHTML = "delegate";
          setButtonLoadingColor(false);
        }
      }, 10000);
    } else {
      if (button) {
        button.innerHTML = "delegate";
        setButtonLoadingColor(false);
      }
      refreshInfo();
    }
  };

  const renderButton = () => {
    if (govlocksActiveToggle === "WRAP") {
      if (
        isConnected &&
        wrap > govWalletInfo.locksGovlocksAllowance &&
        govWalletInfo.locks >= wrap
      ) {
        return "approve locks";
      }
      return "wrap";
    }
    if (govlocksActiveToggle === "UNWRAP") {
      return "unwrap";
    }
    if (govlocksActiveToggle === "DELEGATE") {
      return "delegate";
    }
  };

  return (
    <div className="absolute left-[2.5%] top-[12.5%] h-[65%] w-[95%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute left-0 top-2 w-4 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-2 left-0 w-4 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute right-0 top-2 w-4 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-2 right-0 w-4 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute inset-4 border-2 border-black bg-[#D9C6BA]">
        <div className="flex h-[100%] w-[100%] flex-col py-[5%]">
          <div className="mx-auto flex w-[95%] flex-row items-center justify-between font-amaticbold text-[7vw] font-medium">
            <h1
              className={`${govlocksActiveToggle === "WRAP" ? "underline" : ""}`}
              onClick={() => changeGovlocksActiveToggle("WRAP")}
            >
              WRAP
            </h1>
            <h1
              className={`${govlocksActiveToggle === "UNWRAP" ? "underline" : ""}`}
              onClick={() => changeGovlocksActiveToggle("UNWRAP")}
            >
              UNWRAP
            </h1>
            <h1
              className={`${govlocksActiveToggle === "DELEGATE" ? "underline" : ""}`}
              onClick={() => changeGovlocksActiveToggle("DELEGATE")}
            >
              DELEGATE
            </h1>
          </div>
          <div className="mx-auto my-[15%] h-[30%] w-[90%] border-2 border-black bg-white">
            <div className="relative h-[100%] w-[100%]">
              {govlocksActiveToggle === "DELEGATE" ? (
                <input
                  className="absolute top-[15%] w-[90%] border-none bg-transparent pl-[5%] font-baloo text-[7vw] font-bold focus:outline-none"
                  type="string"
                  placeholder=""
                  value={govlocksDisplayString}
                  onChange={(e) => handleGovlocksChange(e.target.value)}
                />
              ) : (
                <input
                  className="absolute top-[15%] w-[90%] border-none bg-transparent pl-[5%] font-baloo text-[7vw] font-bold focus:outline-none"
                  type="number"
                  id="number-input"
                  placeholder="0.00"
                  value={govlocksDisplayString}
                  onChange={(e) => handleGovlocksChange(e.target.value)}
                />
              )}
              <span
                className="absolute bottom-0 right-[3%] font-baloo text-[5vw] font-bold text-[#7F7F7F]"
                onClick={() => handleGovlocksBalanceClick()}
              >
                {govlocksActiveToggle === "WRAP"
                  ? "locks"
                  : govlocksActiveToggle === "UNWRAP"
                    ? "govlocks"
                    : "votes"}
                :{" "}
                {walletInfoLoading ? loadingElement() : handleGovlocksBalance()}
              </span>
            </div>
          </div>
          {govlocksAllowanceButtons && (
            <div className="mx-auto flex h-[12.5%] w-[90%] flex-row items-center justify-between">
              <button
                className="h-[100%] w-[46%] border-2 border-black bg-[#E7B941] font-amaticbold text-[6vw]"
                id="left-approve-button"
                onClick={() => handleLeftButtonClick()}
              >
                approve tx
              </button>
              <button
                className="h-[100%] w-[46%] border-2 border-black bg-[#E7B941] font-amaticbold text-[6vw]"
                id="right-approve-button"
                onClick={() => handleRightButtonClick()}
              >
                approve infinite
              </button>
            </div>
          )}
          {!govlocksAllowanceButtons && (
            <ConnectButton.Custom>
              {({ account, chain, openChainModal, openConnectModal }) => {
                return (
                  <button
                    className={`mx-auto h-[12.5%] w-[36%] ${buttonLoadingColor ? "bg-[#B35227] text-[#E7B941]" : "bg-[#E7B941] text-black"} border-2 border-black font-amaticbold text-[7vw]`}
                    id="govlocks-button"
                    onClick={() => {
                      const button = document.getElementById("govlocks-button");

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
                        handleButtonClick();
                      }
                    }}
                  >
                    {renderButton()}
                  </button>
                );
              }}
            </ConnectButton.Custom>
          )}
        </div>
      </div>
    </div>
  );
};
