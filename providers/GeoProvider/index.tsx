"use client"

import { createContext, useContext, PropsWithChildren } from "react"

const INITIAL_STATE = {

}

const GeoContext = createContext(INITIAL_STATE)

export const GeoProvider = (props: PropsWithChildren<{}>) => {

  const { children } = props

  const withinUS = (latitude: number, longitude: number): boolean => {
    const usBoundary = {
      minLatitude: 24.396308,
      maxLatitude: 49.384358,
      minLongitude: -125.0,
      maxLongitude: -66.93457
    }
    return (
      latitude >= usBoundary.minLatitude &&
      latitude <= usBoundary.maxLatitude &&
      longitude >= usBoundary.minLongitude &&
      longitude <= usBoundary.maxLongitude
    )
  }

  const test = () => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log("latitude: ", position.coords.latitude)
      console.log("longitude: ", position.coords.longitude)
      console.log("within us: ", withinUS(position.coords.latitude, position.coords.longitude))
    })
  }

  return (
    <GeoContext.Provider
      value={{

      }}    
    >
      { children }
    </GeoContext.Provider>
  )
}

export const useGeo = () => useContext(GeoContext)