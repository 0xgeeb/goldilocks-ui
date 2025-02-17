"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useGoldilend } from "../../../providers";
import { LendNotificationMobile } from "../../goldilendMobile";

export const BorrowTabMobile = () => {
  const [daysTilExpiration, setDaysTilExpiration] = useState<number>(14);

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
    notification,
    selectScreen,
    setSelectScreen,
    getInterestRate,
    debouncedLoanAmount,
    debouncedLoanExpiration,
    loanInterest,
    setLoanInterest,
    loanInterestRate,
    setLoanInterestRate,
  } = useGoldilend();

  const { isConnected } = useAccount();

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

  const formatAsString = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

  const loadingElement = () => {
    return <span className="loader-small mx-auto mt-[10%]"></span>;
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

  return (
    <>
      {selectScreen && (
        <div className="flex h-[100%] w-[100%] flex-col items-center">
          <h1 className="mt-[5%] font-amaticbold text-[10vw]">
            select collateral
          </h1>
          <div
            className="flex h-[80%] w-[95%] flex-wrap overflow-y-auto"
            id="hide-scrollbar"
          >
            {infoLoading && isConnected ? (
              loadingElement()
            ) : !isConnected || ownedBeras.length == 0 ? (
              <div className="flex h-[100%] w-[100%] flex-col items-center opacity-50">
                <img
                  className="my-[10%] w-[70%]"
                  src="/images/icon-not-found.png"
                  alt="not-found"
                />
                <h1 className="font-amaticbold text-[8vw]">no beras</h1>
              </div>
            ) : (
              ownedBeras.map((bera, index) => (
                <div key={index} className="h-[45%] w-[50%] py-2">
                  <img
                    className={`ml-[5%] h-[100%] w-[90%] border-2 border-black hover:scale-110 hover:cursor-pointer ${selectedBera.index == bera.index ? "border-4 border-black" : "opacity-75"}`}
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
      )}
      {!selectScreen &&
        (txConfirming ? (
          <img
            className="h-[100%] w-[100%]"
            src="/images/bg-transaction-mobile.png"
            alt="tx"
          />
        ) : notification.toggle ? (
          <LendNotificationMobile />
        ) : (
          <div className="relative flex h-[100%] w-[100%] flex-col items-center justify-between py-[3%]">
            <div
              className="absolute right-[3%] top-[3%] flex h-[8%] w-[10%] items-center justify-center border-2 border-black bg-[#E7B941] text-[5.5vw] text-black"
              onClick={() => setSelectScreen(true)}
            >
              &#8634;
            </div>
            <h1 className="font-amaticbold text-[10vw]">create loan</h1>
            <div className="relative flex h-[20%] w-[95%] flex-row items-start justify-between">
              <span className="absolute left-[3%] top-[-20%] font-baloo text-[3vw] font-semibold">
                Collateral:
              </span>
              {selectedBera.name !== "" && (
                <img
                  className="mx-auto h-[70%] w-[20%] border-2 border-black"
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
              <div className="absolute bottom-[0%] left-[10%] flex w-[80%] flex-row items-center justify-between font-baloo text-[3vw] font-semibold">
                <span>borrow limit:</span>
                <span>
                  {borrowLimit > 0 ? formatAsString(borrowLimit) : "0.00"} iBGT
                </span>
              </div>
            </div>
            <div className="flex w-[95%] flex-row items-center justify-between font-baloo text-[3.5vw] font-semibold">
              <span>Loan Amount:</span>
              <input
                className="w-[55%] border-2 border-black bg-white pl-2 focus:outline-none"
                type="number"
                id="number-input"
                placeholder="0.00"
                value={borrowDisplayString}
                onChange={(e) => handleBorrowChange(e.target.value)}
              />
            </div>
            <div className="flex w-[95%] flex-row items-center justify-between font-baloo text-[3.5vw] font-semibold">
              <span>Repay Deadline:</span>
              <input
                className="w-[55%] border-2 border-black bg-white pl-2 focus:outline-none"
                type="text"
                id="number-input"
                placeholder="mm-dd-yyyy"
                value={loanExpiration}
                onChange={(e) => handleLoanDateChange(e.target.value)}
              />
            </div>
            <div className="my-[1%] flex w-[95%] flex-row items-center justify-between font-baloo text-[3.5vw] font-semibold">
              <div className="flex h-[100%] w-[70%] items-center justify-center bg-[#C09D87] p-2">
                <input
                  className="h-[100%] w-[100%] bg-black"
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
            <div className="flex w-[95%] flex-row items-center justify-between font-baloo text-[3.5vw] font-semibold">
              <span>Interest Rate:</span>
              <span>{formatAsString(loanInterestRate)}%</span>
            </div>
            <div className="flex w-[95%] flex-row items-center justify-between font-baloo text-[3.5vw] font-semibold">
              <span>Total Interest Due:</span>
              <span>{formatAsString(loanInterest)}</span>
            </div>
            <div className="flex w-[90%] flex-row items-center justify-between bg-[#EFD9CA] px-2 font-baloo text-[3vw] font-semibold">
              <span>Total Amount to Repay:</span>
              <span>{formatAsString(loanAmount + loanInterest)} iBGT</span>
            </div>
          </div>
        ))}
    </>
  );
};
