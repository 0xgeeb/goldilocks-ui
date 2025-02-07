import { useGoldivault } from "../../../providers"

export const Toggles = () => {

  const {
    activeToggle,
    changeActiveToggle
  } = useGoldivault()

  return (
    <>
      <div className="absolute top-[68%] lg:top-[72.5%] h-[15%] lg:h-[8%] left-[89%] lg:left-[71%] w-[10%] lg:w-[20%]">
        <div className="relative w-[100%] h-[100%] flex flex-col lg:flex-row items-center justify-start lg:justify-center">
          <div
            className={`mr-[0%] lg:mr-[2.5%] mb-[12.5%] lg:mb-[0%] h-[30%] lg:h-[100%] w-[100%] lg:w-[30%] border-2 border-[#FFCD00] ${activeToggle === 'DEPOSIT' ? "bg-[#033E5E]" : "bg-[#995816]"} hover:border-black hover:text-black hover:bg-[#FFCD00] flex justify-center items-center text-[#FFCD00] font-amaticbold font-medium text-[2.5vw] lg:text-[1.5vw] cursor-pointer`}
            onClick={() => changeActiveToggle('DEPOSIT')}
          >
            DEPOSIT
          </div>
          <div
            className={`ml-[0%] lg:ml-[2.5%] h-[30%] lg:h-[100%] w-[100%] lg:w-[30%] border-2 border-[#FFCD00] ${activeToggle === 'REDEEMOT' ? "bg-[#033E5E]" : "bg-[#995816]"} hover:border-black hover:text-black hover:bg-[#FFCD00] flex justify-center items-center text-[#FFCD00] font-amaticbold font-medium text-[2.5vw] lg:text-[1.5vw] cursor-pointer`}
            onClick={() => changeActiveToggle('REDEEMOT')}
          >
            REDEEM OT
          </div> 
        </div>
      </div>
      <div className="absolute top-[80%] lg:top-[82.5%] h-[15%] lg:h-[8%] left-[89%] lg:left-[71%] w-[10%] lg:w-[20%]">
        <div className="relative w-[100%] h-[100%] flex flex-col lg:flex-row items-center justify-start lg:justify-center">
          <div
            className={`mr-[0%] lg:mr-[2.5%] mb-[12.5%] lg:mb-[0%] h-[30%] lg:h-[100%] w-[100%] lg:w-[30%] border-2 border-[#FFCD00] ${activeToggle === 'TRADEOT' ? "bg-[#033E5E]" : "bg-[#995816]"} hover:border-black hover:text-black hover:bg-[#FFCD00] flex justify-center items-center text-[#FFCD00] font-amaticbold font-medium text-[2.5vw] lg:text-[1.5vw] cursor-pointer`}
            onClick={() => changeActiveToggle('TRADEOT')}
          >
            TRADE OT
          </div>
          <div
            className={`ml-[0%] lg:ml-[2.5%] h-[30%] lg:h-[100%] w-[100%] lg:w-[30%] border-2 border-[#FFCD00] ${activeToggle === 'TRADEYT' ? "bg-[#033E5E]" : "bg-[#995816]"} hover:border-black hover:text-black hover:bg-[#FFCD00] flex justify-center items-center text-[#FFCD00] font-amaticbold font-medium text-[2.5vw] lg:text-[1.5vw] cursor-pointer`}
            onClick={() => changeActiveToggle('TRADEYT')}
          >
            TRADE YT
          </div>
        </div>
      </div>
    </>
  )
}