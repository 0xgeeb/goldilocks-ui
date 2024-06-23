import { useGoldiswap } from "../../../providers"

export const TogglesMobile = () => {
  
  const {
    activeToggle,
    changeActiveToggle
  } = useGoldiswap()

  return (
    <>
      <div
        className={`absolute w-[13%] tall:w-[15.34%] h-[3.9%] bottom-[58.4%] right-[15.5%] border-l-2 border-r-2 border-t-2 border-black origin-bottom-right rotate-[90deg] ${activeToggle === 'REDEEM' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} focus:bg-[#F3AA8A] cursor-pointer font-baloo text-[3vw] flex items-center justify-center`}
        onClick={() => changeActiveToggle('REDEEM')}
      >
        <span className="scale-[-1]">REDEEM</span>
      </div>
      <div
        className={`absolute w-[13%] tall:w-[15.34%] h-[3.9%] bottom-[49.4%] right-[15.5%] border-l-2 border-r-2 border-t-2 border-black origin-bottom-right rotate-[90deg] ${activeToggle === 'SELL' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} focus:bg-[#F3AA8A] cursor-pointer font-baloo text-[3vw] flex items-center justify-center`}
        onClick={() => changeActiveToggle('SELL')}
      >
        <span className="scale-[-1]">SELL</span>
      </div>
      <div
        className={`absolute w-[13%] tall:w-[15.34%] h-[3.9%] bottom-[40.4%] right-[15.5%] border-l-2 border-r-2 border-t-2 border-black origin-bottom-right rotate-[90deg] ${activeToggle === 'BUY' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} focus:bg-[#F3AA8A] cursor-pointer font-baloo text-[3vw] flex items-center justify-center`}
        onClick={() => changeActiveToggle('BUY')}
      >
        <span className="scale-[-1]">BUY</span>
      </div>
    </>
  )
}