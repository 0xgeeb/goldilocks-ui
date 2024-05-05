import { useBorrow } from "../../../providers"

export const Toggles = () => {

  const {
    activeToggle,
    changeActiveToggle,
    setBorrowPopupToggle
  } = useBorrow()

  return (
    <div className="absolute h-[7.5%] w-[16.27%] top-[2.62%] left-[80.89%] flex flex-row items-center justify-between font-baloo font-semibold text-[1vw]">
      <div
        className={`w-[44%] h-[100%] relative flex items-center justify-center border-2 border-black bg-[#D9C6BA] ${activeToggle === 'borrow' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} hover:bg-[#F3AA8A] cursor-pointer`}
        onClick={() => changeActiveToggle('borrow')}
      >
        <span>BORROW</span>
        <span 
            className="absolute top-[4%] right-[2%] text-[0.7vw] rounded-full px-1 border-2 border-black hover:bg-black hover:text-white" 
            onClick={(e) => {
              e.stopPropagation()
              setBorrowPopupToggle(true)
            }}
          >
            ?
        </span>
      </div>
      <div
        className={`w-[44%] h-[100%] flex items-center justify-center border-2 border-black bg-[#D9C6BA] ${activeToggle === 'repay' ? "bg-[#E7B941]" : "bg-[#D9C6BA]"} hover:bg-[#F3AA8A] cursor-pointer`}
        onClick={() => changeActiveToggle('repay')}
      >
        <span>REPAY</span>
      </div>
    </div>
  )
}