export const VaultInfo = () => {

  return (
    <div className="absolute left-[71%] top-[18%] h-[47%] w-[20%] border-t-2 border-r-2 border-b-2 border-black bg-[#D5A774] bg-opacity-30 py-[0.75%] flex flex-col font-baloo font-medium text-white text-[0.85vw]">
      <h1 className="pl-[4%] text-[1.5vw] mb-[1%]">Vault Info</h1>
      <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
        <span>Vault TVL</span>
        <span>$69,000</span>
      </div>
      <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
        <span>Accumulated TVL</span>
        <span>$6,000</span>
      </div>
      <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
        <span>APR of Underlying Vault</span>
        <span>23%</span>
      </div>
      <div className="w-[100%] flex flex-row items-center justify-between px-[4%] bg-[#DEB486] bg-opacity-50 my-[1%]">
        <span>Fixed Return APR for OT</span>
        <span>3.4%</span>
      </div>
      <div className="w-[100%] flex flex-row items-center justify-between px-[4%] bg-[#DEB486] bg-opacity-50 my-[1%]">
        <span>LP APR (OT)</span>
        <span>4%</span>
      </div>
      <div className="w-[100%] flex flex-row items-center justify-between px-[4%] bg-[#DEB486] bg-opacity-50 my-[1%]">
        <span>LP APR (YT)</span>
        <span>3%</span>
      </div>
      <div className="w-[100%] flex flex-row items-center justify-between px-[4%] bg-[#DEB486] bg-opacity-50 my-[1%]">
        <span>Implied Value of YT</span>
        <span>$1.34</span>
      </div>
      <div className="w-[100%] flex flex-row items-center justify-between px-[4%] bg-[#DEB486] bg-opacity-50 my-[1%]">
        <span>Implied APR of buying YT</span>
        <span>12%</span>
      </div>
      <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
        <span>Actual Price of YT</span>
        <span>$1.21</span>
      </div>
      <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
        <span>Early Withdrawal Available</span>
        <span>YES</span>
      </div>
    </div>
  )
}