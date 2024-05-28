export const LiquidateTab = () => {

  return (
    <div className="absolute top-[14%] left-[30%] h-[70%] w-[52%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute top-4 left-0 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 left-0 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-4 right-0 w-8 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-4 right-0 w-8 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute inset-8 border-2 border-black bg-[#D9C6BA]">
        <div className="h-[100%] w-[100%] flex flex-col">
          <div className="w-[100%] h-[15%] border-b-2 border-black">
            <h1 className="font-amaticbold ml-[4%] text-[2.3vw]">liquidate loans</h1>
          </div>
          <div className="w-[100%] h-[26%] border-b-2 border-black flex flex-row">
            <h1>Loan 1</h1>
            <div className="w-[35%] px-[3%] flex flex-col justify-center">
              <div className="w-[100%] flex flex-row items-center justify-between">
                <span>total amount to repay:</span>
                <span>69 iBGT</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between">
                <span>amount repaid:</span>
                <span>9 iBGT</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between">
                <span>amount outstanding:</span>
                <span>69 iBGT</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between">
                <span>days left:</span>
                <span>9 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}