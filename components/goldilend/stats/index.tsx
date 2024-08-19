import { useGoldilend } from "../../../providers"

export const Stats = () => {

  const {
    infoLoading,
    goldilendInfo
  } = useGoldilend()

  const loadingElement = () => {
    return <span className="loader-small ml-3 mt-2"></span>
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
    <div className="absolute flex flex-row items-center justify-between w-[90%] xl:w-[55%] top-[80%] xl:top-[83%] left-[5%] xl:left-[25.5%] text-white font-baloo text-[2vw] xl:text-[1.1vw]">
      <div className="flex flex-row items-center">
        <span className="mr-2">total iBGT locked:</span>
        <span>{handleInfo(goldilendInfo.poolSize)}</span>
      </div>
      <div className="flex flex-row items-center">
        <span className="mr-2">total GiBGT staked:</span>
        <span>{handleInfo(goldilendInfo.stakedGibgt)}</span>
      </div>
      <div className="flex flex-row items-center">
        <span className="mr-2">iBGT backing per GiBGT:</span>
        <span>{handleInfo(goldilendInfo.poolSize / goldilendInfo.gibgtSupply)}</span>
      </div>
    </div>
  )
}