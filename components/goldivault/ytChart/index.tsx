"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useGoldivault } from "../../../providers";

export const YtChart = () => {

  const [chartSelection, setChartSelection] = useState<string>('APR')
  const [timeframeSelection, setTimeframeSelection] = useState<string>('DAILY')
  
  const { chartData } = useGoldivault()
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
    <div className="mx-auto w-full max-w-5xl flex flex-col items-center gap-2.5 rounded-2xl border-2 border-[#352A1C] p-2 mb-[20px] bg-bera-brown-dark">
      <div className="font-amaticbold w-full flex flex-row items-center justify-between px-[5%]">
        <h1 className="text-[5.2vw] lg:text-[3vw] text-HoneyYellow">{chartSelection === "APR" ? "Fixed APR" : "YT Price"} chart</h1>
        <div className="flex flex-col items-center text-white text-[2vw]">
          <div className="flex flex-row items-center">
            <span onClick={() => setChartSelection('APR')} className={`cursor-pointer ${chartSelection === "APR" && "underline"}`}>apr</span>
            <span onClick={() => setChartSelection('YTPRICE')} className={`cursor-pointer ml-4 ${chartSelection === "YTPRICE" && "underline"}`}>price</span>
          </div>
          <div className="flex flex-row items-center">
            <span onClick={() => setTimeframeSelection('HOURLY')} className={`cursor-pointer ${timeframeSelection === "HOURLY" && "underline"}`}>1H</span>
            <span onClick={() => setTimeframeSelection('DAILY')} className={`mx-4 cursor-pointer ${timeframeSelection === "DAILY" && "underline"}`}>1D</span>
            <span onClick={() => setTimeframeSelection('WEEKLY')} className={`cursor-pointer ${timeframeSelection === "WEEKLY" && "underline"}`}>1W</span>
          </div>
        </div>
      </div>
      <LineChart
        width={900}
        height={500}
        data={getCorrectData()}
        margin={{ top: 0, right: 0, bottom: 0, left: chartSelection === "YTPRICE" ? 20 : 0 }}
      >
        {
          chartSelection === 'APR' ?
          <Line
            type="monotone"
            dataKey="fixedApr"
            dot={false}
            strokeWidth={3}
            stroke="#ffffff"
          /> :
          <Line
            type="monotone"
            dataKey="ytPrice"
            dot={false}
            strokeWidth={3}
            stroke="#ffffff"
          />
        }
        <CartesianGrid stroke="#000000" vertical={false} />
        <XAxis dataKey="date" stroke="#ffffff" />
        <YAxis key={`${timeframeSelection}${chartSelection}`} type="number" domain={['auto', 'auto']} stroke="#ffffff" tickFormatter={(value) => chartSelection === "YTPRICE" ? value.toFixed(6) : `${value.toFixed(2)}%`} />
        <Tooltip />
      </LineChart>
    </div>
  )
}