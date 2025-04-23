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
import { useGoldiswap } from "../../../providers";

export const ChartMobile = () => {
  const [chartSelection, setChartSelection] = useState<string>('FLOOR')
  const [timeframeSelection, setTimeframeSelection] = useState<string>('DAILY')

  const { chartData } = useGoldiswap();
  const hourly = chartData.hourly
  const daily = chartData.daily
  const weekly = chartData.weekly

  const getCorrectData = () => {
    if(timeframeSelection === 'DAILY') {
      return daily
    }
    else if(timeframeSelection === 'HOURLY') {
      return hourly
    }
    else if(timeframeSelection === 'WEEKLY') {
      return weekly
    }
  }

  return (
    <div className="flex h-[100%] w-[100%] flex-col items-center justify-between bg-[#F3AA8A] pb-[2.5%] font-baloo text-[2.8vw] font-medium">
      <div className="w-full font amaticbold flex flex-row items-center justify-between text-[4vw] p-[2%]">
        <h1>{chartSelection} chart</h1>
        <div className="flex flex-row items-center">
          <span onClick={() => setTimeframeSelection('HOURLY')} className={`cursor-pointer ${timeframeSelection === "HOURLY" && "underline"}`}>1H</span>
          <div className="flex flex-col items-center ">
            <span onClick={() => setTimeframeSelection('DAILY')} className={`ml-2 cursor-pointer ${timeframeSelection === "DAILY" && "underline"}`}>1D</span>
            <span onClick={() => setTimeframeSelection('WEEKLY')} className={`cursor-pointer ${timeframeSelection === "WEEKLY" && "underline"}`}>1W</span>
          </div>
          <div className="flex flex-col items-center">
            <span onClick={() => setChartSelection('FLOOR')} className={`cursor-pointer ${chartSelection === "FLOOR" && "underline"}`}>floor</span>
            <span onClick={() => setChartSelection('MARKET')} className={`ml-2 cursor-pointer ${chartSelection === "MARKET" && "underline"}`}>market</span>
          </div>
        </div>
      </div>
      <LineChart
        width={window.innerWidth * 0.7}
        height={window.innerHeight * 0.37}
        data={getCorrectData()}
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
        <YAxis key={`${timeframeSelection}${chartSelection}`} type="number" domain={["auto", "auto"]} stroke="#000000" tickFormatter={(value) => value.toFixed(6)} />
        <Tooltip />
      </LineChart>
    </div>
  );
};
