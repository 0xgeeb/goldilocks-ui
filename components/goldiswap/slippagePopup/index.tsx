import { useGoldiswap } from "../../../providers"

export const SlippagePopup = () => {

  const { slippage, changeSlippage, changeSlippageToggle } = useGoldiswap()

  return (
    <div className="bg-[#B95500] border-2 border-black absolute top-[25%] lg:top-[21.9%] left-[33%] lg:left-[45%] w-[37%] h-[22%] lg:w-[19%] lg:h-[22%] z-20">
      <div className="h-[100%] w-[100%] relative flex flex-col items-center font-baloo font-semibold">
        <span className="text-white text-[2vw] lg:text-[1.15vw] mt-[6%] lg:mt-[8%]">Set Slippage:</span>
        <div className="relative bg-white w-[60%] mt-[4%] lg:mt-0 h-[50%] border-2 border-black">
          <input
            className="absolute text-[2.3vw] lg:text-[1.4vw] top-[2%] left-[6%] lg:left-[10%] w-[100%] h-[50%] focus:outline-none bg-transparent"
            type="number"
            id="number-input"
            value={slippage.displayString}
            onChange={(e) => {
              if(!e.target.value) {
                changeSlippage(0, e.target.value)
              }
              else {
                changeSlippage(parseFloat(e.target.value), e.target.value)
              }
            }}
          />
          <div className="absolute bottom-0 w-[100%] h-[50%] bg-[#DCC2A8] border-t-2 border-black flex flex-row">
            <div
              className={`${slippage.amount == 0.5 ? "bg-[#E7B941]" : ""} h-[100%] w-[50%] flex items-center justify-center hover:bg-[#F3AA8A] cursor-pointer border-r-2 border-black`}
              onClick={() => changeSlippage(0.5, '0.5')}
            >
              <span className="font-baloo text-[1.5vw] lg:text-[0.8vw]">DEFAULT</span>
            </div>
            <div
              className={`${slippage.amount == 0.5 ? "" : "bg-[#E7B941]"} h-[100%] w-[50%] flex items-center justify-center hover:bg-[#F3AA8A] cursor-pointer`}
              onClick={() => changeSlippage(0, '0')}
            >
              <span className="font-baloo text-[1.5vw] lg:text-[0.8vw]">CUSTOM</span>
            </div>
          </div>
          <span className="absolute text-[2vw] lg:text-[1vw] top-[10%] right-[10%]">%</span>
        </div>
        <p
          className="absolute top-0 right-[3%] lg:right-[4%] font-baloo text-[2.5vw] lg:text-[1.5vw] cursor-pointer hover:scale-110"
          onClick={() => changeSlippageToggle(false)}
        >
          x
        </p>
      </div>
    </div>
  )
}