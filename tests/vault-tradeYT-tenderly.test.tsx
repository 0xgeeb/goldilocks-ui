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
// "0x30B9b98fB0a812568Df9Dc1C025324efacBc7e00" as `0x${string}`;
const OT_YT_HOLDER =
  "0x7BFEe91193d9Df2Ac0bFe90191D40F23c773C060" as `0x${string}`;
const ROUTER = contracts.routerv2;

// Contract addresses
const RUSD = contracts.rusd.address;
const RUSD_OT = contracts.rusdot.address;
const RUSD_YT = contracts.rusdyt.address;
const VAULT = contracts.rusdVault.address;
const VAULT_ABI = contracts.weethVault.abi;
const QUOTER = contracts.quoterv2.address;
const QUOTER_ABI = contracts.quoterv2.abi as Abi;

test("Simulate trading YT to RUSD (via Tenderly)", async () => {
  const client = createPublicClient({
    chain: berachain,
    transport: http(),
  });

  // Get current YT price using QuoterV2
  const buyingOTQuoteResult = (await client.readContract({
    address: QUOTER as `0x${string}`,
    abi: QUOTER_ABI,
    functionName: "quoteExactOutputSingle",
    args: [[RUSD, RUSD_OT, parseUnits("0.0001", 8), 500, 0]],
  })) as [bigint];

  const buyingOTPrice = parseFloat(formatUnits(buyingOTQuoteResult[0], 8));
  const currentYtPrice = (0.0001 - buyingOTPrice) * 10000;

  // Calculate trade parameters
  const tradeInput = 100; // Amount of YT to sell
  const dtSpendQuoteResult = (await client.readContract({
    address: QUOTER as `0x${string}`,
    abi: QUOTER_ABI,
    functionName: "quoteExactOutputSingle",
    args: [[RUSD, RUSD_OT, parseUnits(`${tradeInput}`, 8), 500, 0]],
  })) as [bigint];

  const amountInMax = parseFloat(formatUnits(dtSpendQuoteResult[0], 8)) * 1.003;
  const calleddtAmountMin = (tradeInput - amountInMax) * 0.997;
  const dtAmountMin = tradeInput * currentYtPrice;

  // console.log("Starting YT to RUSD swap simulation...");
  // console.log("YT amount:", tradeInput);
  // console.log("Min RUSD to receive:", dtAmountMin);
  // console.log("Called DT amount min:", calleddtAmountMin);
  // console.log("Vault swap amount:", amountInMax);
  // console.log("From address:", OT_YT_HOLDER);
  // console.log("YT token address:", RUSD_YT);
  // console.log("Vault address:", VAULT);

  // First transaction: Approve vault to spend YT

  // const approvalStatus =
  //   approvalSequence.simulation_results[0].simulation.status;
  // const approvalError = approvalSequence.simulation_results[0].simulation.error;
  // console.log("Approval transaction status:", approvalStatus);
  // if (!approvalStatus) {
  //   console.log("Approval error:", approvalError);
  // }

  // expect(approvalStatus).toBe(true);

  // Second transaction: Sell YT through vault
  const sellSequence = (
    await axios.post(
      `${BASE_URL}/simulate-bundle`,
      {
        simulations: [
          {
            from: OT_YT_HOLDER,
            to: RUSD_YT,
            input: encodeFunctionData({
              abi: ERC20_ABI.abi,
              functionName: "approve",
              args: [VAULT, parseUnits(`${tradeInput}`, 8)],
            }),
            network_id: berachain.id,
            block_number: 3752844,
            gas: 8000000,
            gas_price: 0,
            value: 0,
            simulation_type: "quick",
          },
          {
            from: OT_YT_HOLDER,
            to: VAULT,
            input: encodeFunctionData({
              abi: VAULT_ABI as any,
              functionName: "sellYT",
              args: [
                parseUnits(`${tradeInput}`, 8),
                parseUnits(`${calleddtAmountMin}`, 8),
                parseUnits(`${amountInMax}`, 8),
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

  // Save simulation results for debugging
  fs.writeFileSync(
    "yt-sell-sequence.json",
    JSON.stringify(sellSequence, null, 2),
  );

  const approvalStatus = sellSequence.simulation_results[0].simulation.status;
  const approvalError = sellSequence.simulation_results[0].simulation.error;
  console.log("Approval transaction status:", approvalStatus);
  if (!approvalStatus) {
    console.log("Approval error:", approvalError);
  }

  const sellStatus = sellSequence.simulation_results[1].simulation.status;
  const sellError = sellSequence.simulation_results[1].simulation.error;
  console.log("Sell transaction status:", sellStatus);
  if (!sellStatus) {
    console.log("Sell error:", sellError);
  }

  expect(sellStatus).toBe(true);

  const asset_changes =
    sellSequence.simulation_results[1].transaction.transaction_info
      .asset_changes;

  // Log all asset changes for debugging
  console.log("Asset changes:", JSON.stringify(asset_changes, null, 2));

  // Check YT balance decreased
  const ytFinal = BigInt(
    asset_changes.find(
      (change: AssetChange) =>
        change.token_info.contract_address.toLowerCase() ===
        RUSD_YT.toLowerCase(),
    )?.raw_amount || "0",
  );

  // Check RUSD balance increased
  const rusdFinal = BigInt(
    asset_changes.find(
      (change: AssetChange) =>
        change.token_info.contract_address.toLowerCase() === RUSD.toLowerCase(),
    )?.raw_amount || "0",
  );

  console.log("✅ YT balance after trade:", ytFinal.toString());
  console.log("✅ RUSD received:", rusdFinal.toString());

  expect(ytFinal < parseUnits("1000", 8)).toBe(true);
  expect(rusdFinal > 0n).toBe(true);
}, 20000000);

test("Simulate trading RUSD to YT (via Tenderly)", async () => {
  const client = createPublicClient({
    chain: berachain,
    transport: http(),
  });

  const beforeDTBalance = await client.readContract({
    address: RUSD,
    abi: ERC20_ABI.abi,
    functionName: "balanceOf",
    args: [RUSD_HOLDER],
  });

  const beforeYTBalance = await client.readContract({
    address: RUSD_YT,
    abi: ERC20_ABI.abi,
    functionName: "balanceOf",
    args: [RUSD_HOLDER],
  });

  console.log("Before DT balance:", beforeDTBalance);
  console.log("Before YT balance:", beforeYTBalance);

  // Get current YT price using QuoterV2
  const quoteResult = (await client.readContract({
    address: QUOTER as `0x${string}`,
    abi: QUOTER_ABI,
    functionName: "quoteExactInputSingle",
    args: [[RUSD_OT, RUSD, parseEther("0.0001"), 500, 0]],
  })) as [bigint];

  const sellQuote = parseFloat(
    formatEther(quoteResult[0] as unknown as bigint),
  );

  const ytPrice = (0.0001 - sellQuote) * 10000;

  // Calculate trade parameters
  const tradeInput = 10; // Amount of RUSD to trade
  const slippage = 1; // 0.5% slippage
  const ytAmount = (tradeInput / ytPrice) * (1 - slippage / 100);

  // Get quote for the actual trade amount
  const dtProceedsQuoteResult = (await client.readContract({
    address: QUOTER as `0x${string}`,
    abi: QUOTER_ABI,
    functionName: "quoteExactInputSingle",
    args: [[RUSD_OT, RUSD, parseEther(`${ytAmount}`), 500, 0]],
  })) as [bigint];

  const amountOutMin =
    parseFloat(formatEther(dtProceedsQuoteResult[0] as unknown as bigint)) *
    0.997;

  console.log("Expected YT amount:", parseEther(`${ytAmount}`));
  console.log("RUSD amount to spend:", parseEther(`${tradeInput}`));
  console.log("Min RUSD to receive:", parseEther(`${amountOutMin}`));

  const tradeSequence = (
    await axios.post(
      `${BASE_URL}/simulate-bundle`,
      {
        simulations: [
          // First transaction: Approve RUSD to Vault
          {
            from: RUSD_HOLDER,
            to: RUSD,
            input: encodeFunctionData({
              abi: ERC20_ABI.abi,
              functionName: "approve",
              args: [VAULT, maxUint256],
            }),
            network_id: berachain.id,
            block_number: 3752844,
            gas: 8000000,
            gas_price: 0,
            value: 0,
            simulation_type: "quick",
          },
          // Second transaction: Approve OT to Vault
          {
            from: RUSD_HOLDER,
            to: RUSD_OT,
            input: encodeFunctionData({
              abi: ERC20_ABI.abi,
              functionName: "approve",
              args: [VAULT, maxUint256],
            }),
            network_id: berachain.id,
            block_number: 3752844,
            gas: 8000000,
            gas_price: 0,
            value: 0,
            simulation_type: "quick",
          },
          // Third transaction: Buy YT
          {
            from: RUSD_HOLDER,
            to: VAULT,
            input: encodeFunctionData({
              abi: VAULT_ABI as any,
              functionName: "buyYT",
              args: [
                parseEther(`${ytAmount}`), // Amount of YT to buy
                parseEther(`${tradeInput}`), // Maximum amount of RUSD to spend
                parseEther(`${amountOutMin}`), // Minimum amount of RUSD to receive
              ],
            }),
            network_id: berachain.id,
            block_number: 4013885,
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
    "rusd-to-yt-sequence.json",
    JSON.stringify(tradeSequence, null, 2),
  );

  // Check each transaction status
  const approvalStatus1 = tradeSequence.simulation_results[0].simulation.status;
  const approvalStatus2 = tradeSequence.simulation_results[1].simulation.status;
  const buyYTStatus = tradeSequence.simulation_results[2].simulation.status;

  expect(approvalStatus1).toBe(true);
  expect(approvalStatus2).toBe(true);
  expect(buyYTStatus).toBe(true);

  const asset_changes =
    tradeSequence.simulation_results[2].transaction.transaction_info
      .asset_changes;

  // Log all asset changes for debugging
  // console.log("Asset changes:", JSON.stringify(asset_changes, null, 2));

  // Check RUSD balance decreased
  const rusdFinal = BigInt(
    asset_changes.find(
      (change: AssetChange) =>
        change.token_info.contract_address.toLowerCase() === RUSD.toLowerCase(),
    )?.raw_amount || "0",
  );

  // Check YT balance increased
  const ytFinal = BigInt(
    asset_changes.find(
      (change: AssetChange) =>
        change.token_info.contract_address.toLowerCase() ===
        RUSD_YT.toLowerCase(),
    )?.raw_amount || "0",
  );

  console.log("✅ RUSD balance after trade:", rusdFinal.toString());
  console.log("✅ YT received:", ytFinal.toString());

  // expect(beforeDTBalance - rusdFinal  parseEther("1000")).toBe(true);
  expect(ytFinal === parseEther(`${ytAmount}`)).toBe(true);
}, 20000000);
