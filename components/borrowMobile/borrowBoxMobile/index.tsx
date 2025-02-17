"use client";

import { useBorrow } from "../../../providers";
import {
  WalletBalanceMobilePopup,
  NotificationMobile,
  ChartSmallMobile,
} from "../../borrowMobile";

export const BorrowBoxMobile = () => {
  const {
    chartOpen,
    handlePercentageButtons,
    activeToggle,
    displayString,
    handleChange,
    handleBalance,
    txConfirming,
    notification,
    balanceMobileToggle,
    walletInfoLoading,
  } = useBorrow();

  const loadingElement = () => {
    return <span className="loader-small ml-3"></span>;
  };

  return (
    <div className="absolute left-[15.5%] top-[7.5%] h-[39%] w-[69%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute left-0 top-3 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute right-0 top-3 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div
        className={`absolute inset-3 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}
      >
        {chartOpen ? (
          <ChartSmallMobile />
        ) : txConfirming ? (
          <img
            className="h-[100%] w-[100%]"
            src="/images/bg-transaction-mobile-small.png"
            alt="tx"
          />
        ) : notification.toggle ? (
          <NotificationMobile />
        ) : balanceMobileToggle ? (
          <WalletBalanceMobilePopup />
        ) : (
          <div className="relative flex h-[100%] w-[100%] flex-col">
            <div className="flex h-[13%] w-[100%] flex-row border-b-2 border-black font-baloo font-medium">
              <div
                className="flex h-[100%] w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#DCC2A8] focus:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(1)}
              >
                25%
              </div>
              <div
                className="flex h-[100%] w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#D5A774] focus:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(2)}
              >
                50%
              </div>
              <div
                className="flex h-[100%] w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#D19A5B] focus:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(3)}
              >
                75%
              </div>
              <div
                className="flex h-[100%] w-[25%] cursor-pointer items-center justify-center bg-[#CC8634] focus:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(4)}
              >
                MAX
              </div>
            </div>
            <div className="absolute left-[8%] top-[20%] flex flex-row items-center">
              <img
                className="h-8 w-8"
                src="/images/logo-honey.png"
                alt="coinlogo"
              />
              <h1 className="ml-2 font-baloo text-[8vw] font-medium xl:ml-3">
                HONEY
              </h1>
            </div>
            <div className="absolute left-[8%] top-[43%] h-[30%] w-[84%] border-2 border-black bg-white">
              <div className="relative h-[100%] w-[100%]">
                <input
                  className="absolute left-[5%] top-[18%] w-[90%] border-none bg-transparent font-baloo text-[8vw] font-medium focus:outline-none"
                  type="number"
                  id="number-input"
                  placeholder="0.00"
                  value={displayString}
                  onChange={(e) => handleChange(e.target.value)}
                />
              </div>
            </div>
            <span className="absolute bottom-[2%] right-[3%] font-baloo text-[4vw] font-semibold text-[#7F7F7F]">
              {activeToggle === "BORROW" ? "borrow limit" : "borrowed honey"}:{" "}
              {walletInfoLoading ? loadingElement() : handleBalance()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
