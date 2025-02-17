import type { Metadata } from "next";

import { ProposePage } from "../../../../components/gov";
import { GovProvider } from "../../../../providers";

export const metadata: Metadata = {
  title: "mf goldigovernance",
  description: "Goldilocks Governance",
};

export default function Propose() {
  return (
    <GovProvider>
      <ProposePage />
    </GovProvider>
  );
}
