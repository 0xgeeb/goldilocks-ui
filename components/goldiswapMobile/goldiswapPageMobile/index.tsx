"use client"

import { useGoldiswap, useDesktop } from "../../../providers"
import {
  StatsMobile,
  GoldiswapButtonMobile,
  SwapBoxMobile,
  TogglesMobile
} from "../../goldiswapMobile"
import {
  NavBarMobile,
  NavBarButtons,
  FooterMobile
} from "../../utils"

export const GoldiswapPageMobile = () => {

  const {
    chartOpen,
    setChartOpen,
    activeToggle
  } = useGoldiswap()

  const { navButtonsOpen } = useDesktop()

  // const { floorPrice, marketPrice } = useGoldiswapMath()

  // useEffect(() => {
  //   refreshGoldiswapInfo()
  //   checkSlippageAmount()
  //   setInfoLoading(false)
  // }, [])

  // const formatAsTokenPrice = (num: number): string => {
  //   return num.toLocaleString('en-US', { maximumFractionDigits: 6 })
  // }

  // const handleTokenInfo = (num: number) => {
  //   if(infoLoading) {
  //     return "-"
  //   }
  //   else if(num > 0) {
  //     return formatAsTokenPrice(num)
  //   }
  //   else {
  //     return "-"
  //   }
  // }

  // const insideSlippage = (e: any): boolean => {
  //   const slipLeft = 0.45
  //   const slipRight = 0.64

  //   if(e.clientX > (window.innerWidth * slipLeft) && e.clientX < (window.innerWidth * slipRight) && e.clientY > (window.innerHeight * 0.32) && e.clientY < (window.innerHeight * 0.54)) {
  //     return true
  //   }
  //   else {
  //     return false
  //   }
  // }

  // const handlePopups = (e: any) => {
  //   if(slippage.toggle && !insideSlippage(e)) {
  //     changeSlippageToggle(false)
  //   }
  //   if(redeemPopupToggle) {
  //     setRedeemPopupToggle(false)
  //   }
  // }

  return (
    <main className="w-screen h-screen">
      <NavBarMobile />
      { navButtonsOpen && <NavBarButtons /> }
      <div className="w-[100%] h-[89%] relative bg-cover bg-[url('/images/bg-goldiswap-mobile.png')]">
        <TogglesMobile />
        <h1 className="absolute top-[-0.25%] right-[69%] text-[#D9C6BA] text-[7vw] font-amaticbold" id="page-title">{activeToggle === 'REDEEM' ? "REDEEM" : "SWAP"}</h1>
        {/* <div className="absolute top-[9.387%] left-[28.125%] w-[43.75%] h-[2.78%] bg-[#4D0B24] flex flex-row items-center justify-between px-2">
          <span className="text-white font-baloo mt-1">$LOCKS floor price: ${handleTokenInfo(floorPrice(goldiswapInfo.fsl, goldiswapInfo.supply))}</span>
          <span className="text-white font-baloo mt-1">$LOCKS market price: ${handleTokenInfo(marketPrice(goldiswapInfo.fsl, goldiswapInfo.psl, goldiswapInfo.supply))}</span>
        </div> */}
        {/* <WalletBalance /> */}
        {/* { slippage.toggle && <SlippagePopup /> } */}
        <SwapBoxMobile />
        <img className="absolute top-[73.2%] right-[10.5%] -rotate-[90deg] h-[1.27%] w-[8.36%]" src="/images/icon-bearoutline.png" alt="bearoutline" />
        <div 
          className="absolute h-[12%] w-[13%] top-[67%] text-nowrap right-[0%] border-t-2 border-l-2 border-b-2 border-black bg-[#F3AA8A] font-amaticbold text-[5vw] hover:scale-110 cursor-pointer"
          onClick={() => setChartOpen(!chartOpen)}
        >
          <span className="absolute -rotate-[90deg] right-[-21%] bottom-[35%]">THIS IS CHART</span>
        </div>
        <GoldiswapButtonMobile />
        <StatsMobile />
        <FooterMobile />
      </div>
    </main>
  )
}