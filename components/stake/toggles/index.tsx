import { useStake } from "../../../providers"

export const Toggles = () => {

  const {
    activeToggle,
    changeActiveToggle,
    setStirPopupToggle
  } = useStake()

  return (
    <div className="absolute h-[7.5%] w-[26.27%] top-[2.62%] left-[72.89%] flex flex-row items-center justify-between font-baloo font-semibold text-[1vw]">
      <div 
        className={`w-[22%] h-[100%] flex items-center justify-center border-2 border-black ${activeToggle === 'STAKE' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} hover:bg-[#F3AA8A] cursor-pointer`}
        onClick={() => changeActiveToggle('STAKE')}
      >
        <span>STAKE</span>
      </div>
      <div 
        className={`w-[22%] h-[100%] flex items-center justify-center border-2 border-black ${activeToggle === 'UNSTAKE' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} hover:bg-[#F3AA8A] cursor-pointer`}
        onClick={() => changeActiveToggle('UNSTAKE')}
      >
        <span>UNSTAKE</span>
      </div>
      <div 
        className={`w-[22%] h-[100%] relative flex items-center justify-center border-2 border-black ${activeToggle === 'STIR' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} hover:bg-[#F3AA8A] cursor-pointer`}
        onClick={() => changeActiveToggle('STIR')}
      >
        <span>STIR</span>
        <span 
            className="absolute top-[4%] right-[2%] text-[0.7vw] rounded-full px-1 border-2 border-black hover:bg-black hover:text-white" 
            onClick={(e) => {
              e.stopPropagation()
              setStirPopupToggle(true)
            }}
          >
            ?
        </span>
      </div>
      <div 
        className={`w-[22%] h-[100%] flex items-center justify-center border-2 border-black ${activeToggle === 'CLAIM' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} hover:bg-[#F3AA8A] cursor-pointer`}
        onClick={() => changeActiveToggle('CLAIM')}
      >
        <span>CLAIM</span>
      </div>
    </div>
  )
}