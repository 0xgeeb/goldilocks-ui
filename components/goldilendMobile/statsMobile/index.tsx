import { formatAsString } from "@/app/_components/utils";

import { useGoldilend } from "../../../providers";

export const StatsMobile = () => {
  const { infoLoading, goldilendInfo } = useGoldilend();

  const loadingElement = () => {
    return <span className="loader-small-mobile mx-1"></span>;
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
    <div className="absolute left-[5%] top-[60%] flex h-[12%] w-4/5 flex-row items-center justify-center font-baloo text-[3vw] font-semibold text-[#D9C6BA]">
      <div className="flex flex-col items-end">
        <span>total iBGT locked:</span>
        <span>total GiBGT staked:</span>
        <span>iBGT backing per GiBGT:</span>
      </div>
      <div className="h-full w-[5%]"></div>
      {/* <div className="flex flex-col items-start">
        <span>{handleInfo(goldilendInfo.poolSize)}</span>
        <span>{handleInfo(goldilendInfo.stakedglwbera)}</span>
        <span>
          {handleInfo(goldilendInfo.poolSize / goldilendInfo.glwberaSupply)}
        </span>
      </div> */}
    </div>
  );
};
