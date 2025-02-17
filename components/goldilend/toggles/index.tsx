import { useGoldilend } from "../../../providers";

export const Toggles = () => {
  const { activeToggle, changeActiveToggle, setBoostPopup } = useGoldilend();

  return (
    <div className="absolute left-[62%] top-[3%] flex h-[8%] w-[33%] flex-row items-center justify-between xl:left-[46%] xl:w-[20%]">
      <div
        className={`h-[100%] w-[30%] border-2 border-black font-baloo text-[2vw] font-semibold xl:text-[1vw] ${activeToggle === "BORROW" ? "bg-[#E7B941]" : "bg-[#E2D6CF]"} flex cursor-pointer items-center justify-center hover:bg-[#C9E3B9]`}
        onClick={() => changeActiveToggle("BORROW")}
      >
        BORROW
      </div>
      <div
        className={`h-[100%] w-[30%] border-2 border-black font-baloo text-[2vw] font-semibold xl:text-[1vw] ${activeToggle === "REPAY" ? "bg-[#E7B941]" : "bg-[#E2D6CF]"} flex cursor-pointer items-center justify-center hover:bg-[#C9E3B9]`}
        onClick={() => changeActiveToggle("REPAY")}
      >
        REPAY
      </div>
      <div
        className={`h-[100%] w-[30%] border-2 border-black font-baloo text-[2vw] font-semibold xl:text-[1vw] ${activeToggle === "BOOST" ? "bg-[#E7B941]" : "bg-[#E2D6CF]"} flex cursor-pointer items-center justify-center hover:bg-[#C9E3B9]`}
        onClick={() => changeActiveToggle("BOOST")}
      >
        <span>BOOST</span>
        <span
          className="absolute right-[1%] top-[4%] rounded-full border-2 border-black px-1 text-[1.5vw] hover:bg-black hover:text-white md:text-[1vw] lg:right-[1%] lg:text-[0.6vw] xl:top-[6%] tall:lg:text-[0.8vw]"
          onClick={(e) => {
            e.stopPropagation();
            setBoostPopup(true);
          }}
        >
          ?
        </span>
      </div>
    </div>
  );
};
