import { useGoldilend } from "../../../providers"

export const Toggles = () => {

  const {
    activeToggle,
    changeActiveToggle
  } = useGoldilend()

  return (
    <div className="absolute w-[20%] h-[8%] left-[46%] top-[3%] flex flex-row items-center justify-between">
      <div
        className={`font-baloo font-semibold text-[1vw] h-[100%] w-[30%] border-2 border-black ${activeToggle === 'BORROW' ? "bg-[#E7B941]" : "bg-[#E2D6CF]"} flex items-center justify-center hover:bg-[#C9E3B9] cursor-pointer`}
        onClick={() => changeActiveToggle('BORROW')}
      >
        BORROW
      </div>
      <div
        className={`font-baloo font-semibold text-[1vw] h-[100%] w-[30%] border-2 border-black ${activeToggle === 'REPAY' ? "bg-[#E7B941]" : "bg-[#E2D6CF]"} flex items-center justify-center hover:bg-[#C9E3B9] cursor-pointer`}
        onClick={() => changeActiveToggle('REPAY')}
      >
        REPAY
      </div>
      <div
        className={`font-baloo font-semibold text-[1vw] h-[100%] w-[30%] border-2 border-black ${activeToggle === 'BOOST' ? "bg-[#E7B941]" : "bg-[#E2D6CF]"} flex items-center justify-center hover:bg-[#C9E3B9] cursor-pointer`}
        onClick={() => changeActiveToggle('BOOST')}
      >
        BOOST
      </div>
    </div>
  )
}