import { useGoldilend } from "../../../providers"
import {
  LockTab,
  StakeTab,
  UnstakeTab
} from "../"

export const LendBox = () => {

  const { lendActiveToggle, txConfirming } = useGoldilend()

  return (
    <div className="absolute top-[14%] left-[20%] xl:left-[30%] h-[40%] w-[60%] xl:w-[46%] border-2 border-black bg-[#EEDCD2] z-20">
      <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className={`absolute inset-6 ${txConfirming ? "" : "border-2 border-black"} bg-[#D9C6BA]`}>
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