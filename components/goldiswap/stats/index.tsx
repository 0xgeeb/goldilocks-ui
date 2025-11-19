import { formatAsString } from "@/app/_components/utils";

import { useGoldiswapMath } from "../../../hooks";
import { useGoldiswap } from "../../../providers";

export const Stats = () => {
  const { goldiswapInfo, simInfo, infoLoading } = useGoldiswap();

  const { floorPrice, marketPrice } = useGoldiswapMath();

  const loadingElement = () => {
    return <span className="loader-small ml-3 mt-2"></span>;
  };

  const formatAsPrice = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 5 });
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

  const handlePrice = (num: number) => {
    if (infoLoading) {
      return loadingElement();
    } else if (num > 0) {
      return formatAsPrice(num);
    } else {
      return "-";
    }
  };

  const handleColors = (num1: number, num2: number): string => {
    if (num1 > num2) {
      return "text-red-600";
    } else if (num1 == num2) {
      return "";
    } else {
      return "text-green-600";
    }
  };

  const handleFloorColors = (num1: number, num2: number): string => {
    if (Math.abs(num1 - num2) < 1e-10) {
      return "";
    } else {
      return "text-green-600";
    }
  };

  return (
    <div className="absolute left-[5%] top-[84%] flex w-[90%] flex-col items-center justify-between font-baloo text-[2.5vw] text-white md:left-[10%] md:top-[82%] md:w-4/5 md:text-[2vw] lg:text-[1.75vw] xl:left-[20%] xl:top-[80%] xl:w-3/5 xl:text-[1.5vw] 2xl:left-[27.5%] 2xl:w-[45%] 2xl:text-[1.1vw]">
      <div className="flex h-[50%] w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <span className="mr-2">locks supply:</span>
          <span className={handleColors(goldiswapInfo.supply, simInfo.supply)}>
            {simInfo.toggle
              ? handleInfo(simInfo.supply)
              : handleInfo(goldiswapInfo.supply)}
          </span>
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">current fsl:</span>
          <span className={handleColors(goldiswapInfo.fsl, simInfo.fsl)}>
            {simInfo.toggle
              ? handleInfo(simInfo.fsl)
              : handleInfo(goldiswapInfo.fsl)}
          </span>
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">current psl:</span>
          <span className={handleColors(goldiswapInfo.psl, simInfo.psl)}>
            {simInfo.toggle
              ? handleInfo(simInfo.psl)
              : handleInfo(goldiswapInfo.psl)}
          </span>
        </div>
      </div>
      <div className="flex h-[50%] w-full flex-row items-center justify-between tall:mt-[0.25%]">
        <div className="flex flex-row items-center">
          <span className="mr-2">floor price:</span>
          <span
            className={handleFloorColors(
              floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply),
              floorPrice(simInfo.fsl, simInfo.supply),
            )}
          >
            $
            {simInfo.toggle
              ? handlePrice(floorPrice(simInfo.fsl, simInfo.supply))
              : handlePrice(
                  floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply),
                )}
          </span>
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">PSL/FSL ratio:</span>
          <span
            className={handleColors(
              (goldiswapInfo.psl / goldiswapInfo.fsl) * 100,
              (goldiswapInfo.psl / goldiswapInfo.fsl) * 100,
            )}
          >
            {simInfo.toggle
              ? handlePrice(
                  (goldiswapInfo.psl / goldiswapInfo.fsl) * 100,
                )
              : handlePrice((goldiswapInfo.psl / goldiswapInfo.fsl) * 100)}%
          </span>
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">target ratio:</span>
          <span
            className={handleColors(
              goldiswapInfo.targetRatio,
              simInfo.targetRatio,
            )}
          >
            {simInfo.toggle
              ? handlePrice(simInfo.targetRatio * 100)
              : handlePrice(goldiswapInfo.targetRatio * 100)}
            %
          </span>
        </div>
      </div>
      <div className="flex h-[50%] w-full flex-row items-center justify-between tall:mt-[0.25%]">
        <div className="flex flex-row items-center">
          <span className="mr-2">porridge value:</span>
          <span
            className={handleColors(goldiswapInfo.prgValue, simInfo.prgValue)}
          >
            $
            {simInfo.toggle
              ? handlePrice(simInfo.prgValue)
              : handlePrice(goldiswapInfo.prgValue)}
          </span>
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">porridge supply:</span>
          <span>{handleInfo(goldiswapInfo.prgSupply)}</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">porridge market cap:</span>
          <span
            className={handleColors(
              goldiswapInfo.prgMarketCap,
              simInfo.prgValue * goldiswapInfo.prgSupply,
            )}
          >
            {simInfo.toggle
              ? handleInfo(
                  (simInfo.prgValue * goldiswapInfo.prgSupply) / 1000000,
                )
              : handleInfo(goldiswapInfo.prgMarketCap / 1000000)}
            m
          </span>
        </div>
      </div>
    </div>
  );
};