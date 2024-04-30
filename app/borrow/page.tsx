import type { Metadata } from "next"
import { BorrowPage } from "../../components/borrow"

export const metadata: Metadata = {
  title: 'mf borrowing',
  description: 'Goldilocks Borrowing'
}

export default function Borrow() {

  return (
    <BorrowPage />
  )
}