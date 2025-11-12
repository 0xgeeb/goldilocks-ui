import { formatAsString } from "@/app/_components/utils";

import { useGoldiswapMath } from "../../../hooks";
import { useGoldiswap } from "../../../providers";

export const Stats = () => {
  const { goldiswapInfo, simInfo, infoLoading } = useGoldiswap();

  const { floorPrice, marketPrice } = useGoldiswapMath();

  const loadingElement = () => {
    return <span className="loader-small ml-3 mt-2"></span>;
  };

  const formatAsPrice = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 5 });
  };

  const handleInfo = (num: number) => {
    if (infoLoading) {
      return loadingElement();
    } else if (num > 0) {
      return formatAsString(num);
    } else {
      return "-";
    }
  };

  const handlePrice = (num: number) => {
    if (infoLoading) {
      return loadingElement();
    } else if (num > 0) {
      return formatAsPrice(num);
    } else {
      return "-";
    }
  };

  const handleColors = (num1: number, num2: number): string => {
    if (num1 > num2) {
      return "text-red-600";
    } else if (num1 == num2) {
      return "";
    } else {
      return "text-green-600";
    }
  };

  const handleFloorColors = (num1: number, num2: number): string => {
    if (Math.abs(num1 - num2) < 1e-10) {
      return "";
    } else {
      return "text-green-600";
    }
  };

  return (
    <div 
      className="rounded-2xl p-6"
      style={{
        backgroundColor: "rgba(60, 50, 40, 0.4)",
        border: "1px solid rgba(205, 133, 63, 0.3)",
      }}
    >
      <h2 className="text-HoneyYellow font-amaticbold text-2xl mb-4">Goldiswap Info</h2>
      <dl className="flex flex-col gap-3 font-baloo text-sm">
        <div className="flex justify-between items-center">
          <dt className="text-white/70">Locks Supply:</dt>
          <dd className={`text-white font-semibold ${handleColors(goldiswapInfo.supply, simInfo.supply)}`}>
            {simInfo.toggle
              ? handleInfo(simInfo.supply)
              : handleInfo(goldiswapInfo.supply)}
          </dd>
        </div>
        <div className="flex justify-between items-center">
          <dt className="text-white/70">Current FSL:</dt>
          <dd className={`text-white font-semibold ${handleColors(goldiswapInfo.fsl, simInfo.fsl)}`}>
            {simInfo.toggle
              ? handleInfo(simInfo.fsl)
              : handleInfo(goldiswapInfo.fsl)}
          </dd>
        </div>
        <div className="flex justify-between items-center">
          <dt className="text-white/70">Current PSL:</dt>
          <dd className={`text-white font-semibold ${handleColors(goldiswapInfo.psl, simInfo.psl)}`}>
            {simInfo.toggle
              ? handleInfo(simInfo.psl)
              : handleInfo(goldiswapInfo.psl)}
          </dd>
        </div>
        <div className="flex justify-between items-center">
          <dt className="text-white/70">Floor Price:</dt>
          <dd
            className={`text-white font-semibold ${handleFloorColors(
              floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply),
              floorPrice(simInfo.fsl, simInfo.supply),
            )}`}
          >
            $
            {simInfo.toggle
              ? handlePrice(floorPrice(simInfo.fsl, simInfo.supply))
              : handlePrice(
                  floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply),
                )}
          </dd>
        </div>
        <div className="flex justify-between items-center">
          <dt className="text-white/70">PSL/FSL Ratio:</dt>
          <dd
            className={`text-white font-semibold ${handleColors(
              (goldiswapInfo.psl / goldiswapInfo.fsl) * 100,
              (goldiswapInfo.psl / goldiswapInfo.fsl) * 100,
            )}`}
          >
            {simInfo.toggle
              ? handlePrice(
                  (goldiswapInfo.psl / goldiswapInfo.fsl) * 100,
                )
              : handlePrice((goldiswapInfo.psl / goldiswapInfo.fsl) * 100)}%
          </dd>
        </div>
        <div className="flex justify-between items-center">
          <dt className="text-white/70">Target Ratio:</dt>
          <dd
            className={`text-white font-semibold ${handleColors(
              goldiswapInfo.targetRatio,
              simInfo.targetRatio,
            )}`}
          >
            {simInfo.toggle
              ? handlePrice(simInfo.targetRatio * 100)
              : handlePrice(goldiswapInfo.targetRatio * 100)}
            %
          </dd>
        </div>
        <div className="flex justify-between items-center">
          <dt className="text-white/70">Porridge Value:</dt>
          <dd
            className={`text-white font-semibold ${handleColors(goldiswapInfo.prgValue, simInfo.prgValue)}`}
          >
            $
            {simInfo.toggle
              ? handlePrice(simInfo.prgValue)
              : handlePrice(goldiswapInfo.prgValue)}
          </dd>
        </div>
        <div className="flex justify-between items-center">
          <dt className="text-white/70">Porridge Supply:</dt>
          <dd className="text-white font-semibold">{handleInfo(goldiswapInfo.prgSupply)}</dd>
        </div>
        <div className="flex justify-between items-center">
          <dt className="text-white/70">Porridge Market Cap:</dt>
          <dd
            className={`text-white font-semibold ${handleColors(
              goldiswapInfo.prgMarketCap,
              simInfo.prgValue * goldiswapInfo.prgSupply,
            )}`}
          >
            {simInfo.toggle
              ? handleInfo(
                  (simInfo.prgValue * goldiswapInfo.prgSupply) / 1000000,
                )
              : handleInfo(goldiswapInfo.prgMarketCap / 1000000)}
            m
          </dd>
        </div>
      </dl>
    </div>
  );
};
