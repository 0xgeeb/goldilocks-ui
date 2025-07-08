import goldiswapABI from "@/utils/abi/Goldiswap.json";
import goldilockedABI from "@/utils/abi/Goldilocked.json";
import honeyABI from "@/utils/abi/Honey.json";
import goldilendABI from "@/utils/abi/Goldilend.json";
import ibgtABI from "@/utils/abi/IBGT.json";
import bandbearABI from "@/utils/abi/BandBear.json";
import bondbearABI from "@/utils/abi/BondBear.json";
import beradromeABI from "@/utils/abi/Beradrome.json";
import honeycombABI from "@/utils/abi/HoneyComb.json";
import crocqueryABI from "@/utils/abi/CrocQuery.json";
import biggayberaqueryABI from "@/utils/abi/BigGayBeraQuery.json";
import vaultABI from "@/utils/abi/Vault.json";
import quoterABI from "@/utils/abi/Quoter.json";
import routerABI from "@/utils/abi/Router.json";
import weethvaultABI from "@/utils/abi/WeethGoldivault.json";
import quoterv2ABI from "@/utils/abi/QuoterV2.json";
import routerv2ABI from "@/utils/abi/RouterV2.json";
import goldigovABI from "@/utils/abi/Goldigovernor.json";
import govlocksABI from "@/utils/abi/GovLocks.json";
import depositguardABI from "@/utils/abi/DepositGuard.json"
import oriBGTABI from "@/utils/abi/oriBGT.json";
import goldivault4626ABI from "@/utils/abi/Goldivault4626.json";
import { 
    // Abi,
    Address
} from "viem";

type Contract = {
    address: Address;
    abi: object;
    // abi: Abi;
}

export const contracts: { [key: string]: Contract } = {
  goldiswap: {
    address: "0xb7E448E5677D212B8C8Da7D6312E8Afc49800466",
    abi: goldiswapABI.abi,
  },
  goldilocked: {
    address: "0xbf2E152f460090aCE91A456e3deE5ACf703f27aD",
    abi: goldilockedABI.abi, 
  },
  goldilend: {
    address: "0x7c45E398A5c98046719F0D24C4F7e3f44b71588c",
    abi: goldilendABI.abi,
  },
  honey: {
    address: "0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce",
    abi: honeyABI.abi,
  },
  ibgt: {
    address: "0x46eFC86F0D7455F135CC9df501673739d513E982",
    abi: ibgtABI.abi,
  },
  bandbear: {
    address: "0xF21F3139BD4aD005aAba2ef2d6F319058bFA7230",
    abi: bandbearABI.abi,
  },
  bondbear: {
    address: "0x186C96B9c362DBBf4D33C6dAd04127F0238F5499",
    abi: bondbearABI.abi,
  },
  beradrome: {
    address: "0x1FD5270705F2F6b69a57b1eb72901031b1c46752",
    abi: beradromeABI.abi,
  },
  honeycomb: {
    address: "0xE4dC8142CEd52C547384032e43379b0514341c22",
    abi: honeycombABI.abi,
  },
  crocquery: {
    address: "0x8685CE9Db06D40CBa73e3d09e6868FE476B5dC89",
    abi: crocqueryABI.abi,
  },
  biggayberaquery: {
    address: "0x6Bc1D88F6a853F4E2DCc0224f195fE76cE5F63F0",
    abi: biggayberaqueryABI.abi,
  },
  infraredVault: {
    address: "0x5c5f9a838747fb83678ECe15D85005FD4F558237",
    abi: vaultABI.abi,
  },
  ibgtVault: {
    address: "0x31E6458C83C4184A23c761fDAffb61941665E012",
    abi: vaultABI.abi,
  },
  quoter: {
    address: "0x87bF7F6748Da49EB3c90FC8f296c58C5b0EC8A23",
    abi: quoterABI.abi,
  },
  quoterv2: {
    address: "0x644C8D6E501f7C994B74F5ceA96abe65d0BA662B",
    abi: quoterv2ABI.abi,
  },
  router: {
    address: "0x406846114B2A9b65a8A2Ab702C2C57d27784dBA2",
    abi: routerABI.abi,
  },
  routerv2: {
    address: "0xe301E48F77963D3F7DbD2a4796962Bd7f3867Fb4",
    abi: routerv2ABI.abi,
  },
  infraredBhoneyVault: {
    address: "0x7d91Bf5851B3A8bCf8C39A69AF2F0F98A4e2202A",
    abi: vaultABI.abi,
  },
  weth: {
    address: "0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590",
    abi: ibgtABI.abi
  },
  weethVault: {
    address: "0x0B8B5e0ec1dc908E0d8513cC03E91Eb479Ab6Ea9",
    abi: weethvaultABI.abi,
  },
  weot: {
    address: "0x46C7BdE4422b6798A09e76B555F2fea8D7FfADdc",
    abi: ibgtABI.abi,
  },
  weyt: {
    address: "0x98577aC3C6b376fc9Ee56377FEcAb6D751e40610",
    abi: ibgtABI.abi,
  },
  weeth: {
    address: "0x7DCC39B4d1C53CB31e1aBc0e358b43987FEF80f7",
    abi: ibgtABI.abi,
  },
  ebtcVault: {
    address: "0x0c3F856b93d6D7B46C76296f073A1357738d238C",
    abi: weethvaultABI.abi,
  },
  ebtcot: {
    address: "0x96284cCFd80E546b8239b44f653b4B5Db3f21371",
    abi: ibgtABI.abi,
  },
  ebtcyt: {
    address: "0x7a8238604314a2AD17F7550Dcbb3a08383D48Df8",
    abi: ibgtABI.abi,
  },
  ebtc: {
    address: "0x657e8C867D8B37dCC18fA4Caead9C45EB088C642",
    abi: ibgtABI.abi,
  }, 
  solvbtcVault: {
    address: "0xe2f6eF50fD232c7c9698F2f4CaE44A6D80AaFdEE",
    abi: weethvaultABI.abi,
  },
  solvbtcot: {
    address: "0xA01cB564ecc3F58a4e2bA5fD59d13a6b998de9b8",
    abi: ibgtABI.abi,
  },
  solvbtcyt: {
    address: "0x89b37108D3eb174673D98f0a5bb419f47270130e",
    abi: ibgtABI.abi,
  },
  solvbtc: {
    address: "0xCC0966D8418d412c599A6421b760a847eB169A8c",
    abi: ibgtABI.abi,
  },
  unibtcVault: {
    address: "0x8742DB52a4EAEFE88bE5D3431980E221aaAA1EE3",
    abi: weethvaultABI.abi,
  },
  unibtcot: {
    address: "0xE771779B350d2cC291E9461387d7f41765a7cB8b",
    abi: ibgtABI.abi,
  },
  unibtcyt: {
    address: "0x888d15E66b5eb410ea5Df520Fc46f030BBa31299",
    abi: ibgtABI.abi,
  },
  unibtc: {
    address: "0xC3827A4BC8224ee2D116637023b124CED6db6e90",
    abi: ibgtABI.abi,
  },
  rusd: {
    address: '0x09D4214C03D01F49544C0448DBE3A27f768F2b34',
    abi: ibgtABI.abi
  },
  rusdVault: {
    address: '0x8f65453BF050233d3BD6a08A5Eb53C1fD73312EC',
    abi: weethvaultABI.abi,
  },
  rusdot: {
    address: '0x4A8B5283E053A8B118EaDc4981e8Ec8659995652',
    abi: ibgtABI.abi
  },
  rusdyt: {
    address: '0x0D7d10e0cB3BAde481cA28ba811822683c1E5705',
    abi: ibgtABI.abi
  },
  rseth: {
    address: "0x4186BFC76E2E237523CBC30FD220FE055156b41F",
    abi: ibgtABI.abi
  },
  rsethVault: {
    address: "0xE4dC8142CEd52C547384032e43379b0514341c22",
    abi: weethvaultABI.abi
  },
  rsethot: {
    address: "0xB1195a6cdB7ef8fB22671bd8321727dBB6DDDe03",
    abi: ibgtABI.abi
  },
  rsethyt: {
    address: "0xfb8283E50c89e367674BC566db3070D9e9Ff2fDd",
    abi: ibgtABI.abi
  },
  oribgt: {
    address: "0x69f1E971257419B1E9C405A553f252c64A29A30a",
    abi: oriBGTABI.abi
  },
  oribgtVault: {
    address: "0x66090e34c9192Ee9927f44f978246be3e5365D36",
    abi: goldivault4626ABI.abi
  },
  oribgtot: {
    address: "0x978448A7866Aed0146Ad5C5E5d3d8424e2b16356",
    abi: ibgtABI.abi
  },
  oribgtyt: {
    address: "0xB345a602c2e24051a57e2339a98c815a6e45059c",
    abi: ibgtABI.abi
  },
  wberaibgtisland: {
    address: "0x564f011D557aAd1cA09BFC956Eb8a17C35d490e0",
    abi: ibgtABI.abi
  },
  origamiwberaibgtisland: {
    address: "0x32BC5E87297E148f70867005fFdC91a9022FC1F6",
    abi: ibgtABI.abi
  },
  wberaibgtlpot: {
    address: "0x3d72c07427a56Cbb4eE837cD0C86d1C6eC52e95d",
    abi: ibgtABI.abi
  },
  wberaibgtlpyt: {
    address: "0x6b5F3aA8a5EAF4f1291bf740eCA212185Ae7e013",
    abi: ibgtABI.abi
  },
  wberaibgtlpVault: {
    address: "0x53C73D721c38E8eb663E060d3D3c7DA452fbE70f",
    abi: goldivault4626ABI.abi
  },
  lbgt: {
    address: "0xBaadCC2962417C01Af99fb2B7C75706B9bd6Babe",
    abi: ibgtABI.abi
  },
  stlbgt: {
    address: "0xFace73a169e2CA2934036C8Af9f464b5De9eF0ca",
    abi: ibgtABI.abi
  },
  stlbgtot: {
    address: "0x2bbC181CDF9917350A91C586260D92240Fea05aB",
    abi: ibgtABI.abi
  },
  stlbgtyt: {
    address: "0x56cA20942Ca3099E29c8a4F83E25173DDECbfed3",
    abi: ibgtABI.abi
  },
  stlbgtVault: {
    address: "0x52e9d38068D1F2F7B5E8fDf30c3C315dAA4067fc",
    abi: goldivault4626ABI.abi
  },
  ybgt: {
    address: "0x7e768f47dfDD5DAe874Aac233f1Bc5817137E453",
    abi: ibgtABI.abi
  },
  stybgt: {
    address: "0x6f8cEAF347dA79287e49A5C9F0a03b20BDFCB7D3",
    abi: ibgtABI.abi
  },
  ybgtot: {
    address: "0x9CFbAbE5646ac013432809d1ED3E29138fec2457",
    abi: ibgtABI.abi
  },
  ybgtyt: {
    address: "0x5Eb587C38028edDF62003E4A1b2D9C70680c6C00",
    abi: ibgtABI.abi
  },
  ybgtVault: {
    address: "0xfc6F48846f86D6B3acd9B8FdDCE059A383f1e7A6",
    abi: goldivault4626ABI.abi
  },
  goldigov: {
    address: "0x6c00d68Dc6BCC3D47d698F4B566CcBe893D34Fed",
    abi: goldigovABI.abi,
  },
  govlocks: {
    address: "0xB9798E0e3AB8B2f2c80684C9D51056538E021DAc",
    abi: govlocksABI.abi,
  },
  depositGuard: {
    address: "0xc0c6D4178410849eC9765B4267A73F4F64241832",
    abi: depositguardABI.abi
  },
  rusdaquabera: {
    address: "0x20a49a266AE70d07Ba066Ef1F8b6e670216Ab2a6",
    abi: ibgtABI.abi
  },
} as const;

type VaultContracts = {
  base: Contract;
  ot: Contract;
  yt: Contract;
  vault: Contract;
  vaultLP: Address; // No ABI needed here
}

export const vaultLPaddresses: Record<string, Address> = {
    weeth: "0xd7e3962974993870C28C25D031BF202021bf635B",
    ebtc: "0x339b8859a691eb5c8E8E576E6Caf4c3556711e34",
    unibtc: "0x54577C10Dee86BE94Daf4706224cf5952D54C191",
    solvbtc: "0x8F513Fb5C947C20a01Dee083Cdb9250FBe73A6A8",
    rseth: "0xE457b56a1f9379B604dFBcE809Da6fEA1dECE717",
    rusd: "0x1a2A927F758AE242fB967481CF293D2a36883be6",
    oribgt: "0xCb2A95c52E718A6BA6AAb6587f1a3aFF4BfB0648",
    wberaibgtlp: "0x59007956D237F76D40200d3948E23102a59C2213",
    stlbgt: "0x23549f334CD72cE0ba5f6051bf8602eBf12652Da",
    ybgt: "0x23549f334CD72cE0ba5f6051bf8602eBf12652Da",
} as const;

export const vault_contracts: Record<string, VaultContracts> = {
  weeth: {
    base: contracts.weeth,
    ot: contracts.weot,
    yt: contracts.weyt,
    vault: contracts.weethVault,
    vaultLP: vaultLPaddresses.weeth,
  },
  ebtc: {
    base: contracts.ebtc,
    ot: contracts.ebtcot,
    yt: contracts.ebtcyt,
    vault: contracts.ebtcVault,
    vaultLP: vaultLPaddresses.ebtc,
  },
  solvbtc: {
    base: contracts.solvbtc,
    ot: contracts.solvbtcot,
    yt: contracts.solvbtcyt,
    vault: contracts.solvbtcVault,
    vaultLP: vaultLPaddresses.solvbtc,
  },
  unibtc: {
    base: contracts.unibtc,
    ot: contracts.unibtcot,
    yt: contracts.unibtcyt,
    vault: contracts.unibtcVault,
    vaultLP: vaultLPaddresses.unibtc,
  },
  rseth: {
    base: contracts.rseth,
    ot: contracts.rsethot,
    yt: contracts.rsethyt,
    vault: contracts.rsethVault,
    vaultLP: vaultLPaddresses.rseth,
  },
  rusd: {
    base: contracts.rusd,
    ot: contracts.rusdot,
    yt: contracts.rusdyt,
    vault: contracts.rusdVault,
    vaultLP: vaultLPaddresses.rusd,
  },
  oribgt: {
    base: contracts.ibgt,
    ot: contracts.oribgtot,
    yt: contracts.oribgtyt,
    vault: contracts.oribgtVault,
    vaultLP: vaultLPaddresses.oribgt,
  },
  wberaibgtlp: {
    base: contracts.wberaibgtisland,
    ot: contracts.wberaibgtlpot,
    yt: contracts.wberaibgtlpyt,
    vault: contracts.wberaibgtlpVault,
    vaultLP: vaultLPaddresses.wberaibgtlp
  },
  stlbgt: {
    base: contracts.lbgt,
    ot: contracts.stlbgtot,
    yt: contracts.stlbgtyt,
    vault: contracts.stlbgtVault,
    vaultLP: vaultLPaddresses.stlbgt
  },
  ybgt: {
    base: contracts.ybgt,
    ot: contracts.ybgtot,
    yt: contracts.ybgtyt,
    vault: contracts.ybgtVault,
    vaultLP: vaultLPaddresses.stybgt
  }
} as const;