import { useBorrow } from "../../../providers";

export const Toggles = () => {
  const { activeToggle, changeActiveToggle, setBorrowPopupToggle } =
    useBorrow();

  return (
    <div className="absolute right-[1%] top-[2.62%] flex h-[8%] w-[30%] flex-row items-center justify-between font-baloo text-[2vw] font-semibold lg:w-[25%] lg:text-[1.75vw] xl:h-[7.5%] xl:w-[16.27%] xl:text-[1.25vw] 2xl:text-[1vw]">
      <div
        className={`relative flex h-[100%] w-[45%] items-center justify-center border-2 border-black bg-[#D9C6BA] ${activeToggle === "BORROW" ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} cursor-pointer hover:bg-[#F3AA8A]`}
        onClick={() => changeActiveToggle("BORROW")}
      >
        <span className="mt-1 xl:mt-2">BORROW</span>
        <span
          className="absolute right-[1%] top-[2%] rounded-full border-2 border-black px-1 text-[1.5vw] hover:bg-black hover:text-white md:text-[1vw] lg:right-[2%] lg:text-[0.6vw] xl:top-[3%] tall:lg:text-[0.8vw]"
          onClick={(e) => {
            e.stopPropagation();
            setBorrowPopupToggle(true);
          }}
        >
          ?
        </span>
      </div>
      <div
        className={`flex h-[100%] w-[45%] items-center justify-center border-2 border-black bg-[#D9C6BA] ${activeToggle === "REPAY" ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} cursor-pointer hover:bg-[#F3AA8A]`}
        onClick={() => changeActiveToggle("REPAY")}
      >
        <span>REPAY</span>
      </div>
    </div>
  );
};
