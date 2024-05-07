"use client"

export default function Home() {

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
    <div onClick={() => test()}>blame napzilla not me</div>
  )
}
