import { formatAsString } from "@/app/_components/utils";

import { useGoldiswapMath } from "../../../hooks";
import { useBorrow } from "../../../providers";

export const Stats = () => {
  const { borrowInfo, infoLoading } = useBorrow();

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

  return (
    <div className="absolute left-[5%] top-[84%] flex w-[90%] flex-col items-center justify-between font-baloo text-[2.5vw] text-white md:left-[15%] md:top-[82%] md:w-[70%] md:text-[2vw] lg:text-[1.75vw] xl:left-[20%] xl:top-[80%] xl:w-3/5 xl:text-[1.5vw] 2xl:left-[27.5%] 2xl:w-[45%] 2xl:text-[1.1vw]">
      <div className="flex h-[50%] w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <span className="mr-2">locks supply:</span>
          <span className={handleColors(borrowInfo.supply, borrowInfo.supply)}>
            {handleInfo(borrowInfo.supply)}
          </span>
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">current fsl:</span>
          <span className={handleColors(borrowInfo.fsl, borrowInfo.fsl)}>
            {handleInfo(borrowInfo.fsl)}
          </span>
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">current psl:</span>
          <span className={handleColors(borrowInfo.psl, borrowInfo.psl)}>
            {handleInfo(borrowInfo.psl)}
          </span>
        </div>
      </div>
      <div className="flex h-[50%] w-full flex-row items-center justify-between tall:mt-[1%]">
        <div className="flex flex-row items-center">
          <span className="mr-2">floor price:</span>
          <span
            className={handleColors(
              floorPrice(borrowInfo.fsl, borrowInfo.supply),
              floorPrice(borrowInfo.fsl, borrowInfo.supply),
            )}
          >
            ${handlePrice(floorPrice(borrowInfo.fsl, borrowInfo.supply))}
          </span>
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">PSL/FSL ratio:</span>
          <span
            className={handleColors(
              (borrowInfo.psl / borrowInfo.fsl) * 100,
              (borrowInfo.psl / borrowInfo.fsl) * 100,
            )}
          >
            {handlePrice(
              (borrowInfo.psl / borrowInfo.fsl) * 100,
            )}
          </span>
          %
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">target ratio:</span>
          <span
            className={handleColors(
              borrowInfo.targetRatio,
              borrowInfo.targetRatio,
            )}
          >
            {handlePrice(borrowInfo.targetRatio * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};
