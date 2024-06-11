import { useStake } from "../../../providers"
import { useGoldiswapMath } from "../../../hooks"

export const Stats = () => {

  const {
    stakeInfo,
    infoLoading
  } = useStake()

  const { floorPrice, marketPrice } = useGoldiswapMath()

  const loadingElement = () => {
    return <span className="loader-small ml-3 mt-2"></span>
  }

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const formatAsPrice = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 5 })
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

  const handlePrice = (num: number) => {
    if(infoLoading) {
      return loadingElement()
    }
    else if(num > 0) {
      return formatAsPrice(num)
    }
    else {
      return "-"
    }
  }

  const handleColors = (num1: number, num2: number): string => {
    if(num1 > num2) {
      return 'text-red-600'
    }
    else if(num1 == num2) {
      return ''
    }
    else {
      return 'text-green-600'
    }
  }

  return (
    <div className="absolute flex flex-col items-center justify-between w-[62%] lg:w-[45%] top-[80%] lg:top-[78%] left-[19%] lg:left-[27%] text-white font-baloo text-[1.7vw] lg:text-[1.1vw]">
      <div className="w-[100%] h-[50%] flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <span className="mr-2">locks supply:</span>
          <span className={handleColors(stakeInfo.supply, stakeInfo.supply)}>{handleInfo(stakeInfo.supply)}</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">current fsl:</span>
          <span className={handleColors(stakeInfo.fsl, stakeInfo.fsl)}>{handleInfo(stakeInfo.fsl)}</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">current psl:</span>
          <span className={handleColors(stakeInfo.psl, stakeInfo.psl)}>{handleInfo(stakeInfo.psl)}</span>
        </div>
      </div>
      <div className="w-[100%] h-[50%] flex flex-row items-center justify-between mt-[1%]">
        <div className="flex flex-row items-center">
          <span className="mr-2">floor price:</span>
          <span className={handleColors(floorPrice(stakeInfo.fsl, stakeInfo.supply), floorPrice(stakeInfo.fsl, stakeInfo.supply))}>${handlePrice(floorPrice(stakeInfo.fsl, stakeInfo.supply))}</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">market price:</span>
          <span className={handleColors(marketPrice(stakeInfo.fsl, stakeInfo.psl, stakeInfo.supply), marketPrice(stakeInfo.fsl, stakeInfo.psl, stakeInfo.supply))}>${handlePrice(marketPrice(stakeInfo.fsl, stakeInfo.psl, stakeInfo.supply))}</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">target ratio:</span>
          <span className={handleColors(stakeInfo.targetRatio, stakeInfo.targetRatio)}>{handlePrice(stakeInfo.targetRatio)}%</span>
        </div>
      </div>
    </div>
  )
}