"use client";

import { formatAsString } from "@/app/_components/utils";

import { useStake } from "../../../providers";
import {
  NotificationMobile,
  WalletBalanceMobilePopup,
} from "../../stakeMobile";

export const StakeBoxMobile = () => {
  const {
    txConfirming,
    notification,
    handlePercentageButtons,
    displayString,
    activeToggle,
    handleChange,
    handleBalance,
    handleBalanceLabel,
    balanceMobileToggle,
    stir,
    stakeInfo,
    walletInfoLoading,
  } = useStake();

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
        {txConfirming ? (
          <img
            className="size-full"
            src="/images/bg-transaction-mobile-small.png"
            alt="tx"
          />
        ) : notification.toggle ? (
          <NotificationMobile />
        ) : balanceMobileToggle ? (
          <WalletBalanceMobilePopup />
        ) : (
          <div className="relative flex size-full flex-col">
            <div className="flex h-[13%] w-full flex-row border-b-2 border-black font-baloo font-medium">
              <div
                className="flex h-full w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#DCC2A8] focus:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(1)}
              >
                25%
              </div>
              <div
                className="flex h-full w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#D5A774] focus:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(2)}
              >
                50%
              </div>
              <div
                className="flex h-full w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#D19A5B] focus:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(3)}
              >
                75%
              </div>
              <div
                className="flex h-full w-[25%] cursor-pointer items-center justify-center bg-[#CC8634] focus:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(4)}
              >
                MAX
              </div>
            </div>
            <div className="absolute left-[8%] top-[20%] flex flex-row items-center">
              <img
                className="size-8"
                src={`/images/logo-${activeToggle === "STAKE" || activeToggle === "UNSTAKE" ? "locks" : "porridge"}.png`}
                alt="coinlogo"
              />
              <h1 className="ml-2 font-baloo text-[8vw] font-medium xl:ml-3">
                {activeToggle === "STAKE" || activeToggle === "UNSTAKE"
                  ? "LOCKS"
                  : "PRG"}
              </h1>
            </div>
            <div className="absolute left-[8%] top-[43%] h-[30%] w-[84%] border-2 border-black bg-white">
              <div className="relative size-full">
                <input
                  className="absolute left-[5%] top-[18%] w-[90%] border-none bg-transparent font-baloo text-[8vw] font-medium focus:outline-hidden"
                  type="number"
                  id="number-input"
                  placeholder="0.00"
                  value={displayString}
                  onChange={(e) => handleChange(e.target.value)}
                />
              </div>
            </div>
            <span className="absolute bottom-[2%] right-[3%] font-baloo text-[4vw] font-bold text-[#7F7F7F]">
              {handleBalanceLabel()}:{" "}
              {walletInfoLoading ? loadingElement() : handleBalance()}
            </span>
            {activeToggle === "STIR" && (
              <span className="absolute bottom-[9%] right-[3%] z-50 font-baloo text-[4vw] font-semibold text-[#7F7F7F]">
                $honey cost to stir:{" "}
                {formatAsString(stir * (stakeInfo.fsl / stakeInfo.supply))}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
