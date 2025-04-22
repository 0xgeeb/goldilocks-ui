"use client";

import { useState } from "react"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useBorrow } from "../../../providers";

export const ChartSmallMobile = () => {
  const [chartSelection, setChartSelection] = useState<string>('FLOOR')
  const { chartData } = useBorrow();
  const data = chartData;

  return (
    <div className="flex h-[100%] w-[100%] flex-col items-center justify-between bg-[#F3AA8A] pb-[2.5%] font-baloo text-[2.8vw] font-semibold">
      <div className="w-full font amaticbold flex flex-row items-center justify-between text-[4vw] p-[2%]">
        <h1>{chartSelection} price chart</h1>
        <div className="flex flex-col items-center">
          <span onClick={() => setChartSelection('FLOOR')} className={`cursor-pointer ${chartSelection === "FLOOR" && "underline"}`}>floor</span>
          <span onClick={() => setChartSelection('MARKET')} className={`ml-2 cursor-pointer ${chartSelection === "MARKET" && "underline"}`}>market</span>
        </div>
      </div>
      <LineChart
        width={window.innerWidth * 0.72}
        height={window.innerHeight * 0.23}
        data={data}
        margin={{ top: 0, right: window.innerWidth * 0.1, bottom: 0, left: 20 }}
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
    </div>
  );
};
