"use client"

import { useEffect } from "react"
import { useAtom, useAtomValue } from "jotai";
import { geoAtom } from "@/app/_components/atoms/geoAtom";
import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";
import { Loading, TAndCs } from "../../utils"
import { useGoldilend } from "../../../providers"


export const Goldilend2LendPage = () => {
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
      <div>goldilend2lendpage</div>
    </CsrPageLayout>
  )
}