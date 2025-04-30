import { test, expect } from "vitest";
import axios from "axios";
import { createPublicClient, encodeFunctionData, http, parseEther } from "viem";
import { contracts } from "../data/contracts";
import { berachain } from "viem/chains";

import VAULT_ABI from "../utils/abi/WeethGoldivault.json";
import * as fs from "fs";
import { AssetChange } from "./vault-deposit-tenderly.test";

const BASE_URL =
  "https://api.tenderly.co/api/v1/account/konkaliquid/project/fury";
const ACCESS_KEY =
  process.env.TENDERLY_ACCESS_KEY || "DI43o6QBoa4oE8Jve-fh7PZEf20KZKLa";

export const impersonatedUser =
  "0x7BFEe91193d9Df2Ac0bFe90191D40F23c773C060" as `0x${string}`;

const DEPOSIT_TOKEN = contracts.rusd.address;
const VAULT = contracts.rusdVault.address;

test("Simulate redeem OT + check balances (via Tenderly)", async () => {
  const redeemAmount = parseEther("100"); // Amount of OT to redeem

  // 1. Get OT token address from vault
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

  // 2. Simulate redeem OT transaction
  const redeemSequence = (
    await axios.post(
      `${BASE_URL}/simulate-bundle`,
      {
        simulations: [
          {
            from: impersonatedUser,
            to: VAULT,
            input: encodeFunctionData({
              abi: VAULT_ABI.abi,
              functionName: "redeemOwnership",
              args: [redeemAmount],
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

  fs.writeFileSync(
    "redeemSequence.json",
    JSON.stringify(redeemSequence, null, 2),
  );

  const simulationSuccessful =
    redeemSequence.simulation_results[0].simulation.status === true;

  expect(simulationSuccessful).toBe(true);

  // 3. Read token balances at end of simulation
  const asset_changes =
    redeemSequence.simulation_results[0].transaction.transaction_info
      .asset_changes;

  // Extract final balances from asset_changes
  const otFinal = BigInt(
    asset_changes.find(
      (change: AssetChange) =>
        change.token_info.contract_address.toLowerCase() === OT.toLowerCase(),
    )?.raw_amount || "0",
  );

  const depositTokenFinal = BigInt(
    asset_changes.find(
      (change: AssetChange) =>
        change.token_info.contract_address.toLowerCase() ===
        DEPOSIT_TOKEN.toLowerCase(),
    )?.raw_amount || "0",
  );

  console.log("✅ OT balance after redeem:", otFinal.toString());
  console.log("✅ Deposit token received:", depositTokenFinal.toString());

  // Verify OT tokens were burned
  expect(otFinal < parseEther("1000")).toBe(true);
  // Verify deposit tokens were received
  expect(depositTokenFinal > 0n).toBe(true);
}, 20000000);
