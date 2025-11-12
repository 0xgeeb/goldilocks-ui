'use client';

import Image from "next/image";
import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
} from '@/components/ui/shadcn-io/marquee';

import { useGoldiswapMath } from "../../../hooks";
import { useGoldiswap } from "../../../providers";

export const StatsMarquee = () => {
  const { goldiswapInfo, infoLoading } = useGoldiswap();
  const { floorPrice, marketPrice } = useGoldiswapMath();

  const formatAsPrice = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 5 });
  };

  const formatAsString = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

  const handleInfo = (num: number) => {
    if (infoLoading) {
      return "-";
    } else if (num > 0) {
      return formatAsString(num);
    } else {
      return "-";
    }
  };

  const handlePrice = (num: number) => {
    if (infoLoading) {
      return "-";
    } else if (num > 0) {
      return formatAsPrice(num);
    } else {
      return "-";
    }
  };

  const locksPrice = marketPrice(goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply);
  const locksMarketCap = (goldiswapInfo.supply * locksPrice) / 1000000;
  const locksFloor = floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply);
  const pslFslRatio = (goldiswapInfo.psl / goldiswapInfo.fsl) * 100;
  const targetRatio = goldiswapInfo.targetRatio * 100;

  return (
    <div className="w-full overflow-hidden py-3">
      <Marquee>
        <MarqueeContent speed="slow" pauseOnHover>
          {/* LOCKS Section */}
          <MarqueeItem className="flex items-center gap-6 px-8">
            <div className="flex items-center gap-2">
              <Image 
                src="/images/logo-locks.png" 
                alt="LOCKS" 
                width={32} 
                height={32}
                className="rounded-full"
              />
              <span className="text-HoneyYellow font-amaticbold text-2xl">LOCKS</span>
            </div>
            <div className="flex items-center gap-6 font-baloo text-sm">
              <span className="text-white/70">
                Price: <span className="text-HoneyYellow font-semibold">${handlePrice(locksPrice)}</span>
              </span>
              <span className="text-white/70">
                Market Cap: <span className="text-HoneyYellow font-semibold">{handleInfo(locksMarketCap)}m</span>
              </span>
              <span className="text-white/70">
                Supply: <span className="text-HoneyYellow font-semibold">{handleInfo(goldiswapInfo.supply)}</span>
              </span>
              <span className="text-white/70">
                Floor: <span className="text-HoneyYellow font-semibold">${handlePrice(locksFloor)}</span>
              </span>
            </div>
          </MarqueeItem>

          {/* Separator */}
          <MarqueeItem className="px-4">
            <div className="h-8 w-px bg-white/20" />
          </MarqueeItem>

          {/* PORRIDGE Section */}
          <MarqueeItem className="flex items-center gap-6 px-8">
            <div className="flex items-center gap-2">
              <Image 
                src="/images/logo-porridge.png" 
                alt="PORRIDGE" 
                width={32} 
                height={32}
                className="rounded-full"
              />
              <span className="text-HoneyYellow font-amaticbold text-2xl">PRG</span>
            </div>
            <div className="flex items-center gap-6 font-baloo text-sm">
              <span className="text-white/70">
                Price: <span className="text-HoneyYellow font-semibold">${handlePrice(goldiswapInfo.prgValue)}</span>
              </span>
              <span className="text-white/70">
                Market Cap: <span className="text-HoneyYellow font-semibold">{handleInfo(goldiswapInfo.prgMarketCap / 1000000)}m</span>
              </span>
              <span className="text-white/70">
                Supply: <span className="text-HoneyYellow font-semibold">{handleInfo(goldiswapInfo.prgSupply)}</span>
              </span>
            </div>
          </MarqueeItem>

          {/* Separator */}
          <MarqueeItem className="px-4">
            <div className="h-8 w-px bg-white/20" />
          </MarqueeItem>

          {/* FSL/PSL Section */}
          <MarqueeItem className="flex items-center gap-6 px-8">
            <div className="flex items-center gap-6 font-baloo text-sm">
               <span className="text-white/70">
                FSL: <span className="text-HoneyYellow font-semibold">{handleInfo(goldiswapInfo.fsl)}</span>
              </span>
              <span className="text-white/70">
                PSL: <span className="text-HoneyYellow font-semibold">{handleInfo(goldiswapInfo.psl)}</span>
              </span>
              <span className="text-white/70">
                Ratio: <span className="text-HoneyYellow font-semibold">{handleInfo(pslFslRatio)}%</span>
              </span>
              <span className="text-white/70">
                Target: <span className="text-HoneyYellow font-semibold">{handleInfo(targetRatio)}%</span>
              </span>
            </div>
          </MarqueeItem>

          {/* Separator */}
          <MarqueeItem className="px-4">
            <div className="h-8 w-px bg-white/20" />
          </MarqueeItem>
        </MarqueeContent>
      </Marquee>
    </div>
  );
};

