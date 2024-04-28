export const GoldiswapPage = () => {

  return (
    <main className="w-screen h-screen">
      <header className="w-[100%] h-[15%] bg-[#EEDCD2] flex flex-row items-center justify-between font-amaticbold text-[2vw] px-[4%]">
        <div className="w-[18%] flex flex-row items-center hover:opacity-30 cursor-pointer">
          <img className="w-[37%] h-[70%]" src="/images/logo-goldilocks.png" alt="logo" />
          <h1 className="text-[2.4vw]">Goldilocks DAO</h1>
        </div>
        <div className="w-[65.2%] h-[100%] flex flex-row items-center justify-between">
          <span className="hover:scale-[150%] cursor-pointer">Wut is this?</span>
          <span className="hover:scale-[150%] cursor-pointer">Goldiswap</span>
          <span className="hover:scale-[150%] cursor-pointer">Stake</span>
          <span className="hover:scale-[150%] cursor-pointer">Borrow</span>
          <span className="hover:scale-[150%] cursor-pointer">Goldilend</span>
          <span className="hover:scale-[150%] cursor-pointer">Goldivaults</span>
          <button className="bg-[#E7B941] border-2 border-black px-9 py-2 hover:scale-[115%] cursor-pointer">Connect</button>
        </div>
      </header>
      <div className="w-[100%] h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldiswap.png')] relative">
        <h1 className="absolute top-[11%] left-[14%] text-[#D9C6BA] text-[8vw] font-amaticbold" id="page-title">SWAP</h1>
        <div className="absolute top-[9.387%] left-[28.125%] w-[43.75%] h-[2.78%] bg-[#4D0B24] flex flex-row items-center justify-between px-2">
          <span className="text-white font-baloo">$LOCKS floor price: $0.02</span>
          <span className="text-white font-baloo">$LOCKS market price: $0.28</span>
        </div>
        <div className="absolute top-[12.167%] left-[28.125%] w-[43.75%] h-[48.87%] border-2 border-black bg-[#EEDCD2]">
          <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
          <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
          <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
          <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
          <div className="absolute inset-6 border-2 border-black bg-[#D9C6BA]">
            <div className="w-[100%] h-[100%] relative flex flex-col">
              <div className="absolute top-[44%] left-[47.27%] bg-[#D9C6BA] z-10 h-10 w-10 border-2 border-black rounded-3xl flex justify-center items-center cursor-pointer hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D111C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </div>
              <div className="w-[100%] h-[50%] border-b-2 border-black">
                <div className="absolute flex flex-row top-[21%] left-[6%] items-center">
                  <img className="h-8 w-8" src="/images/logo-honey.png" alt="honeylogo" />
                  <h1 className="font-baloo font-semibold text-[1.4vw] ml-3">HONEY</h1>
                </div>
                <input
                  className="absolute h-[22%] w-[49.6%] top-[15%] left-[25%] border-2 border-black focus:outline-none bg-white font-bold font-baloo text-[1.6vw]"
                  type="number"
                  id="number-input"
                />
              </div>
              <div className="w-[100%] h-[50%]">
                <div className="absolute flex flex-row top-[71%] left-[6%] items-center">
                  <img className="h-8 w-8" src="/images/logo-locks.png" alt="lockslogo" />
                  <h1 className="font-baloo font-semibold text-[1.4vw] ml-3">LOCKS</h1>
                </div>
                <input
                  className="absolute h-[22%] w-[49.6%] top-[65%] left-[25%] border-2 border-black focus:outline-none bg-white font-bold font-baloo text-[1.6vw]"
                  type="number"
                  id="number-input"
                />
              </div>
            </div>
          </div>
        </div>
        <button className="absolute h-[8%] w-[16.6%] top-[64.8%] left-[41.7%] bg-[#E7B941] font-amaticbold text-[1.9vw] border-2 border-black">
          BUY
        </button>
        <div className="absolute flex flex-row items-center justify-between w-[45%] top-[78%] left-[26%] text-white font-baloo text-[1.1vw]">
          <span>$LOCKS supply: 100,000,000.64</span>
          <span>current fsl: 2,140,262.24</span>
          <span>current psl: 1,044,753.49</span>
        </div>
      </div>
    </main>
  )
}