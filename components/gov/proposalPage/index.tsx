"use client";

import { useEffect } from "react";

import { useAtom, useAtomValue } from "jotai";

import { geoAtom } from "@/app/_components/atoms/geoAtom";
import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { useDesktop, useGov } from "../../../providers";
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

  const signed = useAtomValue(geoAtom);

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
            <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 md:px-20 md:py-6">
              <h1
                className="absolute left-[5%] top-[2.5%] lg:top-[4%] font-amaticbold text-[7.5vw] text-[#D9C6BA] lg:text-[6vw]"
                id="page-title"
              >
                Proposal #{params.number}
              </h1>
              <ProposalBox number={params.number} />
              <VoteBox number={params.number} />
              <ProposalButtons number={params.number} />
              <ProposalsFetcher />
            </div>
          </CsrPageLayout>
        )
      ) : (
        <ProposalPageMobile number={params.number} />
      )}
    </ApolloProvider>
  );
};
