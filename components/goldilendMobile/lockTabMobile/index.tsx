import { useGoldilend } from "../../../providers"
import { LendNotificationMobile, LendWalletBalanceMobilePopup } from "../"

export const LockTabMobile = () => {

  const {
    txConfirming,
    notification,
    handlePercentageButtons,
    displayString,
    handleStakeChange,
    lendActiveToggle,
    handleStakeBalance,
    balanceMobileToggle,
    walletInfoLoading
  } = useGoldilend()

  const loadingElement = () => {
    return <span className="loader-small ml-3"></span>
  }

  return (
    txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction-mobile-small.png" alt="tx" /> :
    notification.toggle ? <LendNotificationMobile /> :
    balanceMobileToggle ? <LendWalletBalanceMobilePopup /> :
    <div className="w-[100%] h-[100%] relative flex flex-col">
      <div className="w-[100%] h-[13%] flex flex-row font-baloo font-semibold border-b-2 border-black">
        <div
          className="h-[100%] w-[25%] flex items-center justify-center bg-[#DCC2A8] focus:bg-[#F3AA8A] cursor-pointer border-r-2 border-black"
          onClick={() => handlePercentageButtons(1)}
        >
          25%
        </div>
        <div
          className="h-[100%] w-[25%] flex items-center justify-center bg-[#D5A774] focus:bg-[#F3AA8A] cursor-pointer border-r-2 border-black"
          onClick={() => handlePercentageButtons(2)}
        >
          50%
        </div>
        <div
          className="h-[100%] w-[25%] flex items-center justify-center bg-[#D19A5B] focus:bg-[#F3AA8A] cursor-pointer border-r-2 border-black"
          onClick={() => handlePercentageButtons(3)}
        >
          75%
        </div>
        <div
          className="h-[100%] w-[25%] flex items-center justify-center bg-[#CC8634] focus:bg-[#F3AA8A] cursor-pointer"
          onClick={() => handlePercentageButtons(4)}
        >
          MAX
        </div>
      </div>
      <div className="absolute flex flex-row top-[20%] left-[8%] items-center">
      <img className="h-8 w-8" src="/images/logo-gibgt.png" alt="coinlogo" />
        <h1 className="font-baloo font-semibold text-[8vw] ml-2 xl:ml-3">iBGT</h1>
      </div>
      <div className="absolute h-[30%] w-[84%] top-[43%] left-[8%] border-2 border-black bg-white">
        <div className="relative h-[100%] w-[100%]">
          <input
            className="absolute top-[18%] left-[5%] w-[90%] focus:outline-none border-none bg-transparent font-semibold font-baloo text-[8vw]"
            type="number"
            id="number-input"
            placeholder="0.00"
            value={displayString}
            onChange={(e) => handleStakeChange(e.target.value, 'LOCK')}
          />
        </div>
      </div>
      <span className="absolute bottom-[2%] right-[3%] font-baloo font-bold text-[4vw] text-[#7F7F7F]">{lendActiveToggle === "UNSTAKE" ? "staked gibgt" : "balance"}: { walletInfoLoading ? loadingElement() : handleStakeBalance('LOCK') }</span>
    </div>
  )
}