"use client"

import { useGoldivault} from "../../../providers"

export const StakingTab = () => {

  const {
    displayString,
    handleChange,
    walletInfoLoading,
    activeToggle,
    handleBalanceClick,
    goldivaultWalletInfoOribgt
  } = useGoldivault()

  const loadingElement = () => {
    return <span className="loader-balance mt-1"></span>;
  };

  const formatBalance = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 4 });
  };

  const formatClaimable = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 8 });
  };

  const renderTitle = () => {
    if(activeToggle === "STAKE") {
      return 'Stake oriBGT-YT'
    }
    else if(activeToggle === "UNSTAKE") {
      return 'Unstake oriBGT-YT'
    }
    else {
      return 'Claim oriBGT'
    }
  }

  const renderTopBalanceLabel = () => {
    if(activeToggle === "STAKE") {
      return 'oriBGT-YT'
    }
    else if(activeToggle === "UNSTAKE") {
      return 'staked oriBGT-YT'
    }
    else {
      return 'claimable oriBGT'
    }
  }

  const renderBalance = () => {
    if (activeToggle === "STAKE") {
      return goldivaultWalletInfoOribgt.justYt
    }
    else {
      return goldivaultWalletInfoOribgt.stakedYt
    } 
  }

  return (
    <div className="relative flex h-[100%] w-[100%] flex-col">
      <div className="relative mx-auto h-[100%] w-[75%] py-[3.5%]">
        <h1 className="mb-[2.5%] font-baloo text-[2.5vw] font-medium text-white md:text-[2vw] lg:text-[1vw]">
          {renderTitle()}
        </h1>
        <div className="flex h-[50%] w-[100%] flex-row items-center justify-between border-2 border-black bg-white pl-[3.5%] pr-[1%]">
          {
            activeToggle === "CLAIM" ?
            <div className="text-[2vw] h-[100%] w-full flex items-center font-baloo font-bold">
              {formatClaimable(goldivaultWalletInfoOribgt.claimable)}
            </div> :
            <input
              className="h-[100%] w-full border-none bg-transparent font-baloo text-[4vw] font-bold focus:outline-hidden lg:text-[2vw]"
              type="number"
              id="number-input"
              placeholder="0.00"
              value={displayString}
              onChange={(e) => handleChange(e.target.value)}
            />
          }
          <span className="text-nowrap font-baloo text-[2.5vw] font-bold md:text-[2vw] lg:text-[1vw]">
            {renderTopBalanceLabel()}
          </span>
        </div>
        {
          activeToggle !== "CLAIM" &&
          <h1
            className="absolute right-0 mt-[2.5%] cursor-pointer font-baloo text-[2.5vw] font-medium text-white hover:scale-110 md:text-[2vw] lg:mt-[1%] lg:text-[1vw]"
            onClick={() => handleBalanceClick('oribgtstaking')}
          >
            balance:{" "} { walletInfoLoading ? loadingElement() : formatBalance(renderBalance()) }
          </h1>
        }
      </div>
    </div>
  )
}