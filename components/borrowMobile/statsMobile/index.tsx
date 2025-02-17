import { useBorrow } from "../../../providers";
import { useGoldiswapMath } from "../../../hooks";

export const StatsMobile = () => {
  const { borrowInfo, infoLoading } = useBorrow();

  const { floorPrice, marketPrice } = useGoldiswapMath();

  const formatAsPrice = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 5 });
  };

  const loadingElement = () => {
    return <span className="loader-small-mobile mx-1"></span>;
  };

  const formatAsString = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
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
    <div className="absolute left-[5%] top-[60%] flex w-[90%] flex-row items-center justify-center font-baloo text-[3.5vw] font-semibold text-[#D9C6BA]">
      <div className="flex flex-col items-end">
        <span>locks supply:</span>
        <span>current fsl:</span>
        <span>current psl:</span>
        <span>floor price:</span>
        <span>market price:</span>
        <span>target ratio:</span>
      </div>
      <div className="h-[100%] w-[7.5%]"></div>
      <div className="flex flex-col items-start">
        <span className={handleColors(borrowInfo.supply, borrowInfo.supply)}>
          {handleInfo(borrowInfo.supply)}
        </span>
        <span className={handleColors(borrowInfo.fsl, borrowInfo.fsl)}>
          {handleInfo(borrowInfo.fsl)}
        </span>
        <span className={handleColors(borrowInfo.psl, borrowInfo.psl)}>
          {handleInfo(borrowInfo.psl)}
        </span>
        <span
          className={handleColors(
            floorPrice(borrowInfo.fsl, borrowInfo.supply),
            floorPrice(borrowInfo.fsl, borrowInfo.supply),
          )}
        >
          ${handlePrice(floorPrice(borrowInfo.fsl, borrowInfo.supply))}
        </span>
        <span
          className={handleColors(
            marketPrice(borrowInfo.fsl, borrowInfo.psl, borrowInfo.supply),
            marketPrice(borrowInfo.fsl, borrowInfo.psl, borrowInfo.supply),
          )}
        >
          $
          {handlePrice(
            marketPrice(borrowInfo.fsl, borrowInfo.psl, borrowInfo.supply),
          )}
        </span>
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
  );
};
