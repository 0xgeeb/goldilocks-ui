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
      address: contracts.honey.address as `0x${string}`,
      abi: contracts.honey.abi,
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

  const checkLoanAllowance = async (wallet: string, nftContractAddress: string): Promise<boolean> => {
    const isApproved = await readContract(config, {
      address: nftContractAddress as `0x${string}`,
      abi: contracts.bandbear.abi, // All bera contracts share the same ERC721 ABI
      functionName: "isApprovedForAll",
      args: [wallet, contracts.goldilend.address],
    });

    return isApproved as unknown as boolean;
  };

  const checkRepayAllowance = async (
    amt: number,
    wallet: string,
  ): Promise<boolean> => {
    const ibgtAllowance = await readContract(config, {
      address: contracts.honey.address as `0x${string}`,
      abi: contracts.honey.abi,
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

  const sendHoneyApproveTx = async (amt: number, infinite: boolean) => {
    try {
      const hash = await writeContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
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

  const sendUnlockTx = async (unlockAmt: number): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: "unlock",
        args: [parseEther(`${unlockAmt}`)],
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
        functionName: "deposit",
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
        functionName: "withdraw",
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
    // Map collection name to contract address
    const getBeraContractAddress = (beraName: string): `0x${string}` => {
      const collectionName = beraName.split(" #")[0];

      const contractMap: Record<string, `0x${string}`> = {
        "Fake Bear": contracts.fakebear.address as `0x${string}`,
        "Bit Bear": contracts.bitbear.address as `0x${string}`,
        "Baby Bear": contracts.babybear.address as `0x${string}`,
        "Boo Bear": contracts.boobear.address as `0x${string}`,
        "Bond Bear": contracts.bondbear.address as `0x${string}`,
        "Band Bear": contracts.bandbear.address as `0x${string}`,
        "Bong Bear": contracts.bongbear.address as `0x${string}`,
      };

      return contractMap[collectionName] || contracts.bandbear.address as `0x${string}`;
    };

    try {
      const hash = await writeContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: "borrow",
        args: [
          parseEther(`${loanAmt}`),
          parseEther('5000'),
          BigInt(duration),
          getBeraContractAddress(selectedBera.name),
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
    realBorrowedAmount: bigint,
    realInterest: bigint,
    wallet: string,
    repaidAmount?: number,
  ): Promise<string> => {
    try {
      // When maxToggle is true, use precise BigInt math to calculate remaining amount
      // to avoid rounding issues. Subtract any partial repayments from the original amount.
      const repayAmount = maxToggle
        ? realBorrowedAmount - parseEther(`${repaidAmount || 0}`)
        : parseEther(`${repayAmt}`);

      const hash = await writeContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: "repay",
        args: [
          repayAmount,
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

    const sendRenewTx = async (
        addy: string,
        loanId: number,
        newBorrowAmount: number,
        newDuration: number,
        realInterest: bigint
    ): Promise<string> => {
        try {
            console.log(loanId, newDuration, newBorrowAmount, realInterest)
            const hash = await writeContract(config, {
                address: contracts.goldilend.address as `0x${string}`,
                abi: contracts.goldilend.abi,
                functionName: "renew",
                args: [
                    loanId,
                    newDuration,
                    parseEther(newBorrowAmount.toString()),
                    parseEther('5000')
                ]
            })
            const data = await waitForTransactionReceipt(config, { hash })
            return data.transactionHash
        }
        catch (e) {
            console.log("user denied tx");
            console.log("or: ", e);
        }

        return "";
    }

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

  const sendPlaceBidTx = async (loanOriginator: string, id: number, bidAmount: number): Promise<string> => {
    try {
        const hash = await writeContract(config, {
            address: contracts.goldilend.address as `0x${string}`,
            abi: contracts.goldilend.abi,
            functionName: "placeBid",
            args: [loanOriginator, id, parseEther(bidAmount.toString())],
        });
        const data = await waitForTransactionReceipt(config, { hash });
        return data.transactionHash;
    }
    catch (e) {
        console.log("user denied tx");
        console.log("or: ", e);
    }

    return ""
  }

  const sendCloseAuctionTx = async (loanOriginator: string, id: number): Promise<string> => {
    try {
        const hash = await writeContract(config, {
            address: contracts.goldilend.address as `0x${string}`,
            abi: contracts.goldilend.abi,
            functionName: "closeAuction",
            args: [loanOriginator, id],
        });
        const data = await waitForTransactionReceipt(config, { hash });
        return data.transactionHash;
    }
    catch (e) {
        console.log("user denied tx");
        console.log("or: ", e);
    }

    return ""
  }

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

  const sendMintFakeHoneyTx = async (addy: string): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: 'mint',
        args: [addy, parseEther('1000000')]
      })
      const data = await waitForTransactionReceipt(config, { hash })
      return data.transactionHash
    }
    catch (e) {
      console.log("user denied tx");
      console.log("or: ", e);
      return ''
    }
  }

  return {
    checkLoanAllowance,
    sendGoldilendNFTApproveTx,
    sendBoostTx,
    sendWithdrawBoostTx,
    sendBorrowTx,
    sendRepayTx,
    checkRepayAllowance,
    checkLockAllowance,
    checkStakeAllowance,
    sendHoneyApproveTx,
    sendGiBGTApproveTx,
    sendLockTx,
    sendUnlockTx,
    sendStakeTx,
    sendUnstakeTx,
    sendClaimTx,
    sendLiquidateTx,
    sendMintNFTTx,
    sendMintFakeHoneyTx,
    sendRenewTx,
    sendPlaceBidTx,
    sendCloseAuctionTx
  };
};
