import { useGoldilend } from "../../../providers";

export const LendTogglesMobile = () => {
  const { lendActiveToggle, changeLendActiveToggle } = useGoldilend();

  return (
    <div className="absolute left-[15.5%] top-[7.5%] flex h-[3.9%] w-[35vh] origin-top-left rotate-[90deg] flex-row border-b-2 border-l-2 border-r-2 border-black bg-[#D9C6BA] font-baloo text-[3vw]">
      <div
        className={`h-[100%] w-[25%] border-r-2 border-black ${lendActiveToggle === "CLAIM" ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} flex cursor-pointer items-center justify-center focus:bg-[#F3AA8A]`}
        onClick={() => changeLendActiveToggle("CLAIM")}
      >
        <span className="scale-[-1]">CLAIM</span>
      </div>
      <div
        className={`h-[100%] w-[25%] border-r-2 border-black ${lendActiveToggle === "WITHDRAW" ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} flex cursor-pointer items-center justify-center focus:bg-[#F3AA8A]`}
        onClick={() => changeLendActiveToggle("WITHDRAW")}
      >
        <span className="scale-[-1]">UNSTAKE</span>
      </div>
      <div
        className={`h-[100%] w-[25%] border-r-2 border-black ${lendActiveToggle === "DEPOSIT" ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} flex cursor-pointer items-center justify-center focus:bg-[#F3AA8A]`}
        onClick={() => changeLendActiveToggle("DEPOSIT")}
      >
        <span className="scale-[-1]">STAKE</span>
      </div>
      <div
        className={`h-[100%] w-[25%] border-r-2 border-black ${lendActiveToggle === "LOCK" ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} flex cursor-pointer items-center justify-center focus:bg-[#F3AA8A]`}
        onClick={() => changeLendActiveToggle("LOCK")}
      >
        <span className="scale-[-1]">LOCK</span>
      </div>
    </div>
  );
};
