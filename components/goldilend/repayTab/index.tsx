"use client"

import { useState, useEffect } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useGoldilend, useNotification, useWallet } from "../../../providers"
import { useGoldilendTx } from "../../../hooks"
import { contracts } from "../../../utils/addressi"

export const RepayTab = () => {

  const {
    loansLoading,
    userLoans,
    findLoans,
    setLoansLoading
  } = useGoldilend()

  const loadingElement = () => {
    return <span className="loader-small mx-auto"></span>
  }

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = String(date.getFullYear())
    return `${month}-${day}-${year}`
  }

  const formatNum = (num: number): string => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  useEffect(() => {
    findLoans()
    setLoansLoading(false)
  }, [])

  return (
    <div className="h-[100%] w-[100%] flex flex-col">
      <div className="w-[100%] h-[15%] border-b-2 border-black">
        <h1 className="font-amaticbold ml-[4%] text-[2.3vw]">my loans</h1>
      </div>
      {
        loansLoading ?
        loadingElement() :
        userLoans.map((loan, index) => (
          <div className="w-[100%] h-[28%] font-baloo font-semibold border-b-2 border-black flex flex-row items-center relative" key={index}>
            <h1 className="absolute text-[1vw] top-[2%] left-[1%]">Loan {loan.loanId}</h1>
            <div className="h-[50%] w-[35%] px-[3%] flex flex-col justify-center text-[0.8vw] ml-[7%]">
              <div className="w-[100%] flex flex-row items-center justify-between">
                <span>total amount to repay:</span>
                <span>{formatNum(loan.borrowedAmount)} iBGT</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between">
                <span>amount repaid:</span>
                <span>0 iBGT</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between">
                <span>amount outstanding:</span>
                <span>{formatNum(loan.borrowedAmount)} iBGT</span>
              </div>
              <div className="w-[100%] flex flex-row items-center justify-between">
                <span>days left:</span>
                <span>9 days</span>
              </div>
            </div>
            <div className="h-[100%] w-[35%] flex flex-col items-center">
              <h1 className="text-[#9C4924] my-[2%]">Collateral</h1>
              <div className="w-[90%] h-[65%] overflow-x-auto flex flex-row items-center justify-around" id="hide-scrollbar">
                {
                  loan.collateralNFTs.map((nft) => (
                    <img
                      className="h-[100%] w-[30%] mr-[5%]  border-2 border-black"
                      src={nft === contracts.bondbear.address ? 'https://ipfs.io/ipfs/QmSaVWb15oQ1HcsUjGGkjwHQ1mxJBYeivtBCgHHHiVLt7w' : 'https://ipfs.io/ipfs/QmNWggx9vvBVEHZc6xwWkdyymoKuXCYrJ3zQwwKzocDxRt'}
                      alt="collateral"
                      key={nft}
                    />
                  ))
                }
              </div>
            </div>
            <div className="h-[100%] w-[23%] flex flex-col relative">
                <div className="bg-[#CC8634] absolute top-[20%] left-[5%] h-[30%] w-[25%] cursor-pointer hover:scale-110 text-[0.9vw] border-t-2 border-b-2 border-l-2 border-black flex items-center justify-center">
                  MAX
                </div>
                <div className="top-[20%] left-[30%] h-[30%] w-[65%] absolute bg-white border-2 border-black">

                </div>
                <button className="top-[60%] left-[30%] h-[30%] w-[65%] absolute border-2 border-black bg-[#E7B941] text-[0.9vw]">
                  REPAY LOAN
                </button>
            </div>
          </div>
        ))
      }
    </div>
  )
}