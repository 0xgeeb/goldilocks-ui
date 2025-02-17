import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { parseEther, formatEther } from "viem";
import { config } from "../../providers/WagmiProvider";
import { contracts } from "../../utils/addressi";

export const useStakeTx = () => {
  const checkAllowance = async (
    amt: number,
    token: string,
    wallet: string,
  ): Promise<boolean> => {
    let allowanceResult;
    let allowanceNum;

    if (token === "locks") {
      allowanceResult = await readContract(config, {
        address: contracts.goldiswap.address as `0x${string}`,
        abi: contracts.goldiswap.abi,
        functionName: "allowance",
        args: [wallet, contracts.goldilocked.address],
      });
      allowanceNum = parseFloat(
        formatEther(allowanceResult as unknown as bigint),
      );
    } else {
      allowanceResult = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: "allowance",
        args: [wallet, contracts.goldilocked.address],
      });
      allowanceNum = parseFloat(
        formatEther(allowanceResult as unknown as bigint),
      );
    }

    if (amt > allowanceNum) {
      return false;
    } else {
      return true;
    }
  };

  const sendApproveTx = async (
    amt: number,
    token: string,
    infinite: boolean,
  ) => {
    if (token === "locks") {
      try {
        const hash = await writeContract(config, {
          address: contracts.goldiswap.address as `0x${string}`,
          abi: contracts.goldiswap.abi,
          functionName: "approve",
          args: [
            contracts.goldilocked.address,
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
    } else {
      try {
        const hash = await writeContract(config, {
          address: contracts.honey.address as `0x${string}`,
          abi: contracts.honey.abi,
          functionName: "approve",
          args: [
            contracts.goldilocked.address,
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
    }
  };

  const sendStakeTx = async (stakeAmt: number): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldilocked.address as `0x${string}`,
        abi: contracts.goldilocked.abi,
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
        address: contracts.goldilocked.address as `0x${string}`,
        abi: contracts.goldilocked.abi,
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

  const sendStirTx = async (stirAmt: number): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldilocked.address as `0x${string}`,
        abi: contracts.goldilocked.abi,
        functionName: "stir",
        args: [parseEther(`${stirAmt}`)],
      });
      const data = await waitForTransactionReceipt(config, { hash });
      return data.transactionHash;
    } catch (e) {
      if (findBalanceError(e)) {
        return "balance";
      } else {
        return "";
      }
    }
  };

  const sendClaimTx = async (): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldilocked.address as `0x${string}`,
        abi: contracts.goldilocked.abi,
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

  const findBalanceError = (e: any): boolean => {
    const regex = /0x7939f424/;
    return regex.test(e);
  };

  return {
    checkAllowance,
    sendApproveTx,
    sendStakeTx,
    sendUnstakeTx,
    sendStirTx,
    sendClaimTx,
  };
};
