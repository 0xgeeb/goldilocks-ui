"use client"

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts"
import { useGoldiswap } from "../../../providers"

export const ChartSmallMobile = () => {

  const { chartData } = useGoldiswap()
  const data = chartData

  return (
    <div className="w-[100%] h-[100%] bg-[#F3AA8A] flex flex-col justify-between items-center pb-[2.5%] font-baloo font-semibold text-[2.8vw]">
      <h1 className="font-amaticbold text-[9vw]">this is chart</h1>
      <LineChart width={window.innerWidth * .72} height={window.innerHeight * .16} data={data} margin={{ top: 0, right: window.innerWidth * .1, bottom: 0, left: 0 }}>
        <Line type="natural" dataKey="value" dot={false} strokeWidth={3} stroke="#000000" />
        <CartesianGrid stroke="#000000" vertical={false} />
        <XAxis dataKey="name" stroke="#000000" />
        <YAxis stroke="#000000" />
      </LineChart>
    </div>
  )
}