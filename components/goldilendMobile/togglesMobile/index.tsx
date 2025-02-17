import { useGoldilend } from "../../../providers";

export const TogglesMobile = () => {
  const { activeToggle, changeActiveToggle } = useGoldilend();

  return (
    <div className="absolute left-[15.5%] top-[7.5%] flex h-[3.9%] w-[35vh] origin-top-left rotate-[90deg] flex-row border-b-2 border-l-2 border-r-2 border-black bg-[#D9C6BA] font-baloo text-[3vw]">
      <div
        className={`h-[100%] w-[33.33%] border-r-2 border-black ${activeToggle === "BOOST" ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} flex cursor-pointer items-center justify-center focus:bg-[#F3AA8A]`}
        onClick={() => changeActiveToggle("BOOST")}
      >
        <span className="scale-[-1]">BOOST</span>
      </div>
      <div
        className={`h-[100%] w-[33.33%] border-r-2 border-black ${activeToggle === "REPAY" ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} flex cursor-pointer items-center justify-center focus:bg-[#F3AA8A]`}
        onClick={() => changeActiveToggle("REPAY")}
      >
        <span className="scale-[-1]">REPAY</span>
      </div>
      <div
        className={`h-[100%] w-[33.33%] ${activeToggle === "BORROW" ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} flex cursor-pointer items-center justify-center focus:bg-[#F3AA8A]`}
        onClick={() => changeActiveToggle("BORROW")}
      >
        <span className="scale-[-1]">BORROW</span>
      </div>
    </div>
  );
};
