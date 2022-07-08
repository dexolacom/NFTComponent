// @ts-nocheck
import { ChainId } from 'nimbus-swap-mod/sdk'
import abi from './logicAbi.json'
import Web3 from 'web3'
import wbnb from '../../assets/images/dapps/wbnb.svg'
import busd from '../../assets/images/dapps/busd.svg'
import eth from '../../assets/images/dapps/eth.svg'
import usdc from '../../assets/images/dapps/usdc.svg'
import usdt from '../../assets/images/dapps/usdt.svg'
import nbu from '../../assets/images/dapps/nbu.svg'
import gnbu from '../../assets/images/dapps/gnbu.svg'

const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_NETWORK_URL)

// // getDecimals
// ;(async function() {
//   const chainId = await web3.eth.getChainId()
//   for (let key of Object.keys(ADDRESSES_FACTORY[chainId])) {
//     if (ADDRESSES_FACTORY[chainId][key].iAddress) {
//       const iContract = new web3.eth.Contract(abi as any, ADDRESSES_FACTORY[chainId][key].iAddress)
//       const decimals = await iContract.methods.decimals().call()
//       ADDRESSES_FACTORY[chainId][key].decimals = 10 ** decimals
//     }
//   }
// })();
//
// // getSymbol
// ;(async function() {
//   const chainId = await web3.eth.getChainId()
//   for await (let key of Object.keys(ADDRESSES_FACTORY[chainId])) {
//     if (ADDRESSES_FACTORY[chainId][key].address) {
//       const contract = new web3.eth.Contract(abi as any, ADDRESSES_FACTORY[chainId][key].address)
//       const symbol = await contract.methods.symbol().call()
//       switch (symbol) {
//         case 'WBNB':
//           ADDRESSES_FACTORY[chainId][key].symbol = symbol.slice(1)
//           break
//         case 'NWETH':
//           ADDRESSES_FACTORY[chainId][key].symbol = symbol.slice(2)
//           break
//         default:
//           ADDRESSES_FACTORY[chainId][key].symbol = symbol
//       }
//     }
//   }
// })();

export const ADDRESSES_FACTORY: { [chainId in ChainId]: any } = {
  [ChainId.MAINNET]: {
    WETH: {
      address: '0x0BCd83DF58a1BfD25b1347F9c9dA1b7118b648a6',
      iAddress: '0x03586E288d4d45Ad55f049bf3BE50dc29eC4179F',
      decimals: 10 ** 18,
      symbol: 'ETH',
      logo: eth,
      oracle: '0x0000000000000000000000000000000000000000'
    },
    USDT: {
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      iAddress: '0xB8deFb1af7aa72aA48155fca77aA325b12156Cc5',
      decimals: 10 ** 6,
      symbol: 'USDT',
      logo: usdt,
      oracle: '0xEe9F2375b4bdF6387aa8265dD4FB8F16512A1d46'
    },
    priceFeed: '0xc9525Aa71254FF25150d9Ee57EEF473C344dB231',
    gas: '0xdeD80e41AE10698b9f1c2007FE969e219A5D0585'
  },
  [ChainId.ROPSTEN]: {
    WETH: {
      address: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
      iAddress: '0x467b6668a4039B9Fd0bE946daa8380b8aC6F7D78',
      decimals: 10 ** 18,
      symbol: 'ETH',
      logo: eth,
      oracle: '0x0000000000000000000000000000000000000000'
    },
    USDT: {
      address: '0xBd4D79B145C91896c00A3A983B6CB2E6Bf3dC4F3',
      iAddress: '0xfe58bB0965D774cD0DA015a7C0aBE5762cb05DcE',
      decimals: 10 ** 6,
      symbol: 'USDT',
      logo: usdt,
      oracle: '0xA2234b55281d82be1EeEbb958C98482F12AF32DA',
    },
    NBU: {
      address: '0xEB58343b36C7528F23CAAe63a150240241310049',
      iAddress: '0x7F3E4f58CF8e81c0CE71BdC7dcEA5Ef6F1100daD',
      decimals: 10 ** 18,
      symbol: 'NBU',
      logo: nbu,
      oracle: '0xE350B93357f00E9d26E26a1C1dd8f193BbA719a4',
    },
    GNBU: {
      address: '0x639ae8F3EEd18690bF451229d14953a5A5627b72',
      iAddress: '0x77b73fa0292b5D66D630fc4Fa0b212B334b5D983',
      decimals: 10 ** 18,
      symbol: 'GNBU',
      logo: gnbu,
      oracle: '0x4c9305dC62b2EEb2e272cDE85ed5Cc97541E9098',
    },
    priceFeed: '0xa22907c20868ff17b031764B4a480C74dD01A6c7'
  },
  [ChainId.BSC_TESTNET]: {
    WBNB: {
      address: '0x261965ee71b671D2B5035C2583918166Acb2390c',
      iAddress: '0x1940C1F5bF458F98d306d89097ffF593B1e4F4F0',
      decimals: 10 ** 18,
      symbol: 'BNB',
      logo: wbnb,
      oracle: '0x0000000000000000000000000000000000000000'
    },
    BUSD: {
      address: '0x55eA8396Df26cc5f990AFACb79C1874106F2Fd93',
      iAddress: '0x87C319e44BDbCC9588c4ca457c74db3151d86428',
      decimals: 10 ** 18,
      symbol: 'BUSD',
      logo: busd,
      oracle: '0x0630521aC362bc7A19a4eE44b57cE72Ea34AD01c'
    },
    NBU: {
      address: '0x5f20559235479F5B6abb40dFC6f55185b74E7b55',
      iAddress: '0x15893dda2397a5c2bD22072e1232BD26d77D53DD',
      decimals: 10 ** 18,
      symbol: 'NBU',
      logo: nbu,
      oracle: '0x6Fee1CA4a041d13B4ED97aD501793Ba244214980'
    },
    GNBU: {
      address: '0xA4d872235dde5694AF92a1d0df20d723E8e9E5fC',
      iAddress: '0x293BB8A2fbA279F4f7582a137a1acb26a9eFA245',
      decimals: 10 ** 18,
      symbol: 'GNBU',
      logo: gnbu,
      oracle: '0x1a2Afdfa69B42f5E26F740a539E280b1D73a00bc'
    },
    priceFeed: '0xec636367253101df8bfa779f6019619bb8301068',
    gas: '0x60805013Efb5E762A805ED9835c4D64E58e4c4F6'
  },
  [ChainId.BSC_MAINNET]: {
    WBNB: {
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      iAddress: '0x1940C1F5bF458F98d306d89097ffF593B1e4F4F0',
      decimals: 10 ** 18,
      symbol: 'BNB',
      logo: wbnb,
      oracle: '0x0000000000000000000000000000000000000000'
    },
    BUSD: {
      address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
      iAddress: '0x87C319e44BDbCC9588c4ca457c74db3151d86428',
      decimals: 10 ** 18,
      symbol: 'BUSD',
      logo: busd,
      oracle: '0xD5c40f5144848Bd4EF08a9605d860e727b991513'
    },
    NBU: {
      address: '0x5f20559235479F5B6abb40dFC6f55185b74E7b55',
      iAddress: '0x6833F9225645B76FD7387c04d70c9261EEeE850b',
      decimals: 10 ** 18,
      symbol: 'NBU',
      logo: nbu,
      oracle: '0x5ee5c6Bfe28b1cC47BeA759A49C87226c4434137'
    },
    GNBU: {
      address: '0xA4d872235dde5694AF92a1d0df20d723E8e9E5fC',
      iAddress: '0xf2ea93Cade752fD89bBA823C38948bCa7ea29D4f',
      decimals: 10 ** 18,
      symbol: 'GNBU',
      logo: gnbu,
      oracle: '0x790aAE1D5A1418CEaf97a30c979a3Ce56DB56907'
    },
    priceFeed: '0xB8AC7faBFF0d901878c269330b32CDD8D2Ba3b8c',
    gas: '0xC6045E38114eB41549C37366f0a083785112d9Be'
  }
};

// ETH mainnet chainID: 1
// ETH testnet 3
// BNB mainnet 56
// BNB testnet 97

// export const emptyBytes = '0x0000000000000000000000000000000000000000000000000000000000000000'

export const initialMargin = 150 * 10 ** 18
export const initialLoanDuration = 7884000
export const maintananceMargin = 115 * 10 ** 18

