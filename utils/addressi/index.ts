import goldiswapABI from "../abi/Goldiswap.json"
import goldilockedABI from "../abi/Goldilocked.json"
import honeyABI from "../abi/Honey.json"
import goldilendABI from "../abi/Goldilend.json"
import ibgtABI from "../abi/IBGT.json"
import bandbearABI from "../abi/BandBear.json"
import bondbearABI from "../abi/BondBear.json"
import beradromeABI from "../abi/Beradrome.json"
import honeycombABI from "../abi/HoneyComb.json"
import goldivaultABI from "../abi/HoneyWBeraGoldivault.json"
import crocqueryABI from "../abi/CrocQuery.json"
import biggayberaqueryABI from "../abi/BigGayBeraQuery.json"
import vaultABI from "../abi/Vault.json"
import bhoneyABI from "../abi/BHoney.json"
import quoterABI from "../abi/Quoter.json"
import routerABI from "../abi/Router.json"
import weethvaultABI from "../abi/WeethGoldivault.json"
import quoterv2ABI from "../abi/QuoterV2.json"
import routerv2ABI from "../abi/RouterV2.json"
import goldigovABI from "../abi/Goldigovernor.json"
import govlocksABI from "../abi/GovLocks.json"

export const contracts = {
  goldiswap: {
    address: '0xb7E448E5677D212B8C8Da7D6312E8Afc49800466',
    abi: goldiswapABI.abi
  },
  goldilocked: {
    address: '0xbf2E152f460090aCE91A456e3deE5ACf703f27aD',
    abi: goldilockedABI.abi
  },
  goldilend: {
    address: '0x7c45E398A5c98046719F0D24C4F7e3f44b71588c',
    abi: goldilendABI.abi
  },
  honeywberagoldivault: {
    address: '0x35EF111B092d5faeF321A1aC7e048E378c63DCCc',
    abi: goldivaultABI.abi
  },
  hwbot: {
    address: '0x374fdFdBC915A4119bcA40cE96b917df99515c93',
    abi: ibgtABI.abi
  },
  hwbyt: {
    address: '0xa711F108A7Cd270d12B9661fb72bFadADb28b658',
    abi: ibgtABI.abi
  },
  bhoneygoldivault: {
    address: '0x541C4aCA915ccC83B1bf48b510D1653cba61115F',
    abi: goldivaultABI.abi
  },
  bhot: {
    address: '0xde0a616437151c5D655c5341f24D624cBf35B0DE',
    abi: ibgtABI.abi
  },
  bhyt: {
    address: '0x3c3834513371895A25A37aF3cdc83b8DC0352cC1',
    abi: ibgtABI.abi
  },
  honey: {
    address: '0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce',
    abi: honeyABI.abi
  },
  ibgt: {
    address: '0x46eFC86F0D7455F135CC9df501673739d513E982',
    abi: ibgtABI.abi
  },
  honeywberaLP: {
    address: '0xd28d852cbcc68DCEC922f6d5C7a8185dBaa104B7',
    abi: ibgtABI.abi
  },
  wbera: {
    address: '0x7507c1dc16935B82698e4C63f2746A2fCf994dF8',
    abi: ibgtABI.abi
  },
  bandbear: {
    address: '0xF21F3139BD4aD005aAba2ef2d6F319058bFA7230',
    abi: bandbearABI.abi
  },
  bondbear: {
    address: '0x186C96B9c362DBBf4D33C6dAd04127F0238F5499',
    abi: bondbearABI.abi
  },
  beradrome: {
    address: '0x1FD5270705F2F6b69a57b1eb72901031b1c46752',
    abi: beradromeABI.abi
  },
  honeycomb: {
    address: '0xE4dC8142CEd52C547384032e43379b0514341c22',
    abi: honeycombABI.abi
  },
  crocquery: {
    address: '0x8685CE9Db06D40CBa73e3d09e6868FE476B5dC89',
    abi: crocqueryABI.abi
  },
  biggayberaquery: {
    address: '0x6Bc1D88F6a853F4E2DCc0224f195fE76cE5F63F0',
    abi: biggayberaqueryABI.abi
  },
  infraredVault: {
    address: '0x5c5f9a838747fb83678ECe15D85005FD4F558237',
    abi: vaultABI.abi
  },
  ibgtVault: {
    address: '0x31E6458C83C4184A23c761fDAffb61941665E012',
    abi: vaultABI.abi
  },
  bhoney: {
    address: '0x1306D3c36eC7E38dd2c128fBe3097C2C2449af64',
    abi: bhoneyABI.abi
  },
  quoter: {
    address: '0x87bF7F6748Da49EB3c90FC8f296c58C5b0EC8A23',
    abi: quoterABI.abi
  },
  quoterv2: {
    address: '0x5dA70228EdF3c3235a52BFa3A1CC33d7C9D5497d',
    abi: quoterv2ABI.abi
  },
  router: {
    address: '0x406846114B2A9b65a8A2Ab702C2C57d27784dBA2',
    abi: routerABI.abi
  },
  routerv2: {
    address: '0x496e305C03909ae382974cAcA4c580E1BF32afBE',
    abi: routerv2ABI.abi
  },
  infraredBhoneyVault: {
    address: '0x7d91Bf5851B3A8bCf8C39A69AF2F0F98A4e2202A',
    abi: vaultABI.abi
  },
  weethVault: {
    address: '0xEE4A91F5BFA0Bf54124CF00cc7e144427cCE1162',
    abi: weethvaultABI.abi
  },
  weot: {
    address: '0x6218379852D5609870e91f168B81cbB4532f0346',
    abi: ibgtABI.abi
  },
  weyt: {
    address: '0x401CBe777E8BE57a426A5B5F13Ca4d73200BD95B',
    abi: ibgtABI.abi
  },
  weeth: {
    address: '0x7Cc43d94818005499D2740975D2aEFD3893E940E',
    abi: ibgtABI.abi
  },
  solvbtcVault: {
    address: '0xa861d5687ff698902A632E2e62AA7df41199B397',
    abi: weethvaultABI.abi
  },
  solvbtcot: {
    address: '0xBea86272fF455A7F60863E1D6224FB5Ad1eb147f',
    abi: ibgtABI.abi
  },
  solvbtcyt: {
    address: '0xB0D8A7dAa386597371A11837737c4E45A51a9eF3',
    abi: ibgtABI.abi
  },
  solvbtc: {
    address: '0x0ed996697ABDe35eD6C3E61C562D37366ba06d88',
    abi: ibgtABI.abi
  },
  unibtcVault: {
    address: '0xc7f687Ef7CBbB5335801BF479877017F0baebD98',
    abi: weethvaultABI.abi
  },
  unibtcot: {
    address: '0x671ddbe0e20E9Ec638962d9f4dEb0088F38F3434',
    abi: ibgtABI.abi
  },
  unibtcyt: {
    address: '0x3f566256bc962ab24550580B5339751562562784',
    abi: ibgtABI.abi
  },
  unibtc: {
    address: '0xEfBfEC4ab23BeB740D6463Ba046f2d7B66E9e314',
    abi: ibgtABI.abi
  },
  goldigov: {
    address: '0x6c00d68Dc6BCC3D47d698F4B566CcBe893D34Fed',
    abi: goldigovABI.abi
  },
  govlocks: {
    address: '0xB9798E0e3AB8B2f2c80684C9D51056538E021DAc',
    abi: govlocksABI.abi
  }
}