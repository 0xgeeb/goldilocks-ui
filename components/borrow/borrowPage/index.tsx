"use client"

import { NavBar } from "../../utils/navBar"

export const BorrowPage = () => {
  
  return (
    <main className="w-screen h-screen">
      <NavBar />
      <div className="w-[100%] h-[85%] bg-cover bg-bottom bg-[url('/images/bg-goldiswap.png')] relative">
        {/* todo: fix the size and position of these buttons */}
        <div className="absolute h-[7.5%] w-[20.27%] top-[2.62%] left-[78.89%] flex flex-row items-center justify-between font-baloo font-semibold text-[1vw]">
          <div className="w-[30.27%] h-[100%] flex items-center justify-center border-2 border-black bg-[#D9C6BA]">BORROW</div>
          <div className="w-[30.27%] h-[100%] flex items-center justify-center border-2 border-black bg-[#D9C6BA]">REPAY</div>
        </div>
        <h1 className="absolute top-[12.16%] left-[10%] text-[#D9C6BA] text-[8vw] font-amaticbold" id="page-title">BORROW</h1>
      </div>
    </main>
  )
}