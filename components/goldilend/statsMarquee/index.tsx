'use client';

import type { ReactNode } from "react";
import Image from "next/image";
import { useGoldilend } from "../../../providers";

const badgeClass =
  "inline-flex flex-shrink-0 items-center gap-1 px-1 py-0.5 h-4 sm:gap-1.5 sm:px-1.5 sm:py-0.5 sm:h-6 rounded-full border border-amber-700/50 bg-amber-900/20 text-HoneyYellow font-baloo font-semibold leading-[9px] sm:leading-[12px] whitespace-nowrap";

const CategoryBadge = ({ label, icon }: { label: string; icon?: ReactNode }) => (
  <span className={`${badgeClass} text-[7px] tracking-wide sm:text-sm`}>
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
  const className = `${badgeClass} text-[7px] sm:text-sm`;

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
    <div className="flex items-center gap-2 text-[7px] text-white sm:text-sm">
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

const Section = ({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: ReactNode;
  children: ReactNode;
}) => (
  <div className="flex flex-nowrap items-center gap-2 sm:gap-4 whitespace-nowrap">
    <CategoryBadge label={label} icon={icon} />
    <div className="flex flex-nowrap items-center gap-2 sm:gap-4 whitespace-nowrap">
      {children}
    </div>
  </div>
);

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

  const redeemableRaw = Math.min(
    Math.max(goldilendInfo.poolSize - goldilendInfo.outstandingDebt, 0),
    goldilendInfo.maxUtilization * goldilendInfo.poolSize
  );
  const totalRedeemable = handleNum(redeemableRaw);
  // reward vault link rendered directly in JSX
  const totalLent = handleNum(goldilendInfo.poolSize);
  const totalBorrowed = handleNum(goldilendInfo.outstandingDebt);

  return (
    <div className="w-full overflow-x-auto py-0">
      <div className="flex w-full flex-col items-center gap-2 px-1 sm:gap-5 sm:px-3 xl:min-w-max xl:flex-row xl:items-center xl:justify-center">
        <Section
          label="HONEY"
          icon={
            <Image
              src="/images/logo-honey.png"
              alt="HONEY"
              width={14}
              height={14}
            />
          }
        >
          <StatPill
            label="Lent"
            value={totalLent}
            icon={
              <Image src="/images/logo-honey.png" alt="HONEY" width={10} height={10} />
            }
          />
          <StatPill
            label="Borrowed"
            value={totalBorrowed}
            icon={
              <Image src="/images/logo-honey.png" alt="HONEY" width={10} height={10} />
            }
          />
          <StatPill
            label="Util"
            value={handleNum(utilization)}
            suffix="%"
          />
        </Section>

        <Section
              label="gHoney"
              icon={
                <Image
                  src="/images/bhoney-logo.png"
                  alt="gHoney"
              width={14}
              height={14}
                  className="rounded-full"
                />
              }
        >
              <StatPill
            label="Supply"
                value={handleNum(goldilendInfo.glhoneySupply)}
                icon={
                  <Image
                    src="/images/bhoney-logo.png"
                    alt="gHoney"
                width={10}
                height={10}
                    className="rounded-full"
                  />
                }
              />
              <StatPill
            label="Redeemable"
                value={totalRedeemable}
                icon={
                  <Image
                    src="/images/bhoney-logo.png"
                    alt="gHoney"
                width={10}
                height={10}
                    className="rounded-full"
                  />
                }
              />
              <StatPill
            label="Vault"
                value="Open"
            href="https://www.beradrome.com/farms/0x3E185233A6aA7390bc9292ab26E955c47b95B5A8"
            icon={<Image src="/images/icon-share.png" alt="share" width={10} height={10} />}
                iconPosition="end"
              />
        </Section>
            </div>
    </div>
  );
};




