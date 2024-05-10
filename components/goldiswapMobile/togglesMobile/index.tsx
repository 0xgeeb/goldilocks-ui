import { useGoldiswap } from "../../../providers"

export const TogglesMobile = () => {
  
  const {
    activeToggle,
    changeActiveToggle
  } = useGoldiswap()

  return (
    <div className="absolute flex flex-col items-center justify-around h-[26.5%] w-[7.5%] top-[33.5%] left-[84.5%] font-baloo text-[3vw]">
      <div
        className={`border-t-2 border-b-2 border-r-2 border-black w-[100%] h-[30%] ${activeToggle === 'REDEEM' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} hover:bg-[#F3AA8A] cursor-pointer`}
        onClick={() => changeActiveToggle('REDEEM')}
      >
        <span className="absolute -rotate-[90deg] bottom-[79%] right-[-25%]">REDEEM</span>
      </div>
      <div
        className={`border-t-2 border-b-2 border-r-2 border-black w-[100%] h-[30%] ${activeToggle === 'SELL' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} hover:bg-[#F3AA8A] cursor-pointer`}
        onClick={() => changeActiveToggle('SELL')}
      >
        <span className="absolute -rotate-[90deg] bottom-[46%] right-[11%]">SELL</span>
      </div>
      <div
        className={`border-t-2 border-b-2 border-r-2 border-black w-[100%] h-[30%] ${activeToggle === 'BUY' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} hover:bg-[#F3AA8A] cursor-pointer`}
        onClick={() => changeActiveToggle('BUY')}
      >
        <span className="absolute -rotate-[90deg] bottom-[11.5%] right-[11%]">BUY</span>
      </div>
    </div>
  )
}