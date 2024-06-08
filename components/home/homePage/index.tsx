"use client"

export const HomePage = () => {
  
  return (
    // isDesktop ?
    <main className="w-screen h-screen">
      <header className="w-[100%] h-[11%] lg:h-[15%] bg-[#EEDCD2] flex flex-row items-center justify-between font-amaticbold px-[2%] lg:px-[4%]">
        <a
          href="/"
          className="w-[25%] lg:w-[18%]"
        >
          <div className="w-[100%] flex flex-row items-center hover:opacity-30 cursor-pointer">
            <img className="w-[30%] lg:w-[37%] h-[70%]" src="/images/logo-goldilocks.png" alt="logo" />
            <h1 className="text-[3vw] lg:text-[2.4vw]">Goldilocks DAO</h1>
          </div>
        </a>
        <div className="w-[80%] lg:w-[45%] h-[100%] flex flex-row items-center justify-between text-[2.8vw] lg:text-[2.2vw]">
          <a href="/wut" className="hover:scale-[150%] cursor-pointer"><span>Wut is this?</span></a>
          <a href="/goldiswap/swap" className="hover:scale-[150%] cursor-pointer"><span>Goldiswap</span></a>
          <a href="/goldilend/borrow" className="hover:scale-[150%] cursor-pointer"><span>Goldilend</span></a>
          <a href="/goldivaults" className="hover:scale-[150%] cursor-pointer"><span>Goldivaults</span></a>
        </div>
      </header>
      <div className="w-[100%] h-[89%] lg:h-[85%] bg-[url('/images/bg-home.png')] relative">

      </div>
    </main>
  )
}