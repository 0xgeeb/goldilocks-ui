import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname } from "next/navigation";

export const NavBarButtons = () => {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-full bg-[#E4B19B] flex-col items-center justify-between py-[8%]">
      <div className="flex h-[90%] w-[100%] flex-col items-center justify-between font-amaticbold text-[11vw]">
        <ConnectButton.Custom>
          {({ account, mounted, openConnectModal }) => {
            return !mounted ? (
              <button className="w-[50%] cursor-pointer border-2 border-black bg-[#E7B941] hover:scale-[110%] hover:bg-[#F3AA8A]">
                ...
              </button>
            ) : !account ? (
              <button
                className="w-[50%] cursor-pointer border-2 border-black bg-[#E7B941] hover:scale-[110%] hover:bg-[#F3AA8A]"
                onClick={openConnectModal}
              >
                Connect
              </button>
            ) : (
              <button className="w-[50%] cursor-pointer border-2 border-black bg-[#F3AA8A] hover:scale-[110%]">
                {`${account.address.slice(0, 5)}...${account?.address.slice(-3)}`}
              </button>
            );
          }}
        </ConnectButton.Custom>
        <a
          href="https://goldilocks.gitbook.io/goldidocs"
          target="_blank"
          className="cursor-pointer hover:scale-[150%]"
          rel="noreferrer"
        >
          <span>Wut Is This?</span>
        </a>
        {pathname === "/goldiswap/swap" ? (
          <>
            <a className="text-[#DB7200]">
              <span>Goldiswap</span>
            </a>
            <a
              href="/goldiswap/swap"
              className="cursor-pointer text-[7vw] text-[#DB7200] underline underline-offset-8 hover:scale-[150%]"
            >
              <span>Swap</span>
            </a>
            <a
              href="/goldiswap/stake"
              className="cursor-pointer text-[7vw] hover:scale-[150%]"
            >
              <span>Stake</span>
            </a>
            <a
              href="/goldiswap/borrow"
              className="cursor-pointer text-[7vw] hover:scale-[150%]"
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
              className="cursor-pointer text-[7vw] hover:scale-[150%]"
            >
              <span>Swap</span>
            </a>
            <a
              href="/goldiswap/stake"
              className="cursor-pointer text-[7vw] text-[#DB7200] underline underline-offset-8 hover:scale-[150%]"
            >
              <span>Stake</span>
            </a>
            <a
              href="/goldiswap/borrow"
              className="cursor-pointer text-[7vw] hover:scale-[150%]"
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
              className="cursor-pointer text-[7vw] hover:scale-[150%]"
            >
              <span>Swap</span>
            </a>
            <a
              href="/goldiswap/stake"
              className="cursor-pointer text-[7vw] hover:scale-[150%]"
            >
              <span>Stake</span>
            </a>
            <a
              href="/goldiswap/borrow"
              className="cursor-pointer text-[7vw] text-[#DB7200] underline underline-offset-8 hover:scale-[150%]"
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
              className="cursor-pointer text-[7vw] text-[#DB7200] underline underline-offset-8 hover:scale-[150%]"
            >
              <span>Borrow</span>
            </a>
            <a
              href="/goldilend/lend"
              className="cursor-pointer text-[7vw] hover:scale-[150%]"
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
              className="cursor-pointer text-[7vw] hover:scale-[150%]"
            >
              <span>Borrow</span>
            </a>
            <a
              href="/goldilend/lend"
              className="cursor-pointer text-[7vw] text-[#DB7200] underline underline-offset-8 hover:scale-[150%]"
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
              className="cursor-pointer text-[7vw] text-[#DB7200] underline underline-offset-8 hover:scale-[150%]"
            >
              <span>Vaults</span>
            </a>
          </>
        ) : pathname ===
          "/goldivault/vault/rusd" ? (
          <>
            <a className="text-[#DB7200]">
              <span>Goldivaults</span>
            </a>
            <a
              href="/goldivault/vaults"
              className="cursor-pointer text-[7vw] hover:scale-[150%]"
            >
              <span>Vaults</span>
            </a>
            <a
              href="/goldivault/vault/rusd"
              className="cursor-pointer text-[7vw] text-[#DB7200] underline underline-offset-8 hover:scale-[150%]"
            >
              <span>rUSD</span>
            </a>
          </>
        ) : pathname ===
          "/goldivault/vault/unibtc" ? (
          <>
            <a className="text-[#DB7200]">
              <span>Goldivaults</span>
            </a>
            <a
              href="/goldivault/vaults"
              className="cursor-pointer text-[7vw] hover:scale-[150%]"
            >
              <span>Vaults</span>
            </a>
            <a
              href="/goldivault/vault/unibtc"
              className="cursor-pointer text-[7vw] text-[#DB7200] underline underline-offset-8 hover:scale-[150%]"
            >
              <span>uniBTC</span>
            </a>
          </>
        ) : pathname ===
          "/goldivault/vault/oribgt" ? (
          <>
            <a className="text-[#DB7200]">
              <span>Goldivaults</span>
            </a>
            <a
              href="/goldivault/vaults"
              className="cursor-pointer text-[7vw] hover:scale-[150%]"
            >
              <span>Vaults</span>
            </a>
            <a
              href="/goldivault/vault/unibtc"
              className="cursor-pointer text-[7vw] text-[#DB7200] underline underline-offset-8 hover:scale-[150%]"
            >
              <span>oriBGT</span>
            </a>
          </>
        ) : pathname ===
          "/goldivault/vault/rseth" ? (
          <>
            <a className="text-[#DB7200]">
              <span>Goldivaults</span>
            </a>
            <a
              href="/goldivault/vaults"
              className="cursor-pointer text-[7vw] hover:scale-[150%]"
            >
              <span>Vaults</span>
            </a>
            <a
              href="/goldivault/vault/unibtc"
              className="cursor-pointer text-[7vw] text-[#DB7200] underline underline-offset-8 hover:scale-[150%]"
            >
              <span>rsETH</span>
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
        {pathname?.startsWith("/goldigovernance") ? (
          <>
            <a className="text-[#DB7200]">
              <span>Gov</span>  
            </a>
            <a
              href="/goldigovernance/proposals"
              className={`cursor-pointer text-[7vw] hover:scale-[150%] ${pathname === "/goldigovernance/proposals" || pathname?.startsWith("/goldigovernance/proposal/") ? "text-[#DB7200] underline underline-offset-8" : ""}`}
            >
              <span>Proposals</span>
            </a>
            <a
              href="/goldigovernance/propose"
              className={`cursor-pointer text-[7vw] hover:scale-[150%] ${pathname === "/goldigovernance/propose" ? "text-[#DB7200] underline underline-offset-8" : ""}`}
            >
              <span>Propose</span>
            </a>
          </>
        ) : (
          <a
            href="/goldigovernance/proposals"
            className="cursor-pointer hover:scale-[150%]"
          >
            <span>Gov</span>
          </a>
        )}
      </div>
      <div className="flex h-[10%] w-[50%] flex-row items-center justify-between">
        <h1 className="font-amaticbold text-[7vw]">ooga booga</h1>
        <div className="mt-2 flex h-[100%] w-[40%] flex-row items-center">
          <a
            className="mr-2 w-[55%] cursor-pointer hover:scale-[150%]"
            href="https://x.com/goldilocksmoney"
            target="_blank"
            rel="noreferrer"
          >
            <img className="" src="/images/icon-x-dark.png" alt="twitter" />
          </a>
          <a
            className="w-[30%] cursor-pointer hover:scale-[150%]"
            href="https://discord.gg/3cdn88Mbq8"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className=""
              src="/images/icon-discord-dark.png"
              alt="discord"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
