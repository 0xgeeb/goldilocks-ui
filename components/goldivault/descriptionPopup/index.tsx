"use client"

import { useGoldivault } from "../../../providers"
import { useVaultInfoConfig } from "@/hooks"

type DescriptionPopupProps = {
  params: {
    vaultToken: string;
  }
}

export const DescriptionPopup = ({ params }: DescriptionPopupProps) => {

  // OT: Each oriBGT-OT represents one iBGT deposited into the Goldivault. At maturity, oriBGT-OT can be redeemed at a one to one ratio for iBGT. Buying oriBGT-OT locks in the current fixed apr, which is determined by market price at time of purchase, and is not subject to dilution or dependent on the actual yield accrued by the underlying asset.
  // YT: Each YT represents the yield earned by a single iBGT via Origami’s auto compounding oriBGT wrapper over the duration of the vault. YT are automatically staked on buys and automatically unstaked on sales. Whilst holding staked YT, you can continuously claim yield in the form of iBGT. At maturity, YT tokens no longer have any value and cannot be redeemed for any underlying asset. YT also earn all points associated with the underlying asset prior to maturity. Points are distributed by relevant partners, not Golidlocks.
  // Liquidity: Click the zap’ button to use your iBGT to provide liquidity for oriBGT-OT and oriBGT. The zap is a simple one click strategy that deposits part of your iBGT into oriBGT and the other part into oriBGT-OT and oriBGT-YT, then uses those tokens to provide liquidity and deposits the LP token into a BGT earning reward vault. This position then earns you oriBGT yield (from the oriBGT in the LP and the oriBGT-YT), trading fees _and_ BGT emissions. When you want to withdraw your liquidity position, you can use zap’ button again to fully unwind your position in a single click.

  const {
    setDescriptionPopup
  } = useGoldivault()

  const {
    descriptionTitle,
    vaultOTLabel,
    vaultDTLabel
  } = useVaultInfoConfig({ vaultToken: params.vaultToken})

  return (
    <div className="absolute w-7/8 sm:w-full max-w-5xl z-100 flex flex-col gap-2.5 rounded-2xl border-2 border-[#352A1C] py-4 px-4 sm:px-16 bg-bera-brown-dark">
      <h1 id="page-title" className="text-HoneyYellow font-amaticbold text-3xl sm:text-6xl mx-auto my-5">{descriptionTitle} Goldivault Description</h1>
      <h2 className="text-white font-amaticbold text-xl sm:text-3xl"><span className="text-HoneyYellow text-2xl sm:text-4xl">OT:</span> Each {vaultOTLabel} represents one {vaultDTLabel} deposited into the Goldivault. At maturity, {vaultOTLabel} can be redeemed at a one to one ratio for {vaultDTLabel}. Buying {vaultOTLabel} locks in the current fixed apr, which is determined by market price at time of purchase, and is not subject to dilution or dependent on the actual yield accrued by the underlying asset.</h2>
      <h2 className="text-white font-amaticbold text-xl sm:text-3xl my-5"><span className="text-HoneyYellow text-2xl sm:text-4xl">YT:</span> Each YT represents the yield earned by a single {descriptionTitle} staked over the duration of the vault. YT are automatically staked on buys and automatically unstaked on sales. Whilst holding staked YT, you can continuously claim yield in the form of {vaultDTLabel}. At maturity, YT tokens no longer have any value and cannot be redeemed for any underlying asset. YT also earn all points associated with the underlying asset prior to maturity. Points are distributed by relevant partners, not Golidlocks.</h2>
      {/* <h2 className="text-white font-amaticbold text-3xl my-5"><span className="text-HoneyYellow text-4xl">Liquidity:</span>Click the zap’ button to use your iBGT to provide liquidity for oriBGT-OT and oriBGT. The zap is a simple one click strategy that deposits part of your iBGT into oriBGT and the other part into oriBGT-OT and oriBGT-YT, then uses those tokens to provide liquidity and deposits the LP token into a BGT earning reward vault. This position then earns you oriBGT yield (from the oriBGT in the LP and the oriBGT-YT), trading fees _and_ BGT emissions. When you want to withdraw your liquidity position, you can use zap’ button again to fully unwind your position in a single click.</h2> */}
      <span
        className="absolute top-0 right-[2%] text-HoneyYellow hover:text-white cursor-pointer text-5xl"
        onClick={() => setDescriptionPopup(false)}
      >
        x
      </span>
    </div>
  )
}