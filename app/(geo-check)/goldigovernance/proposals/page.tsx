import type { Metadata } from "next";

import { ProposalsPage } from "../../../../components/gov";
import { GovProvider } from "../../../../providers";

export const metadata: Metadata = {
  title: "mf goldigovernance",
  description: "Goldilocks Governance",
};

export default function Proposals() {
  return (
    <GovProvider>
      <ProposalsPage />
    </GovProvider>
  );
}
