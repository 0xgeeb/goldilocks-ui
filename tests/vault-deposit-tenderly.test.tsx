import { test, expect } from "vitest";
import axios from "axios";
import { createPublicClient, encodeFunctionData, http, parseEther } from "viem";
import { contracts } from "../data/contracts";
import { berachain } from "viem/chains";
import ERC20_ABI from "../utils/abi/BHoney.json";
import VAULT_ABI from "../utils/abi/WeethGoldivault.json";
import * as fs from "fs";

const BASE_URL =
  // "https://berachain.gateway.tenderly.co/68PuRwmVDZYcNN563BYBHj";
  "https://api.tenderly.co/api/v1/account/konkaliquid/project/fury";
const ACCESS_KEY =
  process.env.TENDERLY_ACCESS_KEY || "DI43o6QBoa4oE8Jve-fh7PZEf20KZKLa";

// Mock : Tenderly SDK instance
// const tenderlyInstance = new Tenderly({
//   accountName: "konkaliquid",
//   projectName: "fury",
//   accessKey: ACCESS_KEY,
//   network: 80094, // Replace with the appropriate network
// });

export const impersonatedUser =
  "0xd6d83e479359766f21a63b20d6af43a138356eba" as `0x${string}`; // impersonated account

const DEPOSIT_TOKEN = contracts.rusd.address;

const VAULT = contracts.rusdVault.address;

export type AssetChange = {
  token_info: {
    contract_address: string;
    standard: string;
    type: string;
    symbol?: string;
    name?: string;
    decimals?: number;
  };
  type: string;
  from: string;
  to: string;
  amount: string | null;
  raw_amount: string;
  dollar_value: string | null;
  from_before_balance: string;
  to_before_balance: string;
};

test("Simulate approve + deposit + check balances (via Tenderly)", async () => {
  const depositAmount = parseEther("500");

  // 1. Get OT and YT token addresses from vault

  const client = createPublicClient({
    chain: berachain,
    transport: http(),
  });

  const OT = (await client.readContract({
    address: VAULT as `0x${string}`,
    abi: VAULT_ABI.abi,
    functionName: "ot",
  })) as `0x${string}`;

  console.log("OT", OT);

  const YT = (await client.readContract({
    address: VAULT as `0x${string}`,
    abi: VAULT_ABI.abi,
    functionName: "yt",
  })) as `0x${string}`;

  console.log("YT", YT);

  console.log("RUSD", DEPOSIT_TOKEN);

  // Usage of Tenderly SDK
  //   const transaction = await tenderlyInstance.simulator.simulateTransaction({
  //     transaction: {
  //       from: FROM,
  //       to: RUSD,
  //       gas: 20000000,
  //       gas_price: "19419609232",
  //       value: 0,
  //       input: encodeFunctionData({
  //         abi: ERC20_ABI,
  //         functionName: "approve",
  //         args: [VAULT, depositAmount],
  //       }),
  //     },
  //     blockNumber: 3237677,
  //   });

  //   console.log("transaction", transaction);

  // 2. Simulate approve + deposit bundle
  //   const simulation = await axios.post(
  //     `${BASE_URL}/simulate`,
  //     {
  //       network_id: "1",
  //       block_number: 16533883,
  //       from: "0xe2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2",
  //       to: "0x6b175474e89094c44da98b954eedeac495271d0f",
  //       gas: 8000000,
  //       gas_price: 0,
  //       value: 0,
  //       input: encodeFunctionData({
  //         abi: ERC20_ABI.abi,
  //         functionName: "approve",
  //         args: [VAULT, depositAmount],
  //       }),
  //       // input:
  //       //   "0x095ea7b3000000000000000000000000f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1000000000000000000000000000000000000000000000000000000000000012b",
  //       simulation_type: "quick",
  //     },
  //     {
  //       headers: {
  //         "X-Access-Key": ACCESS_KEY as string,
  //       },
  //     },
  //   );

  //   console.log("simulation");

  function getTxSequence() {
    return [
      {
        from: impersonatedUser,
        to: DEPOSIT_TOKEN,
        input: encodeFunctionData({
          abi: ERC20_ABI.abi,
          functionName: "approve",
          args: [VAULT, depositAmount],
        }),
      },
      {
        from: impersonatedUser,
        to: VAULT,
        input: encodeFunctionData({
          abi: VAULT_ABI.abi,
          functionName: "deposit",
          args: [depositAmount],
        }),
      },
    ];
  }

  const depositSequence = (
    await axios.post(
      `${BASE_URL}/simulate-bundle`,
      {
        simulations: getTxSequence().map((transaction) => ({
          network_id: berachain.id, // network to simulate on
          block_number: 3752844,
          gas: 8000000,
          gas_price: 0,
          value: 0,
          //   save: true,
          //   save_if_fails: true,
          simulation_type: "quick",
          ...transaction,
        })),
      },
      {
        headers: {
          "X-Access-Key": ACCESS_KEY as string,
        },
      },
    )
  ).data;
  console.timeEnd("Batch Simulation");
  // want to export depositSequence as json file
  //   fs.writeFileSync(
  //     "depositSequence.json",
  //     JSON.stringify(depositSequence, null, 2),
  //   );

  const simulationSuccessful =
    depositSequence.simulation_results[0].simulation.status === true;

  expect(simulationSuccessful).toBe(true);

  // 3. Read token balances at end of simulation
  const asset_changes =
    depositSequence.simulation_results[1].transaction.transaction_info
      .asset_changes;

  // Extract final balances from asset_changes
  const rusdFinal = BigInt(
    asset_changes.find(
      (change: AssetChange) =>
        change.token_info.contract_address.toLowerCase() ===
        DEPOSIT_TOKEN.toLowerCase(),
    )?.raw_amount || "0",
  );

  const otFinal = BigInt(
    asset_changes.find(
      (change: AssetChange) =>
        change.token_info.contract_address.toLowerCase() === OT.toLowerCase(),
    )?.raw_amount || "0",
  );

  const ytFinal = BigInt(
    asset_changes.find(
      (change: AssetChange) =>
        change.token_info.contract_address.toLowerCase() === YT.toLowerCase(),
    )?.raw_amount || "0",
  );

  console.log("✅ RUSD balance after deposit:", rusdFinal.toString());
  console.log("✅ OT tokens received:", otFinal.toString());
  console.log("✅ YT tokens received:", ytFinal.toString());

  expect(rusdFinal < parseEther("1000")).toBe(true);
  expect(otFinal > 0n).toBe(true);
  expect(ytFinal > 0n).toBe(true);
}, 20000000);
