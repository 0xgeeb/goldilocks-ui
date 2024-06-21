import { useStake } from "../../../providers"
import { useGoldiswapMath } from "../../../hooks"

export const StatsMobile = () => {

  const {
    stakeInfo,
    infoLoading
  } = useStake()

  const { floorPrice, marketPrice } = useGoldiswapMath()

  const formatAsPrice = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 5 })
  }

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
    <div className="text-[3.5vw] absolute w-[90%] left-[5%] top-[60%] flex flex-row items-center justify-center text-[#D9C6BA] font-baloo font-semibold">
      <div className="flex flex-col items-end">
        <span>staking apr:</span>
        <span>locks supply:</span>
        <span>current fsl:</span>
        <span>current psl:</span>
        <span>floor price:</span>
        <span>market price:</span>
        <span>target ratio:</span>
      </div>
      <div className="h-[100%] w-[7.5%]"></div>
      <div className="flex flex-col items-start">
        <span className={handleColors(stakeInfo.targetRatio, stakeInfo.targetRatio)}>{handleInfo(0.5*((marketPrice(stakeInfo.fsl, stakeInfo.psl, stakeInfo.supply) - floorPrice(stakeInfo.fsl, stakeInfo.supply)) / marketPrice(stakeInfo.fsl, stakeInfo.psl, stakeInfo.supply)) * 100)}%</span>
        <span className={handleColors(stakeInfo.supply, stakeInfo.supply)}>{handleInfo(stakeInfo.supply)}</span>
        <span className={handleColors(stakeInfo.fsl, stakeInfo.fsl)}>{handleInfo(stakeInfo.fsl)}</span>
        <span className={handleColors(stakeInfo.psl, stakeInfo.psl)}>{handleInfo(stakeInfo.psl)}</span>
        <span className={handleColors(floorPrice(stakeInfo.fsl, stakeInfo.supply), floorPrice(stakeInfo.fsl, stakeInfo.supply))}>${handlePrice(floorPrice(stakeInfo.fsl, stakeInfo.supply))}</span>
        <span className={handleColors(marketPrice(stakeInfo.fsl, stakeInfo.psl, stakeInfo.supply), marketPrice(stakeInfo.fsl, stakeInfo.psl, stakeInfo.supply))}>${handlePrice(marketPrice(stakeInfo.fsl, stakeInfo.psl, stakeInfo.supply))}</span>
        <span className={handleColors(stakeInfo.targetRatio, stakeInfo.targetRatio)}>{handlePrice(stakeInfo.targetRatio * 100)}%</span>
      </div>
    </div>
  )
}