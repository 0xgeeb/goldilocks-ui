import { useGoldilend } from "../../../providers"

export const LendTogglesMobile = () => {
  
  const {
    lendActiveToggle,
    changeLendActiveToggle
  } = useGoldilend()

  return (
    <div className="absolute h-[3.9%] w-[35vh] border-r-2 border-l-2 border-b-2 border-black origin-top-left top-[7.5%] left-[15.5%] rotate-[90deg] bg-[#D9C6BA] flex flex-row font-baloo text-[3vw]">
      <div
        className={`w-[25%] h-[100%] border-r-2 border-black ${lendActiveToggle === 'CLAIM' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} focus:bg-[#F3AA8A] cursor-pointer flex items-center justify-center`}
        onClick={() => changeLendActiveToggle('CLAIM')}
      >
        <span className="scale-[-1]">CLAIM</span>
      </div>
      <div
        className={`w-[25%] h-[100%] border-r-2 border-black ${lendActiveToggle === 'UNSTAKE' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} focus:bg-[#F3AA8A] cursor-pointer flex items-center justify-center`}
        onClick={() => changeLendActiveToggle('UNSTAKE')}
      >
        <span className="scale-[-1]">UNSTAKE</span>
      </div>
      <div
        className={`w-[25%] h-[100%] border-r-2 border-black ${lendActiveToggle === 'STAKE' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} focus:bg-[#F3AA8A] cursor-pointer flex items-center justify-center`}
        onClick={() => changeLendActiveToggle('STAKE')}
      >
        <span className="scale-[-1]">STAKE</span>
      </div>
      <div
        className={`w-[25%] h-[100%] border-r-2 border-black ${lendActiveToggle === 'LOCK' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} focus:bg-[#F3AA8A] cursor-pointer flex items-center justify-center`}
        onClick={() => changeLendActiveToggle('LOCK')}
      >
        <span className="scale-[-1]">LOCK</span>
      </div>
    </div>
  )
}