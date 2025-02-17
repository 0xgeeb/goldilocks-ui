import type { Metadata } from "next";

import { GovLocksPage } from "../../../../components/gov";
import { GovProvider } from "../../../../providers";

export const metadata: Metadata = {
  title: "mf goldigovernance",
  description: "Goldilocks Governance",
};

export default function GovLocks() {
  return (
    <GovProvider>
      <GovLocksPage />
    </GovProvider>
  );
}
