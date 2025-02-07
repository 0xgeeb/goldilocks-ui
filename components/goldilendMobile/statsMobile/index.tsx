import { useGoldilend } from "../../../providers"

export const StatsMobile = () => {

  const {
    infoLoading,
    goldilendInfo
  } = useGoldilend()

  const loadingElement = () => {
    return <span className="loader-small-mobile mx-1"></span>
  }

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const handleInfo = (num: number) => {
    if(infoLoading) {
      return loadingElement()
    }
    else if(num > 0) {
      return formatAsString(num)
    }
    else {
      return "-"
    }
  }
  
  return (
    <div className="text-[3vw] absolute h-[12%] w-[80%] left-[5%] top-[60%] flex flex-row items-center justify-center text-[#D9C6BA] font-baloo font-semibold">
      <div className="flex flex-col items-end">
        <span>total iBGT locked:</span>
        <span>total GiBGT staked:</span>
        <span>iBGT backing per GiBGT:</span>
      </div>
      <div className="h-[100%] w-[5%]"></div>
      <div className="flex flex-col items-start">
        <span>{handleInfo(goldilendInfo.poolSize)}</span>
        <span>{handleInfo(goldilendInfo.stakedGibgt)}</span>
        <span>{handleInfo(goldilendInfo.poolSize / goldilendInfo.gibgtSupply)}</span>
      </div>
    </div>
  )
}