import { useGoldilend } from "../../../providers"

export const LendToggles = () => {

  const {
    lendActiveToggle,
    changeLendActiveToggle
  } = useGoldilend()

  return (
    <>
      <div className={`absolute w-[40%] xl:w-[25%] h-[7%] xl:h-[8%] ${lendActiveToggle === 'LIQUIDATE' ? "left-[58%] xl:left-[43.5%]" : "left-[58%] xl:left-[40.5%]"} top-[3%] flex flex-row items-center justify-between`}>
        <div
          className={`font-baloo font-semibold text-[2vw] xl:text-[1vw] h-[100%] w-[22.5%] border-2 border-black ${lendActiveToggle === 'LOCK' ? "bg-[#E7B941]" : "bg-[#E2D6CF]"} flex items-center justify-center hover:bg-[#C9E3B9] cursor-pointer`}
          onClick={() => changeLendActiveToggle('LOCK')}
        >
          LOCK
        </div>
        <div
          className={`font-baloo font-semibold text-[2vw] xl:text-[1vw] h-[100%] w-[22.5%] border-2 border-black ${lendActiveToggle === 'STAKE' ? "bg-[#E7B941]" : "bg-[#E2D6CF]"} flex items-center justify-center hover:bg-[#C9E3B9] cursor-pointer`}
          onClick={() => changeLendActiveToggle('STAKE')}
        >
          STAKE
        </div>
        <div
          className={`font-baloo font-semibold text-[2vw] xl:text-[1vw] h-[100%] w-[22.5%] border-2 border-black ${lendActiveToggle === 'UNSTAKE' ? "bg-[#E7B941]" : "bg-[#E2D6CF]"} flex items-center justify-center hover:bg-[#C9E3B9] cursor-pointer`}
          onClick={() => changeLendActiveToggle('UNSTAKE')}
        >
          UNSTAKE
        </div>
        <div
          className={`font-baloo font-semibold text-[2vw] xl:text-[1vw] h-[100%] w-[22.5%] border-2 border-black ${lendActiveToggle === 'CLAIM' ? "bg-[#E7B941]" : "bg-[#E2D6CF]"} flex items-center justify-center hover:bg-[#C9E3B9] cursor-pointer`}
          onClick={() => changeLendActiveToggle('CLAIM')}
        >
          CLAIM
        </div>
      </div>
      <div
        className={`absolute top-[87%] xl:top-[3%] right-[2%] font-baloo font-semibold text-[2vw] xl:text-[1vw] h-[7%] xl:h-[8%] w-[11%] xl:w-[9%] border-2 border-black ${lendActiveToggle === 'LIQUIDATE' ? "bg-[#E7B941]" : "bg-[#E2D6CF]"} flex items-center justify-center hover:bg-[#C9E3B9] cursor-pointer`}
        onClick={() => changeLendActiveToggle('LIQUIDATE')}
      >
        LIQUIDATE
      </div>
    </>
  )
}