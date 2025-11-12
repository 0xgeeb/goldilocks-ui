"use client";

import { ProposalsBoxMobile } from "../";
import { useDesktop } from "../../../providers";
import { ProposalsFetcher } from "../../gov";
import { FooterMobile, NavBarButtons, NavBarMobile } from "../../utils";

export const ProposalsPageMobile = () => {
  const { navButtonsOpen } = useDesktop();

  return (
    <main className="flex min-h-screen w-screen flex-col">
      <NavBarMobile />
      {navButtonsOpen && <NavBarButtons />}
      {!navButtonsOpen && (
        <>
        <div className="relative flex-1 w-full bg-[url('/images/bg-goldiswap-mobile.png')] bg-cover">
          <a href="/goldigovernance/propose">
            <div className="absolute right-[4%] top-[3%] flex h-[6%] w-[30%] items-center justify-center border-2 border-black bg-[#E7B941] font-amaticbold text-[5.5vw] text-black">
              new proposal
            </div>
          </a>
          <a href="/goldigovernance/govlocks">
            <div className="absolute right-[4%] top-[10.5%] flex h-[6%] w-[30%] items-center justify-center border-2 border-black bg-[#E7B941] font-amaticbold text-[5.5vw] text-black">
              get $govLOCKS
            </div>
          </a>
          <ProposalsBoxMobile />
          <ProposalsFetcher />
        </div>
        <FooterMobile />
        </>
      )}
    </main>
  );
};
