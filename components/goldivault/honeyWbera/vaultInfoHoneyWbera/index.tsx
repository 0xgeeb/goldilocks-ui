import { useGoldivault } from "../../../../providers"

export const VaultInfoHoneyWbera = () => {

  const {
    goldivaultInfoHoneyWbera,
    infoLoading,
    setTvlPopupToggle
  } = useGoldivault()

  const loadingElement = () => {
    return <span className="loader-small m-auto"></span>
  }

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = String(date.getFullYear())
    return `${month}-${day}-${year}`
  }

  const formatAsString = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  return (
    <div className="absolute left-[71%] top-[18%] h-[47%] w-[20%] border-t-2 border-r-2 border-b-2 border-black bg-[#D5A774] bg-opacity-30 pt-[0.75%] flex flex-col font-baloo font-medium text-white text-[0.85vw]">
      <h1 className="pl-[4%] text-[1.5vw] mb-[1%]">Vault Info</h1>
      {
        infoLoading ?
        loadingElement() :
        <div className="flex flex-col w-[100%] h-full overflow-y-auto">
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span>Vault Expiration</span>
            <span>{formatDate(goldivaultInfoHoneyWbera.endTime)}</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span>Early Withdrawal Available</span>
            <span>YES</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span>Vault TVL <span className="cursor-pointer border-2 border-white px-2 ml-1 rounded-full hover:bg-black" onClick={() => setTvlPopupToggle(true)}>?</span></span>
            <span>${formatAsString(goldivaultInfoHoneyWbera.vaultDeposits + goldivaultInfoHoneyWbera.vaultAccumulated)}</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span>Accumulated Yield</span>
            <span>${formatAsString(goldivaultInfoHoneyWbera.vaultAccumulated)}</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span>Historical Underlying APR</span>
            <span>0%</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span>Current Underlying APR</span>
            <span>0%</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] bg-[#DEB486] bg-opacity-50 my-[1%]">
            <span>Fixed APR</span>
            <span>0%</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] bg-[#DEB486] bg-opacity-50 my-[1%]">
            <span>YT Implied Value (Historical)</span>
            <span>$0</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] bg-[#DEB486] bg-opacity-50 my-[1%]">
            <span>YT Implied Value (Current)</span>
            <span>0%</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span>Long Yield APR (Historical)</span>
            <span>0%</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span>Long Yield APR (Current)</span>
            <span>0%</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span>OT LP APR</span>
            <span>0%</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span>YT LP APR</span>
            <span>0%</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span>Total OT Liquidity</span>
            <span>${formatAsString(goldivaultInfoHoneyWbera.otLiquidity)}</span>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
            <span>Total YT Liquidity</span>
            <span>$0</span>
          </div>
        </div>
      }
    </div>
  )
}