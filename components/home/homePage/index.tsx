"use client"

export const HomePage = () => {
  
  return (
    // isDesktop ?
    <main className="flex flex-col min-h-screen overflow-hidden">
      <div className="h-[100vh] w-[100vw]">
        <header className="w-[100%] h-[11%] lg:h-[15%] bg-[#EEDCD2] flex flex-row items-center justify-between font-amaticbold px-[4%]">
          <a
            href="/"
            className="w-[25%] lg:w-[18%]"
          >
            <div className="w-[100%] flex flex-row items-center hover:opacity-30 cursor-pointer">
              <img className="w-[30%] lg:w-[37%] h-[70%]" src="/images/logo-goldilocks.png" alt="logo" />
              <h1 className="text-[3vw] lg:text-[2.4vw]">Goldilocks DAO</h1>
            </div>
          </a>
          <div className="w-[55%] lg:w-[45%] h-[100%] flex flex-row items-center justify-between text-[3vw] lg:text-[2.2vw]">
            <a href="/wut" className="hover:scale-[150%] cursor-pointer"><span>Wut is this?</span></a>
            <a href="/goldiswap/swap" className="hover:scale-[150%] cursor-pointer"><span>Goldiswap</span></a>
            <a href="/goldilend/borrow" className="hover:scale-[150%] cursor-pointer"><span>Goldilend</span></a>
            <a href="/goldivaults" className="hover:scale-[150%] cursor-pointer"><span>Goldivaults</span></a>
          </div>
        </header>
        <div className="w-[100%] h-[89%] lg:h-[85%] bg-[url('/images/bg-home.png')] relative">

        </div>
      </div>
      <div className="h-[100vh] w-[100vw] bg-black flex flex-col items-center">
        <h1 className="text-[9vw] text-[#FFCD00] mt-[1%] font-amatic">"Show me the honey"</h1>
        <img className="w-[40%]" src="/images/bg-goldiswap.png" alt="goldiswap" />
      </div>
    </main>
  )
}