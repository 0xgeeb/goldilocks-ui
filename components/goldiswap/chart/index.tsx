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
  const [chartSelection, setChartSelection] = useState<string>('FLOOR')
  const [timeframeSelection, setTimeframeSelection] = useState<string>('DAILY')

  const { chartData, setChartOpen } = useGoldiswap();
  const hourly = chartData.hourly
  const daily = chartData.daily
  const weekly = chartData.weekly

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
    <div className="flex h-[100%] w-[100%] flex-col justify-between bg-[#F3AA8A] font-baloo text-[1.4vw] lg:pb-[2.5%] lg:text-[1vw]">
      <div className="font-amaticbold flex flex-row items-center justify-between pl-[3%] pr-[10%]">
        <h1 className="text-[5.2vw] lg:text-[3vw]">{chartSelection} price chart</h1>
        <div className="flex flex-col text-[2vw] items-center">
          <div className="flex flex-row items-center">
            <span onClick={() => setChartSelection('FLOOR')} className={`cursor-pointer ${chartSelection === "FLOOR" && "underline"}`}>floor</span>
            <span onClick={() => setChartSelection('MARKET')} className={`ml-4 cursor-pointer ${chartSelection === "MARKET" && "underline"}`}>market</span>
          </div>
          <div className="flex flex-row items-center">
            <span onClick={() => setTimeframeSelection('HOURLY')} className={`cursor-pointer ${timeframeSelection === "HOURLY" && "underline"}`}>1H</span>
            <span onClick={() => setTimeframeSelection('DAILY')} className={`mx-4 cursor-pointer ${timeframeSelection === "DAILY" && "underline"}`}>1D</span>
            <span onClick={() => setTimeframeSelection('WEEKLY')} className={`cursor-pointer ${timeframeSelection === "WEEKLY" && "underline"}`}>1W</span>
          </div>
        </div>
      </div>
      <LineChart
        width={chartWidth}
        height={chartHeight}
        data={getCorrectData()}
        margin={{ top: 0, right: 0, bottom: 0, left: 50 }}
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
        <YAxis type="number" domain={["auto", "auto"]} stroke="#000000" tickFormatter={(value) => value.toFixed(7)} />
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
