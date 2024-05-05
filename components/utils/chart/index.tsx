"use client"

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts"

export const Chart = () => {

  const data = [
    {name: '4/2', uv: 400, pv: 2400, amt: 2400},
    {name: '4/6', uv: 300, pv: 1200, amt: 3000},
    {name: '4/10', uv: 350, pv: 4800, amt: 5000},
    {name: '4/14', uv: 450, pv: 1200, amt: 3000},
    {name: '4/18', uv: 800, pv: 4800, amt: 5000}
  ]

  return (
    <div className="w-[100%] h-[100%] bg-[#F3AA8A] flex flex-col justify-between pl-[3%] pb-[2.5%] font-baloo text-[1vw]">
      <h1 className="font-amaticbold text-[3vw] ml-[13%]">this is chart</h1>
      <LineChart width={window.innerWidth * .365} height={window.innerHeight * .24} data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Line type="natural" dataKey="uv" dot={false} stroke="#000000" />
        <CartesianGrid stroke="#000000" vertical={false} />
        <XAxis dataKey="name" stroke="#000000" />
        <YAxis stroke="#000000" />
      </LineChart>
    </div>
  )
}