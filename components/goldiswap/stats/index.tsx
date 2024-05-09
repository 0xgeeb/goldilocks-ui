import { useGoldiswap } from "../../../providers"

export const Stats = () => {

  const {
    goldiswapInfo,
    simInfo,
    infoLoading
  } = useGoldiswap()

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
    <div className="absolute flex flex-row items-center justify-between w-[45%] top-[78%] left-[27%] text-white font-baloo text-[1.1vw]">
      <div className="flex flex-row items-center">
        <span className="mr-2">locks supply:</span>
        <span className={handleColors(goldiswapInfo.supply, simInfo.supply)}>{simInfo.toggle ? handleInfo(simInfo.supply) : handleInfo(goldiswapInfo.supply)}</span>
      </div>
      <div className="flex flex-row items-center">
        <span className="mr-2">current fsl:</span>
        <span className={handleColors(goldiswapInfo.fsl, simInfo.fsl)}>{simInfo.toggle ? handleInfo(simInfo.fsl) : handleInfo(goldiswapInfo.fsl)}</span>
      </div>
      <div className="flex flex-row items-center">
        <span className="mr-2">current psl:</span>
        <span className={handleColors(goldiswapInfo.psl, simInfo.psl)}>{simInfo.toggle ? handleInfo(simInfo.psl) : handleInfo(goldiswapInfo.psl)}</span>
      </div>
    </div>
  )
}