import { useStake } from "../../../providers";

export const Toggles = () => {
  const {
    activeToggle,
    changeActiveToggle,
    setStirPopupToggle,
    setUnstakePopupToggle,
  } = useStake();

  return (
    <div className="absolute right-[1%] top-[2.62%] flex h-[8%] w-[50%] flex-row items-center justify-between font-baloo text-[2vw] font-semibold lg:w-[40%] lg:text-[1.75vw] xl:h-[7.5%] xl:w-[26%] xl:text-[1.25vw] 2xl:text-[1vw]">
      <div
        className={`flex h-[100%] w-[23%] items-center justify-center border-2 border-black ${activeToggle === "STAKE" ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} cursor-pointer hover:bg-[#F3AA8A]`}
        onClick={() => changeActiveToggle("STAKE")}
      >
        <span>STAKE</span>
      </div>
      <div
        className={`relative flex h-[100%] w-[23%] items-center justify-center border-2 border-black ${activeToggle === "UNSTAKE" ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} cursor-pointer hover:bg-[#F3AA8A]`}
        onClick={() => changeActiveToggle("UNSTAKE")}
      >
        <span className="mt-1 xl:mt-2">UNSTAKE</span>
        <span
          className="absolute right-[1%] top-[2%] rounded-full border-2 border-black px-1 text-[1.5vw] hover:bg-black hover:text-white md:text-[1vw] lg:right-[2%] lg:text-[0.6vw] xl:top-[3%] tall:lg:text-[0.8vw]"
          onClick={(e) => {
            e.stopPropagation();
            setUnstakePopupToggle(true);
          }}
        >
          ?
        </span>
      </div>
      <div
        className={`relative flex h-[100%] w-[23%] items-center justify-center border-2 border-black ${activeToggle === "STIR" ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} cursor-pointer hover:bg-[#F3AA8A]`}
        onClick={() => changeActiveToggle("STIR")}
      >
        <span className="mt-1 xl:mt-2">STIR</span>
        <span
          className="absolute right-[1%] top-[2%] rounded-full border-2 border-black px-1 text-[1.5vw] hover:bg-black hover:text-white md:text-[1vw] lg:right-[2%] lg:text-[0.6vw] xl:top-[3%] tall:lg:text-[0.8vw]"
          onClick={(e) => {
            e.stopPropagation();
            setStirPopupToggle(true);
          }}
        >
          ?
        </span>
      </div>
      <div
        className={`flex h-[100%] w-[23%] items-center justify-center border-2 border-black ${activeToggle === "CLAIM" ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} cursor-pointer hover:bg-[#F3AA8A]`}
        onClick={() => changeActiveToggle("CLAIM")}
      >
        <span>CLAIM</span>
      </div>
    </div>
  );
};
