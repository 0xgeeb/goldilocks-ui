import { useBorrow } from "../../../providers"

export const TogglesMobile = () => {

  const {
    activeToggle,
    changeActiveToggle
  } = useBorrow()

  return (
    <>
      <div
        className={`absolute w-[15.34%] h-[3.9%] top-[8.68%] left-[15.7%] border-l-2 border-r-2 border-t-2 border-black origin-bottom-left -rotate-[90deg] ${activeToggle === 'REPAY' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} focus:bg-[#F3AA8A] cursor-pointer font-baloo text-[3vw] flex items-center justify-center`}
        onClick={() => changeActiveToggle('REPAY')}
      >
        REPAY
      </div>
      <div
        className={`absolute w-[15.34%] h-[3.9%] top-[18%] left-[15.7%] border-l-2 border-r-2 border-t-2 border-black origin-bottom-left -rotate-[90deg] ${activeToggle === 'BORROW' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} focus:bg-[#F3AA8A] cursor-pointer font-baloo text-[3vw] flex items-center justify-center`}
        onClick={() => changeActiveToggle('BORROW')}
      >
        BORROW
      </div>
    </>
  )
}