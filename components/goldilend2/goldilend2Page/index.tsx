"use client"

import { useEffect } from "react"
import { useAtom, useAtomValue } from "jotai";
import { geoAtom } from "@/app/_components/atoms/geoAtom";
import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";
import { Loading, TAndCs } from "../../utils"
import { useGoldilend } from "../../../providers"


export const Goldilend2Page = () => {
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom)

  const {
    wutPopup,
    setWutPopup
  } = useGoldilend()

  const signed = useAtomValue(geoAtom)

  useEffect(() => {
    setPageLoading(false)
  }, [])
  
  const handlePopups = (e: any) => {

  }

  if(pageLoading) {
    return <Loading />
  }

  if(signed !== "TRUE") {
    return <TAndCs />
  }

  return (
    <CsrPageLayout
      onPageClick={(e) => handlePopups(e)}
      wutPopup={wutPopup}
      setWutPopup={setWutPopup}
      bgImageUrl="/images/bg-goldivault-2.png"
    >
      <div className="flex flex-col items-center justify-center p-10">
        <div
          style={{
            backdropFilter: "blur(18px)",
            backgroundColor: "rgba(26,20,12, 0.75)",
          }}
          className="flex w-full flex-col gap-3 rounded-2xl p-6 max-w-7xl backdrop-blur-lg"
        >
          <div className="flex flex-row items-center gap-3">
            <h1 className="text-HoneyYellow font-amaticbold text-6xl" id="page-title">Goldilend -</h1>
            <h1 className="text-HoneyYellow font-amaticbold text-4xl" id="page-title">Borrowing</h1>
          </div>
          
        </div>
      </div>
    </CsrPageLayout>
  )
}