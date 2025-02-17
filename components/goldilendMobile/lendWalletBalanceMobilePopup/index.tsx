import { useGoldilend } from "../../../providers";

export const LendWalletBalanceMobilePopup = () => {
  const { goldilendWalletInfo, setBalanceMobileToggle } = useGoldilend();

  const formatAsString = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

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
    <div className="relative flex h-[100%] w-[100%] flex-col items-center bg-[#D5A774] px-[5%] pb-[2%] pt-[13%] font-baloo text-[4vw] font-semibold">
      <div className="flex h-[100%] w-[100%] flex-col justify-around">
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">ibgt balance:</span>
          <span className="">{handleInfo(goldilendWalletInfo.ibgt)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">gibgt balance:</span>
          <span className="">{handleInfo(goldilendWalletInfo.gibgt)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">staked gibgt:</span>
          <span className="">{handleInfo(goldilendWalletInfo.lendStaked)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">claimable prg:</span>
          <span className="">
            {handleInfoClaimable(goldilendWalletInfo.lendClaimable)}
          </span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
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
