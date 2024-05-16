import { useGoldiswap } from "../../../providers"

export const Toggles = ()=> {

  const {
    activeToggle,
    changeActiveToggle,
    setRedeemPopupToggle
  } = useGoldiswap()

  return (
    <div className="absolute h-[6%] lg:h-[7.5%] w-[25%] left-[73%] lg:w-[20.27%] top-[2.62%] lg:left-[78.89%] flex flex-row items-center justify-between font-baloo font-semibold text-[1.5vw] lg:text-[1vw]">
      <div 
        className={`w-[30.27%] h-[100%] flex items-center justify-center border-2 border-black ${activeToggle === 'BUY' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} hover:bg-[#F3AA8A] cursor-pointer`}
        onClick={() => changeActiveToggle('BUY')}
      >
        <span>BUY</span>
      </div>
      <div 
        className={`w-[30.27%] h-[100%] flex items-center justify-center border-2 border-black ${activeToggle === 'SELL' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} hover:bg-[#F3AA8A] cursor-pointer`}
        onClick={() => changeActiveToggle('SELL')}
      >
        <span>SELL</span>
      </div>
      <div 
        className={`w-[30.27%] h-[100%] relative flex items-center justify-center border-2 border-black ${activeToggle === 'REDEEM' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} hover:bg-[#F3AA8A] cursor-pointer`}
        onClick={() => changeActiveToggle('REDEEM')}
      >
        <span>REDEEM</span>
        <span 
            className="absolute top-[2%] lg:top-[4%] right-[1%] lg:right-[2%] text-[0.8vw] lg:text-[0.7vw] rounded-full px-1 border-2 border-black hover:bg-black hover:text-white" 
            onClick={(e) => {
              e.stopPropagation()
              setRedeemPopupToggle(true)
            }}
          >
            ?
        </span>
      </div>
    </div>
  )
}