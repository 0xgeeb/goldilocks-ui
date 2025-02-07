"use client"

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { useGoldiswap } from "../../../providers"

export const ChartMobile = () => {

  const { chartData } = useGoldiswap()
  const data = chartData

  return (
    <div className="w-[100%] h-[100%] bg-[#F3AA8A] flex flex-col justify-between items-center pb-[2.5%] font-baloo font-semibold text-[2.8vw]">
      <h1 className="font-amaticbold text-[12.5vw]">this is chart</h1>
      <LineChart
        width={window.innerWidth * .7}
        height={window.innerHeight * .32}
        data={data}
        margin={{ top: 0, right: window.innerWidth * .1, bottom: 0, left: 0 }}
      >
        <Line type="natural" dataKey="marketPrice" dot={false} strokeWidth={3} stroke="#000000" />
        <Line type="natural" dataKey="floorPrice" dot={false} strokeWidth={3} stroke="#c4c4c4" />
        <CartesianGrid stroke="#000000" vertical={false} />
        <XAxis dataKey="date" stroke="#000000" />
        <YAxis type="number" domain={['auto', 'auto']} stroke="#000000" />
        <Tooltip />
      </LineChart>
    </div>
  )
}