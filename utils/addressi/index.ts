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
import goldivault4626ABI from "../abi/Goldivault4626.json"
import oriBGTABI from "../abi/oriBGT.json"

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
  wbera: {
    address: "0x6969696969696969696969696969696969696969",
    abi: ibgtABI.abi
  },
  ibgt: {
    address: "0xac03CABA51e17c86c921E1f6CBFBdC91F8BB2E6b",
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
    address: "0xdAfAE06A4D32f44Ec395d2664eB18432D39bd358",
    abi: goldivault4626ABI.abi
  },
  oribgtot: {
    address: "0xc0c088Bf14fe151C8AfEd52a8bFD3ef82d84280C",
    abi: ibgtABI.abi
  },
  oribgtyt: {
    address: "0x10C2BBaCECC5ed3e61198Ec4a4a6b199A2f48826",
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
  },
  vaultLPaddys: {
    weeth: "0xd7e3962974993870C28C25D031BF202021bf635B",
    ebtc: "0x339b8859a691eb5c8E8E576E6Caf4c3556711e34",
    unibtc: "0x54577C10Dee86BE94Daf4706224cf5952D54C191",
    solvbtc: "0x8F513Fb5C947C20a01Dee083Cdb9250FBe73A6A8",
    rseth: "0xE457b56a1f9379B604dFBcE809Da6fEA1dECE717",
    rusd: "0x1a2A927F758AE242fB967481CF293D2a36883be6",
    oribgt: "0x457449a2358E02e4FCbDA03dC70306F629D9304F"
  }
};
