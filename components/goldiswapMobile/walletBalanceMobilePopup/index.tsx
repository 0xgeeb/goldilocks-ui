import { useGoldiswap, useWallet } from "../../../providers"

export const WalletBalanceMobilePopup = () => {

  const { setBalanceMobileToggle } = useGoldiswap()

  const { balance } = useWallet()

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const formatAsClaimable = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 4 })
  }

  const handleInfo = (num: number): string => {
    if(num > 0) {
      return formatAsString(num)
    }
    else {
      return "-"
    }
  }

  const handleInfoClaimable = (num: number): string => {
    if(num > 0) {
      return formatAsClaimable(num)
    }
    else {
      return "-"
    }
  }

  return (
    <div className="w-[100%] h-[100%] bg-[#D5A774] flex flex-col items-center relative px-[8%] font-baloo font-semibold text-[2.7vw]">
      <h1 className="font-amaticbold text-[10vw] mt-[12%] mb-[2%] ml-[5%]">THIS IS WALLET BALANCE</h1>
      <div className="w-[100%] h-[58%] flex flex-col justify-around">
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">locks balance:</span>
          <span className="">{handleInfo(balance.locks)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">honey balance:</span>
          <span className="">{handleInfo(balance.honey)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">porridge balance:</span>
          <span className="">{handleInfo(balance.prg)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">staked locks:</span>
          <span className="">{handleInfo(balance.staked)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">locked locks:</span>
          <span className="">{handleInfo(balance.locked)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">borrowed honey:</span>
          <span className="">{handleInfo(balance.borrowed)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
        <div className="flex flex-row items-center justify-between w-[100%]">
          <span className="">claimable porridge:</span>
          <span className="">{handleInfoClaimable(balance.claimable)}</span>
        </div>
        <div className="w-[100%] border-t-2 border-black"></div>
      </div>
      <p
        className="absolute top-[-1%] right-[3%] font-baloo text-[7vw] cursor-pointer focus:scale-125"
        onClick={() => setBalanceMobileToggle(false)}
      >
        x
      </p>
    </div>
  )
}