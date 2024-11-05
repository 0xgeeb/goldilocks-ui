"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts"
import { useGoldiswap } from "../../../providers"

export const Chart = () => {

  const [chartWidth, setChartWidth] = useState<number>(window.innerWidth > 1024 ? window.innerWidth * .365 : window.innerWidth * .52)
  const [chartHeight, setChartHeight] = useState<number>(window.innerWidth > 1024 ? window.innerHeight * .24 : window.innerHeight * .28)

  const { chartData, setChartOpen } = useGoldiswap()
  const data = chartData

  useEffect(() => {
    updateDimensions()
    
    window.addEventListener("resize", updateDimensions)
  
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  const updateDimensions = () => {
    if(window.innerWidth > 1024) {
      setChartWidth(window.innerWidth * .365)
      setChartHeight(window.innerHeight * .24)
    }
    else {
      setChartWidth(window.innerWidth * .52)
      setChartHeight(window.innerHeight * .28)
    }
  }

  return (
    <div className="w-[100%] h-[100%] bg-[#F3AA8A] flex flex-col justify-between lg:pl-[3%] lg:pb-[2.5%] font-baloo text-[1.4vw] lg:text-[1vw]">
      <h1 className="font-amaticbold text-[5.2vw] lg:text-[3vw] ml-[7%] lg:ml-[13%]">this is market price chart</h1>
      <LineChart 
        width={chartWidth}
        height={chartHeight}
        data={data}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <Line type="natural" dataKey="value" dot={false} strokeWidth={3} stroke="#000000" />
        <CartesianGrid stroke="#000000" vertical={false} />
        <XAxis dataKey="date" stroke="#000000" />
        <YAxis type="number" domain={['auto', 'auto']} stroke="#000000" />
      </LineChart>
      <p
        className="absolute top-0 right-[3%] font-baloo text-[3vw] lg:text-[2vw] cursor-pointer hover:scale-125"
        onClick={() => setChartOpen(false)}
      >
        x
      </p>
    </div>
  )
}