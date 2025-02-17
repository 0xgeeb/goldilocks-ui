import { useGoldivault } from "../../../providers";

export const Toggles = () => {
  const { activeToggle, changeActiveToggle } = useGoldivault();

  return (
    <>
      {/* <div
        className={`absolute right-[1%] top-[1%] lg:top-[8%] z-40 flex h-[6%] w-[12.5%] cursor-pointer items-center justify-center border-2 border-[#FFCD00] ${activeToggle === "ADDLIQ" ? "bg-[#033E5E]" : "bg-[#995816]"} text-[#FFCD00] hover:border-2 hover:border-black hover:bg-[#FFCD00] hover:text-black lg:right-[18%] lg:top-[6%] lg:h-[7%] lg:w-[7.5%] font-amaticbold text-[2.5vw] font-medium lg:text-[1.5vw]`}
        onClick={() => changeActiveToggle("ADDLIQ")}
      >
        <span>ADD LIQ</span>
      </div>
      <div
        className={`absolute right-[1%] top-[8%] lg:top-[8%] z-40 flex h-[6%] w-[12.5%] cursor-pointer items-center justify-center border-2 border-[#FFCD00] ${activeToggle === "REMOVELIQ" ? "bg-[#033E5E]" : "bg-[#995816]"} text-[#FFCD00] hover:border-2 hover:border-black hover:bg-[#FFCD00] hover:text-black lg:right-[9%] lg:top-[6%] lg:h-[7%] lg:w-[7.5%] font-amaticbold text-[2.5vw] font-medium lg:text-[1.5vw]`}
        onClick={() => changeActiveToggle("REMOVELIQ")}
      >
        <span>REMOVE LIQ</span>
      </div> */}
      <div className="absolute left-[89%] top-[68%] h-[15%] w-[10%] lg:left-[71%] lg:top-[72.5%] lg:h-[8%] lg:w-[20%]">
        <div className="relative flex h-[100%] w-[100%] flex-col items-center justify-start lg:flex-row lg:justify-center">
          <div
            className={`mb-[12.5%] mr-[0%] h-[30%] w-[100%] border-2 border-[#FFCD00] lg:mb-[0%] lg:mr-[2.5%] lg:h-[100%] lg:w-[30%] ${activeToggle === "DEPOSIT" ? "bg-[#033E5E]" : "bg-[#995816]"} flex cursor-pointer items-center justify-center font-amaticbold text-[2.5vw] font-medium text-[#FFCD00] hover:border-black hover:bg-[#FFCD00] hover:text-black lg:text-[1.5vw]`}
            onClick={() => changeActiveToggle("DEPOSIT")}
          >
            DEPOSIT
          </div>
          <div
            className={`ml-[0%] h-[30%] w-[100%] border-2 border-[#FFCD00] lg:ml-[2.5%] lg:h-[100%] lg:w-[30%] ${activeToggle === "REDEEMOT" ? "bg-[#033E5E]" : "bg-[#995816]"} flex cursor-pointer items-center justify-center font-amaticbold text-[2.5vw] font-medium text-[#FFCD00] hover:border-black hover:bg-[#FFCD00] hover:text-black lg:text-[1.5vw]`}
            onClick={() => changeActiveToggle("REDEEMOT")}
          >
            REDEEM OT
          </div>
        </div>
      </div>
      <div className="absolute left-[89%] top-[80%] h-[15%] w-[10%] lg:left-[71%] lg:top-[82.5%] lg:h-[8%] lg:w-[20%]">
        <div className="relative flex h-[100%] w-[100%] flex-col items-center justify-start lg:flex-row lg:justify-center">
          <div
            className={`mb-[12.5%] mr-[0%] h-[30%] w-[100%] border-2 border-[#FFCD00] lg:mb-[0%] lg:mr-[2.5%] lg:h-[100%] lg:w-[30%] ${activeToggle === "TRADEOT" ? "bg-[#033E5E]" : "bg-[#995816]"} flex cursor-pointer items-center justify-center font-amaticbold text-[2.5vw] font-medium text-[#FFCD00] hover:border-black hover:bg-[#FFCD00] hover:text-black lg:text-[1.5vw]`}
            onClick={() => changeActiveToggle("TRADEOT")}
          >
            TRADE OT
          </div>
          <div
            className={`ml-[0%] h-[30%] w-[100%] border-2 border-[#FFCD00] lg:ml-[2.5%] lg:h-[100%] lg:w-[30%] ${activeToggle === "TRADEYT" ? "bg-[#033E5E]" : "bg-[#995816]"} flex cursor-pointer items-center justify-center font-amaticbold text-[2.5vw] font-medium text-[#FFCD00] hover:border-black hover:bg-[#FFCD00] hover:text-black lg:text-[1.5vw]`}
            onClick={() => changeActiveToggle("TRADEYT")}
          >
            TRADE YT
          </div>
        </div>
      </div>
    </>
  );
};
