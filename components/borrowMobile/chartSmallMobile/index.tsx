"use client";

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
  const { chartData } = useBorrow();
  const data = chartData;

  return (
    <div className="flex h-[100%] w-[100%] flex-col items-center justify-between bg-[#F3AA8A] pb-[2.5%] font-baloo text-[2.8vw] font-semibold">
      <h1 className="font-amaticbold text-[9vw]">this is chart</h1>
      <LineChart
        width={window.innerWidth * 0.72}
        height={window.innerHeight * 0.18}
        data={data}
        margin={{ top: 0, right: window.innerWidth * 0.1, bottom: 0, left: 0 }}
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
    </div>
  );
};
