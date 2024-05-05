import type { Metadata } from "next"
import { BorrowPage } from "../../components/borrow"
import {
  WagmiProvider,
  WalletProvider,
  BorrowProvider
} from "../../providers"

export const metadata: Metadata = {
  title: 'mf borrowing',
  description: 'Goldilocks Borrowing'
}

export default function Borrow() {

  return (
    <WagmiProvider> 
      <WalletProvider>
        <BorrowProvider>
          <BorrowPage />
        </BorrowProvider>
      </WalletProvider>
    </WagmiProvider>
  )
}