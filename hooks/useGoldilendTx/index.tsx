import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { parseEther, formatEther, parseAbi } from "viem";
import { config } from "../../providers/WagmiProvider";
import { contracts } from "../../utils/addressi";
import { BeraInfo, LoanInfo, PartnerInfo } from "../../utils/interfaces";

export const useGoldilendTx = () => {
  const checkLockAllowance = async (
    amt: number,
    wallet: string,
  ): Promise<boolean> => {
    const allowanceResult = await readContract(config, {
      address: contracts.ibgt.address as `0x${string}`,
      abi: contracts.ibgt.abi,
      functionName: "allowance",
      args: [wallet, contracts.goldilend.address],
    });
    const allowanceNum = parseFloat(
      formatEther(allowanceResult as unknown as bigint),
    );

    if (amt > allowanceNum) {
      return false;
    } else {
      return true;
    }
  };

  const checkStakeAllowance = async (
    amt: number,
    wallet: string,
  ): Promise<boolean> => {
    const allowanceResult = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: "allowance",
      args: [wallet, contracts.goldilend.address],
    });
    const allowanceNum = parseFloat(
      formatEther(allowanceResult as unknown as bigint),
    );

    if (amt > allowanceNum) {
      return false;
    } else {
      return true;
    }
  };

  const checkBoostAllowance = async (wallet: string): Promise<boolean[]> => {
    const honeycombAllApproved = await readContract(config, {
      address: contracts.honeycomb.address as `0x${string}`,
      abi: contracts.honeycomb.abi,
      functionName: "isApprovedForAll",
      args: [wallet, contracts.goldilend.address],
    });
    const beradromeAllApproved = await readContract(config, {
      address: contracts.beradrome.address as `0x${string}`,
      abi: contracts.beradrome.abi,
      functionName: "isApprovedForAll",
      args: [wallet, contracts.goldilend.address],
    });

    const hcAA = honeycombAllApproved as unknown as boolean;
    const bdAA = beradromeAllApproved as unknown as boolean;

    return [hcAA, bdAA];
  };

  const checkLoanAllowance = async (wallet: string): Promise<boolean[]> => {
    const bondbearAllApproved = await readContract(config, {
      address: contracts.bondbear.address as `0x${string}`,
      abi: contracts.bondbear.abi,
      functionName: "isApprovedForAll",
      args: [wallet, contracts.goldilend.address],
    });
    const bandbearAllApproved = await readContract(config, {
      address: contracts.bandbear.address as `0x${string}`,
      abi: contracts.bandbear.abi,
      functionName: "isApprovedForAll",
      args: [wallet, contracts.goldilend.address],
    });

    const boAA = bondbearAllApproved as unknown as boolean;
    const baAA = bandbearAllApproved as unknown as boolean;

    return [boAA, baAA];
  };

  const checkRepayAllowance = async (
    amt: number,
    wallet: string,
  ): Promise<boolean> => {
    const ibgtAllowance = await readContract(config, {
      address: contracts.ibgt.address as `0x${string}`,
      abi: contracts.ibgt.abi,
      functionName: "allowance",
      args: [wallet, contracts.goldilend.address],
    });
    const allowanceNum = parseFloat(
      formatEther(ibgtAllowance as unknown as bigint),
    );

    if (amt > allowanceNum) {
      return false;
    } else {
      return true;
    }
  };

  const sendGoldilendNFTApproveTx = async (nft: string) => {
    try {
      const hash = await writeContract(config, {
        address: nft as `0x${string}`,
        abi: contracts.bondbear.abi,
        functionName: "setApprovalForAll",
        args: [contracts.goldilend.address, true],
      });
      await waitForTransactionReceipt(config, { hash });
    } catch (e) {
      console.log("user denied tx");
      console.log("or: ", e);
    }
  };

  const sendiBGTApproveTx = async (amt: number, infinite: boolean) => {
    try {
      const hash = await writeContract(config, {
        address: contracts.ibgt.address as `0x${string}`,
        abi: contracts.ibgt.abi,
        functionName: "approve",
        args: [
          contracts.goldilend.address,
          infinite
            ? parseEther(
                "115792089237316195423570985008687907853269984665640564039457",
              )
            : parseEther(`${amt + 0.01}`),
        ],
      });
      await waitForTransactionReceipt(config, { hash });
    } catch (e) {
      console.log("user denied tx");
      console.log("or: ", e);
    }
  };

  const sendGiBGTApproveTx = async (amt: number, infinite: boolean) => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: "approve",
        args: [
          contracts.goldilend.address,
          infinite
            ? parseEther(
                "115792089237316195423570985008687907853269984665640564039457",
              )
            : parseEther(`${amt + 0.01}`),
        ],
      });
      await waitForTransactionReceipt(config, { hash });
    } catch (e) {
      console.log("user denied tx");
      console.log("or: ", e);
    }
  };

  const sendLockTx = async (lockAmt: number): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: "lock",
        args: [parseEther(`${lockAmt}`)],
      });
      const data = await waitForTransactionReceipt(config, { hash });
      return data.transactionHash;
    } catch (e) {
      console.log("user denied tx");
      console.log("or: ", e);
    }

    return "";
  };

  const sendStakeTx = async (stakeAmt: number): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: "stake",
        args: [parseEther(`${stakeAmt}`)],
      });
      const data = await waitForTransactionReceipt(config, { hash });
      return data.transactionHash;
    } catch (e) {
      console.log("user denied tx");
      console.log("or: ", e);
    }

    return "";
  };

  const sendUnstakeTx = async (unstakeAmt: number): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: "unstake",
        args: [parseEther(`${unstakeAmt}`)],
      });
      const data = await waitForTransactionReceipt(config, { hash });
      return data.transactionHash;
    } catch (e) {
      console.log("user denied tx");
      console.log("or: ", e);
    }

    return "";
  };

  const sendClaimTx = async (): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: "claim",
        args: [],
      });
      const data = await waitForTransactionReceipt(config, { hash });
      return data.transactionHash;
    } catch (e) {
      console.log("user denied tx");
      console.log("or: ", e);
    }

    return "";
  };

  const sendBoostTx = async (
    selectedPartners: PartnerInfo[],
  ): Promise<string> => {
    if (selectedPartners.length == 1) {
      try {
        const hash = await writeContract(config, {
          address: contracts.goldilend.address as `0x${string}`,
          abi: contracts.goldilend.abi,
          functionName: "boost",
          args: [
            selectedPartners[0].name === "HoneyComb"
              ? contracts.honeycomb.address
              : contracts.beradrome.address,
            selectedPartners[0].id,
          ],
        });
        const data = await waitForTransactionReceipt(config, { hash });
        return data.transactionHash;
      } catch (e) {
        console.log("user denied tx");
        console.log("or: ", e);
      }
    } else {
      const hc = contracts.honeycomb.address as `0x${string}`;
      const drome = contracts.beradrome.address as `0x${string}`;
      const nfts: `0x${string}`[] = [];
      const ids: bigint[] = [];
      for (let i = 0; i < selectedPartners.length; i++) {
        nfts.push(selectedPartners[i].name === "HoneyComb" ? hc : drome);
        ids.push(BigInt(selectedPartners[i].id));
      }
      try {
        const hash = await writeContract(config, {
          address: contracts.goldilend.address as `0x${string}`,
          abi: parseAbi(["function boost(address[], uint256[])"]),
          functionName: "boost",
          args: [nfts, ids],
        });
        const data = await waitForTransactionReceipt(config, { hash });
        return data.transactionHash;
      } catch (e) {
        console.log("user denied tx");
        console.log("or: ", e);
      }
    }

    return "";
  };

  const sendWithdrawBoostTx = async (): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: "withdrawBoost",
        args: [],
      });
      const data = await waitForTransactionReceipt(config, { hash });
      return data.transactionHash;
    } catch (e) {
      console.log("user denied tx");
      console.log("or: ", e);
    }

    return "";
  };

  const sendBorrowTx = async (
    loanAmt: number,
    selectedBera: BeraInfo,
    duration: number,
  ): Promise<string> => {
    const bond = contracts.bondbear.address as `0x${string}`;
    const band = contracts.bandbear.address as `0x${string}`;
    try {
      const hash = await writeContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: parseAbi(["function borrow(uint256, uint256, address, uint256)"]),
        functionName: "borrow",
        args: [
          parseEther(`${loanAmt}`),
          BigInt(duration),
          selectedBera.name === "BondBera" ? bond : band,
          BigInt(selectedBera.id),
        ],
      });
      const data = await waitForTransactionReceipt(config, { hash });
      return data.transactionHash;
    } catch (e) {
      console.log("user denied tx");
      console.log("or: ", e);
    }

    return "";
  };

  const sendRepayTx = async (
    repayAmt: number,
    loanId: number,
    maxToggle: boolean,
    wallet: string,
  ): Promise<string> => {
    const loan = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: "lookupLoan",
      args: [wallet, loanId],
    });
    const userLoan = loan as unknown as LoanInfo;
    try {
      const hash = await writeContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: "repay",
        args: [
          maxToggle
            ? userLoan.borrowedAmount.toString()
            : parseEther(`${repayAmt}`),
          loanId,
        ],
      });
      const data = await waitForTransactionReceipt(config, { hash });
      return data.transactionHash;
    } catch (e) {
      console.log("user denied tx");
      console.log("or: ", e);
    }

    return "";
  };

  const sendLiquidateTx = async (addy: string, id: number): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: "liquidate",
        args: [addy, id],
      });
      const data = await waitForTransactionReceipt(config, { hash });
      return data.transactionHash;
    } catch (e) {
      console.log("user denied tx");
      console.log("or: ", e);
    }

    return "";
  };

  const sendMintNFTTx = async (nft: string, addy: string): Promise<string> => {
    try {
      let hash;
      if (nft === "bond") {
        hash = await writeContract(config, {
          address: contracts.bondbear.address as `0x${string}`,
          abi: contracts.bondbear.abi,
          functionName: "mint",
          args: [addy],
        });
      } else if (nft === "band") {
        hash = await writeContract(config, {
          address: contracts.bandbear.address as `0x${string}`,
          abi: contracts.bandbear.abi,
          functionName: "mint",
          args: [addy],
        });
      } else if (nft === "honeycomb") {
        hash = await writeContract(config, {
          address: contracts.honeycomb.address as `0x${string}`,
          abi: contracts.honeycomb.abi,
          functionName: "mint",
          args: [addy],
        });
      } else {
        hash = await writeContract(config, {
          address: contracts.beradrome.address as `0x${string}`,
          abi: contracts.beradrome.abi,
          functionName: "mint",
          args: [addy],
        });
      }
      const data = await waitForTransactionReceipt(config, { hash });
      return data.transactionHash;
    } catch (e) {
      console.log("user denied tx");
      console.log("or: ", e);
    }

    return "";
  };

  return {
    checkBoostAllowance,
    checkLoanAllowance,
    sendGoldilendNFTApproveTx,
    sendBoostTx,
    sendWithdrawBoostTx,
    sendBorrowTx,
    sendRepayTx,
    checkRepayAllowance,
    checkLockAllowance,
    checkStakeAllowance,
    sendiBGTApproveTx,
    sendGiBGTApproveTx,
    sendLockTx,
    sendStakeTx,
    sendUnstakeTx,
    sendClaimTx,
    sendLiquidateTx,
    sendMintNFTTx,
  };
};
