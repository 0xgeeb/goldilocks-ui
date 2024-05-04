import type { Metadata } from "next"
import { BorrowPage } from "../../components/borrow"
import {
  WagmiProvider,
  WalletProvider
} from "../../providers"

export const metadata: Metadata = {
  title: 'mf borrowing',
  description: 'Goldilocks Borrowing'
}

export default function Borrow() {

  return (
    <WagmiProvider> 
      <WalletProvider>
        {/* <GoldiswapProvider> */}
          <BorrowPage />
        {/* </GoldiswapProvider> */}
      </WalletProvider>
    </WagmiProvider>
  )
}