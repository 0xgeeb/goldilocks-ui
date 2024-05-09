import { useGoldiswap } from "../../../providers"

export const TogglesMobile = () => {
  
  const {
    activeToggle,
    changeActiveToggle
  } = useGoldiswap()

  return (
    <div className="absolute flex flex-col items-center justify-around h-[26.5%] w-[7.5%] top-[33.5%] left-[84.5%]">
      <div className="bg-red-200 border-t-2 border-b-2 border-r-2 border-black w-[100%] h-[30%]"></div>
      <div className="bg-red-400 border-t-2 border-b-2 border-r-2 border-black w-[100%] h-[30%]"></div>
      <div className="bg-red-600 border-t-2 border-b-2 border-r-2 border-black w-[100%] h-[30%]"></div>
    </div>
  )
}