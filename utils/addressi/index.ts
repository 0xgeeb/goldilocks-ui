import goldiswapABI from "../abi/Goldiswap.json";
import goldilockedABI from "../abi/Goldilocked.json";
import honeyABI from "../abi/Honey.json";
import goldilendABI from "../abi/Goldilend.json";
import ibgtABI from "../abi/IBGT.json";
import bandbearABI from "../abi/BandBear.json";
import bondbearABI from "../abi/BondBear.json";
import beradromeABI from "../abi/Beradrome.json";
import honeycombABI from "../abi/HoneyComb.json";
import crocqueryABI from "../abi/CrocQuery.json";
import biggayberaqueryABI from "../abi/BigGayBeraQuery.json";
import vaultABI from "../abi/Vault.json";
import quoterABI from "../abi/Quoter.json";
import routerABI from "../abi/Router.json";
import weethvaultABI from "../abi/WeethGoldivault.json";
import quoterv2ABI from "../abi/QuoterV2.json";
import routerv2ABI from "../abi/RouterV2.json";
import goldigovABI from "../abi/Goldigovernor.json";
import govlocksABI from "../abi/GovLocks.json";
import depositguardABI from "../abi/DepositGuard.json"

export const contracts = {
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
    address: "0xa861d5687ff698902A632E2e62AA7df41199B397",
    abi: weethvaultABI.abi,
  },
  solvbtcot: {
    address: "0xBea86272fF455A7F60863E1D6224FB5Ad1eb147f",
    abi: ibgtABI.abi,
  },
  solvbtcyt: {
    address: "0xB0D8A7dAa386597371A11837737c4E45A51a9eF3",
    abi: ibgtABI.abi,
  },
  solvbtc: {
    address: "0x0ed996697ABDe35eD6C3E61C562D37366ba06d88",
    abi: ibgtABI.abi,
  },
  unibtcVault: {
    address: "0x848EF5FD85AACeAc216d3b9a107aaF5c466241d9",
    abi: weethvaultABI.abi,
  },
  unibtcot: {
    address: "0x99a802915Ef43613c6dCb17D4bb112597689D5d6",
    abi: ibgtABI.abi,
  },
  unibtcyt: {
    address: "0x4Ab870696407d1f1aEE537898dcdbFb8c83E89b1",
    abi: ibgtABI.abi,
  },
  unibtc: {
    address: "0x2dbdDF2c6460371B6D63191a65F0BcE8429Aa675",
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
  }
};
