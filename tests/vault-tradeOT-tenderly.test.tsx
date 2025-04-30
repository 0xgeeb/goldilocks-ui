import { test, expect } from "vitest";
import axios from "axios";
import { createPublicClient, encodeFunctionData, http, parseEther } from "viem";
import { contracts } from "../data/contracts";
import { berachain } from "viem/chains";
import ERC20_ABI from "../utils/abi/BHoney.json";
import ROUTER_ABI from "../utils/abi/RouterV2.json";
import * as fs from "fs";
import { AssetChange } from "./vault-deposit-tenderly.test";

const BASE_URL =
  "https://api.tenderly.co/api/v1/account/konkaliquid/project/fury";
const ACCESS_KEY =
  process.env.TENDERLY_ACCESS_KEY || "DI43o6QBoa4oE8Jve-fh7PZEf20KZKLa";

// Addresses with tokens
const RUSD_HOLDER =
  "0xd6d83e479359766f21a63b20d6af43a138356eba" as `0x${string}`;
const OT_YT_HOLDER =
  "0x7BFEe91193d9Df2Ac0bFe90191D40F23c773C060" as `0x${string}`;

// Contract addresses
const RUSD = contracts.rusd.address;
const RUSD_OT = contracts.rusdot.address;
const RUSD_YT = contracts.rusdyt.address;
const ROUTER = contracts.routerv2.address;

// Helper function to simulate a trade with approval
export async function simulateTradeOTWithApproval(
  from: `0x${string}`,
  to: `0x${string}`,
  inputAmount: bigint,
  outputAmount: bigint,
  pathOne: string,
  pathTwo: string,
  wallet: string,
  tokenToApprove: string,
) {
  const tradeSequence = (
    await axios.post(
      `${BASE_URL}/simulate-bundle`,
      {
        simulations: [
          // First transaction: Approve Router to spend tokens
          {
            from: from,
            to: tokenToApprove,
            input: encodeFunctionData({
              abi: ERC20_ABI.abi,
              functionName: "approve",
              args: [ROUTER, inputAmount],
            }),
            network_id: berachain.id,
            block_number: 3752844,
            gas: 8000000,
            gas_price: 0,
            value: 0,
            simulation_type: "quick",
          },
          // Second transaction: Execute the trade
          {
            from: from,
            to: ROUTER,
            input: encodeFunctionData({
              abi: ROUTER_ABI.abi,
              functionName: "exactInputSingle",
              args: [
                [pathOne, pathTwo, 500, wallet, inputAmount, outputAmount, 0],
              ],
            }),
            network_id: berachain.id,
            block_number: 3752844,
            gas: 8000000,
            gas_price: 0,
            value: 0,
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

  return tradeSequence;
}

test("Simulate trading OT to RUSD (via Tenderly)", async () => {
  const inputAmount = parseEther("100"); // Amount of OT to trade
  const outputAmount = parseEther("99"); // Expected RUSD output (with 1% slippage)

  const tradeSequence = await simulateTradeOTWithApproval(
    OT_YT_HOLDER,
    ROUTER,
    inputAmount,
    outputAmount,
    RUSD_OT,
    RUSD,
    OT_YT_HOLDER,
    RUSD_OT,
  );

  const simulationSuccessful =
    tradeSequence.simulation_results[1].simulation.status === true;

  expect(simulationSuccessful).toBe(true);

  const asset_changes =
    tradeSequence.simulation_results[1].transaction.transaction_info
      .asset_changes;

  // Check OT balance decreased
  const otFinal = BigInt(
    asset_changes.find(
      (change: AssetChange) =>
        change.token_info.contract_address.toLowerCase() ===
        RUSD_OT.toLowerCase(),
    )?.raw_amount || "0",
  );

  // Check RUSD balance increased
  const rusdFinal = BigInt(
    asset_changes.find(
      (change: AssetChange) =>
        change.token_info.contract_address.toLowerCase() === RUSD.toLowerCase(),
    )?.raw_amount || "0",
  );

  console.log("✅ OT balance after trade:", otFinal.toString());
  console.log("✅ RUSD received:", rusdFinal.toString());

  expect(otFinal < parseEther("1000")).toBe(true);
  expect(rusdFinal > 0n).toBe(true);
}, 20000000);

test("Simulate trading RUSD to OT (via Tenderly)", async () => {
  const inputAmount = parseEther("100"); // Amount of RUSD to trade
  const outputAmount = parseEther("99"); // Expected OT output (with 1% slippage)

  const tradeSequence = await simulateTradeOTWithApproval(
    RUSD_HOLDER,
    ROUTER,
    inputAmount,
    outputAmount,
    RUSD,
    RUSD_OT,
    RUSD_HOLDER,
    RUSD,
  );

  const simulationSuccessful =
    tradeSequence.simulation_results[1].simulation.status === true;

  expect(simulationSuccessful).toBe(true);

  const asset_changes =
    tradeSequence.simulation_results[1].transaction.transaction_info
      .asset_changes;

  // Check RUSD balance decreased
  const rusdFinal = BigInt(
    asset_changes.find(
      (change: AssetChange) =>
        change.token_info.contract_address.toLowerCase() === RUSD.toLowerCase(),
    )?.raw_amount || "0",
  );

  // Check OT balance increased
  const otFinal = BigInt(
    asset_changes.find(
      (change: AssetChange) =>
        change.token_info.contract_address.toLowerCase() ===
        RUSD_OT.toLowerCase(),
    )?.raw_amount || "0",
  );

  console.log("✅ RUSD balance after trade:", rusdFinal.toString());
  console.log("✅ OT received:", otFinal.toString());

  expect(rusdFinal < parseEther("1000")).toBe(true);
  expect(otFinal > 0n).toBe(true);
}, 20000000);
