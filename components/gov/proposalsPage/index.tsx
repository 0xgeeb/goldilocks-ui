"use client";

import { useEffect } from "react";

import { useAtom, useAtomValue } from "jotai";

import { geoAtom } from "@/app/_components/atoms/geoAtom";
import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { ProposalsBox, ProposalsFetcher } from "../";
import { useDesktop, useGov } from "../../../providers";
import { ProposalsPageMobile } from "../../govMobile";
import { Loading, TAndCs } from "../../utils";

export const ProposalsPage = () => {
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
            <>
              <h1
                className="absolute left-[2.5%] top-[-0.5%] font-amaticbold text-[7.5vw] text-[#D9C6BA] lg:top-[16%] lg:text-[6vw] xl:left-[5%] 2xl:left-[7.5%] 2xl:top-[12.16%] tall:text-[10vw] tall:md:text-[7.5vw] tall:lg:text-[6vw]"
                id="page-title"
              >
                GoldiGovernance
              </h1>
              <a href="/goldigovernance/propose">
                <div className="absolute right-[23%] top-[2.25%] flex h-[8%] w-1/5 items-center justify-center border-2 border-black bg-[#E7B941] font-amaticbold text-[3.5vw] text-black hover:scale-110 hover:bg-[#4D0B24] hover:text-[#E7B941] lg:left-[15%] lg:top-[40%] lg:w-[16.6%] lg:text-[1.9vw]">
                  new proposal
                </div>
              </a>
              <a href="/goldigovernance/govlocks">
                <div className="absolute right-[1.5%] top-[2.25%] flex h-[8%] w-1/5 items-center justify-center border-2 border-black bg-[#E7B941] font-amaticbold text-[3.5vw] text-black hover:scale-110 hover:bg-[#4D0B24] hover:text-[#E7B941] lg:left-[15%] lg:top-[50%] lg:w-[16.6%] lg:text-[1.9vw]">
                  get $govLOCKS
                </div>
              </a>
              <ProposalsBox />
              <ProposalsFetcher />
            </>
          </CsrPageLayout>
        )
      ) : (
        <ProposalsPageMobile />
      )}
    </ApolloProvider>
  );
};
