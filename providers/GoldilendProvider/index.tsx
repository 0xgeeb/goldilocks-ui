"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { readContract } from "@wagmi/core";
import { formatEther, parseAbiItem } from "viem";
import { useAccount } from "wagmi";
import { useDebounce } from "../../hooks";
import { config, client } from "../../providers/WagmiProvider";
import { contracts } from "../../utils/addressi";
import {
  GoldilendInitialState,
  BeraInfo,
  PartnerInfo,
  LoanInfo,
  LoanData,
  BoostInfo,
  AuctionInfo,
} from "../../utils/interfaces";

const INITIAL_STATE: GoldilendInitialState = {
  goldilendInfo: {
    glhoneySupply: 0,
    poolSize: 0,
    outstandingDebt: 0,
    maxUtilization: 0,
    protocolInterestRate: 0,
    fakebearFairValue: 0,
    bitbearFairValue: 0,
    babybearFairValue: 0,
    boobearFairValue: 0,
    bondbearFairValue: 0,
    bandbearFairValue: 0,
    bongbearFairValue: 0
  },
  goldilendWalletInfo: {
    honey: 0,
    glhoney: 0,
    honeyGoldilendAllowance: 0,
  },
  lock: 0,
  stake: 0,
  unstake: 0,
  setLock: (_lock: number) => {},
  setStake: (_stake: number) => {},
  setUnstake: (_unstake: number) => {},
  borrowDisplayString: "",
  loanExpiration: "",
  debouncedLoanExpiration: "",
  displayString: "",
  setDisplayString: (_displayString: string) => {},
  loanAmount: 0,
  debouncedLoanAmount: 0,
  borrowLimit: 0,
  boostMag: 0,
  loanInterest: 0,
  loanInterestRate: 0,
  setLoanInterest: (_interest: number) => {},
  setLoanInterestRate: (_interestRate: number) => {},
  ownedBeras: [
    // {
    //   name: "BandBera",
    //   id: 69,
    //   valuation: 50,
    //   index: 0
    // }
  ],
  selectedBera: {
    name: "",
    id: 0,
    valuation: 0,
    index: -1,
  },
  userLoans: [],
  ownedPartners: [],
  selectedPartners: [],
  userBoost: {
    partnerNFTs: [],
    partnerNFTIds: [],
    boostMagnitude: 0,
    expiry: 0,
  },
  liquidatableLoans: [],
  auctionList: [],
  auctionsLoading: false,
  setAuctionsLoading: (_loading: boolean) => {},
  notification: {
    toggle: false,
    action: "",
    result: "",
    hash: "",
  },
  openNotification: (
    _toggle: boolean,
    _action: string,
    _result: string,
    _hash: string,
  ) => {},
  activeToggle: "BORROW",
  changeActiveToggle: (_toggle: string) => {},
  lendActiveToggle: "DEPOSIT",
  changeLendActiveToggle: (_toggle: string) => {},
  refreshGoldilendInfo: async () => {},
  refreshGoldilendWalletInfo: async () => {},
  berasLoading: false,
  setBerasLoading: (_loading: boolean) => {},
  infoLoading: false,
  setInfoLoading: (_loading: boolean) => {},
  walletInfoLoading: false,
  loansLoading: true,
  setLoansLoading: (_loading: boolean) => {},
  allowanceButtons: false,
  setAllowanceButtons: (_bool: boolean) => {},
  handlePercentageButtons: (_action: number) => {},
  handleStakeChange: (_input: string, _tab: string) => {},
  handleStakeBalance: (_tab: string) => "",
  txConfirming: false,
  setTxConfirming: (_confirming: boolean) => {},
  selectScreen: true,
  setSelectScreen: (_screen: boolean) => {},
  chartOpen: false,
  setChartOpen: (_open: boolean) => {},
  wutPopup: false,
  setWutPopup: (_popup: boolean) => {},
  boostPopup: false,
  setBoostPopup: (_popup: boolean) => {},
  balanceMobileToggle: false,
  setBalanceMobileToggle: (_toggle: boolean) => {},
  handleBeraClick: (_bera: BeraInfo) => {},
  handlePartnerClick: (_partner: PartnerInfo) => {},
  findSelectedPartnerIdxs: () => [],
  findBeras: () => {},
  findLoans: () => {},
  findAuctions: () => {},
  updateBorrowLimit: (_collateralAddress?: string) => {},
  handleBorrowChange: (_input: string) => {},
  handleLoanDateChange: (_input: string) => {},
  getInterestRate: () => {},
  updateOwnedBeras: (_borrowedAgainstBera: BeraInfo) => {},
  updateOwnedPartners: (_nfts: PartnerInfo | PartnerInfo[]) => {},
};

const GoldilendContext = createContext(INITIAL_STATE);

export const GoldilendProvider = (props: PropsWithChildren<{}>) => {
  const { children } = props;

  const { address, isConnected } = useAccount();

  const [goldilendInfoState, setGoldilendInfoState] = useState(
    INITIAL_STATE.goldilendInfo,
  );
  const [goldilendWalletInfoState, setGoldilendWalletInfoState] = useState(
    INITIAL_STATE.goldilendWalletInfo,
  );
  const [notificationState, setNotificationState] = useState(
    INITIAL_STATE.notification,
  );

  const [displayStringState, setDisplayStringState] = useState(
    INITIAL_STATE.displayString,
  );
  const [borrowDisplayStringState, setBorrowDisplayStringState] = useState(
    INITIAL_STATE.borrowDisplayString,
  );
  const [loanExpirationState, setLoanExpirationState] = useState(
    INITIAL_STATE.loanExpiration,
  );
  const [loanInterestState, setLoanInterestState] = useState(
    INITIAL_STATE.loanInterest,
  );
  const [loanInterestRateState, setLoanInterestRateState] = useState(
    INITIAL_STATE.loanInterestRate,
  );
  const debouncedLoanExpirationState = useDebounce(loanExpirationState, 1000);
  const [lockState, setLockState] = useState<number>(INITIAL_STATE.lock);
  const [stakeState, setStakeState] = useState<number>(INITIAL_STATE.stake);
  const [unstakeState, setUnstakeState] = useState<number>(
    INITIAL_STATE.unstake,
  );
  const [ownedBerasState, setOwnedBerasState] = useState<BeraInfo[]>(
    INITIAL_STATE.ownedBeras,
  );
  const [selectedBeraState, setSelectedBeraState] = useState<BeraInfo>(
    INITIAL_STATE.selectedBera,
  );
  const [ownedPartnersState, setOwnedPartnersState] = useState<PartnerInfo[]>(
    INITIAL_STATE.ownedPartners,
  );
  const [selectedPartnersState, setSelectedPartnersState] = useState<
    PartnerInfo[]
  >([]);
  const [userLoansState, setUserLoansState] = useState<LoanInfo[]>(
    INITIAL_STATE.userLoans,
  );
  const [liquidatableLoansState, setLiquidatableLoansState] = useState<
    LoanInfo[]
  >(INITIAL_STATE.liquidatableLoans);
  const [auctionListState, setAuctionListState] = useState<AuctionInfo[]>(
    INITIAL_STATE.auctionList,
  );
  const [auctionsLoadingState, setAuctionsLoadingState] = useState<boolean>(
    INITIAL_STATE.auctionsLoading,
  );
  const [userBoostState, setUserBoostState] = useState<BoostInfo>(
    INITIAL_STATE.userBoost,
  );
  const [activeToggleState, setActiveToggleState] = useState<string>(
    INITIAL_STATE.activeToggle,
  );
  const [lendActiveToggleState, setLendActiveToggleState] = useState<string>(
    INITIAL_STATE.lendActiveToggle,
  );
  const [loanAmountState, setLoanAmountState] = useState<number>(
    INITIAL_STATE.loanAmount,
  );
  const debouncedLoanAmountState = useDebounce(loanAmountState, 1000);
  const [borrowLimitState, setBorrowLimitState] = useState<number>(
    INITIAL_STATE.borrowLimit,
  );
  const [boostMagState, setBoostMagState] = useState<number>(
    INITIAL_STATE.boostMag,
  );

  const [allowanceButtonsState, setAllowanceButtonsState] = useState<boolean>(
    INITIAL_STATE.allowanceButtons,
  );
  const [berasLoadingState, setBerasLoadingState] = useState<boolean>(INITIAL_STATE.berasLoading)
  const [infoLoadingState, setInfoLoadingState] = useState<boolean>(
    INITIAL_STATE.infoLoading,
  );
  const [walletInfoLoadingState, setWalletInfoLoadingState] = useState<boolean>(
    INITIAL_STATE.walletInfoLoading,
  );
  const [loansLoadingState, setLoansLoadingState] = useState<boolean>(
    INITIAL_STATE.loansLoading,
  );
  const [txConfirmingState, setTxConfirmingState] = useState<boolean>(
    INITIAL_STATE.txConfirming,
  );
  const [chartOpenState, setChartOpenState] = useState<boolean>(
    INITIAL_STATE.chartOpen,
  );
  const [balanceMobileToggleState, setBalanceMobileToggleState] =
    useState<boolean>(INITIAL_STATE.balanceMobileToggle);
  const [selectScreenState, setSelectScreenState] = useState<boolean>(
    INITIAL_STATE.selectScreen,
  );
  const [wutPopupState, setWutPopupState] = useState<boolean>(
    INITIAL_STATE.wutPopup,
  );
  const [boostPopupState, setBoostPopupState] = useState<boolean>(
    INITIAL_STATE.boostPopup,
  );

  const changeActiveToggle = (toggle: string) => {
    setSelectedBeraState({
      name: "",
      id: 0,
      valuation: 0,
      index: -1,
    });
    setSelectedPartnersState([]);
    setBorrowDisplayStringState("");
    setLoanExpirationState("");
    setLoanAmountState(0);
    setActiveToggleState(toggle);
  };

  const changeLendActiveToggle = (toggle: string) => {
    setDisplayStringState("");
    setLockState(0);
    setStakeState(0);
    setUnstakeState(0);
    setLendActiveToggleState(toggle);
    setAllowanceButtonsState(false);
  };

  const handlePercentageButtons = (action: number) => {
    if (!isConnected) return;
    if (action == 1) {
      // if (lendActiveToggleState === "LOCK") {
      //   setDisplayStringState((goldilendWalletInfoState.ibgt / 4).toFixed(4));
      //   setLockState(goldilendWalletInfoState.ibgt / 4);
      // }
      if (lendActiveToggleState === "DEPOSIT") {
        setDisplayStringState((goldilendWalletInfoState.honey / 4).toFixed(4));
        setStakeState(goldilendWalletInfoState.honey / 4);
      }
      if (lendActiveToggleState === "WITHDRAW") {
        setDisplayStringState(
          (goldilendWalletInfoState.glhoney / 4).toFixed(4),
        );
        setUnstakeState(goldilendWalletInfoState.glhoney / 4);
      }
    }
    if (action == 2) {
      // if (lendActiveToggleState === "LOCK") {
      //   setDisplayStringState((goldilendWalletInfoState.ibgt / 2).toFixed(4));
      //   setLockState(goldilendWalletInfoState.ibgt / 2);
      // }
      if (lendActiveToggleState === "DEPOSIT") {
        setDisplayStringState((goldilendWalletInfoState.honey / 2).toFixed(4));
        setStakeState(goldilendWalletInfoState.honey / 2);
      }
      if (lendActiveToggleState === "WITHDRAW") {
        setDisplayStringState(
          (goldilendWalletInfoState.glhoney / 2).toFixed(4),
        );
        setUnstakeState(goldilendWalletInfoState.glhoney / 2);
      }
    }
    if (action == 3) {
      // if (lendActiveToggleState === "LOCK") {
      //   setDisplayStringState(
      //     (goldilendWalletInfoState.ibgt * 0.75).toFixed(4),
      //   );
      //   setLockState(goldilendWalletInfoState.ibgt * 0.75);
      // }
      if (lendActiveToggleState === "DEPOSIT") {
        setDisplayStringState(
          (goldilendWalletInfoState.honey * 0.75).toFixed(4),
        );
        setStakeState(goldilendWalletInfoState.honey * 0.75);
      }
      if (lendActiveToggleState === "WITHDRAW") {
        setDisplayStringState(
          (goldilendWalletInfoState.glhoney * 0.75).toFixed(4),
        );
        setUnstakeState(goldilendWalletInfoState.glhoney * 0.75);
      }
    }
    if (action == 4) {
      // if (lendActiveToggleState === "LOCK") {
      //   setDisplayStringState(goldilendWalletInfoState.ibgt.toFixed(4));
      //   setLockState(goldilendWalletInfoState.ibgt - 0.0001);
      // }
      if (lendActiveToggleState === "DEPOSIT") {
        setDisplayStringState(goldilendWalletInfoState.honey.toFixed(4));
        setStakeState(goldilendWalletInfoState.honey - 0.0001);
      }
      if (lendActiveToggleState === "WITHDRAW") {
        setDisplayStringState(goldilendWalletInfoState.glhoney.toFixed(4));
        setUnstakeState(goldilendWalletInfoState.glhoney - 0.0001);
      }
    }
  };

  const handleBorrowChange = (input: string) => {
    if (!input) {
      setLoanAmountState(0);
      setBorrowDisplayStringState(input);
    } else {
      if (parseFloat(input) > borrowLimitState) {
        setBorrowDisplayStringState((borrowLimitState - 0.0001).toFixed(4));
        setLoanAmountState(borrowLimitState - 0.0001);
      } else {
        setLoanAmountState(parseFloat(input));
        setBorrowDisplayStringState(input);
      }
    }
  };

  const updateBorrowLimit = (collateralAddress?: string) => {

    if(activeToggleState !== "REPAY") {
        // If no bera is selected, clear the borrow limit
        if (selectedBeraState.index === -1 || selectedBeraState.name === "") {
          setBorrowLimitState(0);
          return;
        }
    }

    // Get the fair value for the selected bera collection or provided collateral
    const getFairValue = (): number => {
      // If collateral address is provided (from repay tab), use that
      if (collateralAddress) {
        const normalizedAddress = collateralAddress.toLowerCase();
        const fairValueMap: Record<string, number> = {
          [contracts.fakebear.address.toLowerCase()]: goldilendInfoState.fakebearFairValue,
          [contracts.bitbear.address.toLowerCase()]: goldilendInfoState.bitbearFairValue,
          [contracts.babybear.address.toLowerCase()]: goldilendInfoState.babybearFairValue,
          [contracts.boobear.address.toLowerCase()]: goldilendInfoState.boobearFairValue,
          [contracts.bondbear.address.toLowerCase()]: goldilendInfoState.bondbearFairValue,
          [contracts.bandbear.address.toLowerCase()]: goldilendInfoState.bandbearFairValue,
          [contracts.bongbear.address.toLowerCase()]: goldilendInfoState.bongbearFairValue,
        };
        return fairValueMap[normalizedAddress] || 0;
      }

      // Otherwise use selectedBera (borrow tab)
      if (!selectedBeraState.name) return 0;

      const collectionName = selectedBeraState.name.split(" #")[0];

      const fairValueMap: Record<string, number> = {
        "Fake Bear": goldilendInfoState.fakebearFairValue,
        "Bit Bear": goldilendInfoState.bitbearFairValue,
        "Baby Bear": goldilendInfoState.babybearFairValue,
        "Boo Bear": goldilendInfoState.boobearFairValue,
        "Bond Bear": goldilendInfoState.bondbearFairValue,
        "Band Bear": goldilendInfoState.bandbearFairValue,
        "Bong Bear": goldilendInfoState.bongbearFairValue,
      };

      return fairValueMap[collectionName] || 0;
    };

    const poolSize = goldilendInfoState.poolSize;
    const outstandingDebt = goldilendInfoState.outstandingDebt;
    const fairValue = getFairValue();
    const maxUtilization = goldilendInfoState.maxUtilization;
    const interest = loanInterestState;

    // Contract enforces: borrowAmount <= poolSize / 10
    const maxLoanAmount = poolSize / 10;

    // Contract enforces: outstandingDebt + borrowAmount <= poolSize * maxUtilization / 100
    const maxUtilizationLimit = (poolSize * maxUtilization / 100) - outstandingDebt;

    // Contract enforces: borrowAmount <= poolSize - outstandingDebt
    const availablePoolCapacity = poolSize - outstandingDebt;

    // Contract enforces: borrowAmount + interest <= fairValue
    const collateralLimit = fairValue - interest;

    const borrowLimit = Math.max(0, Math.min(
      maxLoanAmount,
      maxUtilizationLimit,
      availablePoolCapacity,
      collateralLimit
    ));

    setBorrowLimitState(borrowLimit);
  };

  //todo: prolly the cause of approvals not going away. copy handleChange from stake
  const handleStakeChange = (input: string, tab: string) => {
    setDisplayStringState(input);
    if (tab === "LOCK") {
      !input ? setLockState(0) : setLockState(parseFloat(input));
    }
    if (tab === "DEPOSIT") {
      !input ? setStakeState(0) : setStakeState(parseFloat(input));
    }
    if (tab === "WITHDRAW") {
      !input ? setUnstakeState(0) : setUnstakeState(parseFloat(input));
    }
  };

  const handleStakeBalance = (tab: string): string => {
    // if (tab === "LOCK") {
    //   return goldilendWalletInfoState.ibgt > 0
    //     ? goldilendWalletInfoState.ibgt.toLocaleString("en-US", {
    //         maximumFractionDigits: 4,
    //       })
    //     : "0.00";
    // }
    if (tab === "DEPOSIT") {
      return goldilendWalletInfoState.honey > 0
        ? goldilendWalletInfoState.honey.toLocaleString("en-US", {
            maximumFractionDigits: 4,
          })
        : "0.00";
    }
    if (tab === "WITHDRAW") {
      return goldilendWalletInfoState.glhoney > 0
        ? goldilendWalletInfoState.glhoney.toLocaleString("en-US", {
            maximumFractionDigits: 4,
          })
        : "0.00";
    }

    return "";
  };

  const handleBeraClick = (bera: BeraInfo) => {
    if (selectedBeraState.index == bera.index) {
      setSelectedBeraState({
        name: "",
        id: 0,
        valuation: 0,
        index: -1,
      });
    } else {
      setSelectedBeraState(bera);
    }
  };

  const findSelectedPartnerIdxs = (): number[] => {
    const idxArray: number[] = [];
    selectedPartnersState.forEach((selectedPartner) => {
      idxArray.push(selectedPartner.index);
    });
    return idxArray;
  };

  const handlePartnerClick = (partner: PartnerInfo) => {
    const idxArray: number[] = findSelectedPartnerIdxs();
    if (idxArray.includes(partner.index)) {
      setSelectedPartnersState((prev) =>
        prev.filter((partnerf) => partnerf.index !== partner.index),
      );
    } else {
      setSelectedPartnersState((prev) => [...prev, partner]);
    }
  };

  const handleLoanDateChange = (input: string) => {
    setLoanExpirationState(input);
  };

  const findBeras = async () => {
    if(address) {
      setBerasLoadingState(true)

      try {
        const response = await fetch(`/api/ownedBeras/${address}`)
        const responseJson = await response.json()
        const ownedBeras: BeraInfo[] = []
        const beraCollections = [
          { contract: contracts.fakebear, name: "Fake Bear" },
          { contract: contracts.bitbear, name: "Bit Bear" },
          { contract: contracts.bandbear, name: "Band Bear" },
          { contract: contracts.babybear, name: "Baby Bear" },
          { contract: contracts.boobear, name: "Boo Bear" },
          { contract: contracts.bondbear, name: "Bond Bear" },
          { contract: contracts.bongbear, name: "Bong Bear" },
        ]
        beraCollections.forEach(({ contract, name }) => {
          const collectionAddress = contract.address.toLowerCase()
          if (responseJson.collections && responseJson.collections[collectionAddress]) {
            const tokenIds = responseJson.collections[collectionAddress]
            tokenIds.forEach((tokenId: string) => {
              ownedBeras.push({
                name: `${name} #${tokenId}`,
                id: parseInt(tokenId),
                idRaw: tokenId, // Preserve raw string for Bong Bears
                valuation: 0,
                index: ownedBeras.length
              })
            })
          }
        })
        setOwnedBerasState(ownedBeras)
      } catch (error) {
        console.error('Error fetching owned beras:', error)
        setOwnedBerasState([])
      } finally {
        setBerasLoadingState(false)
      }
    }
  }

  const findLoans = async () => {
    if (address) {
      try {
        const response = await fetch(`/api/loans/${address}`)
        const responseJson = await response.json()
        const userLoans: any[] = [];

        if (responseJson.loans && Array.isArray(responseJson.loans)) {
          responseJson.loans.forEach((loan: any) => {
            const borrowedAmount = parseFloat(formatEther(BigInt(loan.borrowAmount)));
            const interest = parseFloat(formatEther(BigInt(loan.interestAmount)));
            const repaidAmount = parseFloat(formatEther(BigInt(loan.repaidAmount)));
            const endDate = Number(loan.expiration);
            const currentTime = Math.floor(Date.now() / 1000);
            const repaid = parseFloat(loan.borrowAmount) - parseFloat(loan.repaidAmount) === 0;
            let status = "ACTIVE";
            if (repaid) {
              status = "REPAID";
            } else if (endDate < currentTime - 86400) { // More than 24 hours past expiration
              status = "EXPIRED";
            } else if (endDate < currentTime + 1800) { // Within 30 minutes of expiration
              status = "EXPIRING_SOON";
            }

            const userLoan = {
              loanId: parseInt(loan.loanID),
              borrowedAmount: borrowedAmount,
              repaidAmount: repaidAmount,
              interest: interest,
              endDate: endDate,
              repaid: repaid,
              liquidated: false,
              collateralNFT: loan.collateral,
              collateralValuation: 50,
              principal: borrowedAmount - interest,
              status: status,
              beraId: parseInt(loan.collateralID),
              beraIdRaw: loan.collateralID, // Preserve raw string for Bong Bears
              duration: endDate - Number(loan.timestamp),
              realBorrowedAmount: BigInt(loan.borrowAmount),
              realInterest: BigInt(loan.interestAmount)
            };

            userLoans.push(userLoan);
          });
          userLoans.sort((a, b) => a.loanId - b.loanId);
        }
        setUserLoansState(userLoans);
      } catch (error) {
        console.error('Error fetching loans from API:', error);
        setUserLoansState([]);
      }
    }
  };

  const findAuctions = async () => {
    setAuctionsLoadingState(true);
    try {
      const response = await fetch('/api/liquidatable-loans');
      const responseJson = await response.json();
      const auctions: AuctionInfo[] = [];
      let auctionIdCounter = 1;

      if (responseJson.loans && Array.isArray(responseJson.loans)) {
        // Sort by expiration (most recent first) and limit to 10 loans
        const sortedLoans = responseJson.loans
          .sort((a: any, b: any) => Number(b.expiration) - Number(a.expiration))
          .slice(0, 10);

        for (const loan of sortedLoans) {
          const borrowedAmount = parseFloat(formatEther(BigInt(loan.borrowAmount)));
          const endDate = Number(loan.expiration);
          const currentTime = Math.floor(Date.now() / 1000);

          // Auction starts after grace period (24 hours) and lasts 48 hours
          const LOAN_GRACE_PERIOD = 86400; // 24 hours
          const AUCTION_PERIOD = 172800; // 48 hours
          const auctionStart = endDate + LOAN_GRACE_PERIOD;
          const auctionEnd = auctionStart + AUCTION_PERIOD;

          // Skip if not yet in auction period
          if (currentTime < auctionStart) {
            continue;
          }

          const outstandingDebt = borrowedAmount;

          // Fetch highest bid from contract
          let highestBidAmount: number | null = null;
          let highestBidder: string | null = null;
          try {
            const bidResult = await readContract(config, {
              address: contracts.goldilend.address as `0x${string}`,
              abi: contracts.goldilend.abi,
              functionName: "highestBid",
              args: [loan.user, parseInt(loan.loanID)],
            }) as any;

            // bidResult is a tuple: [loanOriginator, loanId, bidder, bidAmount]
            if (bidResult && bidResult[3] && BigInt(bidResult[3]) > 0n) {
              highestBidAmount = parseFloat(formatEther(BigInt(bidResult[3])));
              highestBidder = bidResult[2];
            }
          } catch (error) {
            console.error('Error fetching highest bid:', error);
          }

          // Fetch fair value for the collateral from contract
          let collateralValue = 0;
          try {
            const fairValueResult = await readContract(config, {
              address: contracts.goldilend.address as `0x${string}`,
              abi: contracts.goldilend.abi,
              functionName: "calculateFairValue",
              args: [loan.collateral],
            });
            collateralValue = parseFloat(formatEther(fairValueResult as unknown as bigint));
          } catch (error) {
            console.error('Error fetching fair value:', error);
          }

          // Determine status
          let status: "EXPIRING_SOON" | "HIGH_VALUE" | "NO_BIDS" | "ENDED" | "ACTIVE" = "ACTIVE";
          const timeUntilEnd = auctionEnd - currentTime;

          if (currentTime > auctionEnd) {
            status = "ENDED";
          } else if (timeUntilEnd < 7200) { // Less than 2 hours
            status = "EXPIRING_SOON";
          } else if (collateralValue > 20000) {
            status = "HIGH_VALUE";
          } else if (!highestBidAmount) {
            status = "NO_BIDS";
          }

          // Calculate potential discount based on current highest bid or outstanding debt
          const referenceAmount = highestBidAmount !== null ? highestBidAmount : outstandingDebt;
          const potentialDiscount = collateralValue > 0
            ? (1 - (referenceAmount / collateralValue)) * 100
            : 0;

          auctions.push({
            auctionId: auctionIdCounter++,
            loanOriginator: loan.user,
            loanId: parseInt(loan.loanID),
            collateralValue,
            outstandingDebt,
            currentHighestBid: highestBidAmount,
            highestBidder,
            potentialDiscount: Number(potentialDiscount.toFixed(2)),
            endDate: auctionEnd,
            beraId: parseInt(loan.collateralID),
            beraIdRaw: loan.collateralID, // Preserve raw string for Bong Bears
            collateralNFT: loan.collateral,
            status,
          });
        }
      }

      setAuctionListState(auctions);
    } catch (error) {
      console.error('Error fetching auctions:', error);
      setAuctionListState([]);
    } finally {
      setAuctionsLoadingState(false);
    }
  }

  const refreshGoldilendInfo = async () => {
    setInfoLoadingState(true)
    const glhoneySupplyResult = await readContract(config, {
      address: contracts.glhoney.address as `0x${string}`,
      abi: contracts.glhoney.abi,
      functionName: "totalSupply",
      args: [],
    })
    const debtResult = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: "outstandingDebt",
      args: [],
    });
    const maxUtilizationResult = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: "maxUtilization",
      args: [],
    });
    const rateResult = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: "protocolInterestRate",
      args: [],
    })
    // const fakebearFairValueResult = await readContract(config, {
    //   address: contracts.goldilend.address as `0x${string}`,
    //   abi: contracts.goldilend.abi,
    //   functionName: "calculateFairValue",
    //   args: [contracts.fakebear.address],
    // })
    const bitbearFairValueResult = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: "calculateFairValue",
      args: [contracts.bitbear.address],
    })
    const babybearFairValueResult = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: "calculateFairValue",
      args: [contracts.babybear.address],
    })
    const boobearFairValueResult = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: "calculateFairValue",
      args: [contracts.boobear.address],
    })
    const bondbearFairValueResult = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: "calculateFairValue",
      args: [contracts.bondbear.address],
    })
    const bandbearFairValueResult = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: "calculateFairValue",
      args: [contracts.bandbear.address],
    })
    const bongbearFairValueResult = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: "calculateFairValue",
      args: [contracts.bongbear.address],
    })

    const response = {
      glhoneySupply: parseFloat(formatEther(glhoneySupplyResult as unknown as bigint)),
      poolSize: parseFloat(formatEther(glhoneySupplyResult as unknown as bigint)),
      outstandingDebt: parseFloat(formatEther(debtResult as unknown as bigint)),
      maxUtilization: Number(maxUtilizationResult),
      protocolInterestRate: parseFloat(formatEther(rateResult as unknown as bigint)),
    //   fakebearFairValue: parseFloat(formatEther(fakebearFairValueResult as unknown as bigint)),
      fakebearFairValue: parseFloat(formatEther(0 as unknown as bigint)),
      bitbearFairValue: parseFloat(formatEther(bitbearFairValueResult as unknown as bigint)),
      babybearFairValue: parseFloat(formatEther(babybearFairValueResult as unknown as bigint)),
      boobearFairValue: parseFloat(formatEther(boobearFairValueResult as unknown as bigint)),
      bondbearFairValue: parseFloat(formatEther(bondbearFairValueResult as unknown as bigint)),
      bandbearFairValue: parseFloat(formatEther(bandbearFairValueResult as unknown as bigint)),
      bongbearFairValue: parseFloat(formatEther(bongbearFairValueResult as unknown as bigint)),
    }

    setGoldilendInfoState(response);
    setInfoLoadingState(false);
  };

  const refreshGoldilendWalletInfo = async () => {
    if (!address) {
      setGoldilendWalletInfoState((prev) => ({
        ...prev,
        honey: 0,
        glhoney: 0,
        honeyGoldilendAllowance: 0,
      }));
      return;
    }

    setWalletInfoLoadingState(true);
    try {
      const [honeyResult, glhoneyResult, honeyAllowanceResult] =
        await Promise.all([
          readContract(config, {
            address: contracts.honey.address as `0x${string}`,
            abi: contracts.honey.abi,
            functionName: "balanceOf",
            args: [address],
          }),
          readContract(config, {
            address: contracts.glhoney.address as `0x${string}`,
            abi: contracts.glhoney.abi,
            functionName: "balanceOf",
            args: [address],
          }),
          readContract(config, {
            address: contracts.honey.address as `0x${string}`,
            abi: contracts.honey.abi,
            functionName: "allowance",
            args: [address, contracts.goldilend.address],
          }),
        ]);

      setGoldilendWalletInfoState({
        honey: parseFloat(formatEther(honeyResult as unknown as bigint)),
        glhoney: parseFloat(formatEther(glhoneyResult as unknown as bigint)),
        honeyGoldilendAllowance: parseFloat(
          formatEther(honeyAllowanceResult as unknown as bigint),
        ),
      });
    } catch (error) {
      console.error("Failed to refresh Goldilend wallet info", error);
      setGoldilendWalletInfoState((prev) => ({
        ...prev,
        honey: 0,
        glhoney: 0,
        honeyGoldilendAllowance: 0,
      }));
    } finally {
      setWalletInfoLoadingState(false);
    }
  };

  const openNotification = (
    toggle: boolean,
    action: string,
    result: string,
    hash: string,
  ) => {
    setNotificationState((prevState) => ({
      toggle,
      action,
      result,
      hash,
    }));
  };

  const getInterestRate = async () => {
    const dateParts = loanExpirationState.split("-");
    const [month, day, year] = dateParts.map(Number);
    const parsedDate = new Date(year, month - 1, day);
    const timestamp = parsedDate.getTime();
    const currentTimestamp = Date.now();
    const loanDuration = Math.floor((timestamp - currentTimestamp) / 1000);

    // Fetch required contract parameters
    const [debtResult, utilizationRatioMultiplierResult, interestPaymentPercentageResult, slopeResult] = await Promise.all([
      readContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: "outstandingDebt",
        args: [],
      }),
      readContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: "utilizationRatioMultiplier",
        args: [],
      }),
      readContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: "interestPaymentPercentage",
        args: [],
      }),
      readContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: "slope",
        args: [],
      }),
    ]);

    const debt = parseFloat(formatEther(debtResult as unknown as bigint));
    const utilizationRatioMultiplier = parseFloat(formatEther(utilizationRatioMultiplierResult as unknown as bigint));
    const interestPaymentPercentage = parseFloat(formatEther(interestPaymentPercentageResult as unknown as bigint));
    const slope = parseFloat(formatEther(slopeResult as unknown as bigint));

    // Get protocol interest rate and total supply from state
    const rate = goldilendInfoState.protocolInterestRate;
    const totalSupply = goldilendInfoState.glhoneySupply;

    // Calculate interest based on updated smart contract formula
    const yearSeconds = 365 * 24 * 60 * 60; // 365 days in seconds
    const durationPortion = loanDuration / yearSeconds;
    const ratio = (debt + loanAmountState) / (totalSupply * utilizationRatioMultiplier) + interestPaymentPercentage;
    const interestRate = ratio * (rate + (slope * rate * durationPortion));
    const interestAdjusted = interestRate * loanAmountState * durationPortion;

    setLoanInterestState(interestAdjusted);
    const calculatedRate = ratio * (rate + (slope * rate * durationPortion)) * 100;
    setLoanInterestRateState(calculatedRate);
  };

  const updateOwnedBeras = (borrowedAgainstBera: BeraInfo) => {
    setOwnedBerasState((prevState) =>
      prevState.filter((bera) => bera !== borrowedAgainstBera),
    );
  };

  const updateOwnedPartners = (nfts: PartnerInfo | PartnerInfo[]) => {
    if (Array.isArray(nfts)) {
      setOwnedPartnersState((prevState) =>
        prevState.filter((partner) => !nfts.includes(partner)),
      );
    } else {
      setOwnedPartnersState((prevState) =>
        prevState.filter((partner) => partner !== nfts),
      );
    }
  };

  return (
    <GoldilendContext.Provider
      value={{
        goldilendInfo: goldilendInfoState,
        goldilendWalletInfo: goldilendWalletInfoState,
        infoLoading: infoLoadingState,
        walletInfoLoading: walletInfoLoadingState,
        displayString: displayStringState,
        setDisplayString: setDisplayStringState,
        setInfoLoading: setInfoLoadingState,
        berasLoading: berasLoadingState,
        setBerasLoading: setBerasLoadingState,
        refreshGoldilendInfo,
        refreshGoldilendWalletInfo,
        activeToggle: activeToggleState,
        changeActiveToggle,
        lendActiveToggle: lendActiveToggleState,
        changeLendActiveToggle,
        allowanceButtons: allowanceButtonsState,
        setAllowanceButtons: setAllowanceButtonsState,
        handlePercentageButtons,
        lock: lockState,
        stake: stakeState,
        unstake: unstakeState,
        setLock: setLockState,
        setStake: setStakeState,
        setUnstake: setUnstakeState,
        handleStakeChange,
        handleStakeBalance,
        txConfirming: txConfirmingState,
        setTxConfirming: setTxConfirmingState,
        selectScreen: selectScreenState,
        setSelectScreen: setSelectScreenState,
        notification: notificationState,
        openNotification,
        selectedBera: selectedBeraState,
        ownedBeras: ownedBerasState,
        userLoans: userLoansState,
        handleBeraClick,
        borrowLimit: borrowLimitState,
        boostMag: boostMagState,
        loanInterest: loanInterestState,
        setLoanInterest: setLoanInterestState,
        loanInterestRate: loanInterestRateState,
        setLoanInterestRate: setLoanInterestRateState,
        loanAmount: loanAmountState,
        updateBorrowLimit,
        borrowDisplayString: borrowDisplayStringState,
        handleBorrowChange,
        handleLoanDateChange,
        loanExpiration: loanExpirationState,
        loansLoading: loansLoadingState,
        setLoansLoading: setLoansLoadingState,
        findLoans,
        findBeras,
        findAuctions,
        auctionList: auctionListState,
        auctionsLoading: auctionsLoadingState,
        setAuctionsLoading: setAuctionsLoadingState,
        userBoost: userBoostState,
        selectedPartners: selectedPartnersState,
        ownedPartners: ownedPartnersState,
        findSelectedPartnerIdxs,
        handlePartnerClick,
        liquidatableLoans: liquidatableLoansState,
        chartOpen: chartOpenState,
        setChartOpen: setChartOpenState,
        balanceMobileToggle: balanceMobileToggleState,
        setBalanceMobileToggle: setBalanceMobileToggleState,
        getInterestRate,
        debouncedLoanAmount: debouncedLoanAmountState,
        debouncedLoanExpiration: debouncedLoanExpirationState,
        updateOwnedBeras,
        updateOwnedPartners,
        wutPopup: wutPopupState,
        setWutPopup: setWutPopupState,
        boostPopup: boostPopupState,
        setBoostPopup: setBoostPopupState,
      }}
    >
      {children}
    </GoldilendContext.Provider>
  );
};

export const useGoldilend = () => useContext(GoldilendContext);
