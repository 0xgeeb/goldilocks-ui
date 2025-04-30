import { test, expect } from "vitest";
import axios from "axios";
import {
  createPublicClient,
  encodeFunctionData,
  http,
  parseUnits,
  formatUnits,
  Abi,
  maxUint256,
  formatEther,
  parseEther,
} from "viem";
import { contracts } from "../data/contracts";
import { berachain } from "viem/chains";
import ERC20_ABI from "../utils/abi/BHoney.json";
import { AssetChange } from "./vault-deposit-tenderly.test";

import * as fs from "fs";

const BASE_URL =
  "https://api.tenderly.co/api/v1/account/konkaliquid/project/fury";
const ACCESS_KEY =
  process.env.TENDERLY_ACCESS_KEY || "DI43o6QBoa4oE8Jve-fh7PZEf20KZKLa";

// Addresses with tokens
const RUSD_HOLDER =
  "0xd6d83e479359766f21a63b20d6af43a138356eba" as `0x${string}`;

const LP_HOLDER = "0x15b09ba2a72035d84d19b10951f0bf116114dc7c" as `0x${string}`;

// Contract addresses
const RUSD = contracts.rusd.address;
const RUSD_ABI = contracts.rusd.abi as Abi;
const RUSDDQUABERA = contracts.rusdaquabera.address;
const RUSDDQUABERA_ABI = contracts.rusdaquabera.abi as Abi;
const DEPOSITGUARD = contracts.depositGuard.address;
const DEPOSITGUARD_ABI = contracts.depositGuard.abi as Abi;

const vaultDeployer = "0x9Fbba6c87923af2561A2391198166b51Cf5736E8";

test("Simulate adding Liquidity (via Tenderly)", async () => {
  const client = createPublicClient({
    chain: berachain,
    transport: http(),
  });
  // // Get current YT price using QuoterV2
  const beforeLPBalance = (await client.readContract({
    address: RUSDDQUABERA as `0x${string}`,
    abi: RUSDDQUABERA_ABI,
    functionName: "balanceOf",
    args: [RUSD_HOLDER],
  })) as bigint;

  // Calculate trade parameters
  const inputAmount = 100; // Amount of rusd to add

  // Second transaction:
  const addLiquiditySequence = (
    await axios.post(
      `${BASE_URL}/simulate-bundle`,
      {
        simulations: [
          {
            from: RUSD_HOLDER,
            to: RUSD,
            input: encodeFunctionData({
              abi: RUSD_ABI,
              functionName: "approve",
              args: [DEPOSITGUARD, parseEther(`${inputAmount}`)],
            }),
            network_id: berachain.id,
            block_number: 3752844,
            gas: 8000000,

            simulation_type: "quick",
          },
          {
            from: RUSD_HOLDER,
            to: DEPOSITGUARD,
            input: encodeFunctionData({
              abi: DEPOSITGUARD_ABI,
              functionName: "forwardDepositToICHIVault",
              args: [
                RUSDDQUABERA,
                vaultDeployer,
                RUSD,
                parseEther(`${inputAmount}`),
                parseEther(`${0}`),
                RUSD_HOLDER,
              ],
            }),
            network_id: berachain.id,
            block_number: 3752844,
            gas: 8000000,

            simulation_type: "quick",
          },
        ],
      },
      {
        headers: {
          "X-Access-Key": ACCESS_KEY as string,
        },
      },
    )
  ).data;

  // Save simulation results for debugging
  fs.writeFileSync(
    "add-liquidity-sequence.json",
    JSON.stringify(addLiquiditySequence, null, 2),
  );

  const approvalStatus =
    addLiquiditySequence.simulation_results[0].simulation.status;
  const approvalError =
    addLiquiditySequence.simulation_results[0].simulation.error;
  console.log("Approval transaction status:", approvalStatus);
  if (!approvalStatus) {
    console.log("Approval error:", approvalError);
  }

  const addLiquidityStatus =
    addLiquiditySequence.simulation_results[1].simulation.status;
  const addLiquidityError =
    addLiquiditySequence.simulation_results[1].simulation.error;
  console.log("Add Liquidity transaction status:", addLiquidityStatus);
  if (!addLiquidityStatus) {
    console.log("Add Liquidity error:", addLiquidityError);
  }

  expect(addLiquidityStatus).toBe(true);

  const asset_changes =
    addLiquiditySequence.simulation_results[1].transaction.transaction_info
      .asset_changes;

  // Log all asset changes for debugging
  console.log("Asset changes:", JSON.stringify(asset_changes, null, 2));

  // Check YT balance decreased
  const LPAfter = BigInt(
    asset_changes.find(
      (change: AssetChange) =>
        change.token_info.contract_address.toLowerCase() ===
        RUSDDQUABERA.toLowerCase(),
    )?.raw_amount || "0",
  );

  // Check RUSD balance increased
  // const rusdFinal = BigInt(
  //   asset_changes.find(
  //     (change: AssetChange) =>
  //       change.token_info.contract_address.toLowerCase() === RUSD.toLowerCase(),
  //   )?.raw_amount || "0",
  // );

  console.log("✅ YT balance after trade:", LPAfter.toString());
  // console.log("✅ RUSD received:", rusdFinal.toString());

  console.log("beforeLPBalance", beforeLPBalance);
  console.log("LPAfter", LPAfter);

  expect(LPAfter - beforeLPBalance > 0n).toBe(true);
  // expect(rusdFinal > 0n).toBe(true);
}, 20000000);

test("Simulate remove Liquidity (via Tenderly)", async () => {
  const client = createPublicClient({
    chain: berachain,
    transport: http(),
  });
  // // Get current YT price using QuoterV2
  const beforeLPBalance = (await client.readContract({
    address: RUSDDQUABERA as `0x${string}`,
    abi: RUSDDQUABERA_ABI,
    functionName: "balanceOf",
    args: [LP_HOLDER],
  })) as bigint;

  // const buyingOTPrice = parseFloat(formatUnits(buyingOTQuoteResult[0], 8));
  // const currentYtPrice = (0.0001 - buyingOTPrice) * 10000;

  // Calculate trade parameters
  const inputAmount = 10000; // Amount of rusd to add

  // Second transaction:
  const removeLiquiditySequence = (
    await axios.post(
      `${BASE_URL}/simulate-bundle`,
      {
        simulations: [
          {
            from: LP_HOLDER,
            to: RUSDDQUABERA,
            input: encodeFunctionData({
              abi: RUSDDQUABERA_ABI,
              functionName: "approve",
              args: [DEPOSITGUARD, parseEther(`${inputAmount}`)],
            }),
            network_id: berachain.id,
            block_number: 3752844,
            gas: 8000000,

            simulation_type: "quick",
          },
          {
            from: LP_HOLDER,
            to: DEPOSITGUARD,
            input: encodeFunctionData({
              abi: DEPOSITGUARD_ABI,
              functionName: "forwardWithdrawFromICHIVault",
              args: [
                RUSDDQUABERA,
                vaultDeployer,
                parseEther(`${inputAmount}`),

                RUSD_HOLDER,
                parseEther(`${0}`),
                parseEther(`${0}`),
              ],
            }),
            network_id: berachain.id,
            block_number: 3752844,
            gas: 8000000,

            simulation_type: "quick",
          },
        ],
      },
      {
        headers: {
          "X-Access-Key": ACCESS_KEY as string,
        },
      },
    )
  ).data;

  // Save simulation results for debugging
  fs.writeFileSync(
    "remove-liquidity-sequence.json",
    JSON.stringify(removeLiquiditySequence, null, 2),
  );

  const approvalStatus =
    removeLiquiditySequence.simulation_results[0].simulation.status;
  const approvalError =
    removeLiquiditySequence.simulation_results[0].simulation.error;
  console.log("Approval transaction status:", approvalStatus);
  if (!approvalStatus) {
    console.log("Approval error:", approvalError);
  }

  const removeLiquidityStatus =
    removeLiquiditySequence.simulation_results[1].simulation.status;
  const removeLiquidityError =
    removeLiquiditySequence.simulation_results[1].simulation.error;
  console.log("Remove Liquidity transaction status:", removeLiquidityStatus);
  if (!removeLiquidityStatus) {
    console.log("Remove Liquidity error:", removeLiquidityError);
  }

  expect(removeLiquidityStatus).toBe(true);

  const asset_changes =
    removeLiquiditySequence.simulation_results[1].transaction.transaction_info
      .asset_changes;

  // Log all asset changes for debugging
  console.log("Asset changes:", JSON.stringify(asset_changes, null, 2));

  // Check YT balance decreased
  const LPAfter = BigInt(
    asset_changes.find(
      (change: AssetChange) =>
        change.token_info.contract_address.toLowerCase() ===
        RUSDDQUABERA.toLowerCase(),
    )?.raw_amount || "0",
  );

  console.log("✅ YT balance after trade:", LPAfter.toString());
  // console.log("✅ RUSD received:", rusdFinal.toString());

  expect(beforeLPBalance - LPAfter > 0n).toBe(true);
  // expect(rusdFinal > 0n).toBe(true);
}, 20000000);
