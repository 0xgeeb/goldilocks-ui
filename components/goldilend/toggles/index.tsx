import { useGoldilend } from "../../../providers"

export const Toggles = () => {

  const {
    activeToggle,
    changeActiveToggle,
    setBoostPopup
  } = useGoldilend()

  return (
    <div className="absolute w-[33%] xl:w-[20%] h-[8%] left-[62%] xl:left-[46%] top-[3%] flex flex-row items-center justify-between">
      <div
        className={`font-baloo font-semibold text-[2vw] xl:text-[1vw] h-[100%] w-[30%] border-2 border-black ${activeToggle === 'BORROW' ? "bg-[#E7B941]" : "bg-[#E2D6CF]"} flex items-center justify-center hover:bg-[#C9E3B9] cursor-pointer`}
        onClick={() => changeActiveToggle('BORROW')}
      >
        BORROW
      </div>
      <div
        className={`font-baloo font-semibold text-[2vw] xl:text-[1vw] h-[100%] w-[30%] border-2 border-black ${activeToggle === 'REPAY' ? "bg-[#E7B941]" : "bg-[#E2D6CF]"} flex items-center justify-center hover:bg-[#C9E3B9] cursor-pointer`}
        onClick={() => changeActiveToggle('REPAY')}
      >
        REPAY
      </div>
      <div
        className={`font-baloo font-semibold text-[2vw] xl:text-[1vw] h-[100%] w-[30%] border-2 border-black ${activeToggle === 'BOOST' ? "bg-[#E7B941]" : "bg-[#E2D6CF]"} flex items-center justify-center hover:bg-[#C9E3B9] cursor-pointer`}
        onClick={() => changeActiveToggle('BOOST')}
      >
        <span>BOOST</span>
        <span 
          className="absolute top-[4%] xl:top-[6%] right-[1%] lg:right-[1%] text-[1.5vw] md:text-[1vw] lg:text-[0.6vw] tall:lg:text-[0.8vw] rounded-full px-1 border-2 border-black hover:bg-black hover:text-white" 
          onClick={(e) => {
            e.stopPropagation()
            setBoostPopup(true)
          }}
        >
          ?
        </span>
      </div>
    </div>
  )
}