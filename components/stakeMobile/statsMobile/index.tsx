import { useStake } from "../../../providers"

export const StatsMobile = () => {

  const {
    stakeInfo,
    infoLoading
  } = useStake()

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
    <div className="text-[3vw] absolute h-[12%] w-[40%] left-[30%] top-[75%] flex flex-row items-center justify-around text-[#D9C6BA] font-baloo font-semibold">
      <div className="flex flex-col items-end">
        <span>locks supply:</span>
        <span>current fsl:</span>
        <span>current psl:</span>
      </div>
      <div className="flex flex-col items-start">
        <span className={handleColors(stakeInfo.supply, stakeInfo.supply)}>{handleInfo(stakeInfo.supply)}</span>
        <span className={handleColors(stakeInfo.fsl, stakeInfo.fsl)}>{handleInfo(stakeInfo.fsl)}</span>
        <span className={handleColors(stakeInfo.psl, stakeInfo.psl)}>{handleInfo(stakeInfo.psl)}</span>
      </div>
    </div>
  )
}