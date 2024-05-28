export const ClaimTab = () => {

  return (
    <div className="absolute top-[14%] left-[39%] h-[70%] w-[28%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute top-4 left-0 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 left-0 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-4 right-0 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 right-0 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute inset-8 border-2 border-black bg-[#D9C6BA]">
        {
          // chartOpen ? <Chart /> :
          <div className="relative w-[100%] h-[100%] flex flex-col items-center font-baloo font-semibold">
            <h1 className="font-amaticbold text-[4vw] mt-[4%]">claim yield</h1>
            <div className="w-[70%] h-[15%] mt-[5%] flex flex-col justify-between">
              <span className="text-[#9C4924]">Porridge Yield</span>
              <div className="w-[100%] flex flex-row justify-between">
                <span>Current Porridge Balance:</span>
                <span>69.00</span>
              </div>
              <div className="w-[100%] flex flex-row justify-between">
                <span>Available Porridge to Claim:</span>
                <span>69.00</span>
              </div>
            </div>
            <div className="w-[70%] h-[15%] mt-[8%] flex flex-col justify-between">
              <span className="text-[#9C4924]">Infrared iBGT Staking Yield</span>
              <div className="w-[100%] flex flex-row justify-between">
                <span>wif:</span>
                <span>69.00</span>
              </div>
              <div className="w-[100%] flex flex-row justify-between">
                <span>boden:</span>
                <span>69.00</span>
              </div>
              <div className="w-[100%] flex flex-row justify-between">
                <span>jenner:</span>
                <span>69.00</span>
              </div>
              <div className="w-[100%] flex flex-row justify-between">
                <span>bera:</span>
                <span>69.00</span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}