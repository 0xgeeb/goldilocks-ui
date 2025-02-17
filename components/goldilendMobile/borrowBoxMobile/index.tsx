import { useGoldilend } from "../../../providers";
import { BorrowTabMobile, BoostTabMobile } from "../";

export const BorrowBoxMobile = () => {
  const { activeToggle, txConfirming } = useGoldilend();

  return (
    <div className="absolute left-[15.5%] top-[7.5%] z-20 h-[62.5%] w-[69%] border-2 border-black bg-[#EEDCD2] tall:h-[55%]">
      <div className="absolute left-0 top-3 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute right-0 top-3 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div
        className={`absolute inset-3 ${txConfirming ? "border-l-2 border-r-2 border-black" : "border-2 border-black"} bg-[#D9C6BA]`}
      >
        {activeToggle === "BORROW" ? <BorrowTabMobile /> : <BoostTabMobile />}
      </div>
    </div>
  );
};
