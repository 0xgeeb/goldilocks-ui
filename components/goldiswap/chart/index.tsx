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
import { useGoldiswap } from "../../../providers";

export const Chart = () => {
  const [chartWidth, setChartWidth] = useState<number>(
    window.innerWidth > 1024
      ? window.innerWidth * 0.365
      : window.innerWidth * 0.52,
  );
  const [chartHeight, setChartHeight] = useState<number>(
    window.innerWidth > 1024
      ? window.innerHeight * 0.24
      : window.innerHeight * 0.28,
  );

  const { chartData, setChartOpen } = useGoldiswap();
  const data = chartData;

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    if (window.innerWidth > 1024) {
      setChartWidth(window.innerWidth * 0.365);
      setChartHeight(window.innerHeight * 0.24);
    } else {
      setChartWidth(window.innerWidth * 0.52);
      setChartHeight(window.innerHeight * 0.28);
    }
  };

  return (
    <div className="flex h-[100%] w-[100%] flex-col justify-between bg-[#F3AA8A] font-baloo text-[1.4vw] lg:pb-[2.5%] lg:pl-[3%] lg:text-[1vw]">
      <h1 className="ml-[7%] font-amaticbold text-[5.2vw] lg:ml-[13%] lg:text-[3vw]">
        this is price chart
      </h1>
      <LineChart
        width={chartWidth}
        height={chartHeight}
        data={data}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <Line
          type="natural"
          dataKey="marketPrice"
          dot={false}
          strokeWidth={3}
          stroke="#000000"
        />
        <Line
          type="natural"
          dataKey="floorPrice"
          dot={false}
          strokeWidth={3}
          stroke="#c4c4c4"
        />
        <CartesianGrid stroke="#000000" vertical={false} />
        <XAxis dataKey="date" stroke="#000000" />
        <YAxis type="number" domain={["auto", "auto"]} stroke="#000000" />
        <Tooltip />
      </LineChart>
      <p
        className="absolute right-[3%] top-0 cursor-pointer font-baloo text-[3vw] hover:scale-125 lg:text-[2vw]"
        onClick={() => setChartOpen(false)}
      >
        x
      </p>
    </div>
  );
};
