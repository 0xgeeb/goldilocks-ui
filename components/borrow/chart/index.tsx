"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { useBorrow } from "../../../providers"

export const Chart = () => {

  const [chartWidth, setChartWidth] = useState<number>(window.innerWidth > 1024 ? window.innerWidth * .365 : window.innerWidth * .52)
  const [chartHeight, setChartHeight] = useState<number>(window.innerWidth > 1024 ? window.innerHeight * .18 : window.innerHeight * .19)

  const { chartData, setChartOpen } = useBorrow()
  const data = chartData

  useEffect(() => {
    updateDimensions()
    
    window.addEventListener("resize", updateDimensions)
  
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  const updateDimensions = () => {
    if(window.innerWidth > 1024) {
      setChartWidth(window.innerWidth * .365)
      setChartHeight(window.innerHeight * .18)
    }
    else {
      setChartWidth(window.innerWidth * .52)
      setChartHeight(window.innerHeight * .19)
    }
  }

  return (
    <div className="w-[100%] h-[100%] bg-[#F3AA8A] relative flex flex-col justify-between lg:pl-[3%] lg:pb-[2.5%] font-baloo text-[1.4vw] lg:text-[1vw]">
      <h1 className="font-amaticbold text-[3.5vw] lg:text-[1.75vw] ml-[4%]">this is price chart</h1>
      <LineChart 
        width={chartWidth}
        height={chartHeight}
        data={data}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <Line type="natural" dataKey="marketPrice" dot={false} strokeWidth={3} stroke="#000000" />
        <Line type="natural" dataKey="floorPrice" dot={false} strokeWidth={3} stroke="#c4c4c4" />
        <CartesianGrid stroke="#000000" vertical={false} />
        <XAxis dataKey="date" stroke="#000000" />
        <YAxis type="number" domain={['auto', 'auto']} stroke="#000000" />
        <Tooltip />
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