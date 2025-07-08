"use client";

import { useEffect, useState } from "react";

import { useAccount } from "wagmi";

import { formatAsString } from "@/app/_components/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useGoldilendTx } from "../../../hooks";
import { useGoldilend } from "../../../providers";
import { contracts } from "../../../utils/addressi";
import { BorrowNotification } from "../../goldilend";

export const BorrowTab = () => {
  const [daysTilExpiration, setDaysTilExpiration] = useState<number>(14);
  const [buttonLoadingColor, setButtonLoadingColor] = useState<boolean>(false);

  const {
    ownedBeras,
    handleBeraClick,
    infoLoading,
    selectedBera,
    borrowLimit,
    updateBorrowLimit,
    borrowDisplayString,
    handleBorrowChange,
    loanExpiration,
    handleLoanDateChange,
    loanAmount,
    txConfirming,
    setTxConfirming,
    notification,
    changeActiveToggle,
    openNotification,
    getInterestRate,
    debouncedLoanAmount,
    debouncedLoanExpiration,
    loanInterest,
    setLoanInterest,
    loanInterestRate,
    setLoanInterestRate,
    updateOwnedBeras,
    findLoans,
  } = useGoldilend();

  const { checkLoanAllowance, sendGoldilendNFTApproveTx, sendBorrowTx } =
    useGoldilendTx();

  const { address, isConnected } = useAccount();

  useEffect(() => {
    updateBorrowLimit();
  }, [selectedBera]);

  useEffect(() => {
    if (
      selectedBera.name !== "" &&
      debouncedLoanAmount > 0 &&
      checkDate(debouncedLoanExpiration)
    ) {
      getInterestRate();
    } else {
      setLoanInterest(0);
      setLoanInterestRate(0);
    }
  }, [selectedBera, debouncedLoanAmount, debouncedLoanExpiration]);

  useEffect(() => {
    if (checkDate(debouncedLoanExpiration)) {
      const [month, day, year] = debouncedLoanExpiration.split("-").map(Number);
      const inputDate = new Date(year, month - 1, day);
      const currentDate = new Date();
      const timeDifference = inputDate.getTime() - currentDate.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      if (daysDifference >= 14 && daysDifference <= 365) {
        setDaysTilExpiration(daysDifference);
      }
    }
  }, [debouncedLoanExpiration]);

  const loadingElement = () => {
    return <span className="loader-small mx-auto mt-[10%]"></span>;
  };

  const checkDate = (dateString: string): boolean => {
    const dateParts = dateString.split("-");
    const [month, day, year] = dateParts.map(Number);
    const parsedDate = new Date(year, month - 1, day);
    const timestamp = parsedDate.getTime();
    const timestampDigits = Math.floor(timestamp / 1000);
    if (dateParts.length !== 3) {
      return false;
    }
    if (isNaN(month) || isNaN(day) || isNaN(year)) {
      return false;
    }
    if (isNaN(parsedDate.getTime())) {
      return false;
    }
    if (timestampDigits < Math.floor(Date.now() / 1000)) {
      return false;
    }
    if (timestampDigits < Math.floor(Date.now() / 1000) + 86400 * 14) {
      return false;
    }
    return true;
  };

  const parseDate = (dateString: string): number => {
    const dateParts = dateString.split("-");
    const [month, day, year] = dateParts.map(Number);
    const parsedDate = new Date(year, month - 1, day);
    const timestamp = parsedDate.getTime();
    const currentTimestamp = Date.now();
    return Math.floor((timestamp - currentTimestamp) / 1000);
  };

  const handleButtonClick = async () => {
    const button = document.getElementById("borrow-button");
    if (loanAmount == 0) {
      button && (button.innerHTML = "no loan");
      return;
    }
    if (!checkDate(loanExpiration)) {
      button && (button.innerHTML = "invalid expiration");
      return;
    }
    if (selectedBera.name === "") {
      button && (button.innerHTML = "no collateral");
      return;
    }
    const [bondFlag, bandFlag] = await checkLoanAllowance(
      address as `0x${string}`,
    );
    if (
      (bondFlag || selectedBera.name !== "BondBera") &&
      (bandFlag || selectedBera.name !== "BandBera")
    ) {
      borrowTxFlow(button);
    } else {
      button && (button.innerHTML = "approving...");
      setButtonLoadingColor(true);
      if (!bondFlag && selectedBera.name === "BondBera") {
        await sendGoldilendNFTApproveTx(contracts.bondbear.address);
      }
      if (!bandFlag && selectedBera.name === "BandBera") {
        await sendGoldilendNFTApproveTx(contracts.bandbear.address);
      }
      button && (button.innerHTML = "create loan");
      setButtonLoadingColor(false);
    }
  };

  const borrowTxFlow = async (button: HTMLElement | null) => {
    setTxConfirming(true);
    if (button) {
      button.innerHTML = "confirming...";
      setButtonLoadingColor(true);
    }
    const borrowTx = await sendBorrowTx(
      loanAmount,
      selectedBera,
      parseDate(loanExpiration),
    );
    if (borrowTx.substring(0, 2) === "0x") {
      setTxConfirming(false);
      openNotification(
        true,
        "You've successfully created a loan",
        `You borrowed ${formatAsString(loanAmount)} WBERA against your bera`,
        borrowTx,
      );
      button && (button.innerHTML = "create loan");
      setButtonLoadingColor(false);
      updateOwnedBeras(selectedBera);
      findLoans();
      changeActiveToggle("BORROW");
      setDaysTilExpiration(14);
      setTimeout(() => {
        openNotification(false, "", "", "");
      }, 10000);
    } else {
      button && (button.innerHTML = "create loan");
      setButtonLoadingColor(false);
      changeActiveToggle("BORROW");
      setDaysTilExpiration(14);
      setTxConfirming(false);
    }
  };

  const sliderValue = ((daysTilExpiration - 7) / (365 - 7)) * 100;

  const handleSliderChange = (days: string) => {
    const daysNum = parseFloat(days);
    setDaysTilExpiration(daysNum);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + daysNum);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const year = currentDate.getFullYear().toString();
    handleLoanDateChange(`${month}-${day}-${year}`);
  };

  return txConfirming ? (
    <img className="size-full" src="/images/bg-transaction.png" alt="tx" />
  ) : notification.toggle ? (
    <BorrowNotification />
  ) : (
    <div className="flex size-full flex-row">
      <div className="flex size-full flex-col items-center border-r-2 border-black px-0">
        <h1 className="mt-[2%] font-amaticbold text-[5vw] xl:text-[3vw]">
          select collateral
        </h1>
        <div
          className="flex h-4/5 w-[85%] flex-wrap overflow-y-auto py-[2%]"
          id="hide-scrollbar"
        >
          {infoLoading && isConnected ? (
            loadingElement()
          ) : !isConnected || ownedBeras.length == 0 ? (
            <div className="flex size-full flex-col items-center justify-center opacity-50">
              <img
                className="mb-[5%] w-[70%]"
                src="/images/icon-not-found.png"
                alt="not-found"
              />
              <h1 className="font-amaticbold text-[5vw] xl:text-[3vw]">
                no beras
              </h1>
            </div>
          ) : (
            ownedBeras.map((bera, index) => (
              <div key={index} className="h-2/5 w-[50%] py-2 xl:h-[45%]">
                <img
                  className={`ml-[5%] h-full w-[90%] border-2 border-black hover:scale-110 hover:cursor-pointer ${selectedBera.index == bera.index ? "border-4 border-black" : "opacity-75"}`}
                  onClick={() => handleBeraClick(bera)}
                  src={
                    bera.name === "BondBera"
                      ? "/images/icon-bondbear.png"
                      : "/images/icon-bandbear.png"
                  }
                  alt="bera"
                />
              </div>
            ))
          )}
        </div>
      </div>
      <div className="flex size-full flex-col items-center justify-between py-[1%]">
        <h1 className="font-amaticbold text-[5vw] xl:text-[2.5vw]">
          create loan
        </h1>
        <div className="relative flex h-1/4 w-[90%] flex-row items-start justify-between">
          <span className="absolute left-[3%] top-[-20%] font-baloo text-[2vw] font-semibold xl:text-[0.8vw]">
            Collateral:
          </span>
          {selectedBera.name !== "" && (
            <img
              className="mx-auto mt-[2.5%] h-[50%] w-1/5 border-2 border-black xl:mt-0 xl:h-[70%]"
              onClick={() => handleBeraClick(selectedBera)}
              src={
                selectedBera.name === "BondBera"
                  ? "/images/icon-bondbear.png"
                  : "/images/icon-bandbear.png"
              }
              alt="selectedbera"
              key={selectedBera.index}
            />
          )}
          <div className="absolute bottom-[5%] left-[20%] flex w-3/5 flex-row items-center justify-between font-baloo text-[2vw] font-semibold xl:text-[0.8vw]">
            <span>borrow limit:</span>
            <span>
              {borrowLimit > 0 ? formatAsString(borrowLimit) : "0.00"} WBERA
            </span>
          </div>
        </div>
        <div className="flex w-[90%] flex-row items-center justify-between font-baloo text-[1.8vw] font-semibold xl:text-[1vw]">
          <span>Loan Amount:</span>
          <input
            className="w-[50%] border-2 border-black bg-white pl-2 focus:outline-hidden"
            type="number"
            id="number-input"
            placeholder="0.00"
            value={borrowDisplayString}
            onChange={(e) => handleBorrowChange(e.target.value)}
          />
        </div>
        <div className="flex w-[90%] flex-row items-center justify-between font-baloo text-[1.8vw] font-semibold xl:text-[1vw]">
          <span>Repay Deadline:</span>
          <input
            className="w-[50%] border-2 border-black bg-white pl-2 focus:outline-hidden"
            type="text"
            id="number-input"
            placeholder="mm-dd-yyyy"
            value={loanExpiration}
            onChange={(e) => handleLoanDateChange(e.target.value)}
          />
        </div>
        <div className="my-[1%] flex w-[90%] flex-row items-center justify-between font-baloo text-[1.8vw] font-semibold xl:text-[1vw]">
          <div className="flex h-full w-[70%] items-center justify-center bg-[#C09D87] p-2">
            <input
              className="size-full bg-black hover:cursor-pointer"
              id="date-slider"
              type="range"
              min="14"
              max="365"
              value={daysTilExpiration}
              onChange={(e) => handleSliderChange(e.target.value)}
              style={{
                background: `linear-gradient(to right, black ${sliderValue}%, #C09D87 ${sliderValue}%)`,
              }}
            />
          </div>
          <span>{daysTilExpiration} days</span>
        </div>
        <div className="flex w-[90%] flex-row items-center justify-between font-baloo text-[1.8vw] font-semibold xl:text-[1vw]">
          <span>Interest Rate:</span>
          <span>{formatAsString(loanInterestRate)}%</span>
        </div>
        <div className="flex w-[90%] flex-row items-center justify-between font-baloo text-[1.8vw] font-semibold xl:text-[1vw]">
          <span>Total Interest Due:</span>
          <span>{formatAsString(loanInterest)}</span>
        </div>
        <div className="flex w-[85%] flex-row items-center justify-between bg-[#EFD9CA] px-2 font-baloo text-[1.6vw] font-semibold xl:text-[0.8vw]">
          <span>Total Amount to Repay:</span>
          <span>{formatAsString(loanAmount + loanInterest)} WBERA</span>
        </div>
        <ConnectButton.Custom>
          {({ account, chain, openChainModal, openConnectModal }) => {
            return (
              <button
                className={`h-[12%] w-[48%] ${buttonLoadingColor ? "bg-[#C9E3B9] text-black" : "bg-[#E7B941] text-black"} flex items-center justify-center border-2 border-black font-amaticbold text-[4vw] hover:scale-110 hover:bg-[#C9E3B9] hover:text-black xl:text-[1.7vw] cursor-pointer`}
                id="borrow-button"
                onClick={() => {
                  const button = document.getElementById("borrow-button");

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
                create loan
              </button>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  );
};
