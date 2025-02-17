import { useGoldiswap } from "../../../providers";

export const WalletBalanceMobilePopup = () => {
  const { goldiswapWalletInfo, setBalanceMobileToggle } = useGoldiswap();

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
    <div className="relative flex h-[100%] w-[100%] flex-col items-center bg-[#D5A774] px-[8%] font-baloo text-[2.7vw] font-semibold">
      <h1 className="mb-[2%] ml-[5%] mt-[12%] font-amaticbold text-[10vw]">
        THIS IS WALLET BALANCE
      </h1>
      <div className="flex h-[58%] w-[100%] flex-col justify-around">
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">locks balance:</span>
          <span className="">{handleInfo(goldiswapWalletInfo.locks)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">honey balance:</span>
          <span className="">{handleInfo(goldiswapWalletInfo.honey)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">porridge balance:</span>
          <span className="">{handleInfo(goldiswapWalletInfo.prg)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">staked locks:</span>
          <span className="">{handleInfo(goldiswapWalletInfo.staked)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">locked locks:</span>
          <span className="">{handleInfo(goldiswapWalletInfo.locked)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">borrowed honey:</span>
          <span className="">{handleInfo(goldiswapWalletInfo.borrowed)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
        <div className="flex w-[100%] flex-row items-center justify-between">
          <span className="">claimable porridge:</span>
          <span className="">
            {handleInfoClaimable(goldiswapWalletInfo.claimable)}
          </span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
      </div>
      <p
        className="absolute right-[3%] top-[-1%] cursor-pointer font-baloo text-[7vw] focus:scale-125"
        onClick={() => setBalanceMobileToggle(false)}
      >
        x
      </p>
    </div>
  );
};
