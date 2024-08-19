export const VaultBox = () => {
  
  return (
    <div className="absolute top-[15%] h-[52%] w-[42%] left-[29%]">
      <div className="relative w-[100%] h-[100%] bg-[#995816] border-2 border-[#FFCD00]">
        <div className="absolute top-2 left-0 w-4 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-2 left-0 w-4 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute top-2 right-0 w-4 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-2 right-0 w-4 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute inset-4 bg-[#C8894A] border-2 border-[#FFCD00]">
          <div className="relative w-[100%] h-[100%] flex flex-col">
            <div className="absolute top-[44%] left-[47.27%] bg-[#995816] z-10 h-10 w-10 border-2 border-[#FFCD00] rounded-3xl flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFCD00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            </div>
            <div className="w-[100%] h-[50%] border-b-2 border-[#FFCD00] py-[3.5%] px-[12.5%] ">
              <h1 className="text-[1vw] text-white font-baloo font-medium mb-[2.5%]">Deposit tokens</h1>
              <div className="w-[100%] h-[50%] border-2 border-black bg-white flex flex-row items-center justify-between pr-[1%] pl-[3.5%]">
                <input
                  className="h-[100%] w-full focus:outline-none border-none bg-transparent font-bold font-baloo text-[2vw]"
                  type="number"
                  id="number-input"
                  placeholder="0.00"
                  // value={displayString}
                  // onChange={(e) => handleTopChange(e.target.value)}
                />
                <span className="font-baloo text-nowrap font-bold text-[1vw]">HONEY-WBERA LP</span>
              </div>
            </div>
            <div className="w-[100%] h-[50%] py-[3.5%] px-[12.5%]">
              <h1 className="text-[1vw] text-white font-baloo font-medium mb-[2.5%]">Estimated tokens received</h1>
              <div className="w-[100%] h-[50%] flex flex-row items-center justify-between">
                <div className="h-[100%] w-[47.5%] flex flex-row items-center justify-between border-2 border-black bg-slate-200 px-[3.5%]">
                  <span className="font-baloo text-nowrap font-bold text-[1.25vw]">50.00</span>
                  <span className="font-baloo text-nowrap font-bold text-[1.25vw]">OT</span>
                </div>
                <div className="h-[100%] w-[47.5%] flex flex-row items-center justify-between border-2 border-black bg-slate-200 px-[3.5%]">
                  <span className="font-baloo text-nowrap font-bold text-[1.25vw]">10.00</span>
                  <span className="font-baloo text-nowrap font-bold text-[1.25vw]">YT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}