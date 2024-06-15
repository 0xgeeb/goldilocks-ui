import { useGoldilend, useWallet } from "../../../providers"
import { LendNotification } from "../../goldilend"

export const StakeTab = () => {

  const {
    lendActiveToggle,
    handlePercentageButtons,
    displayString,
    handleStakeChange,
    handleStakeBalance,
    txConfirming,
    notification
  } = useGoldilend()

  const { balancesLoading } = useWallet()

  const loadingElement = () => {
    return <span className="loader-small ml-3"></span>
  }

  return (
    txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction.png" alt="tx" /> :
    notification.toggle ? <LendNotification /> :
    <div className="relative flex flex-col w-[100%] h-[100%]">
      <div className="flex flex-row absolute top-0 right-0 w-[38%] xl:w-[33.61%] h-[14.9%] text-[2vw] xl:text-[1vw] font-baloo font-semibold border-b-2 border-l-2 border-black">
        <div 
          className="flex items-center justify-center h-[100%] w-[25%] border-r-2 border-black bg-[#DCC2A8] hover:bg-[#F3AA8A] cursor-pointer"
          onClick={() => handlePercentageButtons(1)}
        >
          25%
        </div>
        <div 
          className="flex items-center justify-center h-[100%] w-[25%] border-r-2 border-black bg-[#D5A774] hover:bg-[#F3AA8A] cursor-pointer"
          onClick={() => handlePercentageButtons(2)}
        >
          50%
        </div>
        <div 
          className="flex items-center justify-center h-[100%] w-[25%] border-r-2 border-black bg-[#D19A5B] hover:bg-[#F3AA8A] cursor-pointer"
          onClick={() => handlePercentageButtons(3)}
        >
          75%
        </div>
        <div 
          className="flex items-center justify-center h-[100%] w-[25%] bg-[#CC8634] hover:bg-[#F3AA8A] cursor-pointer"
          onClick={() => handlePercentageButtons(4)}
        >
          MAX
        </div>
      </div>
      <div className="absolute flex flex-row top-[38%] left-[2%] xl:left-[3%] items-center">
        <img className="h-8 w-8" src="/images/logo-gibgt.png" alt="coinlogo" />
        <h1 className="font-baloo font-semibold text-[3vw] xl:text-[1.8vw] ml-3 mt-1">GiBGT</h1>
      </div>
      <div className="absolute h-[36%] w-[65%] xl:w-[55.6%] top-[30%] left-[26%] xl:left-[22%] border-2 border-black bg-white">
        <div className="relative h-[100%] w-[100%]">
          <input
            className="absolute top-[17%] left-[7.5%] xl:left-[5%] w-[90%] focus:outline-none border-none bg-transparent font-bold font-baloo text-[4vw] xl:text-[2vw]"
            type="number"
            id="number-input"
            placeholder="0.00"
            value={displayString}
            onChange={(e) => handleStakeChange(e.target.value, 'STAKE')}
          />
          <span className="absolute bottom-0 right-[3%] font-baloo font-bold text-[1.8vw] xl:text-[0.9vw] text-[#7F7F7F]">{lendActiveToggle === "UNSTAKE" ? "staked gibgt" : "balance"}: {balancesLoading ? loadingElement() : handleStakeBalance('STAKE')}</span>
        </div>
      </div>
    </div>
  )
}