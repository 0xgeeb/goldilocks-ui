import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname } from "next/navigation";
import { WutPopup } from "../";

interface NavBarProps {
  wutPopup: boolean;
  setWutPopup: (_popup: boolean) => void;
}

export const NavBar = ({ wutPopup, setWutPopup }: NavBarProps) => {
  const pathname = usePathname();

  return (
    <>
      {wutPopup && <WutPopup />}
      <header className="flex h-[11%] w-[100%] flex-row items-center justify-between bg-[#EEDCD2] px-[2%] font-amaticbold xl:h-[15%] xl:px-[4%]">
        <a href="/" className="w-[25%] xl:w-[18%]">
          <div className="flex w-[100%] cursor-pointer flex-row items-center hover:opacity-30">
            <img
              className="h-[70%] w-[30%] xl:w-[37%]"
              src="/images/logo-goldilocks.png"
              alt="logo"
            />
            <h1 className="text-[3vw] xl:text-[2.4vw]">Goldilocks DAO</h1>
          </div>
        </a>
        <div className="flex h-[100%] w-[80%] flex-row items-center justify-between text-[2.8vw] xl:w-[65.2%] xl:text-[2.2vw]">
          <span
            className="cursor-pointer hover:scale-[150%]"
            onClick={() => setWutPopup(!wutPopup)}
          >
            Wut is this?
          </span>
          {pathname === "/goldiswap/swap" ? (
            <>
              <a className="text-[#DB7200]">
                <span>Goldiswap</span>
              </a>
              <a
                href="/goldiswap/swap"
                className="cursor-pointer text-[2.1vw] text-[#DB7200] underline underline-offset-8 hover:scale-[150%] xl:text-[1.6vw]"
              >
                <span>Swap</span>
              </a>
              <a
                href="/goldiswap/stake"
                className="cursor-pointer text-[2.1vw] hover:scale-[150%] xl:text-[1.6vw]"
              >
                <span>Stake</span>
              </a>
              <a
                href="/goldiswap/borrow"
                className="cursor-pointer text-[2.1vw] hover:scale-[150%] xl:text-[1.6vw]"
              >
                <span>Borrow</span>
              </a>
            </>
          ) : pathname === "/goldiswap/stake" ? (
            <>
              <a className="text-[#DB7200]">
                <span>Goldiswap</span>
              </a>
              <a
                href="/goldiswap/swap"
                className="cursor-pointer text-[2.1vw] hover:scale-[150%] xl:text-[1.6vw]"
              >
                <span>Swap</span>
              </a>
              <a
                href="/goldiswap/stake"
                className="cursor-pointer text-[2.1vw] text-[#DB7200] underline underline-offset-8 hover:scale-[150%] xl:text-[1.6vw]"
              >
                <span>Stake</span>
              </a>
              <a
                href="/goldiswap/borrow"
                className="cursor-pointer text-[2.1vw] hover:scale-[150%] xl:text-[1.6vw]"
              >
                <span>Borrow</span>
              </a>
            </>
          ) : pathname === "/goldiswap/borrow" ? (
            <>
              <a className="text-[#DB7200]">
                <span>Goldiswap</span>
              </a>
              <a
                href="/goldiswap/swap"
                className="cursor-pointer text-[2.1vw] hover:scale-[150%] xl:text-[1.6vw]"
              >
                <span>Swap</span>
              </a>
              <a
                href="/goldiswap/stake"
                className="cursor-pointer text-[2.1vw] hover:scale-[150%] xl:text-[1.6vw]"
              >
                <span>Stake</span>
              </a>
              <a
                href="/goldiswap/borrow"
                className="cursor-pointer text-[2.1vw] text-[#DB7200] underline underline-offset-8 hover:scale-[150%] xl:text-[1.6vw]"
              >
                <span>Borrow</span>
              </a>
            </>
          ) : (
            <a
              href="/goldiswap/swap"
              className="cursor-pointer hover:scale-[150%]"
            >
              <span>Goldiswap</span>
            </a>
          )}
          {pathname === "/goldilend/borrow" ? (
            <>
              <a className="text-[#DB7200]">
                <span>Goldilend</span>
              </a>
              <a
                href="/goldilend/borrow"
                className="cursor-pointer text-[2.1vw] text-[#DB7200] underline underline-offset-8 hover:scale-[150%] xl:text-[1.6vw]"
              >
                <span>Borrow</span>
              </a>
              <a
                href="/goldilend/lend"
                className="cursor-pointer text-[2.1vw] hover:scale-[150%] xl:text-[1.6vw]"
              >
                <span>Lend</span>
              </a>
            </>
          ) : pathname === "/goldilend/lend" ? (
            <>
              <a className="text-[#DB7200]">
                <span>Goldilend</span>
              </a>
              <a
                href="/goldilend/borrow"
                className="cursor-pointer text-[2.1vw] hover:scale-[150%] xl:text-[1.6vw]"
              >
                <span>Borrow</span>
              </a>
              <a
                href="/goldilend/lend"
                className="cursor-pointer text-[2.1vw] text-[#DB7200] underline underline-offset-8 hover:scale-[150%] xl:text-[1.6vw]"
              >
                <span>Lend</span>
              </a>
            </>
          ) : (
            <a
              href="/goldilend/borrow"
              className="cursor-pointer hover:scale-[150%]"
            >
              <span>Goldilend</span>
            </a>
          )}
          {pathname === "/goldivault/vaults" ? (
            <>
              <a className="text-[#DB7200]">
                <span>Goldivaults</span>
              </a>
              <a
                href="/goldivault/vaults"
                className="cursor-pointer text-[2.1vw] text-[#DB7200] underline underline-offset-8 hover:scale-[150%] xl:text-[1.6vw]"
              >
                <span>Vaults</span>
              </a>
            </>
          ) : pathname === "/goldivault/pools" ? (
            <>
              <a className="text-[#DB7200]">
                <span>Goldivaults</span>
              </a>
              <a
                href="/goldivault/vaults"
                className="cursor-pointer text-[2.1vw] hover:scale-[150%] xl:text-[1.6vw]"
              >
                <span>Vaults</span>
              </a>
              <a
                href="/goldivault/pools"
                className="cursor-pointer text-[2.1vw] text-[#DB7200] underline underline-offset-8 hover:scale-[150%] xl:text-[1.6vw]"
              >
                <span>Pools</span>
              </a>
            </>
          ) : pathname ===
            "/goldivault/vault/0x281F698b0969904Df5476CC4031B4C886dE86323" ? (
            <>
              <a className="text-[#DB7200]">
                <span>Goldivaults</span>
              </a>
              <a
                href="/goldivault/vaults"
                className="cursor-pointer text-[2.1vw] hover:scale-[150%] xl:text-[1.6vw]"
              >
                <span>Vaults</span>
              </a>
              <a
                href="/goldivault/vault/0x281F698b0969904Df5476CC4031B4C886dE86323"
                className="cursor-pointer text-[2.1vw] text-[#DB7200] underline underline-offset-8 hover:scale-[150%] xl:text-[1.6vw]"
              >
                <span>weETH</span>
              </a>
            </>
          ) : (
            <a
              href="/goldivault/vaults"
              className="cursor-pointer hover:scale-[150%]"
            >
              <span>Goldivaults</span>
            </a>
          )}
          <ConnectButton.Custom>
            {({ account, mounted, openConnectModal }) => {
              return !mounted ? (
                <button className="flex w-[15.7%] cursor-pointer items-center justify-center border-2 border-black bg-[#E7B941] px-9 py-2 hover:scale-[110%] hover:bg-[#F3AA8A]">
                  ...
                </button>
              ) : !account ? (
                <button
                  className="flex w-[15.7%] cursor-pointer items-center justify-center border-2 border-black bg-[#E7B941] px-9 py-2 hover:scale-[110%] hover:bg-[#F3AA8A]"
                  onClick={openConnectModal}
                >
                  Connect
                </button>
              ) : (
                <button className="flex w-[15.7%] cursor-pointer items-center justify-center border-2 border-black bg-[#F3AA8A] px-4 py-2 hover:scale-[110%]">
                  {`${account.address.slice(0, 5)}...${account?.address.slice(-3)}`}
                </button>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </header>
    </>
  );
};
