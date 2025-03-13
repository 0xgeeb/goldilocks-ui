"use client";

import { useState } from "react";

import { useAccount } from "wagmi";

import { formatAsString } from "@/app/_components/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useGoldilendTx } from "../../../hooks";
import { useGoldilend } from "../../../providers";
import { contracts } from "../../../utils/addressi";
import { BorrowNotification } from "../../goldilend";

type InputValuesType = {
  [key: number]: string;
};

type AllowanceFlagsType = {
  [key: number]: boolean;
};

export const RepayTab = () => {
  const [inputValues, setInputValues] = useState<InputValuesType>({});
  const [allowanceFlags, setAllowanceFlags] = useState<AllowanceFlagsType>({});
  const [buttonLoadingColor, setButtonLoadingColor] = useState<boolean>(false);

  const {
    infoLoading,
    userLoans,
    findLoans,
    txConfirming,
    setTxConfirming,
    notification,
    openNotification,
    refreshGoldilendInfo,
    refreshGoldilendWalletInfo,
    goldilendWalletInfo,
  } = useGoldilend();

  const { checkRepayAllowance, sendRepayTx, sendiBGTApproveTx } =
    useGoldilendTx();

  const { address, isConnected } = useAccount();

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

  const handleInputChange = (loanId: number, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [loanId]: value,
    }));
  };

  const handleMaxClick = (loanId: number, amt: number) => {
    setInputValues((prev) => ({
      ...prev,
      [loanId]: amt.toString(),
    }));
  };

  const handleAllowanceChange = (loanId: number, flag: boolean) => {
    setAllowanceFlags((prev) => ({
      ...prev,
      [loanId]: flag,
    }));
  };

  const refreshInfo = () => {
    const newValues: InputValuesType = {};
    Object.keys(inputValues).forEach((key) => {
      newValues[parseInt(key)] = "0";
    });
    setInputValues(newValues);
    findLoans();
    refreshGoldilendInfo();
    refreshGoldilendWalletInfo();
  };

  const handleButtonClick = async (
    loanId: number,
    amt: number,
    borrowedAmt: number,
  ) => {
    const button = document.getElementById("repay-button" + loanId);
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
        const repayTx = await sendRepayTx(
          amt,
          loanId,
          amt == borrowedAmt,
          address as `0x${string}`,
        );
        if (repayTx.substring(0, 2) === "0x") {
          setTxConfirming(false);
          openNotification(
            true,
            "You've successfully repaid your loan",
            `You repaid ${formatAsString(amt)} iBGT`,
            repayTx,
          );
          if (button) {
            button.innerHTML = "REPAY LOAN";
            setButtonLoadingColor(false);
          }
          refreshInfo();
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        } else {
          if (button) {
            button.innerHTML = "REPAY LOAN";
            setButtonLoadingColor(false);
          }
          refreshInfo();
          setTxConfirming(false);
        }
      } else {
        // setAllowanceButtons(true)
        handleAllowanceChange(loanId, true);
      }
    }
  };

  //todo: fix update allowance here
  const handleLeftButtonClick = async (amt: number, loanId: number) => {
    const swapButton = document.getElementById("repay-button" + loanId);
    const leftButton = document.getElementById("left-approve-button" + loanId);
    const rightButton = document.getElementById(
      "right-approve-button" + loanId,
    );
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
    swapButton && (swapButton.innerHTML = "REPAY LOAN");
    // setAllowanceButtons(false)
    handleAllowanceChange(loanId, false);
  };

  const handleRightButtonClick = async (loanId: number) => {
    const swapButton = document.getElementById("repay-button" + loanId);
    const leftButton = document.getElementById("left-approve-button" + loanId);
    const rightButton = document.getElementById(
      "right-approve-button" + loanId,
    );
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
    swapButton && (swapButton.innerHTML = "REPAY LOAN");
    // setAllowanceButtons(false)
    handleAllowanceChange(loanId, false);
  };

  return txConfirming ? (
    <img className="size-full" src="/images/bg-transaction.png" alt="tx" />
  ) : notification.toggle ? (
    <BorrowNotification />
  ) : (
    <div
      className="flex size-full flex-col overflow-y-auto"
      id="hide-scrollbar"
    >
      <div className="h-[15%] w-full border-b-2 border-black">
        <h1 className="ml-[4%] font-amaticbold text-[5vw] xl:text-[2.3vw]">
          my loans
        </h1>
      </div>
      {infoLoading && isConnected ? (
        loadingElement()
      ) : !isConnected || userLoans.length == 0 ? (
        <div className="flex size-full flex-col items-center opacity-50">
          <img
            className="my-[5%] h-2/5"
            src="/images/icon-not-found.png"
            alt="not-found"
          />
          <h1 className="font-amaticbold text-[3vw]">no loans</h1>
        </div>
      ) : (
        userLoans.map((loan, index) => (
          <div
            className="relative flex w-full flex-row items-center border-b-2 border-black py-[2%] font-baloo font-semibold"
            key={index}
          >
            {loan.borrowedAmount == 0 && (
              <div className="absolute right-0 z-30 flex h-1/4 w-[30%] rotate-[16deg] items-center justify-center border-2 border-black bg-[#79AF45] text-[2vw] xl:text-[1.1vw]">
                REPAID
              </div>
            )}
            {loan.endDate < Math.floor(Date.now() / 1000) && (
              <div className="absolute right-0 z-30 flex h-1/4 w-[30%] rotate-[16deg] items-center justify-center border-2 border-black bg-[#CC7E16] text-[2vw] xl:text-[1.1vw]">
                EXPIRED
              </div>
            )}
            {loan.liquidated && (
              <div className="absolute right-0 z-30 flex h-1/4 w-[30%] rotate-[16deg] items-center justify-center border-2 border-black bg-[#B11614] text-[2vw] xl:text-[1.1vw]">
                LIQUIDATED
              </div>
            )}
            <h1 className="absolute left-[1%] top-[2%] text-[2vw] xl:text-[1vw]">
              Loan {loan.loanId}
            </h1>
            <div className="ml-[7%] flex h-[50%] w-2/5 flex-col justify-center px-[3%] text-[1.5vw] xl:text-[0.8vw]">
              <div className="flex w-full flex-row items-center justify-between">
                <span>total amount to repay:</span>
                <span>{formatNum(loan.borrowedAmount)} iBGT</span>
              </div>
              <div className="flex w-full flex-row items-center justify-between">
                <span>interest:</span>
                <span>{formatNum(loan.interest)} iBGT</span>
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
            <div className="relative flex h-full w-[28%] flex-col">
              <div
                className="absolute left-[1%] top-[7.5%] flex h-[45%] w-[25%] cursor-pointer items-center justify-center border-y-2 border-l-2 border-black bg-[#CC8634] text-[2vw] hover:scale-110 hover:bg-[#C9E3B9] xl:text-[0.9vw]"
                onClick={() => handleMaxClick(loan.loanId, loan.borrowedAmount)}
              >
                MAX
              </div>
              <div className="absolute left-[26%] top-[7.5%] flex h-[45%] w-[69%] flex-row items-center justify-between border-2 border-black bg-white">
                <input
                  className="h-full w-[70%] pl-[5%] text-[2.2vw] focus:outline-hidden xl:text-[1.3vw]"
                  type="text"
                  id="number-input"
                  placeholder="0.00"
                  value={inputValues[loan.loanId] || ""}
                  onChange={(e) =>
                    handleInputChange(loan.loanId, e.target.value)
                  }
                />
                <span className="mr-[1%] text-[1.5vw] text-[#7B7876] xl:text-[0.8vw]">
                  iBGT
                </span>
              </div>
              {allowanceFlags[loan.loanId] && (
                <div>
                  <button
                    className="absolute left-[1%] top-[65%] h-2/5 w-[42%] border-2 border-black bg-[#E7B941] text-[1.2vw] hover:scale-110 hover:bg-[#C9E3B9] xl:text-[0.7vw]"
                    id={`left-approve-button${loan.loanId}`}
                    onClick={() =>
                      handleLeftButtonClick(
                        parseFloat(inputValues[loan.loanId]),
                        loan.loanId,
                      )
                    }
                  >
                    approve tx
                  </button>
                  <button
                    className="absolute left-[53%] top-[65%] h-2/5 w-[42%] border-2 border-black bg-[#E7B941] text-[1.2vw] hover:scale-110 hover:bg-[#C9E3B9] xl:text-[0.7vw]"
                    id={`right-approve-button${loan.loanId}`}
                    onClick={() => handleRightButtonClick(loan.loanId)}
                  >
                    approve infinite
                  </button>
                </div>
              )}
              {!allowanceFlags[loan.loanId] && (
                <ConnectButton.Custom>
                  {({ account, chain, openChainModal, openConnectModal }) => {
                    return (
                      <button
                        className={`absolute left-[30%] top-[65%] h-2/5 w-[65%] border-2 border-black ${buttonLoadingColor ? "bg-[#C9E3B9] text-black" : "bg-[#E7B941] text-black"} text-[1.8vw] hover:scale-110 hover:bg-[#C9E3B9] hover:text-black xl:text-[0.9vw]`}
                        id={`repay-button${loan.loanId}`}
                        onClick={() => {
                          const button = document.getElementById(
                            "repay-button" + loan.loanId,
                          );

                          if (!account) {
                            if (
                              button &&
                              button.innerHTML === "connect wallet"
                            ) {
                              openConnectModal();
                            } else {
                              button && (button.innerHTML = "connect wallet");
                            }
                          } else if (chain?.name !== "Berachain") {
                            if (
                              button &&
                              button.innerHTML === "where berachain"
                            ) {
                              openChainModal();
                            } else {
                              button && (button.innerHTML = "where berachain");
                            }
                          } else {
                            handleButtonClick(
                              loan.loanId,
                              parseFloat(inputValues[loan.loanId]),
                              loan.borrowedAmount,
                            );
                          }
                        }}
                      >
                        REPAY LOAN
                      </button>
                    );
                  }}
                </ConnectButton.Custom>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
