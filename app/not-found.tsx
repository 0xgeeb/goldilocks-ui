export default function NotFound() {

  return (
    <div className="w-screen h-screen">
      <header className="w-[100%] h-[15%] bg-[#EEDCD2] flex flex-row items-center justify-between font-amaticbold text-[2vw] px-[4%]">
        <div className="w-[18%] flex flex-row items-center hover:opacity-30 cursor-pointer">
          <img className="w-[37%] h-[70%]" src="/images/logo-goldilocks.png" alt="logo" />
          <h1 className="text-[2.4vw]">Goldilocks DAO</h1>
        </div>
        <div className="w-[65.2%] h-[100%] flex flex-row items-center justify-between">
          <a 
            href="/wut"
            className="hover:scale-[150%] cursor-pointer"
          >
            <span>Wut is this?</span>
          </a>
          <a 
            href="/goldiswap"
            className="hover:scale-[150%] cursor-pointer"
          >
            <span>Goldiswap</span>
          </a>
          <a 
            href="/stake"
            className="hover:scale-[150%] cursor-pointer"
          >
            <span>Stake</span>
          </a>
          <a 
            href="/borrow"
            className="hover:scale-[150%] cursor-pointer"
          >
            <span>Borrow</span>
          </a>
          <a 
            href="/goldilend"
            className="hover:scale-[150%] cursor-pointer"
          >
            <span>Goldilend</span>
          </a>
          <a 
            href="/goldivaults"
            className="hover:scale-[150%] cursor-pointer"
          >
            <span>Goldivaults</span>
          </a>
        </div>
      </header>
      <div className="w-[100%] h-[85%] flex flex-col items-center justify-center bg-[#EEDCD2]">
        <h1 className="font-amaticbold text-[7vw] text-[#E7B941]">where r u</h1>
        <img className="h-[60%]" src="/images/icon-not-found.png" alt="icon" />
      </div>
    </div>
  )
}