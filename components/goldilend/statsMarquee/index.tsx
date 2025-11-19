'use client';

import type { ReactNode } from "react";
import Image from "next/image";
import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
} from '@/components/ui/shadcn-io/marquee';

import { useGoldilend } from "../../../providers";

const badgeClass =
  "inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo font-semibold leading-none";

const CategoryBadge = ({ label, icon }: { label: string; icon?: ReactNode }) => (
  <span className={`${badgeClass} text-base tracking-wide sm:text-lg`}>
    {icon}
    {label}
  </span>
);

const StatPill = ({
  label,
  value,
  suffix,
  icon,
  iconPosition = "start",
  href,
}: {
  label: string;
  value: string;
  suffix?: string;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  href?: string;
}) => {
  const suffixText = suffix && value !== "-" ? suffix : "";
  const className = `${badgeClass} text-sm sm:text-base`;

  const content = (
    <>
      {iconPosition === "start" && icon}
      <span>
        {value}
        {suffixText}
      </span>
      {iconPosition === "end" && icon}
    </>
  );

  return (
    <div className="flex items-center gap-2 text-sm text-white sm:text-base">
      <span className="font-baloo font-semibold text-white">{label}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${className} hover:bg-amber-900/40`}
        >
          {content}
        </a>
      ) : (
        <span className={className}>{content}</span>
      )}
    </div>
  );
};

export const GoldilendStatsMarquee = () => {
  const { goldilendInfo, infoLoading } = useGoldilend();

  const formatAsNumber = (num: number, digits = 2): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: digits });
  };

  const handleNum = (num: number, digits = 2) => {
    if (infoLoading) return "-";
    if (num > 0) return formatAsNumber(num, digits);
    return "-";
  };

  // Derived values
  const utilization = goldilendInfo.poolSize > 0
    ? (goldilendInfo.outstandingDebt / goldilendInfo.poolSize) * 100
    : 0;

  // Values sourced to match Goldilend Info panel
  const maxDurationDays = '30 days';
  const redeemableRaw = Math.min(
    Math.max(goldilendInfo.poolSize - goldilendInfo.outstandingDebt, 0),
    goldilendInfo.maxUtilization * goldilendInfo.poolSize
  );
  const totalRedeemable = handleNum(redeemableRaw);
  // reward vault link rendered directly in JSX
  // const totalLent = handleNum(goldilendInfo.poolSize);
  const totalLent = '-'
  const totalBorrowed = handleNum(goldilendInfo.outstandingDebt);

  return (
    <div className="w-full overflow-hidden py-0">
      <Marquee>
        <MarqueeContent speed="slow" pauseOnHover>
          {/* PARAMS */}
          <MarqueeItem className="flex items-center gap-4 px-4 sm:px-6">
            <CategoryBadge label="Params" />
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <StatPill label="Max Duration" value={maxDurationDays} />
              <StatPill label="Max Utilization" value={handleNum(goldilendInfo.maxUtilization)} suffix="%" />
              <StatPill label="Max Interest Rate" value={handleNum(goldilendInfo.protocolInterestRate, 2)} suffix="%" />
            </div>
          </MarqueeItem>

          {/* Separator */}
          <MarqueeItem className="px-2 sm:px-4">
            <div className="h-8 w-px bg-white/20" />
          </MarqueeItem>

          {/* gHoney */}
          <MarqueeItem className="flex items-center gap-4 px-4 sm:px-6">
            <CategoryBadge
              label="gHoney"
              icon={
                <Image
                  src="/images/bhoney-logo.png"
                  alt="gHoney"
                  width={26}
                  height={26}
                  className="rounded-full"
                />
              }
            />
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <StatPill
                label="Total Supply"
                value={handleNum(goldilendInfo.glhoneySupply)}
                icon={
                  <Image
                    src="/images/bhoney-logo.png"
                    alt="gHoney"
                    width={18}
                    height={18}
                    className="rounded-full"
                  />
                }
              />
              <StatPill
                label="Total Redeemable"
                value={totalRedeemable}
                icon={
                  <Image
                    src="/images/bhoney-logo.png"
                    alt="gHoney"
                    width={18}
                    height={18}
                    className="rounded-full"
                  />
                }
              />
              <StatPill
                label="Beradrome Farm"
                value="Open"
                href="https://www.beradrome.com/farms/0x3E185233A6aA7390bc9292ab26E955c47b95B5A8"
                icon={
                  <Image src="/images/icon-share.png" alt="share" width={16} height={16} />
                }
                iconPosition="end"
              />
            </div>
          </MarqueeItem>

          {/* Separator */}
          <MarqueeItem className="px-2 sm:px-4">
            <div className="h-8 w-px bg-white/20" />
          </MarqueeItem>

          {/* HONEY */}
          <MarqueeItem className="flex items-center gap-4 px-4 sm:px-6">
            <CategoryBadge
              label="HONEY"
              icon={
                <Image
                  src="/images/logo-honey.png"
                  alt="HONEY"
                  width={26}
                  height={26}
                />
              }
            />
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <StatPill
                label="Total Lent"
                value={totalLent}
                icon={
                  <Image src="/images/logo-honey.png" alt="HONEY" width={16} height={16} />
                }
              />
              <StatPill
                label="Total Borrowed"
                value={totalBorrowed}
                icon={
                  <Image src="/images/logo-honey.png" alt="HONEY" width={16} height={16} />
                }
              />
              <StatPill
                label="Utilization"
                value={handleNum(utilization)}
                suffix="%"
              />
            </div>
          </MarqueeItem>

          {/* Separator */}
          <MarqueeItem className="px-2 sm:px-4">
            <div className="h-8 w-px bg-white/20" />
          </MarqueeItem>

        </MarqueeContent>
      </Marquee>
    </div>
  );
};




