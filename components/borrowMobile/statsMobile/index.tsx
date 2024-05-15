import { useBorrow } from "../../../providers"

export const StatsMobile = () => {

  const {
    borrowInfo,
    infoLoading
  } = useBorrow()

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
    <div className="text-[3vw] absolute h-[12%] w-[80%] left-[10%] top-[75%] flex flex-row items-center justify-center text-[#D9C6BA] font-baloo font-semibold">
      <div className="flex flex-col items-end">
        <span>locks supply:</span>
        <span>current fsl:</span>
        <span>current psl:</span>
      </div>
      <div className="h-[100%] w-[5%]"></div>
      <div className="flex flex-col items-start">
        <span className={handleColors(borrowInfo.supply, borrowInfo.supply)}>{handleInfo(borrowInfo.supply)}</span>
        <span className={handleColors(borrowInfo.fsl, borrowInfo.fsl)}>{handleInfo(borrowInfo.fsl)}</span>
        <span className={handleColors(borrowInfo.psl, borrowInfo.psl)}>{handleInfo(borrowInfo.psl)}</span>
      </div>
    </div>
  )
}