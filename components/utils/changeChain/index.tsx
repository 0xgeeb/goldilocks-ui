"use client"

import { useState, useEffect } from "react"
import { useWallet } from "../../../providers"

export const ChangeChain = () => {

  const [popup, setPopup] = useState<boolean>(false)

  const { network } = useWallet()

  useEffect(() => {
    if(network !== 'Berachain bArtio') {
      setPopup(true)
    }
    else {
      setPopup(false)
    }
  }, [network])

  return (
    popup && 
    <div className="absolute w-[30%] xl:w-[25%] 2xl:w-[15%] font-baloo font-semibold text-center px-2 text-[2vw] xl:text-[1.5vw] 2xl:text-[1vw] h-[6%] lg:h-[8%] bottom-[1%] left-[1%] bg-[#FFE59F] border-2 border-black flex items-center justify-center">
      change your network to bartio
    </div>
  )
}