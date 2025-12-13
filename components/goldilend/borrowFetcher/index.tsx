"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useGoldilendNfTsOwnedQuery } from "../../../src/graphql/generated/queries";
import { useGoldilend } from "../../../providers";

export const BorrowFetcher = () => {
  const [skip, setSkip] = useState<boolean>(false);

  const {
    findBeras,
    findLoans,
    findAuctions,
    refreshGoldilendInfo,
    refreshGoldilendWalletInfo,
  } = useGoldilend();

  const { address, isConnected } = useAccount();

  // const { data, loading } = useGoldilendNfTsOwnedQuery({
  //   variables: {
  //     owner: address as `0x${string}`,
  //   },
  //   skip,
  // });

  // useEffect(() => {
  //   if (!loading && !!data) {
  //     findBeras(data);
  //     setSkip(true);
  //     setInfoLoading(false);
  //   }
  // }, [data, loading]);

  useEffect(() => {
    refreshGoldilendInfo();
    refreshGoldilendWalletInfo();
    findBeras();
    findLoans();
    findAuctions()
  }, [address, isConnected]);

  return null;
};
