import { formatAsString } from "@/app/_components/utils";

import { useGoldilend } from "../../../providers";

export const LendWalletBalanceMobilePopup = () => {
  const { goldilendWalletInfo, setBalanceMobileToggle } = useGoldilend();

  const formatAsClaimable = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 4 });
  };

  const handleInfo = (num: number): string => {
    if (num > 0) {
      return formatAsString(num);
    } else {
      return "-";
    }
  };

  const handleInfoClaimable = (num: number): string => {
    if (num > 0) {
      return formatAsClaimable(num);
    } else {
      return "-";
    }
  };

  return (
    <div className="relative flex size-full flex-col items-center bg-[#D5A774] px-[5%] pb-[2%] pt-[13%] font-baloo text-[4vw] font-semibold">
      <div className="flex size-full flex-col justify-around">
        <div className="flex w-full flex-row items-center justify-between">
          <span className="">ibgt balance:</span>
          <span className="">{handleInfo(goldilendWalletInfo.wbera)}</span>
        </div>
        <div className="w-full border-t-2 border-black"></div>
        <div className="flex w-full flex-row items-center justify-between">
          <span className="">gibgt balance:</span>
          <span className="">{handleInfo(goldilendWalletInfo.glwbera)}</span>
        </div>
        <div className="w-full border-t-2 border-black"></div>
        {/* <div className="flex w-full flex-row items-center justify-between">
          <span className="">staked gibgt:</span>
          <span className="">{handleInfo(goldilendWalletInfo.lendStaked)}</span>
        </div> */}
        <div className="w-full border-t-2 border-black"></div>
        <div className="w-full border-t-2 border-black"></div>
      </div>
      <p
        className="absolute right-[2%] top-[-2%] cursor-pointer font-baloo text-[6vw] focus:scale-125"
        onClick={() => setBalanceMobileToggle(false)}
      >
        x
      </p>
    </div>
  );
};
