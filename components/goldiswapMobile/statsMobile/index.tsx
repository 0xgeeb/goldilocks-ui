import { useGoldiswap } from "../../../providers"
import { useGoldiswapMath } from "../../../hooks"

export const StatsMobile = () => {

  const {
    goldiswapInfo,
    simInfo,
    infoLoading
  } = useGoldiswap()

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
    <div className="text-[3.3vw] absolute h-[15%] w-[80%] left-[10%] top-[72.5%] flex flex-row items-center justify-center text-[#D9C6BA] font-baloo font-semibold">
      <div className="flex flex-col items-end">
        <span>locks supply:</span>
        <span>current fsl:</span>
        <span>current psl:</span>
        <span>floor price:</span>
        <span>market price:</span>
        <span>target ratio:</span>
      </div>
      <div className="h-[100%] w-[5%]"></div>
      <div className="flex flex-col items-start">
        <span className={handleColors(goldiswapInfo.supply, simInfo.supply)}>{simInfo.toggle ? handleInfo(simInfo.supply) : handleInfo(goldiswapInfo.supply)}</span>
        <span className={handleColors(goldiswapInfo.fsl, simInfo.fsl)}>{simInfo.toggle ? handleInfo(simInfo.fsl) : handleInfo(goldiswapInfo.fsl)}</span>
        <span className={handleColors(goldiswapInfo.psl, simInfo.psl)}>{simInfo.toggle ? handleInfo(simInfo.psl) : handleInfo(goldiswapInfo.psl)}</span>
        <span className={handleColors(floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply), floorPrice(simInfo.fsl, simInfo.supply))}>${simInfo.toggle ? handlePrice(floorPrice(simInfo.fsl, simInfo.supply)) : handlePrice(floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply))}</span>
        <span className={handleColors(marketPrice(goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply), marketPrice(simInfo.fsl, simInfo.psl, simInfo.supply))}>${simInfo.toggle ? handlePrice(marketPrice(simInfo.fsl, simInfo.psl, simInfo.supply)) : handlePrice(marketPrice(goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply))}</span>
        <span className={handleColors(goldiswapInfo.targetRatio, simInfo.targetRatio)}>{simInfo.toggle ? handlePrice(simInfo.targetRatio * 100) : handlePrice(goldiswapInfo.targetRatio * 100)}%</span>
      </div>
    </div>
  )
}