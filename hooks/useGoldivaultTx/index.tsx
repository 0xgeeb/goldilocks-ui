import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { parseEther, formatEther, parseUnits, formatUnits } from "viem";
import { config } from "../../providers/WagmiProvider";
import { useVaultInfoConfig } from "../"
import { contracts } from "../../utils/addressi";

export const useGoldivaultTx = () => {

  const {
    vaultDTaddy,
    vaultaddy
  } = useVaultInfoConfig({ vaultToken: "" })

  const checkAllowance = async (
    amt: number,
    vault: string,
    wallet: string,
  ): Promise<boolean> => {
    let allowanceResult;
    let allowanceNum;

    if (vault === "weeth") {
      allowanceResult = await readContract(config, {
        address: contracts.weeth.address as `0x${string}`,
        abi: contracts.weeth.abi,
        functionName: "allowance",
        args: [wallet, contracts.weethVault.address],
      });
      allowanceNum = parseFloat(
        formatEther(allowanceResult as unknown as bigint),
      );
    } else if (vault === "weETH-OT") {
      allowanceResult = await readContract(config, {
        address: contracts.weot.address as `0x${string}`,
        abi: contracts.weot.abi,
        functionName: "allowance",
        args: [wallet, contracts.weethVault.address],
      });
      allowanceNum = parseFloat(
        formatEther(allowanceResult as unknown as bigint),
      );
    } else if (vault === "unibtc") {
      allowanceResult = await readContract(config, {
        address: contracts.unibtc.address as `0x${string}`,
        abi: contracts.unibtc.abi,
        functionName: "allowance",
        args: [wallet, contracts.unibtcVault.address],
      });
      allowanceNum =
        parseFloat((allowanceResult as unknown as bigint).toString()) / 1e8;
    } else if (vault === "solvbtc") {
      allowanceResult = await readContract(config, {
        address: contracts.solvbtc.address as `0x${string}`,
        abi: contracts.solvbtc.abi,
        functionName: "allowance",
        args: [wallet, contracts.solvbtcVault.address],
      });
      allowanceNum = parseFloat(
        formatEther(allowanceResult as unknown as bigint),
      );
    } else if (vault === "uniBTC-OT") {
      allowanceResult = await readContract(config, {
        address: contracts.unibtcot.address as `0x${string}`,
        abi: contracts.unibtcot.abi,
        functionName: "allowance",
        args: [wallet, contracts.unibtcVault.address],
      });
      allowanceNum =
        parseFloat((allowanceResult as unknown as bigint).toString()) / 1e8;
    } else if (vault === "solvBTC.BBN-OT") {
      allowanceResult = await readContract(config, {
        address: contracts.solvbtcot.address as `0x${string}`,
        abi: contracts.solvbtcot.abi,
        functionName: "allowance",
        args: [wallet, contracts.solvbtcVault.address],
      });
      allowanceNum = parseFloat(
        formatEther(allowanceResult as unknown as bigint),
      );
    }
    else if(vault === 'rusd') {
      allowanceResult = await readContract(config, {
        address: contracts.rusd.address as `0x${string}`,
        abi: contracts.rusd.abi,
        functionName: 'allowance',
        args: [wallet, contracts.rusdVault.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === "rusdaqua") {
      allowanceResult = await readContract(config, {
        address: contracts.rusd.address as `0x${string}`,
        abi: contracts.rusd.abi,
        functionName: 'allowance',
        args: [wallet, contracts.depositGuard.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === "rusdaqualp") {
      allowanceResult = await readContract(config, {
        address: contracts.rusdaquabera.address as `0x${string}`,
        abi: contracts.rusdaquabera.abi,
        functionName: 'allowance',
        args: [wallet, contracts.depositGuard.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === 'rUSD-OT') {
      allowanceResult = await readContract(config, {
        address: contracts.rusdot.address as `0x${string}`,
        abi: contracts.rusdot.abi,
        functionName: 'allowance',
        args: [wallet, contracts.rusdVault.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === "oribgt") {
      allowanceResult = await readContract(config, {
        address: contracts.ibgt.address as `0x${string}`,
        abi: contracts.ibgt.abi,
        functionName: 'allowance',
        args: [wallet, contracts.oribgtVault.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === "oriBGT-OT") {
      allowanceResult = await readContract(config, {
        address: contracts.oribgtot.address as `0x${string}`,
        abi: contracts.oribgtot.abi,
        functionName: 'allowance',
        args: [wallet, contracts.oribgtVault.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === "oriBGT-YT") {
      allowanceResult = await readContract(config, {
        address: contracts.oribgtyt.address as `0x${string}`,
        abi: contracts.oribgtyt.abi,
        functionName: 'allowance',
        args: [wallet, contracts.oribgtVault.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === 'ebtc') {
      allowanceResult = await readContract(config, {
        address: contracts.ebtc.address as `0x${string}`,
        abi: contracts.ebtc.abi,
        functionName: 'allowance',
        args: [wallet, contracts.ebtcVault.address]
      })
      allowanceNum = parseFloat((allowanceResult as unknown as bigint).toString()) / 1e8;
    }
    else if(vault === 'eBTC-OT') {
      allowanceResult = await readContract(config, {
        address: contracts.ebtcot.address as `0x${string}`,
        abi: contracts.ebtcot.abi,
        functionName: 'allowance',
        args: [wallet, contracts.ebtcVault.address]
      })
      allowanceNum = parseFloat((allowanceResult as unknown as bigint).toString()) / 1e8;
    }
    else if(vault === 'steeroribgt') {
      allowanceResult = await readContract(config, {
        address: contracts.oribgt.address as `0x${string}`,
        abi: contracts.oribgt.abi,
        functionName: 'allowance',
        args: [wallet, contracts.steerPeriphery.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === 'steeroribgtot') {
      allowanceResult = await readContract(config, {
        address: contracts.oribgtot.address as `0x${string}`,
        abi: contracts.oribgtot.abi,
        functionName: 'allowance',
        args: [wallet, contracts.steerPeriphery.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === "wberaibgtlp") {
      allowanceResult = await readContract(config, {
        address: contracts.wberaibgtisland.address as `0x${string}`,
        abi: contracts.wberaibgtisland.abi,
        functionName: 'allowance',
        args: [wallet, contracts.wberaibgtlpVault.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === "WBERA-iBGT LP-YT") {
      allowanceResult = await readContract(config, {
        address: contracts.wberaibgtlpyt.address as `0x${string}`,
        abi: contracts.wberaibgtlpyt.abi,
        functionName: 'allowance',
        args: [wallet, contracts.wberaibgtlpVault.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === "WBERA-iBGT LP-OT") {
      allowanceResult = await readContract(config, {
        address: contracts.wberaibgtlpot.address as `0x${string}`,
        abi: contracts.wberaibgtlpot.abi,
        functionName: 'allowance',
        args: [wallet, contracts.wberaibgtlpVault.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === "stlbgt") {
      allowanceResult = await readContract(config, {
        address: contracts.lbgt.address as `0x${string}`,
        abi: contracts.lbgt.abi,
        functionName: 'allowance',
        args: [wallet, contracts.stlbgtVault.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === "stLBGT-OT") {
      allowanceResult = await readContract(config, {
        address: contracts.stlbgtot.address as `0x${string}`,
        abi: contracts.lbgt.abi,
        functionName: 'allowance',
        args: [wallet, contracts.stlbgtVault.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === "stLBGT-YT") {
      allowanceResult = await readContract(config, {
        address: contracts.stlbgtyt.address as `0x${string}`,
        abi: contracts.lbgt.abi,
        functionName: 'allowance',
        args: [wallet, contracts.stlbgtVault.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === 'kodiakstlbgt') {
      allowanceResult = await readContract(config, {
        address: contracts.stlbgt.address as `0x${string}`,
        abi: contracts.stlbgt.abi,
        functionName: 'allowance',
        args: [wallet, contracts.baultRouter.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === 'kodiakstlbgtot') {
      allowanceResult = await readContract(config, {
        address: contracts.stlbgtot.address as `0x${string}`,
        abi: contracts.stlbgtot.abi,
        functionName: 'allowance',
        args: [wallet, contracts.baultRouter.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === 'kodiakstlbgtlp') {
      allowanceResult = await readContract(config, {
        address: contracts.stlbgtKodiakIsland.address as `0x${string}`,
        abi: contracts.stlbgtKodiakIsland.abi,
        functionName: 'allowance',
        args: [wallet, contracts.baultRouter.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === "ybgt") {
      allowanceResult = await readContract(config, {
        address: contracts.stybgt.address as `0x${string}`,
        abi: contracts.stybgt.abi,
        functionName: 'allowance',
        args: [wallet, contracts.ybgtVault.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === "yBGT-OT") {
      allowanceResult = await readContract(config, {
        address: contracts.ybgtot.address as `0x${string}`,
        abi: contracts.ybgtot.abi,
        functionName: 'allowance',
        args: [wallet, contracts.ybgtVault.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === "yBGT-YT") {
      allowanceResult = await readContract(config, {
        address: contracts.ybgtyt.address as `0x${string}`,
        abi: contracts.ybgtyt.abi,
        functionName: 'allowance',
        args: [wallet, contracts.ybgtVault.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === 'kodiakybgtlp') {
      allowanceResult = await readContract(config, {
        address: contracts.ybgtKodiakIsland.address as `0x${string}`,
        abi: contracts.ybgtKodiakIsland.abi,
        functionName: 'allowance',
        args: [wallet, contracts.baultRouter.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === 'kodiakybgt') {
      allowanceResult = await readContract(config, {
        address: contracts.ysysybgt.address as `0x${string}`,
        abi: contracts.ysysybgt.abi,
        functionName: 'allowance',
        args: [wallet, contracts.baultRouter.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === 'kodiakybgtot') {
      allowanceResult = await readContract(config, {
        address: contracts.ybgtot.address as `0x${string}`,
        abi: contracts.ybgtot.abi,
        functionName: 'allowance',
        args: [wallet, contracts.baultRouter.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else {
      allowanceNum = 0
    }

    if (amt > allowanceNum) {
      return false;
    } else {
      return true;
    }
  };

  const checkRouterAllowance = async (
    amt: number,
    token: string,
    wallet: string,
  ): Promise<boolean> => {
    const allowanceResult = await readContract(config, {
      address: token as `0x${string}`,
      abi: contracts.ibgt.abi,
      functionName: "allowance",
      args: [wallet, contracts.router.address],
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

  const checkRouterV2Allowance = async (
    amt: number,
    token: string,
    wallet: string,
    vaultType: string,
  ): Promise<boolean> => {
    const allowanceResult = await readContract(config, {
      address: token as `0x${string}`,
      abi: contracts.ibgt.abi,
      functionName: "allowance",
      args: [wallet, contracts.routerv2.address],
    });
    const allowanceNum =
      vaultType === "eth"
        ? parseFloat(formatEther(allowanceResult as unknown as bigint))
        : parseFloat(formatUnits(allowanceResult as unknown as bigint, 8));

    if (amt > allowanceNum) {
      return false;
    } else {
      return true;
    }
  };

  const sendApproveTx = async (
    amt: number,
    vault: string,
    infinite: boolean,
  ) => {
    if (vault === "weeth") {
      try {
        const hash = await writeContract(config, {
          address: contracts.weeth.address as `0x${string}`,
          abi: contracts.weeth.abi,
          functionName: "approve",
          args: [
            contracts.weethVault.address,
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
    } else if (vault === "weETH-OT") {
      try {
        const hash = await writeContract(config, {
          address: contracts.weot.address as `0x${string}`,
          abi: contracts.weot.abi,
          functionName: "approve",
          args: [
            contracts.weethVault.address,
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
    } else if (vault === "unibtc") {
      try {
        const hash = await writeContract(config, {
          address: contracts.unibtc.address as `0x${string}`,
          abi: contracts.unibtc.abi,
          functionName: "approve",
          args: [
            contracts.unibtcVault.address,
            infinite
              ? parseUnits(
                  "115792089237316195423570985008687907853269984665640564039457",
                  8,
                )
              : parseUnits(`${amt + 0.01}`, 8),
          ],
        });
        await waitForTransactionReceipt(config, { hash });
      } catch (e) {
        console.log("user denied tx");
        console.log("or: ", e);
      }
    } else if (vault === "solvbtc") {
      try {
        const hash = await writeContract(config, {
          address: contracts.solvbtc.address as `0x${string}`,
          abi: contracts.solvbtc.abi,
          functionName: "approve",
          args: [
            contracts.solvbtcVault.address,
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
    } else if (vault === "uniBTC-OT") {
      try {
        const hash = await writeContract(config, {
          address: contracts.unibtcot.address as `0x${string}`,
          abi: contracts.unibtcot.abi,
          functionName: "approve",
          args: [
            contracts.unibtcVault.address,
            infinite
              ? parseUnits(
                  "115792089237316195423570985008687907853269984665640564039457",
                  8,
                )
              : parseUnits(`${amt + 0.01}`, 8),
          ],
        });
        await waitForTransactionReceipt(config, { hash });
      } catch (e) {
        console.log("user denied tx");
        console.log("or: ", e);
      }
    } else if (vault === "solvBTC.BBN-OT") {
      try {
        const hash = await writeContract(config, {
          address: contracts.solvbtcot.address as `0x${string}`,
          abi: contracts.solvbtcot.abi,
          functionName: "approve",
          args: [
            contracts.solvbtcVault.address,
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
    else if(vault === 'rusd') {
      try {
        const hash = await writeContract(config, {
          address: contracts.rusd.address as `0x${string}`,
          abi: contracts.rusd.abi,
          functionName: 'approve',
          args: [contracts.rusdVault.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === 'rusdaqua') {
      try {
        const hash = await writeContract(config, {
          address: contracts.rusd.address as `0x${string}`,
          abi: contracts.rusd.abi,
          functionName: 'approve',
          args: [contracts.depositGuard.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === 'rusdaqualp') {
      try {
        const hash = await writeContract(config, {
          address: contracts.rusdaquabera.address as `0x${string}`,
          abi: contracts.rusdaquabera.abi,
          functionName: 'approve',
          args: [contracts.depositGuard.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === 'rUSD-OT') {
      try {
        const hash = await writeContract(config, {
          address: contracts.rusdot.address as `0x${string}`,
          abi: contracts.rusdot.abi,
          functionName: 'approve',
          args: [contracts.rusdVault.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if (vault === "ebtc") {
      try {
        const hash = await writeContract(config, {
          address: contracts.ebtc.address as `0x${string}`,
          abi: contracts.ebtc.abi,
          functionName: "approve",
          args: [
            contracts.ebtcVault.address,
            infinite
              ? parseUnits(
                  "115792089237316195423570985008687907853269984665640564039457", 8
                )
              : parseUnits(`${amt + 0.01}`, 8),
          ],
        });
        await waitForTransactionReceipt(config, { hash });
      } catch (e) {
        console.log("user denied tx");
        console.log("or: ", e);
      }
    } else if (vault === "eBTC-OT") {
      try {
        const hash = await writeContract(config, {
          address: contracts.ebtcot.address as `0x${string}`,
          abi: contracts.ebtcot.abi,
          functionName: "approve",
          args: [
            contracts.ebtcVault.address,
            infinite
              ? parseUnits(
                  "115792089237316195423570985008687907853269984665640564039457",
                  8,
                )
              : parseUnits(`${amt + 0.01}`, 8),
          ],
        });
        await waitForTransactionReceipt(config, { hash });
      } catch (e) {
        console.log("user denied tx");
        console.log("or: ", e);
      }
    }
    else if (vault === "oribgt") {
      try {
        const hash = await writeContract(config, {
          address: contracts.ibgt.address as `0x${string}`,
          abi: contracts.ibgt.abi,
          functionName: 'approve',
          args: [contracts.oribgtVault.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if (vault === "oriBGT-OT") {
      try {
        const hash = await writeContract(config, {
          address: contracts.oribgtot.address as `0x${string}`,
          abi: contracts.oribgtot.abi,
          functionName: 'approve',
          args: [contracts.oribgtVault.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if (vault === "oriBGT-YT") {
      try {
        const hash = await writeContract(config, {
          address: contracts.oribgtyt.address as `0x${string}`,
          abi: contracts.oribgtyt.abi,
          functionName: 'approve',
          args: [contracts.oribgtVault.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if (vault === "iBGT") {
      try {
        const hash = await writeContract(config, {
          address: contracts.ibgt.address as `0x${string}`,
          abi: contracts.ibgt.abi,
          functionName: 'approve',
          args: [contracts.oribgt.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if (vault === "steeroribgt") {
      try {
        const hash = await writeContract(config, {
          address: contracts.oribgt.address as `0x${string}`,
          abi: contracts.oribgt.abi,
          functionName: 'approve',
          args: [contracts.steerPeriphery.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if (vault === "steeroribgtot") {
      try {
        const hash = await writeContract(config, {
          address: contracts.oribgtot.address as `0x${string}`,
          abi: contracts.oribgtot.abi,
          functionName: 'approve',
          args: [contracts.steerPeriphery.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === 'wberaibgtlp') {
      try {
        const hash = await writeContract(config, {
          address: contracts.wberaibgtisland.address as `0x${string}`,
          abi: contracts.wberaibgtisland.abi,
          functionName: 'approve',
          args: [contracts.wberaibgtlpVault.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === "WBERA-iBGT LP-YT") {
      try {
        const hash = await writeContract(config, {
          address: contracts.wberaibgtlpyt.address as `0x${string}`,
          abi: contracts.wberaibgtlpyt.abi,
          functionName: 'approve',
          args: [contracts.wberaibgtlpVault.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === "WBERA-iBGT LP-OT") {
      try {
        const hash = await writeContract(config, {
          address: contracts.wberaibgtlpot.address as `0x${string}`,
          abi: contracts.wberaibgtlpot.abi,
          functionName: 'approve',
          args: [contracts.wberaibgtlpVault.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === "stlbgt") {
      try {
        const hash = await writeContract(config, {
          address: contracts.lbgt.address as `0x${string}`,
          abi: contracts.lbgt.abi,
          functionName: 'approve',
          args: [contracts.stlbgtVault.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === "kodiakstlbgt") {
      try {
        const hash = await writeContract(config, {
          address: contracts.stlbgt.address as `0x${string}`,
          abi: contracts.stlbgt.abi,
          functionName: 'approve',
          args: [contracts.baultRouter.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === "kodiakstlbgtot") {
      try {
        const hash = await writeContract(config, {
          address: contracts.stlbgtot.address as `0x${string}`,
          abi: contracts.stlbgtot.abi,
          functionName: 'approve',
          args: [contracts.baultRouter.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === "kodiakstlbgtlp") {
      try {
        const hash = await writeContract(config, {
          address: contracts.stlbgtKodiakIsland.address as `0x${string}`,
          abi: contracts.stlbgtKodiakIsland.abi,
          functionName: 'approve',
          args: [contracts.baultRouter.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === "stLBGT-OT") {
      try {
        const hash = await writeContract(config, {
          address: contracts.stlbgtot.address as `0x${string}`,
          abi: contracts.stlbgtot.abi,
          functionName: 'approve',
          args: [contracts.stlbgtVault.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === "stLBGT-YT") {
      try {
        const hash = await writeContract(config, {
          address: contracts.stlbgtyt.address as `0x${string}`,
          abi: contracts.stlbgtyt.abi,
          functionName: 'approve',
          args: [contracts.stlbgtVault.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === "LBGT") {
      try {
        const hash = await writeContract(config, {
          address: contracts.lbgt.address as `0x${string}`,
          abi: contracts.lbgt.abi,
          functionName: 'approve',
          args: [contracts.stlbgt.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if (vault === "ybgt") {
      try {
        const hash = await writeContract(config, {
          address: contracts.stybgt.address as `0x${string}`,
          abi: contracts.stybgt.abi,
          functionName: 'approve',
          args: [contracts.ybgtVault.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if (vault === "yBGT-OT") {
      try {
        const hash = await writeContract(config, {
          address: contracts.ybgtot.address as `0x${string}`,
          abi: contracts.ybgtot.abi,
          functionName: 'approve',
          args: [contracts.ybgtVault.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if (vault === "yBGT-YT") {
      try {
        const hash = await writeContract(config, {
          address: contracts.ybgtyt.address as `0x${string}`,
          abi: contracts.ybgtyt.abi,
          functionName: 'approve',
          args: [contracts.ybgtVault.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === "yBGT") {
      try {
        const hash = await writeContract(config, {
          address: contracts.ybgt.address as `0x${string}`,
          abi: contracts.ybgt.abi,
          functionName: 'approve',
          args: [contracts.stybgt.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === "kodiakybgtlp") {
      try {
        const hash = await writeContract(config, {
          address: contracts.ybgtKodiakIsland.address as `0x${string}`,
          abi: contracts.ybgtKodiakIsland.abi,
          functionName: 'approve',
          args: [contracts.baultRouter.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if (vault === "iBGT") {
      try {
        const hash = await writeContract(config, {
          address: contracts.stybgt.address as `0x${string}`,
          abi: contracts.stybgt.abi,
          functionName: 'approve',
          args: [contracts.ysysybgt.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
  };

  const sendRouterApproveTx = async (
    amt: number,
    token: string,
    infinite: boolean,
  ) => {
    try {
      const hash = await writeContract(config, {
        address: token as `0x${string}`,
        abi: contracts.ibgt.abi,
        functionName: "approve",
        args: [
          contracts.router.address,
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

  const sendRouterV2ApproveTx = async (
    amt: number,
    token: string,
    infinite: boolean,
    vaultType: string,
  ) => {
    try {
      const hash = await writeContract(config, {
        address: token as `0x${string}`,
        abi: contracts.ibgt.abi,
        functionName: "approve",
        args: [
          contracts.routerv2.address,
          infinite
            ? vaultType === "eth"
              ? parseEther(
                  "115792089237316195423570985008687907853269984665640564039457",
                )
              : parseUnits(
                  "115792089237316195423570985008687907853269984665640564039457",
                  8,
                )
            : vaultType === "eth"
              ? parseEther(`${amt + 0.01}`)
              : parseUnits(`${amt + 0.01}`, 8),
        ],
      });
      await waitForTransactionReceipt(config, { hash });
    } catch (e) {
      console.log("user denied tx");
      console.log("or: ", e);
    }
  };

  const sendDepositTx = async (
    depositAmt: number,
    vault: string,
  ): Promise<string> => {
    const correctVault = vaultaddy(vault)
    if (vault === "unibtc") {
      try {
        const hash = await writeContract(config, {
          address: contracts.unibtcVault.address as `0x${string}`,
          abi: contracts.unibtcVault.abi,
          functionName: "deposit",
          args: [parseUnits(`${depositAmt}`, 8)],
        });
        const data = await waitForTransactionReceipt(config, { hash });
        return data.transactionHash;
      } catch (e) {
        console.log("user denied tx");
        console.log("or: ", e);
      }
    }
    else {
      try {
        const hash = await writeContract(config, {
          address: correctVault as `0x${string}`,
          abi: contracts.unibtcVault.abi,
          functionName: "deposit",
          args: [parseEther(`${depositAmt}`)],
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

  const sendRedeemOTTx = async (
    redeemOTAmt: number,
    vault: string,
  ): Promise<string> => {
    const correctVault = vaultaddy(vault)
    if (vault === "unibtc") {
      try {
        const hash = await writeContract(config, {
          address: contracts.unibtcVault.address as `0x${string}`,
          abi: contracts.unibtcVault.abi,
          functionName: "redeemOwnership",
          args: [parseUnits(`${redeemOTAmt}`, 8)],
        });
        const data = await waitForTransactionReceipt(config, { hash });
        return data.transactionHash;
      } catch (e) {
        console.log("user denied tx");
        console.log("or: ", e);
      }
    }
    else {
      try {
        const hash = await writeContract(config, {
          address: correctVault as `0x${string}`,
          abi: contracts.unibtcVault.abi,
          functionName: "redeemOwnership",
          args: [parseEther(`${redeemOTAmt}`)],
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

  const sendRedeemYTTx = async (
    redeemYTAmt: number,
    vault: string,
  ): Promise<string> => {
    // if (vault === "honeywbera") {
    //   try {
    //     const hash = await writeContract(config, {
    //       address: contracts.honeywberagoldivault.address as `0x${string}`,
    //       abi: contracts.honeywberagoldivault.abi,
    //       functionName: "redeemYield",
    //       args: [parseEther(`${redeemYTAmt}`)],
    //     });
    //     const data = await waitForTransactionReceipt(config, { hash });
    //     return data.transactionHash;
    //   } catch (e) {
    //     console.log("user denied tx");
    //     console.log("or: ", e);
    //   }
    // } else {
    //   try {
    //     const hash = await writeContract(config, {
    //       address: contracts.bhoneygoldivault.address as `0x${string}`,
    //       abi: contracts.bhoneygoldivault.abi,
    //       functionName: "redeemYield",
    //       args: [parseEther(`${redeemYTAmt}`)],
    //     });
    //     const data = await waitForTransactionReceipt(config, { hash });
    //     return data.transactionHash;
    //   } catch (e) {
    //     console.log("user denied tx");
    //     console.log("or: ", e);
    //   }
    // }

    return "";
  };

  const sendTradeTx = async (
    tradeInput: number,
    tradeOutput: number,
    pathOne: string,
    pathTwo: string,
    wallet: string,
  ): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.router.address as `0x${string}`,
        abi: contracts.router.abi,
        functionName: "swapExactTokensForTokens",
        args: [
          parseEther(`${tradeInput}`),
          parseEther(`${tradeOutput * 0.99}`),
          [pathOne, pathTwo],
          wallet,
          1737962268,
        ],
      });

      const receipt = await waitForTransactionReceipt(config, { hash });
      return receipt.transactionHash;
    } catch (e) {
      console.log("user denied tx");
      console.log("or: ", e);
    }

    return "";
  };

  const sendV3TradeTx = async (
    tradeInput: number,
    tradeOutput: number,
    pathOne: string,
    pathTwo: string,
    wallet: string,
    vaultType: string,
  ): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.routerv2.address as `0x${string}`,
        abi: contracts.routerv2.abi,
        functionName: "exactInputSingle",
        args: [
          [
            pathOne,
            pathTwo,
            500,
            wallet,
            vaultType === "eth"
              ? parseEther(`${tradeInput}`)
              : parseUnits(`${tradeInput}`, 8),
            vaultType === "eth"
              ? parseEther(`${tradeOutput * 0.99}`)
              : parseUnits(`${tradeOutput * 0.99}`, 8),
            0,
          ],
        ],
      });

      const receipt = await waitForTransactionReceipt(config, { hash });
      return receipt.transactionHash;
    } catch (e) {
      console.log("user denied tx");
      console.log("or: ", e);
    }

    return "";
  };

  const sendBuyYTTx = async (
    ytAmount: number,
    dtAmountMax: number,
    amountOutMin: number,
    address: string,
    vaultType: string,
    vault: string,
  ): Promise<[string, number]> => {
    // console.log(ytAmount, dtAmountMax, amountOutMin, address, vaultType);
    const correctVault = vaultaddy(vault)
    try {
      const hash = await writeContract(config, {
        address: correctVault as `0x${string}`,
        abi: contracts.weethVault.abi,
        functionName: "buyYT",
        args: [
          vaultType === "eth"
            ? parseEther(`${ytAmount}`)
            : parseUnits(`${ytAmount}`, 8),
          vaultType === "eth"
            ? parseEther(`${dtAmountMax}`)
            : parseUnits(`${dtAmountMax}`, 8),
          vaultType === "eth"
            ? parseEther(`${amountOutMin}`)
            : parseUnits(`${amountOutMin}`, 8),
        ],
      });
      const receipt = await waitForTransactionReceipt(config, { hash });
      const afterBalance = await readContract(config, {
        address: vaultDTaddy as `0x${string}`,
        abi: contracts.weeth.abi,
        functionName: "balanceOf",
        args: [address],
      });

      return [
        receipt.transactionHash,
        vaultType === "eth"
          ? parseFloat(formatEther(afterBalance as unknown as bigint))
          : parseFloat(formatUnits(afterBalance as unknown as bigint, 8)),
      ];
    } catch (e) {
      console.log("user denied tx");
      console.log("or: ", e);
    }

    return ["", 0];
  };

  const sendSellYTTx = async (
    ytAmount: number,
    dtAmountMin: number,
    amountInMax: number,
    address: string,
    vaultType: string,
    vault: string,
  ): Promise<[string, number]> => {
    // console.log(ytAmount, dtAmountMin, amountInMax, address, vaultType);
    const correctVault = vaultaddy(vault)
    try {
      const hash = await writeContract(config, {
        address: correctVault as `0x${string}`,
        abi: contracts.weethVault.abi,
        functionName: "sellYT",
        args: [
          vaultType === "eth"
            ? parseEther(`${ytAmount}`)
            : parseUnits(`${ytAmount}`, 8),
          vaultType === "eth"
            ? parseEther(`${dtAmountMin}`)
            : parseUnits(`${dtAmountMin}`, 8),
          vaultType === "eth"
            ? parseEther(`${amountInMax}`)
            : parseUnits(`${amountInMax}`, 8),
        ],
      });
      const receipt = await waitForTransactionReceipt(config, { hash });
      const afterBalance = await readContract(config, {
        address: vaultDTaddy as `0x${string}`,
        abi: contracts.weeth.abi,
        functionName: "balanceOf",
        args: [address],
      });

      return [
        receipt.transactionHash,
        vaultType === "eth"
          ? parseFloat(formatEther(afterBalance as unknown as bigint))
          : parseFloat(formatUnits(afterBalance as unknown as bigint, 8)),
      ];
    } catch (e) {
      console.log("user denied tx");
      console.log("or: ", e);
    }

    return ["", 0];
  };

  const sendAddLiqTx = async (depositAmt: number, lpThreshold: number, wallet: string): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.depositGuard.address as `0x${string}`,
        abi: contracts.depositGuard.abi,
        functionName: "forwardDepositToICHIVault",
        args: [
          "0x20a49a266AE70d07Ba066Ef1F8b6e670216Ab2a6",
          "0x9Fbba6c87923af2561A2391198166b51Cf5736E8",
          contracts.rusd.address,
          parseEther(`${depositAmt}`),
          parseEther(`${lpThreshold}`),
          wallet
        ]
      })

      const receipt = await waitForTransactionReceipt(config, { hash })
      return receipt.transactionHash;
    }
    catch (e) {
      console.log("user denied tx")
      console.log("or: ", e)
    }

    return ''
  }

  const sendRemoveLiqTx = async (withdrawAmt: number, wallet: string, minAmt0: number, minAmt1: number): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.depositGuard.address as `0x${string}`,
        abi: contracts.depositGuard.abi,
        functionName: "forwardWithdrawFromICHIVault",
        args: [
          "0x20a49a266AE70d07Ba066Ef1F8b6e670216Ab2a6",
          "0x9Fbba6c87923af2561A2391198166b51Cf5736E8",
          parseEther(`${withdrawAmt}`),
          wallet,
          parseEther(`${minAmt0}`),
          parseEther(`${minAmt1}`)
        ],
      })

      const receipt = await waitForTransactionReceipt(config, { hash })
      return receipt.transactionHash;
    }
    catch (e) {
      console.log("user denied tx")
      console.log("or: ", e)
    }

    return ''
  }

  const sendStakeYTTx = async (stakeAmt: number, vault: string): Promise<string> => {
    const correctVault = vaultaddy(vault)
    try {
      const hash = await writeContract(config, {
        address: correctVault as `0x${string}`,
        abi: contracts.oribgtVault.abi,
        functionName: "stakeYT",
        args: [parseEther(`${stakeAmt}`)]
      })

      const receipt = await waitForTransactionReceipt(config, { hash })
      return receipt.transactionHash;
    }
    catch (e) {
      console.log("user denied tx")
      console.log("or: ", e)
    }

    return ''
  }

  const sendUnstakeYTTx = async (unstakeAmt: number, vault: string): Promise<string> => {
    const correctVault = vaultaddy(vault)
    try {
      const hash = await writeContract(config, {
        address: correctVault as `0x${string}`,
        abi: contracts.oribgtVault.abi,
        functionName: "unstakeYT",
        args: [parseEther(`${unstakeAmt}`)]
      })

      const receipt = await waitForTransactionReceipt(config, { hash })
      return receipt.transactionHash;
    }
    catch (e) {
      console.log("user denied tx")
      console.log("or: ", e)
    }

    return ''
  }

  const sendClaimTx = async (vault: string): Promise<string> => {
    const correctVault = vaultaddy(vault)
    try {
      const hash = await writeContract(config, {
        address: correctVault as `0x${string}`,
        abi: contracts.oribgtVault.abi,
        functionName: "claim",
        args: []
      })

      const receipt = await waitForTransactionReceipt(config, { hash })
      return receipt.transactionHash;
    }
    catch (e) {
      console.log("user denied tx")
      console.log("or: ", e)
    }

    return ''
  }

  const send4626DepositTx = async (depositAmt: number, wallet: string, vault: string): Promise<string> => {
    const vaultaddy =
      vault === "oribgt"
        ? contracts.oribgt.address
        : vault === "stlbgt"
          ? contracts.stlbgt.address
          : vault === "ybgt"
            ? contracts.stybgt.address
            : ""
    try {
      const hash = await writeContract(config, {
        address: vaultaddy as `0x${string}`,
        abi: contracts.oribgt.abi,
        functionName: "deposit",
        args: [parseEther(`${depositAmt}`), wallet]
      })

      const receipt = await waitForTransactionReceipt(config, { hash })
      return receipt.transactionHash;
    }
    catch (e) {
      console.log("user denied tx")
      console.log("or: ", e)
    }

    return ''
  }

  const send4626RedeemTx = async (redeemAmt: number, wallet: string, vault: string): Promise<string> => {
    const vaultaddy =
      vault === "oribgt"
        ? contracts.oribgt.address
        : vault === "stlbgt"
          ? contracts.stlbgt.address
          : vault === "ybgt"
            ? contracts.stybgt.address
            : ""
    try {
      const hash = await writeContract(config, {
        address: vaultaddy as `0x${string}`,
        abi: contracts.oribgt.abi,
        functionName: "redeem",
        args: [parseEther(`${redeemAmt}`), wallet, wallet]
      })

      const receipt = await waitForTransactionReceipt(config, { hash })
      return receipt.transactionHash;
    }
    catch (e) {
      console.log("user denied tx")
      console.log("or: ", e)
    }

    return ''
  }

  const sendAddSteerLiqTx = async (amount0: number, amount1: number, wallet: string): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.steerPeriphery.address as `0x${string}`,
        abi: contracts.steerPeriphery.abi,
        functionName: "deposit",
        args: [
          contracts.steerOribgtPool.address as `0x${string}`,
          parseEther(`${amount0}`),
          parseEther(`${amount1}`),
          parseEther(`${0}`),
          parseEther(`${0}`),
          wallet as `0x${string}`
        ]
      })

      const receipt = await waitForTransactionReceipt(config, { hash })
      return receipt.transactionHash;
    }
    catch (e) {
      console.log("user denied tx")
      console.log("or: ", e)
    }

    return ''
  }

  const sendRemoveSteerLiqTx = async (withdrawAmt: number, wallet: string): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.steerOribgtPool.address as `0x${string}`,
        abi: [{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}],
        functionName: "withdraw",
        args: [
          parseEther(`${withdrawAmt}`),
          parseEther(`${0}`),
          parseEther(`${0}`),
          wallet as `0x${string}`
        ]
      })

      const receipt = await waitForTransactionReceipt(config, { hash })
      return receipt.transactionHash;
    }
    catch (e) {
      console.log("user denied tx")
      console.log("or: ", e)
    }

    return ''
  }

  const sendAddKodiakLiqTx = async (amount0: number, amount1: number, amountSharesMin: number, wallet: string, islandAddy: string): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.baultRouter.address as `0x${string}`,
        abi: contracts.baultRouter.abi,
        functionName: "addLiquidity",
        args: [
          islandAddy as `0x${string}`,
          parseEther(`${amount0}`),
          parseEther(`${amount1}`),
          parseEther(`${amount0 * 0.99}`),
          parseEther(`${amount1 * 0.99}`),
          parseEther(`${amountSharesMin * 0.99}`),
          wallet as `0x${string}`
        ]
      })

      const receipt = await waitForTransactionReceipt(config, { hash })
      return receipt.transactionHash;
    }
    catch (e) {
      console.log("user denied tx")
      console.log("or: ", e)
    }
    
    return ''
  }

  const sendRemoveKodiakLiqTx = async (withdrawAmt: number, amount0: number, amount1: number, wallet: string, islandAddy: string): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.baultRouter.address as `0x${string}`,
        abi: contracts.baultRouter.abi,
        functionName: "removeLiquidity",
        args: [
          islandAddy as `0x${string}`,
          parseEther(`${withdrawAmt}`),
          parseEther(`${amount0 * 0.99}`),
          parseEther(`${amount1 * 0.99}`),
          wallet as `0x${string}`
        ]
      })

      const receipt = await waitForTransactionReceipt(config, { hash })
      return receipt.transactionHash;
    }
    catch (e) {
      console.log("user denied tx")
      console.log("or: ", e)
    }
    
    return ''
  }

  return {
    checkAllowance,
    checkRouterAllowance,
    checkRouterV2Allowance,
    sendApproveTx,
    sendRouterApproveTx,
    sendDepositTx,
    sendRedeemOTTx,
    sendRedeemYTTx,
    sendTradeTx,
    sendBuyYTTx,
    sendSellYTTx,
    sendV3TradeTx,
    sendRouterV2ApproveTx,
    sendAddLiqTx,
    sendRemoveLiqTx,
    sendStakeYTTx,
    sendUnstakeYTTx,
    sendClaimTx,
    send4626DepositTx,
    send4626RedeemTx,
    sendAddSteerLiqTx,
    sendRemoveSteerLiqTx,
    sendAddKodiakLiqTx,
    sendRemoveKodiakLiqTx
  };
};
