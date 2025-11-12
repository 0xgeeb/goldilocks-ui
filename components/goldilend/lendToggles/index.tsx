import { useGoldilend } from "../../../providers";

export const LendToggles = () => {
  const { lendActiveToggle, changeLendActiveToggle } = useGoldilend();

  return (
    <>
      <div
        className={`absolute h-[7%] w-[25%] xl:h-[8%] xl:w-[25%] ${lendActiveToggle === "LIQUIDATE" ? "left-[58%] xl:left-[43.5%]" : "left-[58%] xl:left-[40.5%]"} top-[3%] flex flex-row items-center justify-between`}
      >
        {/* <div
          className={`h-[100%] w-[22.5%] border-2 border-black font-baloo text-[2vw] font-semibold xl:text-[1vw] ${lendActiveToggle === "LOCK" ? "bg-[#E7B941]" : "bg-[#E2D6CF]"} flex cursor-pointer items-center justify-center hover:bg-[#C9E3B9]`}
          onClick={() => changeLendActiveToggle("LOCK")}
        >
          LOCK
        </div> */}
        <div
          className={`h-[100%] w-[50%] border-2 border-black font-baloo text-[2vw] font-semibold xl:text-[1vw] ${lendActiveToggle === "DEPOSIT" ? "bg-[#E7B941]" : "bg-[#E2D6CF]"} flex cursor-pointer items-center justify-center hover:bg-[#C9E3B9]`}
          onClick={() => changeLendActiveToggle("DEPOSIT")}
        >
          DEPOSIT
        </div>
        <div
          className={`h-[100%] w-[50%] border-2 border-black font-baloo text-[2vw] font-semibold xl:text-[1vw] ${lendActiveToggle === "WITHDRAW" ? "bg-[#E7B941]" : "bg-[#E2D6CF]"} flex cursor-pointer items-center justify-center hover:bg-[#C9E3B9]`}
          onClick={() => changeLendActiveToggle("WITHDRAW")}
        >
          WITHDRAW
        </div>
        {/* <div
          className={`h-[100%] w-[22.5%] border-2 border-black font-baloo text-[2vw] font-semibold xl:text-[1vw] ${lendActiveToggle === "CLAIM" ? "bg-[#E7B941]" : "bg-[#E2D6CF]"} flex cursor-pointer items-center justify-center hover:bg-[#C9E3B9]`}
          onClick={() => changeLendActiveToggle("CLAIM")}
        >
          CLAIM
        </div> */}
      </div>
      {/* <div
        className={`absolute right-[2%] top-[87%] h-[7%] w-[11%] border-2 border-black font-baloo text-[2vw] font-semibold xl:top-[3%] xl:h-[8%] xl:w-[9%] xl:text-[1vw] ${lendActiveToggle === "LIQUIDATE" ? "bg-[#E7B941]" : "bg-[#E2D6CF]"} flex cursor-pointer items-center justify-center hover:bg-[#C9E3B9]`}
        onClick={() => changeLendActiveToggle("LIQUIDATE")}
      >
        LIQUIDATE
      </div> */}
    </>
  );
};
