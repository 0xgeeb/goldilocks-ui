"use client";

import { useState } from "react";

import { useAccount } from "wagmi";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useGoldilendTx } from "../../../hooks";
import { useGoldilend } from "../../../providers";
import { contracts } from "../../../utils/addressi";
import { BorrowNotification } from "../../goldilend";

export const LiquidateTab = () => {
  const {
    infoLoading,
    liquidatableLoans,
    findLiquidatableLoans,
    allowanceButtons,
    setAllowanceButtons,
    txConfirming,
    setTxConfirming,
    notification,
    openNotification,
    goldilendWalletInfo,
  } = useGoldilend();

  const { checkRepayAllowance, sendiBGTApproveTx, sendLiquidateTx } =
    useGoldilendTx();

  const { address } = useAccount();

  const [buttonLoadingColor, setButtonLoadingColor] = useState<boolean>(false);

  const loadingElement = () => {
    return <span className="loader-small m-auto"></span>;
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${month}-${day}-${year}`;
  };

  const formatNum = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

  const handleButtonClick = async (loanId: number, amt: number) => {
    const button = document.getElementById("liquidate-button");
    if (amt == 0) {
      button && (button.innerHTML = "no amount");
      return;
    }
    if (amt > goldilendWalletInfo.ibgt) {
      button && (button.innerHTML = "no balance");
      return;
    } else {
      const sufficientAllowance: boolean | void = await checkRepayAllowance(
        amt,
        address as `0x${string}`,
      );
      if (sufficientAllowance) {
        setTxConfirming(true);
        if (button) {
          button.innerHTML = "confirming...";
          setButtonLoadingColor(true);
        }
        const liquidateTx = await sendLiquidateTx("", loanId);
        if (liquidateTx.substring(0, 2) === "0x") {
          setTxConfirming(false);
          openNotification(
            true,
            "You've successfully liquidated a loan",
            `You liquidated loan ${loanId}`,
            liquidateTx,
          );
          if (button) {
            button.innerHTML = "LIQUIDATE";
            setButtonLoadingColor(false);
          }
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        } else {
          if (button) {
            button.innerHTML = "LIQUIDATE";
            setButtonLoadingColor(false);
          }
          setTxConfirming(false);
        }
      } else {
        setAllowanceButtons(true);
      }
    }
  };

  //todo: fix update allowance here
  const handleLeftButtonClick = async (amt: number) => {
    const swapButton = document.getElementById("liquidate-button");
    const leftButton = document.getElementById("left-approve-button");
    const rightButton = document.getElementById("right-approve-button");
    if (leftButton) {
      leftButton.innerHTML = "approving...";
      leftButton.style.backgroundColor = "#C9E3B9";
    }
    if (rightButton) {
      rightButton.innerHTML = "approving...";
      rightButton.style.backgroundColor = "#C9E3B9";
    }
    await sendiBGTApproveTx(amt, false);
    // updateAllowance(honeyBuy + 0.01)
    swapButton && (swapButton.innerHTML = "LIQUIDATE");
    setAllowanceButtons(false);
  };

  const handleRightButtonClick = async () => {
    const swapButton = document.getElementById("liquidate-button");
    const rightButton = document.getElementById("right-approve-button");
    const leftButton = document.getElementById("left-approve-button");
    if (leftButton) {
      leftButton.innerHTML = "approving...";
      leftButton.style.backgroundColor = "#C9E3B9";
    }
    if (rightButton) {
      rightButton.innerHTML = "approving...";
      rightButton.style.backgroundColor = "#C9E3B9";
    }
    await sendiBGTApproveTx(0, true);
    // updateAllowance(100000000)
    swapButton && (swapButton.innerHTML = "LIQUIDATE");
    setAllowanceButtons(false);
  };

  return (
    <div className="absolute left-[10%] top-[14%] h-[70%] w-4/5 border-2 border-black bg-[#EEDCD2] xl:left-[30%] xl:w-[52%]">
      <div className="absolute left-0 top-4 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 left-0 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute right-0 top-4 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 right-0 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div
        className={`absolute inset-8 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}
      >
        {txConfirming ? (
          <img
            className="size-full"
            src="/images/bg-transaction.png"
            alt="tx"
          />
        ) : notification.toggle ? (
          <BorrowNotification />
        ) : (
          <div
            className="flex size-full flex-col overflow-y-auto"
            id="hide-scrollbar"
          >
            <div className="h-[15%] w-full border-b-2 border-black">
              <h1 className="ml-[4%] font-amaticbold text-[5vw] xl:text-[2.3vw]">
                liquidate loans
              </h1>
            </div>
            {infoLoading
              ? loadingElement()
              : liquidatableLoans.map((loan, index) => (
                  <div
                    className="relative flex w-full flex-row items-center border-b-2 border-black py-[2%] font-baloo font-semibold"
                    key={index}
                  >
                    <h1 className="absolute left-[1%] top-[2%] text-[1.5vw] xl:text-[1vw]">
                      Loan {loan.loanId}
                    </h1>
                    <div className="ml-[7%] flex h-[50%] w-2/5 flex-col justify-center px-[3%] text-[1.5vw] xl:text-[0.8vw]">
                      <div className="flex w-full flex-row items-center justify-between">
                        <span>liquidation price:</span>
                        <span>{formatNum(loan.borrowedAmount)} iBGT</span>
                      </div>
                      <div className="flex w-full flex-row items-center justify-between">
                        <span>liquidate by:</span>
                        <span>{formatDate(loan.endDate + 86400 * 7)}</span>
                      </div>
                      <div className="flex w-full flex-row items-center justify-between">
                        <span>expiration date:</span>
                        <span>{formatDate(loan.endDate)}</span>
                      </div>
                    </div>
                    <div className="flex h-full w-[30%] flex-col items-center">
                      <h1 className="text-[1.2vw] text-[#9C4924] xl:text-[0.8vw]">
                        Collateral
                      </h1>
                      <div
                        className="flex h-[65%] w-[90%] flex-row items-center justify-around overflow-x-auto"
                        id="hide-scrollbar"
                      >
                        {loan.collateralNFTs.map((nft, index) => (
                          <img
                            className="mr-[5%] h-full w-[30%] border-2 border-black"
                            src={
                              nft === contracts.bondbear.address
                                ? "/images/icon-bondbear.png"
                                : "/images/icon-bandbear.png"
                            }
                            alt="collateral"
                            key={index}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="relative flex h-full w-[28%] flex-col items-center justify-center">
                      {allowanceButtons && (
                        <div className="flex size-full flex-row items-center justify-center">
                          <button
                            className="mr-[5%] h-[50%] w-[45%] border-2 border-black bg-[#E7B941] text-[1.2vw] hover:scale-110 hover:bg-[#C9E3B9] xl:text-[0.7vw]"
                            id="left-approve-button"
                            onClick={() =>
                              handleLeftButtonClick(loan.borrowedAmount)
                            }
                          >
                            approve tx
                          </button>
                          <button
                            className="h-[50%] w-[45%] border-2 border-black bg-[#E7B941] text-[1.2vw] hover:scale-110 hover:bg-[#C9E3B9] xl:text-[0.7vw]"
                            id="right-approve-button"
                            onClick={() => handleRightButtonClick()}
                          >
                            approve infinite
                          </button>
                        </div>
                      )}
                      {!allowanceButtons && (
                        <ConnectButton.Custom>
                          {({
                            account,
                            chain,
                            openChainModal,
                            openConnectModal,
                          }) => {
                            return (
                              <button
                                className={`h-[50%] w-4/5 border-2 border-black ${buttonLoadingColor ? "bg-[#C9E3B9] text-black" : "bg-[#E7B941] text-black"} text-[2vw] hover:scale-110 hover:bg-[#C9E3B9] hover:text-black xl:text-[1.1vw]`}
                                id="liquidate-button"
                                onClick={() => {
                                  const button =
                                    document.getElementById("repay-button");

                                  if (!account) {
                                    if (
                                      button &&
                                      button.innerHTML === "connect wallet"
                                    ) {
                                      openConnectModal();
                                    } else {
                                      button &&
                                        (button.innerHTML = "connect wallet");
                                    }
                                  } else if (chain?.name !== "Berachain") {
                                    if (
                                      button &&
                                      button.innerHTML === "where berachain"
                                    ) {
                                      openChainModal();
                                    } else {
                                      button &&
                                        (button.innerHTML = "where berachain");
                                    }
                                  } else {
                                    handleButtonClick(
                                      loan.loanId,
                                      loan.borrowedAmount,
                                    );
                                  }
                                }}
                              >
                                LIQUIDATE
                              </button>
                            );
                          }}
                        </ConnectButton.Custom>
                      )}
                    </div>
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};
