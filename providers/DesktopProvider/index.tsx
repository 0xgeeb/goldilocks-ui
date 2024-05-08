"use client"

import { createContext, useContext, PropsWithChildren, useState, useEffect } from "react"

const DESKTOP_INITIAL_STATE = {
  isDesktop: true,
  setIsDesktop: (_isDesktop: boolean) => {},
  navButtonsOpen: false,
  setNavButtonsOpen: (_navButtonsOpen: boolean) => {}
}

const DesktopContext = createContext(DESKTOP_INITIAL_STATE)

export const DesktopProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props

  const [isDesktopState, setIsDesktopState] = useState<boolean>(true)
  const [navButtonsOpenState, setNavButtonsOpenState] = useState<boolean>(false)

  useEffect(() => {
    updateDimensions()
    
    window.addEventListener("resize", updateDimensions)
  
    return () => window.removeEventListener("resize", updateDimensions)
    
  }, [])
  
  function updateDimensions() {
    if(window.innerWidth > 639) {
      setIsDesktopState(true)
    }
    else {
      setIsDesktopState(false)
    }
  }

  return (
    <DesktopContext.Provider 
      value={{
        isDesktop: isDesktopState,
        setIsDesktop: setIsDesktopState,
        navButtonsOpen: navButtonsOpenState,
        setNavButtonsOpen: setNavButtonsOpenState
      }}
    >
      {children}
    </DesktopContext.Provider>
  )
}

export const useDesktop = () => useContext(DesktopContext)