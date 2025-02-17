"use client";

import { useEffect } from "react";

import { useAtom } from "jotai";

import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { useDesktop, useGeo, useGov } from "../../../providers";
import {
  ProposalBox,
  ProposalButtons,
  ProposalsFetcher,
  VoteBox,
} from "../../gov";
import { ProposalPageMobile } from "../../govMobile";
import { Loading, TAndCs } from "../../utils";

type Props = {
  params: {
    number: string;
  };
};

export const ProposalPage = ({ params }: Props) => {
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom);

  const { wutPopup, setWutPopup } = useGov();

  const { isDesktop } = useDesktop();

  const { signed } = useGeo();

  useEffect(() => {
    setPageLoading(false);
  }, []);

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GHOST_GRAPH_PROPOSALS_URL,
    cache: new InMemoryCache(),
    headers: {
      "X-GHOST-KEY": process.env.NEXT_PUBLIC_GHOST_GRAPH_KEY!,
    },
  });

  const handlePopups = (e: any) => {
    if (wutPopup) {
      setWutPopup(false);
    }
  };

  return (
    <ApolloProvider client={client}>
      {pageLoading ? (
        <Loading />
      ) : isDesktop ? (
        signed !== "TRUE" ? (
          <TAndCs />
        ) : (
          <CsrPageLayout
            onPageClick={(e) => handlePopups(e)}
            wutPopup={wutPopup}
            setWutPopup={setWutPopup}
            bgImageUrl="/images/bg-goldiswap.png"
          >
            <>
              <h1
                className="absolute left-[5%] top-[-0.5%] font-amaticbold text-[7.5vw] text-[#D9C6BA] lg:text-[6vw]"
                id="page-title"
              >
                Proposal #{params.number}
              </h1>
              <ProposalBox number={params.number} />
              <VoteBox number={params.number} />
              <ProposalButtons number={params.number} />
              <ProposalsFetcher />
            </>
          </CsrPageLayout>
        )
      ) : (
        <ProposalPageMobile number={params.number} />
      )}
    </ApolloProvider>
  );
};
