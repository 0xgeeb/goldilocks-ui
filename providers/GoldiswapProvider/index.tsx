"use client"

import { createContext, PropsWithChildren, useContext, useState } from "react"

const INITIAL_STATE = {

}

const GoldiswapContext = createContext(INITIAL_STATE)

export const GoldiswapProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props
  
  return (
    <GoldiswapContext.Provider
      value={{

      }}
    >
      { children }
    </GoldiswapContext.Provider>
  )
}