"use client"

import { createContext, useContext, PropsWithChildren, useState, useEffect } from "react"

const DESKTOP_INITIAL_STATE = {
  isDesktop: true
}

const DesktopContext = createContext(DESKTOP_INITIAL_STATE)

export const DesktopProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props

  const [isDesktopState, setIsDesktopState] = useState<boolean>(true)

  useEffect(() => {
    updateDimensions()
    
    window.addEventListener("resize", updateDimensions)
  
    return () => window.removeEventListener("resize", updateDimensions)
    
  }, [])
  
  function updateDimensions() {
    if(window.innerWidth > 850) {
      setIsDesktopState(true)
    }
    else {
      setIsDesktopState(false)
    }
  }

  return (
    <DesktopContext.Provider 
      value={{
        isDesktop: isDesktopState
      }}
    >
      {children}
    </DesktopContext.Provider>
  )
}

export const useDesktop = () => useContext(DesktopContext)