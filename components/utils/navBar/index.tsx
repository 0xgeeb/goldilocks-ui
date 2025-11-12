import { Fragment } from "react";

import { usePathname } from "next/navigation";

import { VAULTS } from "@/app/(geo-check)/goldivault/_components/constant/vaults";
import { cn } from "@/app/_components/utils";
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
      defaultPath: "/goldiswap/swap",
      links: [
        { path: "/goldiswap/swap", text: "Swap" },
        { path: "/goldiswap/stake", text: "Stake" },
        { path: "/goldiswap/borrow", text: "Borrow" },
      ],
    },
    goldilend: {
      title: "Goldilend",
      defaultPath: "/goldilend",
      links: [],
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
                //                (isSubPath || isParentPath) && "text-[#DB7200]",
                hasDefaultPath && !isParentPath && "cursor-pointer hover:scale-110",
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
                    "cursor-pointer text-[2.1vw]",
                    pathname === link.path && "underline underline-offset-8", //  text-[#DB7200]
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
  lighter?: boolean;
};

export const NavBar = ({
  wutPopup,
  setWutPopup,
  hideConnectButton,
  lighter = false,
}: NavBarProps) => {
  // const pathname = usePathname();

  return (
    <>
      {wutPopup && <WutPopup />}
      <header className="font-amaticbold z-20 flex w-full flex-row items-center justify-between px-[2%] py-5">
        <a href="/" className="w-1/4">
          <div className="flex w-full cursor-pointer flex-row items-center hover:opacity-30">
            <img className="h-12 md:h-16 lg:h-20" src="/images/logo-goldilocks.png" alt="logo" />
            <h1
              className={cn(
                "text-3xl md:text-4xl lg:text-6xl font-bold",
                lighter ? "text-white" : "text-HoneyYellow",
              )}
            >
              Goldilocks
            </h1>
          </div>
        </a>
        <div
          className={cn(
            "font-amatic flex h-full items-center justify-between gap-5 text-2xl md:text-3xl lg:text-4xl",
            lighter ? "text-white" : "text-Teak",
          )}
        >
          {/* <span
            className="cursor-pointer hover:scale-[150%]"
            onClick={() => setWutPopup?.(!wutPopup)}
          >
            Wut is this?
          </span> */}
          <NavLinks />
          {!hideConnectButton && (
            <div className="text-BeraBrown">
              <ConnectButton.Custom>
                {({ account, mounted, openConnectModal }) => (
                  <button
                    className={cn(
                      "font-amaticbold flex cursor-pointer items-center justify-center rounded-xl border-2 border-black px-6",
                      !mounted || !account
                        ? "bg-[#E7B941] hover:bg-[#F3AA8A]"
                        : "bg-[#F3AA8A]",
                    )}
                    onClick={() =>
                      !mounted ? null : !account ? openConnectModal() : null
                    }
                  >
                    {(() => {
                      if (!mounted) return "...";
                      if (!account) return "Connect";
                      return `${account.address.slice(0, 5)}...${account.address.slice(-3)}`;
                    })()}
                  </button>
                )}
              </ConnectButton.Custom>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
