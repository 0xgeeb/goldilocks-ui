import { useStake } from "../../../providers"

export const TogglesMobile = () => {

  const {
    activeToggle,
    changeActiveToggle
  } = useStake()

  return (
    <div className="absolute h-[3.9%] w-[26.7vh] border-r-2 border-l-2 border-b-2 border-black origin-top-left top-[4.6%] left-[15.5%] rotate-[90deg] bg-[#D9C6BA] flex flex-row font-baloo text-[2.5vw]">
      <div
        className={`w-[25%] h-[100%] border-r-2 border-black ${activeToggle === 'CLAIM' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} focus:bg-[#F3AA8A] cursor-pointer flex items-center justify-center`}
        onClick={() => changeActiveToggle('CLAIM')}
      >
        <span className="scale-[-1]">CLAIM</span>
      </div>
      <div
        className={`w-[25%] h-[100%] border-r-2 border-black ${activeToggle === 'STIR' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} focus:bg-[#F3AA8A] cursor-pointer flex items-center justify-center`}
        onClick={() => changeActiveToggle('STIR')}
      >
        <span className="scale-[-1]">STIR</span>
      </div>
      <div
        className={`w-[25%] h-[100%] border-r-2 border-black ${activeToggle === 'UNSTAKE' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} focus:bg-[#F3AA8A] cursor-pointer flex items-center justify-center`}
        onClick={() => changeActiveToggle('UNSTAKE')}
      >
        <span className="scale-[-1]">UNSTAKE</span>
      </div>
      <div
        className={`w-[25%] h-[100%] border-r-2 border-black ${activeToggle === 'STAKE' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} focus:bg-[#F3AA8A] cursor-pointer flex items-center justify-center`}
        onClick={() => changeActiveToggle('STAKE')}
      >
        <span className="scale-[-1]">STAKE</span>
      </div>
    </div>
  )
}