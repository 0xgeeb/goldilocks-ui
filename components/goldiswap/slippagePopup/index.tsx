import { useGoldiswap } from "../../../providers"

export const SlippagePopup = () => {

  const { slippage, changeSlippage, changeSlippageToggle } = useGoldiswap()

  return (
    <div className="bg-[#B95500] border-2 border-black absolute top-[18%] 2xl:top-[18%] left-[30%] xl:left-[38%] 2xl:left-[45%] w-[40%] xl:w-[24%] 2xl:w-[19%] h-[22%] z-50">
      <div className="h-[100%] w-[100%] py-[5%] relative flex flex-col items-center justify-between font-baloo font-semibold">
        <span className="text-white text-[3.5vw] md:text-[2.5vw] xl:text-[1.75vw] 2xl:text-[1.25vw]">Set Slippage:</span>
        <div className="relative bg-white w-[70%] md:w-[60%] h-[60%] border-2 border-black">
          <input
            className="absolute text-[3vw] xl:text-[2.2vw] 2xl:text-[1.4vw] top-[2%] left-[6%] 2xl:left-[10%] w-[100%] h-[50%] focus:outline-none bg-transparent"
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
              <span className="font-baloo text-[2vw] md:text-[1.75vw] xl:text-[1.25vw] 2xl:text-[0.8vw]">DEFAULT</span>
            </div>
            <div
              className={`${slippage.amount == 0.5 ? "" : "bg-[#E7B941]"} h-[100%] w-[50%] flex items-center justify-center hover:bg-[#F3AA8A] cursor-pointer`}
              onClick={() => changeSlippage(0, '0')}
            >
              <span className="font-baloo text-[2vw] md:text-[1.75vw] xl:text-[1.25vw] 2xl:text-[0.8vw]">CUSTOM</span>
            </div>
          </div>
          <span className="absolute text-[3vw] md:text-[2.5vw] xl:text-[1.75vw] 2xl:text-[1.25vw] top-[10%] right-[10%]">%</span>
        </div>
        <p
          className="absolute top-0 right-[3%] 2xl:right-[4%] font-baloo text-[3vw] md:text-[2.5vw] 2xl:text-[1.5vw] cursor-pointer hover:scale-110"
          onClick={() => changeSlippageToggle(false)}
        >
          x
        </p>
      </div>
    </div>
  )
}