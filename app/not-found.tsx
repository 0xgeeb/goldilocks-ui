export default function NotFound() {
  return (
    <div className="h-screen w-screen">
      <header className="flex h-[11%] w-[100%] flex-row items-center justify-between bg-[#EEDCD2] px-[4%] font-amaticbold lg:h-[15%]">
        <a href="/" className="w-[25%] lg:w-[18%]">
          <div className="flex w-[100%] cursor-pointer flex-row items-center hover:opacity-30">
            <img
              className="h-[70%] w-[30%] lg:w-[37%]"
              src="/images/logo-goldilocks.png"
              alt="logo"
            />
            <h1 className="text-[3vw] lg:text-[2.4vw]">Goldilocks DAO</h1>
          </div>
        </a>
        <div className="flex h-[100%] w-[65%] flex-row items-center justify-between text-[3.5vw] sm:w-[55%] sm:text-[3vw] lg:w-[45%] lg:text-[2.2vw]">
          <a
            href="https://goldilocks.gitbook.io/docs"
            target="_blank"
            className="cursor-pointer hover:scale-[150%]"
            rel="noreferrer"
          >
            <span>Wut is this?</span>
          </a>
          <a
            href="/goldiswap/swap"
            className="cursor-pointer hover:scale-[150%]"
          >
            <span>Goldiswap</span>
          </a>
          <a
            href="/goldilend/borrow"
            className="cursor-pointer hover:scale-[150%]"
          >
            <span>Goldilend</span>
          </a>
          <a
            href="/goldivault/vaults"
            className="cursor-pointer hover:scale-[150%]"
          >
            <span>Goldivaults</span>
          </a>
        </div>
      </header>
      <div className="flex h-[89%] w-[100%] flex-col items-center justify-center bg-[#EEDCD2] lg:h-[85%]">
        <h1 className="font-amaticbold text-[9vw] text-[#E7B941] lg:text-[7vw]">
          where r u
        </h1>
        <img className="h-[60%]" src="/images/icon-not-found.png" alt="icon" />
      </div>
    </div>
  );
}
