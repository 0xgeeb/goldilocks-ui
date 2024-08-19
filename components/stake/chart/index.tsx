"use client"

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts"
import { useStake, useGoldiswap } from "../../../providers"

export const Chart = () => {

  const { setChartOpen } = useStake()
  const { chartData } = useGoldiswap()
  const data = chartData

  return (
    <div className="w-[100%] h-[100%] bg-[#F3AA8A] relative flex flex-col justify-between lg:pl-[3%] lg:pb-[2.5%] font-baloo text-[1.4vw] lg:text-[1vw]">
      <h1 className="font-amaticbold text-[4vw] lg:text-[2vw] ml-[4%]">this is chart</h1>
      <LineChart 
        width={window.innerWidth > 1024 ? window.innerWidth * .365 : window.innerWidth * .52}
        height={window.innerWidth > 1024 ? window.innerHeight * .18 : window.innerHeight * .19}
        data={data}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <Line type="natural" dataKey="value" dot={false} strokeWidth={3} stroke="#000000" />
        <CartesianGrid stroke="#000000" vertical={false} />
        <XAxis dataKey="date" stroke="#000000" />
        <YAxis stroke="#000000" />
      </LineChart>
      <p
        className="absolute top-[-2%] right-[2%] font-baloo text-[3vw] lg:text-[2vw] cursor-pointer hover:scale-125"
        onClick={() => setChartOpen(false)}
      >
        x
      </p>
    </div>
  )
}