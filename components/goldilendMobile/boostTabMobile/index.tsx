"use client";

import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useGoldilend } from "../../../providers";
import { LendNotificationMobile } from "../../goldilendMobile";
import { contracts } from "../../../utils/addressi";

export const BoostTabMobile = () => {
  const {
    infoLoading,
    ownedPartners,
    selectedPartners,
    findSelectedPartnerIdxs,
    handlePartnerClick,
    boostMag,
    notification,
    txConfirming,
    userBoost,
    selectScreen,
    setSelectScreen,
  } = useGoldilend();

  const { isConnected } = useAccount();

  const loadingElement = () => {
    return <span className="loader-small m-auto"></span>;
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${month}-${day}-${year}`;
  };

  return (
    <>
      {selectScreen && (
        <div className="flex h-[100%] w-[100%] flex-col items-center">
          <h1 className="mt-[5%] font-amaticbold text-[10vw]">
            select partner nfts
          </h1>
          <div
            className="flex h-[80%] w-[95%] flex-wrap overflow-y-auto"
            id="hide-scrollbar"
          >
            {infoLoading && isConnected ? (
              loadingElement()
            ) : !isConnected || ownedPartners.length == 0 ? (
              <div className="flex h-[100%] w-[100%] flex-col items-center opacity-50">
                <img
                  className="my-[10%] w-[70%]"
                  src="/images/icon-not-found.png"
                  alt="not-found"
                />
                <h1 className="font-amaticbold text-[8vw]">no partners</h1>
              </div>
            ) : (
              ownedPartners.map((partner, index) => (
                <div key={index} className="h-[45%] w-[50%] py-2">
                  <img
                    className={`ml-[5%] h-[100%] w-[90%] border-2 border-black hover:scale-110 hover:cursor-pointer ${findSelectedPartnerIdxs().includes(partner.index) ? "border-4 border-black" : "opacity-75"}`}
                    onClick={() => handlePartnerClick(partner)}
                    src={
                      partner.name === "Beradrome"
                        ? "/images/icon-beradrome.png"
                        : "/images/icon-honeycomb.png"
                    }
                    alt="partner"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      )}
      {!selectScreen &&
        (txConfirming ? (
          <img
            className="h-[100%] w-[100%]"
            src="/images/bg-transaction-mobile.png"
            alt="tx"
          />
        ) : notification.toggle ? (
          <LendNotificationMobile />
        ) : (
          <div className="relative flex h-[100%] w-[100%] flex-col items-center justify-around py-[3%]">
            {infoLoading && isConnected ? (
              loadingElement()
            ) : userBoost.partnerNFTs.length > 0 ? (
              <>
                <div
                  className="absolute right-[3%] top-[3%] flex h-[8%] w-[10%] items-center justify-center border-2 border-black bg-[#E7B941] text-[5.5vw] text-black"
                  onClick={() => setSelectScreen(true)}
                >
                  &#8634;
                </div>
                <h1 className="font-amaticbold text-[10vw]">
                  {selectedPartners.length > 0 ? "new" : "my"} boost
                </h1>
                <div
                  className="flex h-[60%] w-[85%] flex-wrap overflow-y-auto"
                  id="hide-scrollbar"
                >
                  {infoLoading
                    ? loadingElement()
                    : selectedPartners.length > 0
                      ? selectedPartners.map((partner, index) => (
                          <div key={index} className="h-[45%] w-[50%] py-2">
                            <img
                              className={`ml-[5%] h-[100%] w-[90%] border-2 border-black hover:scale-110 hover:cursor-pointer ${findSelectedPartnerIdxs().includes(partner.index) ? "border-4 border-black" : "opacity-75"}`}
                              onClick={() => handlePartnerClick(partner)}
                              src={
                                partner.name === "Beradrome"
                                  ? "/images/icon-beradrome.png"
                                  : "/images/icon-honeycomb.png"
                              }
                              alt="partner"
                            />
                          </div>
                        ))
                      : userBoost.partnerNFTs.map((partner, index) => (
                          <div key={index} className="h-[45%] w-[50%] py-2">
                            <img
                              className="ml-[5%] h-[100%] w-[90%] border-2 border-black"
                              src={
                                partner === contracts.beradrome.address
                                  ? "/images/icon-beradrome.png"
                                  : "/images/icon-honeycomb.png"
                              }
                              alt="partner"
                            />
                          </div>
                        ))}
                </div>
                <h1 className="font-baloo text-[4.5vw] font-semibold text-[#9C4924]">
                  {selectedPartners.length > 0 ? "New" : ""} Boost Amount:{" "}
                  {userBoost.boostMagnitude + boostMag}%
                </h1>
                <h1 className="font-baloo text-[4.5vw] font-semibold text-[#9C4924]">
                  {selectedPartners.length > 0 ? "New" : ""} Expiry:{" "}
                  {selectedPartners.length > 0
                    ? formatDate(userBoost.expiry + 86400 * 30)
                    : formatDate(userBoost.expiry)}
                </h1>
              </>
            ) : (
              <>
                <div
                  className="absolute right-[3%] top-[3%] flex h-[8%] w-[10%] items-center justify-center border-2 border-black bg-[#E7B941] text-[5.5vw] text-black"
                  onClick={() => setSelectScreen(true)}
                >
                  &#8634;
                </div>
                <h1 className="font-amaticbold text-[10vw]">create boost</h1>
                <div
                  className="flex h-[60%] w-[85%] flex-wrap overflow-y-auto"
                  id="hide-scrollbar"
                >
                  {infoLoading
                    ? loadingElement()
                    : selectedPartners.map((partner, index) => (
                        <div key={index} className="h-[45%] w-[50%] py-2">
                          <img
                            className={`ml-[5%] h-[100%] w-[90%] border-2 border-black hover:scale-110 hover:cursor-pointer ${findSelectedPartnerIdxs().includes(partner.index) ? "border-4 border-black" : "opacity-75"}`}
                            onClick={() => handlePartnerClick(partner)}
                            src={
                              partner.name === "Beradrome"
                                ? "/images/icon-beradrome.png"
                                : "/images/icon-honeycomb.png"
                            }
                            alt="partner"
                          />
                        </div>
                      ))}
                </div>
                <h1 className="font-baloo text-[5vw] font-semibold text-[#9C4924]">
                  Boost Amount: {boostMag}%
                </h1>
                <h1 className="font-baloo text-[5vw] font-semibold text-[#9C4924]">
                  Boost Expiry:{" "}
                  {selectedPartners.length > 0
                    ? formatDate(Math.floor(Date.now() / 1000) + 86400 * 30)
                    : "-"}
                </h1>
              </>
            )}
          </div>
        ))}
    </>
  );
};
