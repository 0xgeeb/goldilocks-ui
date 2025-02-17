import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { parseEther, formatEther } from "viem";
import { config } from "../../providers/WagmiProvider";
import { contracts } from "../../utils/addressi";

export const useBorrowTx = () => {
  const checkAllowance = async (
    amt: number,
    wallet: string,
  ): Promise<boolean> => {
    const allowanceResult = await readContract(config, {
      address: contracts.honey.address as `0x${string}`,
      abi: contracts.honey.abi,
      functionName: "allowance",
      args: [wallet, contracts.goldilocked.address],
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

  const sendApproveTx = async (amt: number, infinite: boolean) => {
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
  };

  const sendBorrowTx = async (borrowAmt: number): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldilocked.address as `0x${string}`,
        abi: contracts.goldilocked.abi,
        functionName: "borrow",
        args: [parseEther(`${borrowAmt}`)],
      });
      const data = await waitForTransactionReceipt(config, { hash });
      return data.transactionHash;
    } catch (e) {
      console.log("user denied tx");
      console.log("or: ", e);
    }

    return "";
  };

  const sendRepayTx = async (repayAmt: number): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldilocked.address as `0x${string}`,
        abi: contracts.goldilocked.abi,
        functionName: "repay",
        args: [parseEther(`${repayAmt}`)],
      });
      const data = await waitForTransactionReceipt(config, { hash });
      return data.transactionHash;
    } catch (e) {
      console.log("user denied tx");
      console.log("or: ", e);
    }

    return "";
  };

  return { checkAllowance, sendApproveTx, sendBorrowTx, sendRepayTx };
};
