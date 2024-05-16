import { useBorrow } from "../../../providers"

export const Toggles = () => {

  const {
    activeToggle,
    changeActiveToggle,
    setBorrowPopupToggle
  } = useBorrow()

  return (
    <div className="absolute h-[6%] lg:h-[7.5%] w-[21%] lg:w-[16.27%] top-[2.62%] left-[77%] lg:left-[82.89%] flex flex-row items-center justify-between font-baloo font-semibold text-[1.5vw] lg:text-[1vw]">
      <div
        className={`w-[44%] h-[100%] relative flex items-center justify-center border-2 border-black bg-[#D9C6BA] ${activeToggle === 'BORROW' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} hover:bg-[#F3AA8A] cursor-pointer`}
        onClick={() => changeActiveToggle('BORROW')}
      >
        <span>BORROW</span>
        <span 
            className="absolute top-[2%] lg:top-[4%] right-[1%] lg:right-[2%] text-[0.8vw] lg:text-[0.7vw] rounded-full px-1 border-2 border-black hover:bg-black hover:text-white" 
            onClick={(e) => {
              e.stopPropagation()
              setBorrowPopupToggle(true)
            }}
          >
            ?
        </span>
      </div>
      <div
        className={`w-[44%] h-[100%] flex items-center justify-center border-2 border-black bg-[#D9C6BA] ${activeToggle === 'REPAY' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} hover:bg-[#F3AA8A] cursor-pointer`}
        onClick={() => changeActiveToggle('REPAY')}
      >
        <span>REPAY</span>
      </div>
    </div>
  )
}