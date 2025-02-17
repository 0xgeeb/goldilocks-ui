import { useGoldilend } from "../../../providers";
import { BorrowTab, RepayTab, BoostTab } from "../";

export const BorrowBox = () => {
  const { activeToggle, txConfirming } = useGoldilend();

  return (
    <div className="absolute left-[5%] top-[16%] h-[75%] w-[90%] border-2 border-black bg-[#EEDCD2] xl:left-[30%] xl:top-[14%] xl:h-[75%] xl:w-[52%]">
      <div className="absolute left-0 top-4 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 left-0 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute right-0 top-4 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 right-0 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div
        className={`absolute inset-8 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}
      >
        {activeToggle === "BORROW" ? (
          <BorrowTab />
        ) : activeToggle === "REPAY" ? (
          <RepayTab />
        ) : (
          <BoostTab />
        )}
      </div>
    </div>
  );
};
