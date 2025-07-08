"use client";

import { formatAsString } from "@/app/_components/utils";

import { useGoldiswapMath } from "../../../hooks";
import { useStake } from "../../../providers";
import { Notification } from "../../stake";

export const StakeBox = () => {
  const {
    txConfirming,
    notification,
    handlePercentageButtons,
    displayString,
    activeToggle,
    handleChange,
    handleBalance,
    handleBalanceLabel,
    stakeInfo,
    stir,
    infoLoading,
    walletInfoLoading,
  } = useStake();

  const { floorPrice, marketPrice } = useGoldiswapMath();

  const loadingElement = () => {
    return <span className="loader-small ml-3"></span>;
  };

  const handleInfo = (num: number) => {
    if (infoLoading) {
      return loadingElement();
    } else if (num > 0) {
      return formatAsString(num);
    } else {
      return "-";
    }
  };

  return (
    <div className="absolute left-[10%] top-[18%] h-[36%] w-4/5 border-2 border-black bg-[#EEDCD2] md:left-[20%] md:top-[17%] md:w-3/5 lg:left-1/4 lg:top-[15%] lg:w-[50%] xl:top-[14%] 2xl:left-[28.125%] 2xl:w-[43.75%]">
      <div className="absolute left-0 top-3 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute right-0 top-3 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div
        className={`absolute inset-6 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}
      >
        {txConfirming ? (
          <img
            className="size-full"
            src="/images/bg-transaction.png"
            alt="tx"
          />
        ) : notification.toggle ? (
          <Notification />
        ) : (
          <div className="relative flex size-full flex-col">
            {activeToggle === "STIR" && (
              <span className="absolute bottom-[0.5%] left-[1%] z-50 font-baloo text-[2.5vw] font-semibold md:text-[1.75vw] lg:text-[1.25vw] xl:text-[0.9vw]">
                $honey cost to stir:{" "}
                {formatAsString(stir * (stakeInfo.fsl / stakeInfo.supply))}
              </span>
            )}
            <span className="absolute bottom-[0.5%] right-[1%] z-50 font-baloo text-[2.5vw] font-semibold md:text-[1.75vw] lg:text-[1.25vw] xl:text-[0.9vw]">
              staking apr:{" "}
              {handleInfo(
                0.4 *
                  ((marketPrice(
                    stakeInfo.fsl,
                    stakeInfo.psl,
                    stakeInfo.supply,
                  ) -
                    floorPrice(stakeInfo.fsl, stakeInfo.supply)) /
                    marketPrice(
                      stakeInfo.fsl,
                      stakeInfo.psl,
                      stakeInfo.supply,
                    )) *
                  100,
              )}
              %
            </span>
            <div className="absolute right-0 top-0 flex h-[15%] w-[50%] flex-row border-b-2 border-l-2 border-black font-baloo text-[2.5vw] font-semibold md:text-[2vw] lg:w-[42%] lg:text-[1.5vw] xl:text-[1.25vw] 2xl:w-[33.61%] 2xl:text-[1vw]">
              <div
                className="flex h-full w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#DCC2A8] hover:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(1)}
              >
                25%
              </div>
              <div
                className="flex h-full w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#D5A774] hover:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(2)}
              >
                50%
              </div>
              <div
                className="flex h-full w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#D19A5B] hover:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(3)}
              >
                75%
              </div>
              <div
                className="flex h-full w-[25%] cursor-pointer items-center justify-center bg-[#CC8634] hover:bg-[#F3AA8A]"
                onClick={() => handlePercentageButtons(4)}
              >
                MAX
              </div>
            </div>
            <div className="absolute left-[1%] top-[37%] flex flex-row items-center sm:left-[2%] xl:left-[3%]">
              <img
                className="size-6 md:size-8"
                src={`/images/logo-${activeToggle === "STAKE" || activeToggle === "UNSTAKE" ? "locks" : "porridge"}.png`}
                alt="coinlogo"
              />
              <h1 className="ml-1 font-baloo text-[3vw] font-semibold md:text-[2.4vw] lg:ml-3 lg:text-[1.4vw]">
                {activeToggle === "STAKE" || activeToggle === "UNSTAKE"
                  ? "LOCKS"
                  : "PRG"}
              </h1>
            </div>
            <div className="absolute left-[26%] top-[30%] h-[45%] w-3/5 border-2 border-black bg-white lg:left-[22%] lg:h-2/5 lg:w-[55.6%] tall:h-[35%] tall:lg:h-[32%]">
              <div className="relative size-full">
                <input
                  className="absolute left-[5%] top-[1%] w-[90%] border-none bg-transparent font-baloo text-[4.5vw] font-bold focus:outline-hidden md:text-[4vw] lg:text-[3.5vw] xl:text-[2.5vw] 2xl:text-[2vw] tall:top-[15%] tall:text-[5.5vw] tall:md:text-[4vw] tall:lg:text-[3.5vw] tall:xl:text-[2.5vw] tall:2xl:text-[2vw]"
                  type="number"
                  id="number-input"
                  placeholder="0.00"
                  value={displayString}
                  onChange={(e) => handleChange(e.target.value)}
                />
                <span className="absolute bottom-0 right-[3%] font-baloo text-[2vw] font-bold text-[#7F7F7F] md:text-[1.75vw] lg:text-[1.25vw] xl:text-[0.9vw] tall:text-[2.5vw] tall:md:text-[1.75vw] tall:lg:text-[1.25vw] tall:xl:text-[0.9vw]">
                  {handleBalanceLabel()}:{" "}
                  {walletInfoLoading ? loadingElement() : handleBalance()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
