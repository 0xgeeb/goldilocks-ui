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

export const contracts = {
  goldiswap: {
    address: '0xC94ecBfE16E337f6e606dcd86B8A5eaDbAe7A337',
    abi: goldiswapABI.abi
  },
  goldilocked: {
    address: '0xe2cA693a47C32bd33949120d31d42b9e5Ef5c7Ef',
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
    address: '0x0E4aaF1351de4c0264C5c7056Ef3777b41BD8e03',
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
  router: {
    address: '0x406846114B2A9b65a8A2Ab702C2C57d27784dBA2',
    abi: routerABI.abi
  },
  infraredBhoneyVault: {
    address: '0x7d91Bf5851B3A8bCf8C39A69AF2F0F98A4e2202A',
    abi: vaultABI.abi
  }
}