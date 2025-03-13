"use client";

import { useState } from "react";

import { useAccount } from "wagmi";

import { formatAsString } from "@/app/_components/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useGoldilendTx } from "../../../hooks";
import { useGoldilend } from "../../../providers";
import { contracts } from "../../../utils/addressi";
import { LendNotificationMobile } from "../../goldilendMobile";

type InputValuesType = {
  [key: number]: string;
};

type CollateralFlagsType = {
  [key: number]: boolean;
};

type AllowanceFlagsType = {
  [key: number]: boolean;
};

export const RepayTabMobile = () => {
  const [inputValues, setInputValues] = useState<InputValuesType>({});
  const [collateralFlags, setCollateralFlags] = useState<CollateralFlagsType>(
    {},
  );
  const [allowanceFlags, setAllowanceFlags] = useState<AllowanceFlagsType>({});

  const {
    infoLoading,
    userLoans,
    findLoans,
    txConfirming,
    setTxConfirming,
    notification,
    openNotification,
    goldilendWalletInfo,
    refreshGoldilendInfo,
    refreshGoldilendWalletInfo,
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

  const handleFlagChange = (loanId: number, flag: boolean) => {
    setCollateralFlags((prev) => ({
      ...prev,
      [loanId]: flag,
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
            button.style.backgroundColor = "#E7B941";
            button.style.color = "black";
          }
          refreshInfo();
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        } else {
          if (button) {
            button.innerHTML = "REPAY LOAN";
            button.style.backgroundColor = "#E7B941";
            button.style.color = "black";
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
      leftButton.style.backgroundColor = "#E7B941";
    }
    if (rightButton) {
      rightButton.innerHTML = "approving...";
      rightButton.style.backgroundColor = "#E7B941";
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
      leftButton.style.backgroundColor = "#E7B941";
    }
    if (rightButton) {
      rightButton.innerHTML = "approving...";
      rightButton.style.backgroundColor = "#E7B941";
    }
    await sendiBGTApproveTx(0, true);
    // updateAllowance(100000000)
    swapButton && (swapButton.innerHTML = "REPAY LOAN");
    // setAllowanceButtons(false)
    handleAllowanceChange(loanId, false);
  };

  return (
    <div className="absolute left-[15.5%] top-[7.5%] z-20 h-[70%] w-[69%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute left-0 top-3 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute right-0 top-3 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div
        className={`absolute inset-3 ${txConfirming ? "border-x-2 border-black" : "border-2 border-black"} bg-[#D9C6BA]`}
      >
        {txConfirming ? (
          <img
            className="size-full"
            src="/images/bg-transaction-mobile.png"
            alt="tx"
          />
        ) : notification.toggle ? (
          <LendNotificationMobile />
        ) : (
          <div
            className="flex size-full flex-wrap overflow-y-auto"
            id="hide-scrollbar"
          >
            <div className="w-full border-b-2 border-black">
              <h1 className="ml-[4%] font-amaticbold text-[7vw]">my loans</h1>
            </div>
            {infoLoading && isConnected ? (
              loadingElement()
            ) : !isConnected || userLoans.length == 0 ? (
              <div className="flex size-full flex-col items-center opacity-50">
                <img
                  className="my-[10%] h-2/5"
                  src="/images/icon-not-found.png"
                  alt="not-found"
                />
                <h1 className="font-amaticbold text-[8vw]">no loans</h1>
              </div>
            ) : (
              userLoans.map((loan, index) =>
                collateralFlags[loan.loanId] ? (
                  <div
                    className="flex h-[50%] w-full flex-col border-b-2 border-black p-[3%] font-baloo font-semibold"
                    key={index}
                  >
                    <div className="flex h-[10%] w-full flex-row items-center justify-between">
                      <h1 className="text-[4.5vw]">Loan {loan.loanId}</h1>
                      <h1
                        className="text-[3.5vw] text-[#9C4924]"
                        onClick={() => handleFlagChange(loan.loanId, false)}
                      >
                        Go Back
                      </h1>
                    </div>
                    <div
                      className="flex h-[90%] w-full flex-wrap overflow-y-auto"
                      id="hide-scrollbar"
                    >
                      {loan.collateralNFTs.map((nft, index) => (
                        <div key={index} className="h-[45%] w-[50%] py-2">
                          <img
                            className="ml-[5%] h-full w-[90%] border-2 border-black"
                            src={
                              nft === contracts.bondbear.address
                                ? "/images/icon-bondbear.png"
                                : "/images/icon-bandbear.png"
                            }
                            alt="bera"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div
                    className="relative flex h-[50%] w-full flex-col border-b-2 border-black p-[3%] font-baloo font-semibold"
                    key={index}
                  >
                    {loan.borrowedAmount == 0 && (
                      <div className="absolute right-[5%] top-[35%] z-30 flex h-[15%] w-[90%] rotate-[26deg] items-center justify-center border-2 border-black bg-[#79AF45] text-[8vw]">
                        REPAID
                      </div>
                    )}
                    {loan.endDate < Math.floor(Date.now() / 1000) && (
                      <div className="absolute right-[5%] top-[35%] z-30 flex h-[15%] w-[90%] rotate-[26deg] items-center justify-center border-2 border-black bg-[#CC7E16] text-[8vw]">
                        EXPIRED
                      </div>
                    )}
                    {loan.liquidated && (
                      <div className="absolute right-[5%] top-[35%] z-30 flex h-[15%] w-[90%] rotate-[26deg] items-center justify-center border-2 border-black bg-[#B11614] text-[8vw]">
                        LIQUIDATED
                      </div>
                    )}
                    <div className="flex w-full flex-row items-center justify-between">
                      <h1 className="text-[4.5vw]">Loan {loan.loanId}</h1>
                      <h1
                        className="text-[3.5vw] text-[#9C4924]"
                        onClick={() => handleFlagChange(loan.loanId, true)}
                      >
                        View Collateral
                      </h1>
                    </div>
                    <div className="mt-[3%] flex w-full flex-col text-[3vw]">
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
                    <h1 className="mt-[3%] text-[4vw]">Amount to Repay:</h1>
                    <div className="mt-[1%] flex h-[15%] w-full flex-row bg-red-500">
                      <div
                        className="flex h-full w-[25%] items-center justify-center border-y-2 border-l-2 border-black bg-[#CC8634] text-[4vw]"
                        onClick={() =>
                          handleMaxClick(loan.loanId, loan.borrowedAmount)
                        }
                      >
                        MAX
                      </div>
                      <div className="flex h-full w-[75%] flex-row items-center justify-between border-2 border-black bg-white px-[4%]">
                        <input
                          className="h-full w-[70%] text-[4.5vw] focus:outline-hidden"
                          type="text"
                          id="number-input"
                          placeholder="0.00"
                          value={inputValues[loan.loanId] || ""}
                          onChange={(e) =>
                            handleInputChange(loan.loanId, e.target.value)
                          }
                        />
                        <span className="text-[4.5vw] text-[#7B7876]">
                          iBGT
                        </span>
                      </div>
                    </div>
                    <div className="relative mt-[6%] h-[15%] w-full">
                      {allowanceFlags[loan.loanId] && (
                        <div>
                          <button
                            className="absolute left-0 h-full w-[42%] border-2 border-black bg-[#E7B941] text-[3vw]"
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
                            className="absolute left-[58%] h-full w-[42%] border-2 border-black bg-[#E7B941] text-[3vw]"
                            id={`right-approve-button${loan.loanId}`}
                            onClick={() => handleRightButtonClick(loan.loanId)}
                          >
                            approve infinite
                          </button>
                        </div>
                      )}
                      {!allowanceFlags[loan.loanId] && (
                        <ConnectButton.Custom>
                          {({
                            account,
                            chain,
                            openChainModal,
                            openConnectModal,
                          }) => {
                            return (
                              <button
                                className="absolute right-0 h-full w-[62%] border-2 border-black bg-[#E7B941] text-[3vw]"
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
                ),
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};
