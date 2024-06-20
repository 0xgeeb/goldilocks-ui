import { ConnectButton } from "@rainbow-me/rainbowkit"
import { usePathname } from "next/navigation"

export const NavBar = () => {

  const pathname = usePathname()

  return (
    <header className="w-[100%] h-[11%] xl:h-[15%] bg-[#EEDCD2] flex flex-row items-center justify-between font-amaticbold px-[2%] xl:px-[4%]">
      <a
        href="/"
        className="w-[25%] xl:w-[18%]"
      >
        <div className="w-[100%] flex flex-row items-center hover:opacity-30 cursor-pointer">
          <img className="w-[30%] xl:w-[37%] h-[70%]" src="/images/logo-goldilocks.png" alt="logo" />
          <h1 className="text-[3vw] xl:text-[2.4vw]">Goldilocks DAO</h1>
        </div>
      </a>
      <div className="w-[80%] xl:w-[65.2%] h-[100%] flex flex-row items-center justify-between text-[2.8vw] xl:text-[2.2vw]">
        <a href="https://goldilocks.gitbook.io/docs" target="_blank" className="hover:scale-[150%] cursor-pointer"><span>Wut is this?</span></a>
        {
          pathname === '/goldiswap/swap' ?
          <>
            <a className="text-[#DB7200]"><span>Goldiswap</span></a>
            <a href="/goldiswap/swap" className="hover:scale-[150%] cursor-pointer text-[#DB7200] underline underline-offset-8 text-[2.1vw] xl:text-[1.6vw]"><span>Swap</span></a>
            <a href="/goldiswap/stake" className="hover:scale-[150%] cursor-pointer text-[2.1vw] xl:text-[1.6vw]"><span>Stake</span></a>
            <a href="/goldiswap/borrow" className="hover:scale-[150%] cursor-pointer text-[2.1vw] xl:text-[1.6vw]"><span>Borrow</span></a>
          </> :
          pathname === '/goldiswap/stake' ?
          <>
            <a className="text-[#DB7200]"><span>Goldiswap</span></a>
            <a href="/goldiswap/swap" className="hover:scale-[150%] cursor-pointer text-[2.1vw] xl:text-[1.6vw]"><span>Swap</span></a>
            <a href="/goldiswap/stake" className="hover:scale-[150%] cursor-pointer text-[#DB7200] underline underline-offset-8 text-[2.1vw] xl:text-[1.6vw]"><span>Stake</span></a>
            <a href="/goldiswap/borrow" className="hover:scale-[150%] cursor-pointer text-[2.1vw] xl:text-[1.6vw]"><span>Borrow</span></a>
          </> :
          pathname === '/goldiswap/borrow' ?
          <>
            <a className="text-[#DB7200]"><span>Goldiswap</span></a>
            <a href="/goldiswap/swap" className="hover:scale-[150%] cursor-pointer text-[2.1vw] xl:text-[1.6vw]"><span>Swap</span></a>
            <a href="/goldiswap/stake" className="hover:scale-[150%] cursor-pointer text-[2.1vw] xl:text-[1.6vw]"><span>Stake</span></a>
            <a href="/goldiswap/borrow" className="hover:scale-[150%] cursor-pointer text-[#DB7200] underline underline-offset-8 text-[2.1vw] xl:text-[1.6vw]"><span>Borrow</span></a>
          </> :
          <a href="/goldiswap/swap" className="hover:scale-[150%] cursor-pointer"><span>Goldiswap</span></a>
        }
        {
          pathname === '/goldilend/borrow' ?
          <>
            <a className="text-[#DB7200]"><span>Goldilend</span></a>
            <a href="/goldilend/borrow" className="hover:scale-[150%] cursor-pointer text-[#DB7200] underline underline-offset-8 text-[2.1vw] xl:text-[1.6vw]"><span>Borrow</span></a>
            <a href="/goldilend/lend" className="hover:scale-[150%] cursor-pointer text-[2.1vw] xl:text-[1.6vw]"><span>Lend</span></a>
          </> :
          pathname === '/goldilend/lend' ?
          <>
            <a className="text-[#DB7200]"><span>Goldilend</span></a>
            <a href="/goldilend/borrow" className="hover:scale-[150%] cursor-pointer text-[2.1vw] xl:text-[1.6vw]"><span>Borrow</span></a>
            <a href="/goldilend/lend" className="hover:scale-[150%] cursor-pointer text-[#DB7200] underline underline-offset-8 text-[2.1vw] xl:text-[1.6vw]"><span>Lend</span></a>
          </> :
          <a href="/goldilend/borrow" className="hover:scale-[150%] cursor-pointer"><span>Goldilend</span></a>
        }
        <a href="/goldivaults" className="hover:scale-[150%] cursor-pointer"><span>Goldivaults</span></a>
        <ConnectButton.Custom>
          {({
            account,
            mounted,
            openConnectModal
          }) => {
            return (
              !mounted ?
                <button 
                  className="bg-[#E7B941] border-2 border-black px-9 py-2 hover:bg-[#F3AA8A] hover:scale-[110%] cursor-pointer w-[15.7%] flex items-center justify-center"
                >
                  ...
                </button>
              :
              !account ?
                <button 
                  className="bg-[#E7B941] border-2 border-black px-9 py-2 hover:bg-[#F3AA8A] hover:scale-[110%] cursor-pointer w-[15.7%] flex items-center justify-center"
                  onClick={openConnectModal}
                >
                  Connect
                </button>
              :
                <button 
                  className="border-2 border-black px-4 py-2 bg-[#F3AA8A] hover:scale-[110%] cursor-pointer w-[15.7%] flex items-center justify-center"
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