import { useGoldilend } from "../../../providers"
import {
  LockTab,
  StakeTab,
  UnstakeTab
} from "../"

export const LendBox = () => {

  const { lendActiveToggle, txConfirming } = useGoldilend()

  return (
    <div className="absolute top-[14%] left-[30%] h-[40%] w-[46%] border-2 border-black bg-[#EEDCD2] z-20">
      <div className="absolute top-4 left-0 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 left-0 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-4 right-0 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 right-0 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div className={`absolute inset-8 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}>
        {
          lendActiveToggle === 'LOCK' ?
          <LockTab /> :
          lendActiveToggle === 'STAKE' ?
          <StakeTab /> :
          <UnstakeTab />
        }
      </div>
    </div>
  )
}