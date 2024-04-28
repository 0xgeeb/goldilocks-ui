export const GoldiswapPage = () => {

  return (
    <main className="w-screen h-screen">
      <header className="w-[100%] h-[15%] bg-[#EEDCD2] flex flex-row items-center justify-between font-amaticbold text-[2vw] px-[4%]">
        <div className="w-[18%] flex flex-row items-center hover:opacity-30 cursor-pointer">
          <img className="w-[37%] h-[70%]" src="/logo.png" alt="logo" />
          <h1>Goldilocks DAO</h1>
        </div>
        <div className="w-[65.2%] h-[100%] flex flex-row items-center justify-between">
          <span className="hover:scale-[130%] cursor-pointer">Wut is this?</span>
          <span className="hover:scale-[130%] cursor-pointer">Goldiswap</span>
          <span className="hover:scale-[130%] cursor-pointer">Stake</span>
          <span className="hover:scale-[130%] cursor-pointer">Borrow</span>
          <span className="hover:scale-[130%] cursor-pointer">Goldilend</span>
          <span className="hover:scale-[130%] cursor-pointer">Goldivaults</span>
          <button>Connect</button>
        </div>
      </header>
      <div className="w-[100%] h-[85%] bg-cover bg-bottom bg-[url('/bg-goldiswap.png')] relative">
        <h1 className="absolute top-[18%] left-[14%] text-[#D9C6BA] text-[8vw] font-amaticbold" id="page-title">SWAP</h1>
        <div className="absolute top-[16.387%] left-[28.125%] w-[43.75%] h-[2.78%] bg-[#4D0B24] flex flex-row items-center justify-between px-2">
          <span className="text-white font-baloo">$LOCKS floor price: $0.02</span>
          <span className="text-white font-baloo">$LOCKS market price: $0.28</span>
        </div>
        <div className="absolute top-[19.167%] left-[28.125%] w-[43.75%] h-[41.87%] border-2 border-black bg-[#EEDCD2]">
          <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
          <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
          <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
          <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
          <div className="absolute inset-6 border-2 border-black bg-[#D9C6BA]">

          </div>
        </div>
      </div>
    </main>
  )
}