"use client";

import { BorrowTabMobile, NewAuctionsTabMobile, NewGHoneyTabMobile, RepayTabMobile } from "../";
import { TogglesMobile } from "../togglesMobile";
import { useDesktop, useGoldilend } from "../../../providers";
import { BorrowFetcher, GoldilendStatsMarquee } from "../../goldilend";
import { FooterMobile, NavBarButtons, NavBarMobile } from "../../utils";

export const GoldilendPageMobile = () => {
  const { activeToggle } = useGoldilend();
  const { navButtonsOpen } = useDesktop();

  const renderContent = () => {
    switch (activeToggle) {
      case "BORROW":
        return <BorrowTabMobile />;
      case "REPAY":
        return <RepayTabMobile />;
      case "AUCTIONS":
        return <NewAuctionsTabMobile />;
      case "GHONEY":
        return <NewGHoneyTabMobile />;
      default:
        return null;
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col bg-[url('/images/bg-goldilend-mobile.png')] bg-cover bg-bottom">
      <NavBarMobile />
      {navButtonsOpen ? (
        <NavBarButtons />
      ) : (
        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-4 pb-6 pt-4" id="hide-scrollbar">
            <div className="space-y-4">
              <div className="rounded-3xl border border-amber-900/40 bg-black/85 p-4 text-white shadow-2xl space-y-3">
                <TogglesMobile />
                <div className="w-full">
                  <GoldilendStatsMarquee />
                </div>
              </div>
              {renderContent()}
            </div>
          </div>

          <BorrowFetcher />
          <FooterMobile />
        </div>
      )}
    </main>
  );
};
