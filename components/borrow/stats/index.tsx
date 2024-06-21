import { useBorrow } from "../../../providers"
import { useGoldiswapMath } from "../../../hooks"

export const Stats = () => {

  const {
    borrowInfo,
    infoLoading
  } = useBorrow()

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
    <div className="absolute flex flex-col items-center justify-between w-[90%] md:w-[70%] xl:w-[60%] 2xl:w-[45%] top-[84%] md:top-[82%] xl:top-[80%] left-[5%] md:left-[15%] xl:left-[20%] 2xl:left-[27.5%] text-white font-baloo text-[2.5vw] md:text-[2vw] lg:text-[1.75vw] xl:text-[1.5vw] 2xl:text-[1.1vw]">
      <div className="w-[100%] h-[50%] flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <span className="mr-2">locks supply:</span>
          <span className={handleColors(borrowInfo.supply, borrowInfo.supply)}>{handleInfo(borrowInfo.supply)}</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">current fsl:</span>
          <span className={handleColors(borrowInfo.fsl, borrowInfo.fsl)}>{handleInfo(borrowInfo.fsl)}</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">current psl:</span>
          <span className={handleColors(borrowInfo.psl, borrowInfo.psl)}>{handleInfo(borrowInfo.psl)}</span>
        </div>
      </div>
      <div className="w-[100%] h-[50%] flex flex-row items-center justify-between mt-[1%]">
        <div className="flex flex-row items-center">
          <span className="mr-2">floor price:</span>
          <span className={handleColors(floorPrice(borrowInfo.fsl, borrowInfo.supply), floorPrice(borrowInfo.fsl, borrowInfo.supply))}>${handlePrice(floorPrice(borrowInfo.fsl, borrowInfo.supply))}</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">market price:</span>
          <span className={handleColors(marketPrice(borrowInfo.fsl, borrowInfo.psl, borrowInfo.supply), marketPrice(borrowInfo.fsl, borrowInfo.psl, borrowInfo.supply))}>${handlePrice(marketPrice(borrowInfo.fsl, borrowInfo.psl, borrowInfo.supply))}</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">target ratio:</span>
          <span className={handleColors(borrowInfo.targetRatio, borrowInfo.targetRatio)}>{handlePrice(borrowInfo.targetRatio * 100)}%</span>
        </div>
      </div>
    </div>
  )
}