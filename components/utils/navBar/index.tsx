import { ConnectButton } from "@rainbow-me/rainbowkit"
import { usePathname } from "next/navigation"

interface NavBarProps {
  wutPopup: boolean;
  setWutPopup: (_popup: boolean) => void;
}

export const NavBar = ({ wutPopup, setWutPopup }: NavBarProps) => {

  const pathname = usePathname()

  return (
    <>
      {
        wutPopup &&
        <div className="absolute top-[11%] xl:top-[15%] left-[21.5%] xl:left-[34%] h-[30%] w-[15%] xl:w-[10%] z-50 bg-[#FFE59F] border-b-2 border-r-2 border-l-2 border-black flex flex-col items-center justify-around font-baloo font-semibold text-center px-2 text-[2vw] xl:text-[1.5vw] 2xl:text-[1vw]">
          <a href="https://goldilocks.gitbook.io/docs" target="_blank"><span className="hover:underline cursor-pointer">docs</span></a>
          <a href="https://mirror.xyz/0x9F5b6da006a3E13a597A2615AA8849645cC43Ec0" target="_blank"><span className="hover:underline cursor-pointer">mirror</span></a>
          <a href="https://x.com/goldilocksmoney" target="_blank"><span className="hover:underline cursor-pointer">twitter</span></a>
          <a href="https://discord.gg/3cdn88Mbq8" target="_blank"><span className="hover:underline cursor-pointer">discord</span></a>
        </div>
      }
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
          <span className="hover:scale-[150%] cursor-pointer" onClick={() => setWutPopup(!wutPopup)}>Wut is this?</span>
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
          {
            pathname === '/goldivault/vaults' ?
            <>
              <a className="text-[#DB7200]"><span>Goldivaults</span></a>
              <a href="/goldivault/vaults" className="hover:scale-[150%] cursor-pointer text-[#DB7200] underline underline-offset-8 text-[2.1vw] xl:text-[1.6vw]"><span>Vaults</span></a>
              <a href="/goldivault/pools" className="hover:scale-[150%] cursor-pointer text-[2.1vw] xl:text-[1.6vw]"><span>Pools</span></a>
              <a href="/goldivault/vault/0x541C4aCA915ccC83B1bf48b510D1653cba61115F" className="hover:scale-[150%] cursor-pointer text-[2.1vw] xl:text-[1.6vw]"><span>bHoney</span></a>
            </> :
            pathname === '/goldivault/pools' ?
            <>
              <a className="text-[#DB7200]"><span>Goldivaults</span></a>
              <a href="/goldivault/vaults" className="hover:scale-[150%] cursor-pointer text-[2.1vw] xl:text-[1.6vw]"><span>Vaults</span></a>
              <a href="/goldivault/pools" className="hover:scale-[150%] cursor-pointer text-[#DB7200] underline underline-offset-8 text-[2.1vw] xl:text-[1.6vw]"><span>Pools</span></a>
              <a href="/goldivault/vault/0x541C4aCA915ccC83B1bf48b510D1653cba61115F" className="hover:scale-[150%] cursor-pointer text-[2.1vw] xl:text-[1.6vw]"><span>bHoney</span></a>
            </> :
            pathname === '/goldivault/vault/0x541C4aCA915ccC83B1bf48b510D1653cba61115F' ?
            <>
              <a href="/goldivault/vaults" className="hover:scale-[150%] cursor-pointer text-[2.1vw] xl:text-[1.6vw]"><span>Vaults</span></a>
              <a href="/goldivault/pools" className="hover:scale-[150%] cursor-pointer text-[2.1vw] xl:text-[1.6vw]"><span>Pools</span></a>
              <a href="/goldivault/vault/0x541C4aCA915ccC83B1bf48b510D1653cba61115F" className="hover:scale-[150%] cursor-pointer text-[#DB7200] underline underline-offset-8 text-[2.1vw] xl:text-[1.6vw]"><span>bHoney</span></a>
            </> :
            <a href="/goldivault/vaults" className="hover:scale-[150%] cursor-pointer"><span>Goldivaults</span></a>
          }
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
    </>
  )
}