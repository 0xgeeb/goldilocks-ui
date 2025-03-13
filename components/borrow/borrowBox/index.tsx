"use client";

import { useBorrow } from "../../../providers";
import { Notification, Chart } from "../../borrow";

export const BorrowBox = () => {
  const {
    chartOpen,
    handlePercentageButtons,
    activeToggle,
    displayString,
    handleChange,
    handleBalance,
    txConfirming,
    notification,
    walletInfoLoading,
  } = useBorrow();

  const loadingElement = () => {
    return <span className="loader-small ml-3"></span>;
  };

  return (
    <div className="absolute left-[10%] top-[18%] h-[36%] w-[80%] border-2 border-black bg-[#EEDCD2] md:left-[20%] md:top-[17%] md:w-[60%] lg:left-[25%] lg:top-[15%] lg:w-[50%] xl:top-[14%] 2xl:left-[28.125%] 2xl:w-[43.75%]">
      <div className="absolute left-0 top-3 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute right-0 top-3 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div
        className={`absolute inset-6 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}
      >
        {chartOpen ? (
          <Chart />
        ) : txConfirming ? (
          <img
            className="h-[100%] w-[100%]"
            src="/images/bg-transaction.png"
            alt="tx"
          />
        ) : notification.toggle ? (
          <Notification />
        ) : (
          <div className="relative flex h-[100%] w-[100%] flex-col">
            <div className="absolute right-0 top-0 flex h-[15%] w-[50%] flex-row border-b-2 border-l-2 border-black font-baloo text-[2.5vw] font-semibold md:text-[2vw] lg:w-[42%] lg:text-[1.5vw] xl:text-[1.25vw] 2xl:w-[33.61%] 2xl:text-[1vw]">
              <div
                className="flex h-[100%] w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#DCC2A8] hover:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(1)}
              >
                25%
              </div>
              <div
                className="flex h-[100%] w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#D5A774] hover:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(2)}
              >
                50%
              </div>
              <div
                className="flex h-[100%] w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#D19A5B] hover:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(3)}
              >
                75%
              </div>
              <div
                className="flex h-[100%] w-[25%] cursor-pointer items-center justify-center bg-[#CC8634] hover:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(4)}
              >
                MAX
              </div>
            </div>
            <div className="absolute left-[1%] top-[37%] flex flex-row items-center sm:left-[2%] xl:left-[3%]">
              <img
                className="h-6 w-6 md:h-8 md:w-8"
                src="/images/logo-honey.png"
                alt="coinlogo"
              />
              <h1 className="ml-1 font-baloo text-[3vw] font-semibold md:text-[2.4vw] lg:ml-3 lg:text-[1.4vw]">
                HONEY
              </h1>
            </div>
            <div className="absolute left-[26%] top-[30%] h-[45%] w-[60%] border-2 border-black bg-white lg:left-[22%] lg:h-[40%] lg:w-[55.6%] tall:h-[35%] tall:lg:h-[32%]">
              <div className="relative h-[100%] w-[100%]">
                <input
                  className="absolute left-[5%] top-[1%] w-[90%] border-none bg-transparent font-baloo text-[4.5vw] font-bold focus:outline-hidden md:text-[4vw] lg:text-[3.5vw] xl:text-[2.5vw] 2xl:text-[2vw] tall:top-[15%] tall:text-[5.5vw] tall:md:text-[4vw] tall:lg:text-[3.5vw] tall:xl:text-[2.5vw] tall:2xl:text-[2vw]"
                  type="number"
                  id="number-input"
                  placeholder="0.00"
                  value={displayString}
                  onChange={(e) => handleChange(e.target.value)}
                />
                <span className="absolute bottom-0 right-[3%] font-baloo text-[2vw] font-bold text-[#7F7F7F] md:text-[1.75vw] lg:text-[1.25vw] xl:text-[0.9vw] tall:text-[2.5vw] tall:md:text-[1.75vw] tall:lg:text-[1.25vw] tall:xl:text-[0.9vw]">
                  {activeToggle === "BORROW"
                    ? "borrow limit"
                    : "borrowed honey"}
                  : {walletInfoLoading ? loadingElement() : handleBalance()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
