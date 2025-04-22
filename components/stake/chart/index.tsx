"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useStake } from "../../../providers";

export const Chart = () => {
  const [chartWidth, setChartWidth] = useState<number>(
    window.innerWidth > 1024
      ? window.innerWidth * 0.365
      : window.innerWidth * 0.52,
  );
  const [chartHeight, setChartHeight] = useState<number>(
    window.innerWidth > 1024
      ? window.innerHeight * 0.18
      : window.innerHeight * 0.19,
  );
  const [chartSelection, setChartSelection] = useState<string>('FLOOR')

  const { chartData, setChartOpen } = useStake();
  const data = chartData;

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    if (window.innerWidth > 1024) {
      setChartWidth(window.innerWidth * 0.365);
      setChartHeight(window.innerHeight * 0.18);
    } else {
      setChartWidth(window.innerWidth * 0.52);
      setChartHeight(window.innerHeight * 0.19);
    }
  };

  return (
    <div className="relative flex h-[100%] w-[100%] flex-col justify-between bg-[#F3AA8A] font-baloo text-[1.4vw] lg:pb-[2.5%] lg:pl-[3%] lg:text-[1vw]">
      <div className="font-amaticbold flex flex-row items-center justify-between pl-[3%] pr-[10%]">
        <h1 className="text-[4vw] lg:text-[2vw]">{chartSelection} price chart</h1>
        <div className="flex flex-row items-center text-[2vw] xl:text-[1.4vw]">
          <span onClick={() => setChartSelection('FLOOR')} className={`cursor-pointer ${chartSelection === "FLOOR" && "underline"}`}>floor</span>
          <span onClick={() => setChartSelection('MARKET')} className={`ml-4 cursor-pointer ${chartSelection === "MARKET" && "underline"}`}>market</span>
        </div>
      </div>
      <LineChart
        width={chartWidth}
        height={chartHeight}
        data={data}
        margin={{ top: 0, right: 0, bottom: 0, left: 15 }}
      >
        {
          chartSelection === 'MARKET' ?
          <Line
            type="monotone"
            dataKey="marketPrice"
            dot={false}
            strokeWidth={3}
            stroke="#000000"
          /> : 
          <Line
            type="monotone"
            dataKey="floorPrice"
            dot={false}
            strokeWidth={3}
            stroke="#000000"
          />
        }
        <CartesianGrid stroke="#000000" vertical={false} />
        <XAxis dataKey="date" stroke="#000000" />
        <YAxis type="number" domain={["auto", "auto"]} stroke="#000000" />
        <Tooltip />
      </LineChart>
      <p
        className="absolute right-[2%] top-[-2%] cursor-pointer font-baloo text-[3vw] hover:scale-125 lg:text-[2vw]"
        onClick={() => setChartOpen(false)}
      >
        x
      </p>
    </div>
  );
};
