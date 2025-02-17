import { useStake } from "../../../providers";

export const TogglesMobile = () => {
  const { activeToggle, changeActiveToggle } = useStake();

  return (
    <div className="absolute left-[15.5%] top-[7.5%] flex h-[3.9%] w-[35vh] origin-top-left rotate-[90deg] flex-row border-b-2 border-l-2 border-r-2 border-black bg-[#D9C6BA] font-baloo text-[3vw]">
      <div
        className={`h-[100%] w-[25%] border-r-2 border-black ${activeToggle === "CLAIM" ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} flex cursor-pointer items-center justify-center focus:bg-[#F3AA8A]`}
        onClick={() => changeActiveToggle("CLAIM")}
      >
        <span className="scale-[-1]">CLAIM</span>
      </div>
      <div
        className={`h-[100%] w-[25%] border-r-2 border-black ${activeToggle === "STIR" ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} flex cursor-pointer items-center justify-center focus:bg-[#F3AA8A]`}
        onClick={() => changeActiveToggle("STIR")}
      >
        <span className="scale-[-1]">STIR</span>
      </div>
      <div
        className={`h-[100%] w-[25%] border-r-2 border-black ${activeToggle === "UNSTAKE" ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} flex cursor-pointer items-center justify-center focus:bg-[#F3AA8A]`}
        onClick={() => changeActiveToggle("UNSTAKE")}
      >
        <span className="scale-[-1]">UNSTAKE</span>
      </div>
      <div
        className={`h-[100%] w-[25%] border-r-2 border-black ${activeToggle === "STAKE" ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} flex cursor-pointer items-center justify-center focus:bg-[#F3AA8A]`}
        onClick={() => changeActiveToggle("STAKE")}
      >
        <span className="scale-[-1]">STAKE</span>
      </div>
    </div>
  );
};
