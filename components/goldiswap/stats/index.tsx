import { useGoldiswap } from "../../../providers"
import { useGoldiswapMath } from "../../../hooks"

export const Stats = () => {

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

  const handleFloorColors = (num1: number, num2: number): string => {
    if(Math.abs(num1 - num2) < 1e-10) {
      return ''
    }
    else {
      return 'text-green-600'
    }
  }

  return (
    <div className="absolute flex flex-col items-center justify-between w-[90%] md:w-[70%] xl:w-[60%] 2xl:w-[45%] top-[84%] md:top-[82%] xl:top-[80%] left-[5%] md:left-[15%] xl:left-[20%] 2xl:left-[27.5%] text-white font-baloo text-[2.5vw] md:text-[2vw] lg:text-[1.75vw] xl:text-[1.5vw] 2xl:text-[1.1vw]">
      <div className="w-[100%] h-[50%] flex flex-row items-center justify-between">
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
      <div className="w-[100%] h-[50%] flex flex-row items-center justify-between tall:mt-[1%]">
        <div className="flex flex-row items-center">
          <span className="mr-2">floor price:</span>
          <span className={handleFloorColors(floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply), floorPrice(simInfo.fsl, simInfo.supply))}>${simInfo.toggle ? handlePrice(floorPrice(simInfo.fsl, simInfo.supply)) : handlePrice(floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply))}</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">market price:</span>
          <span className={handleColors(marketPrice(goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply), marketPrice(simInfo.fsl, simInfo.psl, simInfo.supply))}>${simInfo.toggle ? handlePrice(marketPrice(simInfo.fsl, simInfo.psl, simInfo.supply)) : handlePrice(marketPrice(goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply))}</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">target ratio:</span>
          <span className={handleColors(goldiswapInfo.targetRatio, simInfo.targetRatio)}>{simInfo.toggle ? handlePrice(simInfo.targetRatio * 100) : handlePrice(goldiswapInfo.targetRatio * 100)}%</span>
        </div>
      </div>
    </div>
  )
}