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

  const [chartSelection, setChartSelection] = useState<string>('PRICE')

  const { chartData } = useGoldivault()
  const data = chartData
  // console.log(data)

  return (
    <div className="mx-auto w-full max-w-5xl flex flex-col items-center gap-2.5 rounded-2xl border-2 border-[#352A1C] p-2 mb-[20px] bg-bera-brown-dark">
      <div className="font-amaticbold flex flex-row items-center justify-between pl-[3%] pr-[10%]">
        <h1 className="text-[5.2vw] lg:text-[3vw]">{chartSelection} chart</h1>
        <div className="flex flex-row items-center text-[2vw]">
          <span onClick={() => setChartSelection('PRICE')}>price</span>
          <span onClick={() => setChartSelection('APR')} className="ml-4">apr</span>
        </div>
      </div>
      <LineChart
        width={800}
        height={500}
        data={data}
        margin={{ top: 0, right: 0, bottom: 0, left: 50 }}
      >
        {
          chartSelection === 'APR' ?
          <Line
            type="natural"
            dataKey="fixedApr"
            dot={false}
            strokeWidth={3}
            stroke="#000000"
          /> :
          <Line
            type="natural"
            dataKey="price"
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
  )
}