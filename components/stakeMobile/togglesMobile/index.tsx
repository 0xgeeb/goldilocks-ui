import { useStake } from "../../../providers"

export const TogglesMobile = () => {

  const {
    activeToggle,
    changeActiveToggle
  } = useStake()

  return (
    <>
      <div
        className={`absolute w-[13.9%] h-[3.9%] top-[8.1%] left-[15.7%] border-l-2 border-r-2 border-t-2 border-black origin-bottom-left -rotate-[90deg] ${activeToggle === 'CLAIM' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} focus:bg-[#F3AA8A] cursor-pointer font-baloo text-[2.8vw] flex items-center justify-center`}
        onClick={() => changeActiveToggle('CLAIM')}
      >
        CLAIM
      </div>
      <div
        className={`absolute w-[13.9%] h-[3.9%] top-[15.56%] left-[15.7%] border-l-2 border-t-2 border-black origin-bottom-left -rotate-[90deg] ${activeToggle === 'STIR' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} focus:bg-[#F3AA8A] cursor-pointer font-baloo text-[2.8vw] flex items-center justify-center`}
        onClick={() => changeActiveToggle('STIR')}
      >
        STIR
      </div>
      <div
        className={`absolute w-[13.9%] h-[3.9%] top-[22.96%] left-[15.7%] border-l-2 border-t-2 border-black origin-bottom-left -rotate-[90deg] ${activeToggle === 'UNSTAKE' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} focus:bg-[#F3AA8A] cursor-pointer font-baloo text-[2.8vw] flex items-center justify-center`}
        onClick={() => changeActiveToggle('UNSTAKE')}
      >
        UNSTAKE
      </div>
      <div
        className={`absolute w-[13.9%] h-[3.9%] top-[30.36%] left-[15.7%] border-l-2 border-t-2 border-black origin-bottom-left -rotate-[90deg] ${activeToggle === 'STAKE' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} focus:bg-[#F3AA8A] cursor-pointer font-baloo text-[2.8vw] flex items-center justify-center`}
        onClick={() => changeActiveToggle('STAKE')}
      >
        STAKE
      </div>
    </>
  )
}