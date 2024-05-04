import { useGoldiswap } from "../../../providers"

export const SlippagePopup = () => {

  const { slippage, changeSlippage, changeSlippageToggle } = useGoldiswap()


  return (
    <div className="bg-[#B95500] border-2 border-black absolute top-[21.9%] left-[45%] w-[20%] h-[19%] z-20">
      <div className="h-[100%] w-[100%] relative flex flex-col items-center font-baloo font-semibold ">
        <span className="text-white mt-[8%] text-[1.15vw]">Set Slippage:</span>
        <input
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

      </div>
    </div>
  )
}