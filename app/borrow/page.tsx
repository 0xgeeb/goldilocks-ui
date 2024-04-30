import type { Metadata } from "next"
import { BorrowPage } from "../../components/borrow"
import { NotificationManager } from "../../components/utils"
import {
  NotificationProvider,
  WagmiProvider,
  WalletProvider
} from "../../providers"

export const metadata: Metadata = {
  title: 'mf borrowing',
  description: 'Goldilocks Borrowing'
}

export default function Borrow() {

  return (
    <NotificationProvider>
    <WagmiProvider> 
      <WalletProvider>
        {/* <GoldiswapProvider> */}
          <BorrowPage />
          <NotificationManager />
        {/* </GoldiswapProvider> */}
      </WalletProvider>
    </WagmiProvider>
  </NotificationProvider>
  )
}