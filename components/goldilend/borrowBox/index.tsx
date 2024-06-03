import { useGoldilend } from "../../../providers"
import {
  BorrowTab,
  RepayTab,
  BoostTab
} from "../"

export const BorrowBox = () => {

  const {
    activeToggle,
    txConfirming
  } = useGoldilend()

  return (
    <div className="absolute top-[14%] left-[30%] h-[70%] w-[52%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute top-4 left-0 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 left-0 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-4 right-0 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 right-0 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div className={`absolute inset-8 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}>
        {
          activeToggle === 'BORROW' ?
          <BorrowTab /> :
          activeToggle === 'REPAY' ?
          <RepayTab /> :
          <BoostTab />
        }
      </div>
    </div>
  )
}