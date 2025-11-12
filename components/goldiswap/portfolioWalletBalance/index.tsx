"use client";

import { useEffect } from "react";

import { useAccount } from "wagmi";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import { formatAsString } from "@/app/_components/utils";

import { useGoldiswap } from "../../../providers";
import { useGoldiswapMath } from "../../../hooks/useGoldiswapMath";

export const PortfolioWalletBalance = () => {
  const { isConnected } = useAccount();
  const { goldiswapWalletInfo, refreshGoldiswapWalletInfo, goldiswapInfo, infoLoading, refreshGoldiswapInfo } = useGoldiswap();
  const { floorPrice, marketPrice } = useGoldiswapMath();

  useEffect(() => {
    refreshGoldiswapWalletInfo();
    refreshGoldiswapInfo();
  }, [isConnected]);

  const formatAsClaimable = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 4 });
  };

  const handleInfo = (num: number): string => {
    if (num > 0) {
      return formatAsString(num);
    } else {
      return "-";
    }
  };

  const handleInfoClaimable = (num: number): string => {
    if (num > 0) {
      return formatAsClaimable(num);
    } else {
      return "-";
    }
  };

  // Calculate staking APR using goldiswap info
  const calculateStakingAPR = (): number => {
    if (infoLoading || !goldiswapInfo) return 0;
    
    const marketPriceValue = marketPrice(goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply);
    const floorPriceValue = floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply);
    
    if (marketPriceValue === 0 || isNaN(marketPriceValue) || isNaN(floorPriceValue)) return 0;
    
    return 0.4 * ((marketPriceValue - floorPriceValue) / marketPriceValue) * 100;
  };

  const stakingAPR = calculateStakingAPR();



  // Calculate PORRIDGE dollar value using same source as main swap page
  const calculatePorridgeDollarValue = (amount: number): string => {
    if (!goldiswapInfo || goldiswapInfo.prgValue === 0 || amount === 0) return "$0.00";
    const dollarValue = amount * goldiswapInfo.prgValue;
    
    // Use more decimal places for very small values
    if (dollarValue < 0.001) {
      return `$${dollarValue.toFixed(8)}`;
    } else if (dollarValue < 0.01) {
      return `$${dollarValue.toFixed(6)}`;
    }
    return `$${dollarValue.toFixed(4)}`;
  };

  // Format PORRIDGE price with appropriate decimal places
  const formatPorridgePrice = (): string => {
    if (!goldiswapInfo) return "$0.00000 (loading...)";
    if (goldiswapInfo.prgValue === 0) return "$0.00000 (no price data)";
    
    // Use more decimal places for very small prices
    if (goldiswapInfo.prgValue < 0.001) {
      return `$${goldiswapInfo.prgValue.toFixed(8)}`;
    } else if (goldiswapInfo.prgValue < 0.01) {
      return `$${goldiswapInfo.prgValue.toFixed(6)}`;
    }
    return `$${goldiswapInfo.prgValue.toFixed(5)}`;
  };

  // Prepare Asset Distribution Pie Chart data
  const prepareAssetDistributionData = () => {
    if (!goldiswapInfo) return [];

    const marketPriceValue = marketPrice(goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply);
    const floorPriceValue = floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply);
    
    // Calculate USD values for each asset type
    const totalLocksValue = (goldiswapWalletInfo.locks + goldiswapWalletInfo.staked + goldiswapWalletInfo.locked) * marketPriceValue;
    const totalHoneyValue = (goldiswapWalletInfo.honey + goldiswapWalletInfo.borrowed) * floorPriceValue; // Assuming HONEY ~= floor price
    const totalPorridgeValue = (goldiswapWalletInfo.prg + goldiswapWalletInfo.claimable) * goldiswapInfo.prgValue;

    const data = [];
    
    if (totalLocksValue > 0) {
      data.push({
        name: "LOCKS",
        value: totalLocksValue,
        percentage: 0, // Will calculate after we have total
        color: "#FFCD00",
        tokens: goldiswapWalletInfo.locks + goldiswapWalletInfo.staked + goldiswapWalletInfo.locked
      });
    }

    if (totalHoneyValue > 0) {
      data.push({
        name: "HONEY",
        value: totalHoneyValue,
        percentage: 0,
        color: "#F4A460",
        tokens: goldiswapWalletInfo.honey + goldiswapWalletInfo.borrowed
      });
    }

    if (totalPorridgeValue > 0) {
      data.push({
        name: "PORRIDGE",
        value: totalPorridgeValue,
        percentage: 0,
        color: "#8B5CF6",
        tokens: goldiswapWalletInfo.prg + goldiswapWalletInfo.claimable
      });
    }

    // Calculate percentages
    const totalValue = data.reduce((sum, item) => sum + item.value, 0);
    return data.map(item => ({
      ...item,
      percentage: ((item.value / totalValue) * 100).toFixed(1)
    }));
  };

  // Prepare Earnings Projection Chart data
  const prepareEarningsProjectionData = () => {
    if (!goldiswapWalletInfo.staked || stakingAPR === 0) return [];

    const dailyRate = stakingAPR / 365 / 100;
    const stakedAmount = goldiswapWalletInfo.staked;

    const timeframes = [
      { period: "Today", days: 0 },
      { period: "1 Week", days: 7 },
      { period: "2 Weeks", days: 14 },
      { period: "1 Month", days: 30 },
      { period: "2 Months", days: 60 },
      { period: "3 Months", days: 90 },
      { period: "6 Months", days: 180 },
      { period: "1 Year", days: 365 }
    ];

    return timeframes.map(({ period, days }) => {
      const earnings = stakedAmount * dailyRate * days;
      const dollarValue = earnings * (goldiswapInfo?.prgValue || 0);
      
      return {
        period,
        days,
        earnings: parseFloat(earnings.toFixed(4)),
        dollarValue: parseFloat(dollarValue.toFixed(4)),
        cumulative: parseFloat((stakedAmount + earnings).toFixed(4))
      };
    });
  };

  const assetDistributionData = prepareAssetDistributionData();
  const earningsProjectionData = prepareEarningsProjectionData();


  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-amaticbold text-3xl text-HoneyYellow">Overview</h1>
        
        {/* PORRIDGE Price Chip */}
        <div className="flex items-center gap-2 bg-bera-brown-dark border border-bera-brown-border rounded-full px-3 py-2">
          <img src="/images/logo-porridge.png" alt="porridge" className="w-4 h-4" />
          <span className="text-sm font-semibold text-WarmText">PORRIDGE:</span>
          <span className="text-sm font-bold text-white">
            {infoLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              formatPorridgePrice()
            )}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Locks Balance */}
        <div className="p-3 rounded-lg bg-bera-brown-dark border border-bera-brown-border">
          <div className="flex items-center gap-2 mb-2">
            <img src="/images/logo-locks.png" alt="locks" className="w-6 h-6" />
            <div className="text-WarmText font-semibold">Locks Balance</div>
          </div>
          <div className="text-xl font-bold text-white">{handleInfo(goldiswapWalletInfo.locks)}</div>
        </div>

        {/* Honey Balance */}
        <div className="p-3 rounded-lg bg-bera-brown-dark border border-bera-brown-border">
          <div className="flex items-center gap-2 mb-2">
            <img src="/images/logo-honey.png" alt="honey" className="w-6 h-6" />
            <div className="text-WarmText font-semibold">Honey Balance</div>
          </div>
          <div className="text-xl font-bold text-white">{handleInfo(goldiswapWalletInfo.honey)}</div>
        </div>

        {/* Porridge Balance */}
        <div className="p-3 rounded-lg bg-bera-brown-dark border border-bera-brown-border">
          <div className="flex items-center gap-2 mb-2">
            <img src="/images/logo-porridge.png" alt="porridge" className="w-6 h-6" />
            <div className="text-WarmText font-semibold">Porridge Balance</div>
          </div>
          <div className="text-xl font-bold text-white">{handleInfo(goldiswapWalletInfo.prg)}</div>
        </div>

        {/* Staked Locks */}
        <div className="p-3 rounded-lg bg-bera-brown-dark border border-bera-brown-border">
          <div className="flex items-center gap-2 mb-2">
            <img src="/images/logo-locks.png" alt="locks" className="w-6 h-6" />
            <div className="text-WarmText font-semibold">Staked Locks</div>
          </div>
          <div className="text-xl font-bold text-white">{handleInfo(goldiswapWalletInfo.staked)}</div>
        </div>

        {/* Locked Locks */}
        <div className="p-3 rounded-lg bg-bera-brown-dark border border-bera-brown-border">
          <div className="flex items-center gap-2 mb-2">
            <img src="/images/logo-locks.png" alt="locks" className="w-6 h-6" />
            <div className="text-WarmText font-semibold">Locked Locks</div>
          </div>
          <div className="text-xl font-bold text-white">{handleInfo(goldiswapWalletInfo.locked)}</div>
        </div>

        {/* Borrowed Honey */}
        <div className="p-3 rounded-lg bg-bera-brown-dark border border-bera-brown-border">
          <div className="flex items-center gap-2 mb-2">
            <img src="/images/logo-honey.png" alt="honey" className="w-6 h-6" />
            <div className="text-WarmText font-semibold">Borrowed Honey</div>
          </div>
          <div className="text-xl font-bold text-white">{handleInfo(goldiswapWalletInfo.borrowed)}</div>
        </div>

        {/* Claimable Porridge */}
        <div className="p-3 rounded-lg bg-bera-brown-dark border border-bera-brown-border">
          <div className="flex items-center gap-2 mb-2">
            <img src="/images/logo-porridge.png" alt="porridge" className="w-6 h-6" />
            <div className="text-WarmText font-semibold">Claimable Porridge</div>
          </div>
          <div className="text-xl font-bold text-white">{handleInfoClaimable(goldiswapWalletInfo.claimable)}</div>
          <div className="text-sm text-WarmText">
            {calculatePorridgeDollarValue(goldiswapWalletInfo.claimable)}
          </div>
        </div>

        {/* Staking APR - Last Card */}
        <div className="p-3 rounded-lg bg-bera-brown-dark border border-bera-brown-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-HoneyYellow rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-bera-brown">%</span>
            </div>
            <div className="text-WarmText font-semibold">Current Staking APR</div>
          </div>
          <div className="text-xl font-bold text-HoneyYellow">
            {infoLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              `${stakingAPR.toFixed(2)}%`
            )}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Asset Distribution Pie Chart */}
        {assetDistributionData.length > 0 && (
          <div className="rounded-lg bg-bera-brown-dark p-4">
            <h2 className="font-amaticbold text-2xl text-HoneyYellow mb-4">
              Portfolio Distribution
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assetDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    stroke="none"
                  >
                    {assetDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number, name: string, props: any) => [
                      `$${value.toFixed(2)}`,
                      `${name} (${props.payload.percentage}%)`
                    ]}
                    contentStyle={{
                      backgroundColor: '#2D1B0F',
                      border: '1px solid #4A3728',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                  <Legend 
                    formatter={(value, entry: any) => 
                      <span style={{ color: '#ffffff' }}>
                        {value}: {entry.payload.percentage}%
                      </span>
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Earnings Projection Chart */}
        {earningsProjectionData.length > 0 && (
          <div className="rounded-lg bg-bera-brown-dark p-4">
            <h2 className="font-amaticbold text-2xl text-HoneyYellow mb-4">
              Earnings Projection
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsProjectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis 
                    dataKey="period" 
                    tick={{ fill: '#ffffff', fontSize: 12 }}
                    axisLine={{ stroke: '#666' }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    tick={{ fill: '#ffffff', fontSize: 12 }}
                    axisLine={{ stroke: '#666' }}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === 'earnings' ? `${value} PORRIDGE` : `$${value.toFixed(4)}`,
                      name === 'earnings' ? 'Projected Earnings' : 'Dollar Value'
                    ]}
                    contentStyle={{
                      backgroundColor: '#2D1B0F',
                      border: '1px solid #4A3728',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="#FFCD00" 
                    strokeWidth={3}
                    dot={{ fill: '#FFCD00', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-sm text-WarmText text-center">
              Based on {stakingAPR.toFixed(2)}% APR with {formatAsString(goldiswapWalletInfo.staked)} LOCKS staked
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
