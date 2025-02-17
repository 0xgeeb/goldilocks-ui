import { useGoldiswap } from "../../../providers";

export const TogglesMobile = () => {
  const { activeToggle, changeActiveToggle } = useGoldiswap();

  return (
    <>
      <div
        className={`absolute bottom-[58.4%] right-[15.5%] h-[3.9%] w-[13%] origin-bottom-right rotate-[90deg] border-l-2 border-r-2 border-t-2 border-black tall:w-[15.34%] ${activeToggle === "REDEEM" ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} flex cursor-pointer items-center justify-center font-baloo text-[3vw] focus:bg-[#F3AA8A]`}
        onClick={() => changeActiveToggle("REDEEM")}
      >
        <span className="scale-[-1]">REDEEM</span>
      </div>
      <div
        className={`absolute bottom-[49.4%] right-[15.5%] h-[3.9%] w-[13%] origin-bottom-right rotate-[90deg] border-l-2 border-r-2 border-t-2 border-black tall:w-[15.34%] ${activeToggle === "SELL" ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} flex cursor-pointer items-center justify-center font-baloo text-[3vw] focus:bg-[#F3AA8A]`}
        onClick={() => changeActiveToggle("SELL")}
      >
        <span className="scale-[-1]">SELL</span>
      </div>
      <div
        className={`absolute bottom-[40.4%] right-[15.5%] h-[3.9%] w-[13%] origin-bottom-right rotate-[90deg] border-l-2 border-r-2 border-t-2 border-black tall:w-[15.34%] ${activeToggle === "BUY" ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} flex cursor-pointer items-center justify-center font-baloo text-[3vw] focus:bg-[#F3AA8A]`}
        onClick={() => changeActiveToggle("BUY")}
      >
        <span className="scale-[-1]">BUY</span>
      </div>
    </>
  );
};
