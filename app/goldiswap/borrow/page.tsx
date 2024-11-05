import type { Metadata } from "next"
import { BorrowPage } from "../../../components/borrow"
import {
  WagmiProvider,
  BorrowProvider,
  GoldiswapProvider
} from "../../../providers"

export const metadata: Metadata = {
  title: 'mf borrowing',
  description: 'Goldilocks Borrowing'
}

export default function Borrow() {

  return (
    <WagmiProvider>
      <GoldiswapProvider>
        <BorrowProvider>
          <BorrowPage />
        </BorrowProvider>
      </GoldiswapProvider> 
    </WagmiProvider>
  )
}