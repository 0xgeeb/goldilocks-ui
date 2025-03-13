import { formatAsString } from "@/app/_components/utils";

import { useGoldilend } from "../../../providers";

export const Stats = () => {
  const { infoLoading, goldilendInfo } = useGoldilend();

  const loadingElement = () => {
    return <span className="loader-small ml-3 mt-2"></span>;
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
    <div className="absolute left-[5%] top-[80%] flex w-[90%] flex-row items-center justify-between font-baloo text-[2vw] text-white xl:left-[25.5%] xl:top-[83%] xl:w-[55%] xl:text-[1.1vw]">
      <div className="flex flex-row items-center">
        <span className="mr-2">total iBGT locked:</span>
        <span>{handleInfo(goldilendInfo.poolSize)}</span>
      </div>
      <div className="flex flex-row items-center">
        <span className="mr-2">total GiBGT staked:</span>
        <span>{handleInfo(goldilendInfo.stakedGibgt)}</span>
      </div>
      <div className="flex flex-row items-center">
        <span className="mr-2">iBGT backing per GiBGT:</span>
        <span>
          {handleInfo(goldilendInfo.poolSize / goldilendInfo.gibgtSupply)}
        </span>
      </div>
    </div>
  );
};
