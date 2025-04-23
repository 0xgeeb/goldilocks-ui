"use client";

import { VaultDisplayMobile } from "../";
import { useDesktop } from "../../../providers";
import { FooterMobile, NavBarButtons, NavBarMobile } from "../../utils";

export const GoldivaultPageMobile = () => {
  const { navButtonsOpen } = useDesktop();

  return (
    <main className="min-h-screen w-screen">
      <NavBarMobile />
      {navButtonsOpen && <NavBarButtons />}
      {!navButtonsOpen && (
        <div className="relative min-h-[89%] w-full bg-[url('/images/bg-goldivault-mobile.png')] bg-cover pt-6">
          <div className="mx-auto w-[90%] rounded-xl bg-[rgba(29,22,13,0.75)] p-4 backdrop-blur-md">
            <div className="flex flex-row items-center gap-2 mb-3">
              <h1
                className="font-amaticbold text-[10vw] text-HoneyYellow"
                id="page-title"
              >
                Goldivaults
              </h1>
              <img src="/images/icons/box.svg" alt="box" className="w-6 h-6" />
            </div>
            <div className="text-WarmText text-lg mb-4">
              Ooga booga. Money printer go brrrrr haha.
            </div>
            
            <VaultDisplayMobile />
          </div>
          <FooterMobile />
        </div>
      )}
    </main>
  );
};
