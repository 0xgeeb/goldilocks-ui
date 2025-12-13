"use client";

import { isEmpty } from "lodash";

import { Footer, NavBar, NavBarButtons, NavBarMobile } from "@/components/utils";
import { useDesktop } from "@/providers";

type Props = {
  onPageClick?: (e?: React.MouseEvent) => void;
  children: React.ReactNode;
  wutPopup: boolean;
  setWutPopup: (wutPopup: boolean) => void;
  bgImageUrl: string;
  maskBg?: string;
};

function CsrPageLayout({
  onPageClick,
  children,
  wutPopup,
  setWutPopup,
  bgImageUrl,
  maskBg,
}: Props) {
  const { navButtonsOpen, isDesktop } = useDesktop();

  return (
    <main
      className="relative flex min-h-screen w-full flex-col justify-between bg-cover"
      onClick={onPageClick}
      style={{
        backgroundImage: [maskBg, `url('${bgImageUrl}')`]
          .filter(Boolean)
          .join(","),
      }}
    >
      {isDesktop ? (
        <NavBar
          wutPopup={wutPopup}
          setWutPopup={setWutPopup}
          lighter={!isEmpty(maskBg)}
        />
      ) : (
        <div className="w-full h-full">
          <NavBarMobile />
          {navButtonsOpen && <NavBarButtons />}
        </div>
      )}
      <div className="w-full flex-1 basis-0 overflow-y-auto">
        {!navButtonsOpen && children}
        {/* todo: Add ChangeChain */}
        {/* <ChangeChain /> */}
      </div>
      {!navButtonsOpen && <Footer />}
    </main>
  );
}

export default CsrPageLayout;
