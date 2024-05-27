"use client"

import { useState, useEffect } from "react"

export const BorrowTab = () => {

  const [array, setArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])

  return (
    <div className="w-[100%] h-[100%] flex flex-row">
      <div className="h-[100%] w-[100%] px-[0%] border-r-2 border-black flex flex-col items-center">
        <h1 className="font-amaticbold text-[3vw] mt-[2%]">select collateral</h1>
        <div className="flex flex-wrap overflow-y-auto w-[75%] h-[80%]" id="hide-scrollbar">
          {
            array.map((index) => (
              <div key={index} className="h-[25%] w-[33%] py-2">
                <img className="ml-[5%] h-[100%] w-[90%] border-2 border-black" src="/images/icon-napzilla.png" alt="bera" />
              </div>
            ))
          }
        </div>
      </div>
      <div className="h-[100%] w-[100%] flex flex-col items-center justify-between py-[2%]">
        <h1 className="font-amaticbold text-[3vw]">create loan</h1>
        <div className="w-[65%] flex flex-row items-center justify-between font-baloo font-semibold text-[1vw]">
          <span>Loan Amount:</span>
          <span>69</span>
        </div>
        <div className="w-[65%] flex flex-row items-center justify-between font-baloo font-semibold text-[1vw]">
          <span>Repay Deadline:</span>
          <span>6-9-69</span>
        </div>
        <div className="w-[65%] flex flex-row items-center justify-between font-baloo font-semibold text-[1vw]">
          <span>Interest Rate:</span>
          <span>69%</span>
        </div>
        <div className="w-[65%] flex flex-row items-center justify-between font-baloo font-semibold text-[1vw]">
          <span>Total Interest Due:</span>
          <span>69</span>
        </div>
        <button className="w-[48%] h-[12%] bg-[#E7B941] border-2 border-black font-amaticbold text-[1.7vw] flex items-center justify-center">create loan</button>
      </div>
    </div>
  )
}