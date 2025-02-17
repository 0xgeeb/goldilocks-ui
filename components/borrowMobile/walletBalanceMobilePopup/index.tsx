import { useBorrow } from "../../../providers";

export const WalletBalanceMobilePopup = () => {
  const { borrowWalletInfo, setBalanceMobileToggle } = useBorrow();

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
    <div className="relative flex h-[100%] w-[100%] flex-col items-center bg-[#D5A774] px-[5%] pb-[2%] pt-[13%] font-baloo text-[2.8vw] font-semibold">
      <div className="flex h-[100%] w-[100%] flex-col justify-around">
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">locks balance:</span>
          <span className="">{handleInfo(borrowWalletInfo.locks)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">honey balance:</span>
          <span className="">{handleInfo(borrowWalletInfo.honey)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">porridge balance:</span>
          <span className="">{handleInfo(borrowWalletInfo.prg)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">staked locks:</span>
          <span className="">{handleInfo(borrowWalletInfo.staked)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">locked locks:</span>
          <span className="">{handleInfo(borrowWalletInfo.locked)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">borrowed honey:</span>
          <span className="">{handleInfo(borrowWalletInfo.borrowed)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">claimable porridge:</span>
          <span className="">
            {handleInfoClaimable(borrowWalletInfo.claimable)}
          </span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
      </div>
      <p
        className="absolute right-[2%] top-[-2%] cursor-pointer font-baloo text-[7vw] focus:scale-125"
        onClick={() => setBalanceMobileToggle(false)}
      >
        x
      </p>
    </div>
  );
};
