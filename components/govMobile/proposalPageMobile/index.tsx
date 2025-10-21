"use client";

import { ProposalBoxMobile, ProposalButtonsMobile } from "../";
import { useDesktop } from "../../../providers";
import { ProposalsFetcher } from "../../gov";
import { FooterMobile, NavBarButtons, NavBarMobile } from "../../utils";

type BoxProps = {
  number: string;
};

export const ProposalPageMobile = ({ number }: BoxProps) => {
  const { navButtonsOpen } = useDesktop();

  return (
    <main className="flex min-h-screen w-screen flex-col">
      <NavBarMobile />
      {navButtonsOpen && <NavBarButtons />}
      {!navButtonsOpen && (
        <>
          <div className="relative flex-1 w-full bg-[url('/images/bg-goldiswap-mobile.png')] bg-cover">
            <h1
              className="absolute left-[3%] top-[0.5%] font-amaticbold text-[12vw] text-[#D9C6BA]"
              id="page-title"
            >
              Proposal #{number}
            </h1>
            <ProposalBoxMobile number={number} />
            <ProposalButtonsMobile number={number} />
            <ProposalsFetcher />
          </div>
          <FooterMobile />
        </>
      )}
    </main>
  );
};
