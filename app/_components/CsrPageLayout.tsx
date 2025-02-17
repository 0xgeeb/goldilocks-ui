"use client";

import { ChangeChain, Footer, NavBar } from "@/components/utils";

import { cn } from "./utils";

type Props = {
  onPageClick: (e?: React.MouseEvent) => void;
  children: React.ReactNode;
  wutPopup: boolean;
  setWutPopup: (wutPopup: boolean) => void;
  bgImageUrl: string;
};

function CsrPageLayout({
  onPageClick,
  children,
  wutPopup,
  setWutPopup,
  bgImageUrl,
}: Props) {
  return (
    <main className="h-screen w-screen" onClick={onPageClick}>
      <NavBar wutPopup={wutPopup} setWutPopup={setWutPopup} />
      <div
        className={cn("relative h-[89%] w-full bg-cover bg-bottom xl:h-[85%]")}
        style={{
          backgroundImage: `url('${bgImageUrl}')`,
        }}
      >
        {children}
        <Footer />
        <ChangeChain />
      </div>
    </main>
  );
}

export default CsrPageLayout;
