"use client"

import { VaultDisplayCard } from "../"

export const VaultDisplay = () => {

  return (
    <div className="absolute top-[20%] lg:top-[29%] left-[7.5%] h-[65%] lg:h-[55%] w-[85%] p-2">
      <div className="relative w-[100%] h-[100%] flex flex-wrap overflow-y-auto">
        <VaultDisplayCard
          params={{
            address: '0x281F698b0969904Df5476CC4031B4C886dE86323',
            mouseFlag: 'weethvaultinfo',
            tokenName: 'weETH',
            imageUrl: 'weeth-logo.png',
            vaultName: 'Etherfi Points Vault'
          }}
        />
        <VaultDisplayCard
          params={{
            address: 'rseth',
            mouseFlag: 'rsethvaultinfo',
            tokenName: 'rsETH',
            imageUrl: 'rseth_logo.png',
            vaultName: 'KelpDAO Points Vault'
          }}
        />
        <VaultDisplayCard
          params={{
            address: 'ebtc',
            mouseFlag: 'ebtcvaultinfo',
            tokenName: 'eBTC',
            imageUrl: 'ebtc-logo.png',
            vaultName: 'EtherFi Points Vault'
          }}
        />
        <VaultDisplayCard
          params={{
            address: '0xEfBfEC4ab23BeB740D6463Ba046f2d7B66E9e314',
            mouseFlag: 'unibtcvaultinfo',
            tokenName: 'uniBTC',
            imageUrl: 'unibtc-logo.png',
            vaultName: 'Bedrock Points Vault'
          }}
        />
        <VaultDisplayCard
          params={{
            address: '0x0ed996697ABDe35eD6C3E61C562D37366ba06d88',
            mouseFlag: 'solvbtcvaultinfo',
            tokenName: 'SolvBTC.BBN',
            imageUrl: 'solvbtc-logo.png',
            vaultName: 'Solv Points Vault'
          }}
        />
      {/* <VaultDisplayCard
          params={{
            address: '0x35EF111B092d5faeF321A1aC7e048E378c63DCCc',
            mouseFlag: 'honeywberavaultinfo',
            tokenName: 'HONEY-WBERA',
            imageUrl: 'honeywbera-logo.png',
            vaultName: 'BEX LP on Infrared'
          }}
        />
        <VaultDisplayCard
          params={{
            address: '0x541C4aCA915ccC83B1bf48b510D1653cba61115F',
            mouseFlag: 'bhoneyvaultinfo',
            tokenName: 'bHONEY',
            imageUrl: 'bhoney-logo.png',
            vaultName: 'BERPS Honey Vault'
          }}
        /> */}
      </div>
    </div>
  )
}