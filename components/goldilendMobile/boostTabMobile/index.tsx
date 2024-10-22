"use client"

import { useEffect } from "react"
import { useAccount } from "wagmi"
import { useGoldilend } from "../../../providers"
import { LendNotificationMobile } from "../../goldilendMobile"
import { contracts } from "../../../utils/addressi"

export const BoostTabMobile = () => {

  const {
    infoLoading,
    ownedPartners,
    selectedPartners,
    findSelectedPartnerIdxs,
    handlePartnerClick,
    updateBoostMag,
    boostMag,
    notification,
    txConfirming,
    userBoost,
    selectScreen,
    setSelectScreen
  } = useGoldilend()

  const { isConnected } = useAccount()

  useEffect(() => {
    updateBoostMag()
  }, [selectedPartners])

  const loadingElement = () => {
    return <span className="loader-small m-auto"></span>
  }

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = String(date.getFullYear())
    return `${month}-${day}-${year}`
  }

  return (
    <>
      {
        selectScreen &&
        <div className="h-[100%] w-[100%] flex flex-col items-center">
          <h1 className="font-amaticbold text-[10vw] mt-[5%]">select partner nfts</h1>
          <div className="flex flex-wrap overflow-y-auto w-[95%] h-[80%]" id="hide-scrollbar">
            {
            (infoLoading && isConnected) ? loadingElement() :
            (!isConnected || ownedPartners.length == 0) ? 
            <div className="w-[100%] h-[100%] flex flex-col items-center opacity-50">
              <img className="w-[70%] my-[10%]" src="/images/icon-not-found.png" alt="not-found" />
              <h1 className="font-amaticbold text-[8vw]">no partners</h1>
            </div> :
              ownedPartners.map((partner, index) => (
                <div key={index} className="h-[45%] w-[50%] py-2">
                  <img
                    className={`ml-[5%] h-[100%] w-[90%] border-2 border-black hover:scale-110 hover:cursor-pointer ${findSelectedPartnerIdxs().includes(partner.index) ? "border-4 border-black" : "opacity-75"}`}
                    onClick={() => handlePartnerClick(partner)}
                    src={partner.name === 'Beradrome' ? "/images/icon-beradrome.png" : "/images/icon-honeycomb.png"}
                    alt="partner"
                  />
                </div>
              ))
            }
          </div>
        </div>
      }
      {
        !selectScreen &&
        (
          txConfirming ? <img className="w-[100%] h-[100%]" src="/images/bg-transaction-mobile.png" alt="tx" /> :
          notification.toggle ? <LendNotificationMobile /> :
          <div className="h-[100%] w-[100%] flex flex-col items-center justify-around py-[3%] relative">
            {
              (infoLoading && isConnected) ? loadingElement() :
              userBoost.partnerNFTs.length > 0 ?
              <>
                <div
                  className="absolute top-[3%] right-[3%] w-[10%] h-[8%] border-2 border-black text-black bg-[#E7B941] flex items-center justify-center text-[5.5vw]"
                  onClick={() => setSelectScreen(true)}
                >
                  &#8634;
                </div>
                <h1 className="font-amaticbold text-[10vw]">{selectedPartners.length > 0 ? "new" : "my"} boost</h1>
                <div className="flex flex-wrap overflow-y-auto w-[85%] h-[60%]" id="hide-scrollbar">
                  {
                    infoLoading ? loadingElement() :
                    selectedPartners.length > 0 ?
                    selectedPartners.map((partner, index) => (
                      <div key={index} className="h-[45%] w-[50%] py-2">
                        <img
                          className={`ml-[5%] h-[100%] w-[90%] border-2 border-black hover:scale-110 hover:cursor-pointer ${findSelectedPartnerIdxs().includes(partner.index) ? "border-4 border-black" : "opacity-75"}`}
                          onClick={() => handlePartnerClick(partner)}
                          src={partner.name === 'Beradrome' ? "/images/icon-beradrome.png" : "/images/icon-honeycomb.png"}
                          alt="partner"
                        />
                      </div>
                    )) :
                    userBoost.partnerNFTs.map((partner, index) => (
                      <div key={index} className="h-[45%] w-[50%] py-2">
                        <img
                          className="ml-[5%] h-[100%] w-[90%] border-2 border-black"
                          src={partner === contracts.beradrome.address ? "/images/icon-beradrome.png" : "/images/icon-honeycomb.png"}
                          alt="partner"
                        />
                      </div>
                    ))
                  }
                </div>
                <h1 className="text-[4.5vw] font-baloo font-semibold text-[#9C4924]">{selectedPartners.length > 0 ? "New" : ""} Boost Amount: {userBoost.boostMagnitude + boostMag}%</h1>
                <h1 className="text-[4.5vw] font-baloo font-semibold text-[#9C4924]">{selectedPartners.length > 0 ? "New" : ""} Expiry: {selectedPartners.length > 0 ? formatDate(userBoost.expiry + (86400*30)) : formatDate(userBoost.expiry)}</h1>
              </> :
              <>
                <div
                  className="absolute top-[3%] right-[3%] w-[10%] h-[8%] border-2 border-black text-black bg-[#E7B941] flex items-center justify-center text-[5.5vw]"
                  onClick={() => setSelectScreen(true)}
                >
                  &#8634;
                </div>
                <h1 className="font-amaticbold text-[10vw]">create boost</h1>
                <div className="flex flex-wrap overflow-y-auto w-[85%] h-[60%]" id="hide-scrollbar">
                  {
                    infoLoading ? loadingElement() :
                    selectedPartners.map((partner, index) => (
                      <div key={index} className="h-[45%] w-[50%] py-2">
                        <img
                          className={`ml-[5%] h-[100%] w-[90%] border-2 border-black hover:scale-110 hover:cursor-pointer ${findSelectedPartnerIdxs().includes(partner.index) ? "border-4 border-black" : "opacity-75"}`}
                          onClick={() => handlePartnerClick(partner)}
                          src={partner.name === 'Beradrome' ? "/images/icon-beradrome.png" : "/images/icon-honeycomb.png"}
                          alt="partner"
                        />
                      </div>
                    ))
                  }
                </div>
                <h1 className="text-[5vw] font-baloo font-semibold text-[#9C4924]">Boost Amount: {boostMag}%</h1>
                <h1 className="text-[5vw] font-baloo font-semibold text-[#9C4924]">Boost Expiry: {selectedPartners.length > 0 ? formatDate(Math.floor(Date.now() / 1000) + (86400*30)) : "-"}</h1>
              </>
            }
          </div>
        )
      }
    </>
  )
}