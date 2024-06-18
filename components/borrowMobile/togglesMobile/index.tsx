import { useBorrow } from "../../../providers"

export const TogglesMobile = () => {

  const {
    activeToggle,
    changeActiveToggle
  } = useBorrow()

  return (
    <div className="absolute h-[3.9%] w-[17.5vh] border-r-2 border-l-2 border-b-2 border-black origin-top-left top-[7.5%] left-[15.5%] rotate-[90deg] bg-[#D9C6BA] flex flex-row font-baloo text-[3vw]">
      <div
        className={`w-[50%] h-[100%] border-r-2 border-black ${activeToggle === 'REPAY' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} focus:bg-[#F3AA8A] cursor-pointer font-baloo text-[3vw] flex items-center justify-center`}
        onClick={() => changeActiveToggle('REPAY')}
      >
        <span className="scale-[-1]">REPAY</span>
      </div>
      <div
        className={`w-[50%] h-[100%] border-r-2 border-black ${activeToggle === 'BORROW' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} focus:bg-[#F3AA8A] cursor-pointer font-baloo text-[3vw] flex items-center justify-center`}
        onClick={() => changeActiveToggle('BORROW')}
      >
        <span className="scale-[-1]">BORROW</span>
      </div>
    </div>
  )
}