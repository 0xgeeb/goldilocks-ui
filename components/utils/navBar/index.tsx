import { Fragment } from "react";

import { usePathname } from "next/navigation";

import { cn } from "@/app/_components/utils";
import { VAULTS } from "@/components/goldivault";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { WutPopup } from "../";

const NavLinks = () => {
  const pathname = usePathname();

  const NAV_CONFIG: {
    [key: string]: {
      title: string;
      links: { path: string; text: string }[];
      defaultPath?: string;
    };
  } = {
    goldiswap: {
      title: "Goldiswap",
      links: [
        { path: "/goldiswap/swap", text: "Swap" },
        { path: "/goldiswap/stake", text: "Stake" },
        { path: "/goldiswap/borrow", text: "Borrow" },
      ],
    },
    goldilend: {
      title: "Goldilend",
      links: [
        { path: "/goldilend/borrow", text: "Borrow" },
        { path: "/goldilend/lend", text: "Lend" },
      ],
    },
    goldivault: {
      title: "Goldivaults",
      defaultPath: "/goldivault/vaults",
      links: [
        ...VAULTS.map(({ address, tokenName }) => ({
          path: `/goldivault/vault/${address}`,
          text: tokenName,
        })),
      ].filter((link) => link.path === pathname),
    },
  };

  return (
    <>
      {Object.values(NAV_CONFIG).map(({ title, links, defaultPath = null }) => {
        const hasDefaultPath = defaultPath !== null;
        const isParentPath = hasDefaultPath && defaultPath === pathname;
        const isSubPath = links.map((link) => link.path).includes(pathname);

        return (
          <Fragment key={title}>
            <a
              className={cn(
                (isSubPath || isParentPath) && "text-[#DB7200]",
                hasDefaultPath &&
                  !isParentPath &&
                  "cursor-pointer hover:scale-[150%]",
                isParentPath && "underline underline-offset-8",
              )}
              href={
                hasDefaultPath && !isParentPath
                  ? defaultPath
                  : isSubPath
                    ? undefined
                    : links?.[0]?.path
              }
            >
              <span>{title}</span>
            </a>
            {isSubPath &&
              links.map((link) => (
                <a
                  key={link.text}
                  href={link.path}
                  className={cn(
                    "cursor-pointer text-[2.1vw] hover:scale-[150%] xl:text-[1.6vw]",
                    pathname === link.path &&
                      "text-[#DB7200] underline underline-offset-8",
                  )}
                >
                  <span>{link.text}</span>
                </a>
              ))}
          </Fragment>
        );
      })}
    </>
  );
};

type NavBarProps = {
  wutPopup: boolean;
  setWutPopup: ((_popup: boolean) => void) | null;
  hideConnectButton?: boolean;
};

export const NavBar = ({
  wutPopup,
  setWutPopup,
  hideConnectButton,
}: NavBarProps) => {

  const pathname = usePathname();

  return (
    <>
      {wutPopup && <WutPopup />}
      <header className="flex h-[11%] w-full flex-row items-center justify-between bg-[#EEDCD2] px-[2%] font-amaticbold xl:h-[15%] xl:px-[4%]">
        <a href="/" className="w-1/4 xl:w-[18%]">
          <div className="flex w-full cursor-pointer flex-row items-center hover:opacity-30">
            <img
              className="h-[70%] w-[30%] xl:w-[37%]"
              src="/images/logo-goldilocks.png"
              alt="logo"
            />
            <h1 className="text-[3vw] xl:text-[2.4vw]">Goldilocks DAO</h1>
          </div>
        </a>
        <div className="flex h-full w-4/5 flex-row items-center justify-between text-[2.8vw] xl:w-[65.2%] xl:text-[2.2vw]">
          <span
            className="cursor-pointer hover:scale-[150%]"
            onClick={() => setWutPopup?.(!wutPopup)}
          >
            Wut is this?
          </span>
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
            </> :
            pathname === '/goldivault/vault/rusd' ?
            <>
              <a className="text-[#DB7200]"><span>Goldivaults</span></a>
              <a href="/goldivault/vaults" className="hover:scale-[150%] cursor-pointer text-[2.1vw] xl:text-[1.6vw]"><span>Vaults</span></a>
              <a href="/goldivault/vault/rusd" className="hover:scale-[150%] cursor-pointer text-[#DB7200] underline underline-offset-8 text-[2.1vw] xl:text-[1.6vw]"><span>rUSD</span></a>
            </> :
            pathname === '/goldivault/vault/unibtc' ?
            <>
              <a className="text-[#DB7200]"><span>Goldivaults</span></a>
              <a href="/goldivault/vaults" className="hover:scale-[150%] cursor-pointer text-[2.1vw] xl:text-[1.6vw]"><span>Vaults</span></a>
              <a href="/goldivault/vault/unibtc" className="hover:scale-[150%] cursor-pointer text-[#DB7200] underline underline-offset-8 text-[2.1vw] xl:text-[1.6vw]"><span>uniBTC</span></a>
            </> :
            <a href="/goldivault/vaults" className="hover:scale-[150%] cursor-pointer"><span>Goldivaults</span></a>
          }
          {!hideConnectButton && (
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
          )}
        </div>
      </header>
    </>
  );
};
