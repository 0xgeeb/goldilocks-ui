export default function NotFound() {
  
  return (
    <div className="w-screen h-screen">
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
        <div className="w-[65%] sm:w-[55%] lg:w-[45%] h-[100%] flex flex-row items-center justify-between text-[3.5vw] sm:text-[3vw] lg:text-[2.2vw]">
          <a href="https://goldilocks.gitbook.io/docs" target="_blank" className="hover:scale-[150%] cursor-pointer"><span>Wut is this?</span></a>
          <a href="/goldiswap/swap" className="hover:scale-[150%] cursor-pointer"><span>Goldiswap</span></a>
          <a href="/goldilend/borrow" className="hover:scale-[150%] cursor-pointer"><span>Goldilend</span></a>
          <a href="/goldivaults" className="hover:scale-[150%] cursor-pointer"><span>Goldivaults</span></a>
        </div>
      </header>
      <div className="w-[100%] h-[89%] lg:h-[85%] flex flex-col items-center justify-center bg-[#EEDCD2]">
        <h1 className="font-amaticbold text-[9vw] lg:text-[7vw] text-[#E7B941]">where r u</h1>
        <img className="h-[60%]" src="/images/icon-not-found.png" alt="icon" />
      </div>
    </div>
  )
}