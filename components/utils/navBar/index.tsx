import { ConnectButton } from "@rainbow-me/rainbowkit"

export const NavBar = () => {

  return (
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
        <ConnectButton.Custom>
          {({
            account,
            mounted,
            openConnectModal
          }) => {
            return (
              !mounted ?
                <button 
                  className="bg-[#E7B941] border-2 border-black px-9 py-2 hover:bg-[#F3AA8A] hover:scale-[110%] cursor-pointer w-[15.7%]"
                >
                  ...
                </button>
              :
              !account ?
                <button 
                  className="bg-[#E7B941] border-2 border-black px-9 py-2 hover:bg-[#F3AA8A] hover:scale-[110%] cursor-pointer w-[15.7%]"
                  onClick={openConnectModal}
                >
                  Connect
                </button>
              :
                <button 
                  className="border-2 border-black px-4 py-2 bg-[#F3AA8A] hover:scale-[110%] cursor-pointer w-[15.7%]"
                >
                  {`${account.address.slice(0, 5)}...${account?.address.slice(-3)}`}
                </button>
            )
          }}
        </ConnectButton.Custom>
      </div>
    </header>
  )
}