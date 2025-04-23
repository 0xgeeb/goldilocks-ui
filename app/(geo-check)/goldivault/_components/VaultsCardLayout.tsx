"use client";

import { cn } from "@/app/_components/utils";

import styles from "./VaultsCardLayout.module.css";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
};

function VaultsCardLayout({ children, title, icon }: Props) {
  return (
    <div
    className={cn(
      "flex flex-col items-center justify-center p-4 sm:p-8 md:px-20 md:py-10",
    )}
    >
      <div
        style={{
          backdropFilter: "blur(18px)",
          backgroundColor: "rgba(26,20,12, 0.75)",
        }}
        className={cn(
          "flex w-full flex-col gap-3 rounded-3xl p-6 max-w-5xl",
          styles.vaultsBg,
        )}
      >
        <div className="flex flex-row items-center gap-3">
          <h1
            id="page-title"
            className="text-HoneyYellow font-amaticbold text-6xl"
          >
            {title}
          </h1>
          {icon}
        </div>
        <Link href="/goldivault/vaults" className="flex flex-row w-fit items-center gap-1 text-white hover:text-honey-yellow font-baloo text-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          <button className="font-baloo text-2xl cursor-pointer">
            Back
          </button>
        </Link>
        {children}
      </div>
    </div>
  );
}

export default VaultsCardLayout;
