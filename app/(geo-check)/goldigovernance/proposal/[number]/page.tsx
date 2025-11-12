import type { Metadata } from "next";

import { ProposalPage } from "../../../../../components/gov";
import { GovProvider } from "../../../../../providers";

export const metadata: Metadata = {
  title: "mf goldigovernance",
  description: "Goldilocks Governance",
};

export const runtime = 'edge';

type Props = {
  params: {
    number: string;
  };
};

export default function Proposal({ params }: Props) {
  return (
    <GovProvider>
      <ProposalPage params={params} />
    </GovProvider>
  );
}
