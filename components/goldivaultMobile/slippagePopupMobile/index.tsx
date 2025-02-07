import { useGoldivault } from "../../../providers"

export const SlippagePopupMobile = () => {

  const { slippage, changeSlippage, changeSlippageToggle } = useGoldivault()

  return (
    <div className="bg-[#B95500] border-2 border-black absolute top-[16%] right-[7%] w-[60%] h-[19.7%] z-50">
      <div className="h-[100%] w-[100%] relative flex flex-col items-center font-baloo font-semibold">
        <span className="text-white text-[4vw] mt-[8%]">Set Slippage:</span>
        <div className="relative bg-white w-[60%] h-[50%] border-2 border-black mt-[4%]">
          <input
            className="absolute text-[4vw] top-[2%] left-[10%] w-[100%] h-[50%] focus:outline-none bg-transparent"
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
              <span className="font-baloo text-[3vw]">DEFAULT</span>
            </div>
            <div
              className={`${slippage.amount == 0.5 ? "" : "bg-[#E7B941]"} h-[100%] w-[50%] flex items-center justify-center hover:bg-[#F3AA8A] cursor-pointer`}
              onClick={() => changeSlippage(0, '0')}
            >
              <span className="font-baloo text-[3vw]">CUSTOM</span>
            </div>
          </div>
          <span className="absolute text-[4vw] top-[10%] right-[10%]">%</span>
        </div>
        <p
          className="absolute top-0 right-[4%] font-baloo text-[5vw] cursor-pointer hover:scale-110"
          onClick={() => changeSlippageToggle(false)}
        >
          x
        </p>
      </div>
    </div>
  )
}