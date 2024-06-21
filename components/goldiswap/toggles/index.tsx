import { useGoldiswap } from "../../../providers"

export const Toggles = ()=> {

  const {
    activeToggle,
    changeActiveToggle,
    setRedeemPopupToggle
  } = useGoldiswap()

  return (
    <div className="absolute h-[8%] xl:h-[7.5%] w-[37.5%] lg:w-[27.5%] xl:w-[20.27%] top-[2.62%] right-[1%] flex flex-row items-center justify-between font-baloo font-semibold text-[2vw] lg:text-[1.75vw] xl:text-[1.25vw] 2xl:text-[1vw]">
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
        <span className="mt-1 xl:mt-2">REDEEM</span>
        <span 
            className="absolute top-[2%] xl:top-[3%] right-[1%] lg:right-[2%] text-[1.5vw] md:text-[1vw] lg:text-[0.8vw] rounded-full px-1 border-2 border-black hover:bg-black hover:text-white" 
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