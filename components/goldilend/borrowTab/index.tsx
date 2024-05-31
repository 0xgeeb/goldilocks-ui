"use client"

import { useState, useEffect } from "react"
import { useGoldilend } from "../../../providers"

export const BorrowTab = () => {

  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const {
    getOwnedBeras,
    ownedBeras,
    handleBeraClick,
    infoLoading,
    setInfoLoading,
    findSelectedBeraIdxs,
    selectedBeras
  } = useGoldilend()

  useEffect(() => {
    getOwnedBeras()
    setInfoLoading(false)
  }, [])

  const loadingElement = () => {
    return <span className="loader-small mx-auto"></span>
  }

  const imgNames: string[] = ['bg-goldilend.png', 'bg-goldiswap.png', 'bg-goldiswap-mobile.png', 'bg-transaction.png', 'bg-transaction-mobile.png']

  const nextImages = () => {
    if(currentIndex + 4 < selectedBeras.length) {
      setCurrentIndex(currentIndex + 4)
    }
  }

  const prevImages = () => {
    if(currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4)
    }
  }

  return (
    <div className="w-[100%] h-[100%] flex flex-row">
      <div className="h-[100%] w-[100%] px-[0%] border-r-2 border-black flex flex-col items-center">
        <h1 className="font-amaticbold text-[3vw] mt-[2%]">select collateral</h1>
        <div className="flex flex-wrap overflow-y-auto w-[75%] h-[80%]" id="hide-scrollbar">
        {
            infoLoading ? loadingElement() :
            ownedBeras.map((bera, index) => (
              <div key={index} className="h-[25%] w-[33%] py-2">
                <img
                  className={`ml-[5%] h-[100%] w-[90%] border-2 border-black hover:scale-110 hover:cursor-pointer ${findSelectedBeraIdxs().includes(bera.index) ? "border-4 border-black" : "opacity-75"}`}
                  onClick={() => handleBeraClick(bera)}
                  src={bera.imageSrc}
                  alt="bera"
                />
              </div>
            ))
          }
        </div>
      </div>
      <div className="h-[100%] w-[100%] flex flex-col items-center justify-between py-[1%]">
        <h1 className="font-amaticbold text-[2.5vw]">create loan</h1>
        <div className="w-[90%] h-[20%] flex flex-row items-center justify-between relative">
          <span className="absolute top-[-10%] left-0">Collateral</span>
          <div className="text-[2vw] cursor-pointer hover:scale-125" onClick={() => prevImages()}>&lt;</div>
          {
            selectedBeras.slice(currentIndex, currentIndex + 4).map((bera, index) => (
              <img
                className="h-[80%] w-[20%] border-2 border-black"
                onClick={() => handleBeraClick(bera)}
                src={bera.imageSrc}
                alt="selectedbera"
                key={index}
              />
            ))
          }
          <div className="text-[2vw] cursor-pointer hover:scale-125" onClick={() => nextImages()}>&gt;</div>
        </div>
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