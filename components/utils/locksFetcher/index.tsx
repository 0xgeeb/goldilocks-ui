"use client"

import { useState, useEffect } from "react"
import { useGetDailyEndPricesQuery } from "../../../src/graphql/generated/queries"

export const LocksFetcher = () => {

  const [skip, setSkip] = useState<boolean>(false)

  const last7DaysTimestamps = (): { start: number, end: number }[] => {
    const result = []
    const currentDate = new Date()
    
    for (let i = 0; i < 7; i++) {
      const end = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i, 23, 59, 59, 999)
      const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i, 0, 0, 0, 0)
      
      result.push({
        start: Math.floor(start.getTime() / 1000),
        end: Math.floor(end.getTime() / 1000)
      })
    }
  
    console.log(result)
    return result
  }

  const timestamps = last7DaysTimestamps()

  const { data, loading } = useGetDailyEndPricesQuery({
    variables: {
      firstStart: timestamps[0].start,
      firstEnd: timestamps[0].end,
      secondStart: timestamps[1].start,
      secondEnd: timestamps[1].end,
      thirdStart: timestamps[2].start,
      thirdEnd: timestamps[2].end,
      fourthStart: timestamps[3].start,
      fourthEnd: timestamps[3].end,
      fifthStart: timestamps[4].start,
      fifthEnd: timestamps[4].end,
      sixthStart: timestamps[5].start,
      sixthEnd: timestamps[5].end,
      seventhStart: timestamps[6].start,
      seventhEnd: timestamps[6].end,
    },
    skip
  })

  useEffect(() => {
    if(!loading && !!data) {
      console.log(data)
      console.log(timestamps)
      setSkip(true)
    }
  }, [data, loading])

  return null
}