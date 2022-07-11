// @ts-nocheck
import Web3 from 'web3'
import abi from '../../constants/borrow-lends/logicAbi.json'
import loAbi from '../../constants/borrow-lends/LoanOpeningsABI.json'
import lmAbi from '../../constants/borrow-lends/loanMaintananceABI.json'
import { ADDRESSES_FACTORY } from '../../constants/borrow-lends/constants'
import { MAX_VALUE } from '../../constants'
import nbuABI from '../../constants/borrow-lends/nbuABI.json'

const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_NETWORK_URL)

export const getProtocol = chainId => {
  switch (chainId) {
    case 1:
      return '0x418a24a09bF172ED1c324eD7F581Ac436f3537C8' // main
    case 3:
      return '0x02Af4312213A50cc465e682032cEBE3479c3bc4F'
    case 56:
      return '0x68F118Ca875605EcbDbfE3AB2850DBed448283C0' // main bnb
    case 97:
      return '0x68F118Ca875605EcbDbfE3AB2850DBed448283C0'
  }
}

const getContractAddressForCards = (iContractAddress, chainId) => {
  if (chainId) {
    for (const key of Object.keys(ADDRESSES_FACTORY[chainId])) {
      if (ADDRESSES_FACTORY[chainId][key].iAddress === iContractAddress) {
        return ADDRESSES_FACTORY[chainId][key].address
      }
    }
  }
}

// balanceOf відображає баланс і-токенів
// assetBalanceOf відображає скільки ти отримаєш, якщо спалиш і-токен

export async function getLendCards(iContractAddress, chainId) {
  let marketLiquidity, iBalance, profitOf, apr, name, walletAddress, totalAssetSupply, totalBalance
  const iContract = new web3.eth.Contract(abi as any, iContractAddress)

  try {
    walletAddress = await web3.eth.getCoinbase()
    iBalance = walletAddress ? await iContract.methods.balanceOf(walletAddress).call() : null
    totalBalance = walletAddress ? await iContract.methods.assetBalanceOf(walletAddress).call() : null
    profitOf = walletAddress ? await iContract.methods.profitOf(walletAddress).call() : null
  } catch (e) {
    console.log(e)
  }

  try {
    marketLiquidity = await iContract.methods.marketLiquidity().call()
  } catch (e) {
    console.log(e)
  }

  try {
    totalAssetSupply = await iContract.methods.totalAssetSupply().call()
    apr = await iContract.methods.totalSupplyInterestRate(totalAssetSupply).call()
    name = await iContract.methods.symbol().call()
  } catch (e) {
    console.log(e)
  }

  return {
    iBalance: iBalance,
    totalBalance: totalBalance,
    profit: profitOf ? web3.utils.fromWei(profitOf) : 0,
    currency: name,
    subTitle: name,
    apr: apr ? web3.utils.fromWei(apr) : 0,
    liquidity: getToHumanValue(iContractAddress, marketLiquidity, chainId),
    iContractAddress: iContractAddress,
    contractAddress: getContractAddressForCards(iContractAddress, chainId)
  }
}

export async function getBorrowCards(iContractAddress, chainId) {
  let marketLiquidity, apr, name
  try {
    const iContract = new web3.eth.Contract(abi as any, iContractAddress)
    marketLiquidity = await iContract.methods.marketLiquidity().call()
    apr = await iContract.methods.borrowInterestRate().call()
    name = await iContract.methods.symbol().call()
  } catch (error) {
    console.error(error)
  }

  return {
    currency: name ?? '',
    subTitle: name ?? '',
    apr: apr ? web3.utils.fromWei(apr) : 0,
    liquidity: marketLiquidity ? getToHumanValue(iContractAddress, marketLiquidity, chainId) : 0,
    iContractAddress: iContractAddress,
    contractAddress: getContractAddressForCards(iContractAddress, chainId)
  }
}

export async function getLoanCards(chainId) {
  const walletAddress = await web3.eth.getCoinbase()
  const loanMaintananceContract = new web3.eth.Contract(lmAbi, getProtocol(chainId))
  const loans = await loanMaintananceContract.methods.getUserLoans(walletAddress, 0, 1000, 0, false, false).call()
  const objs = loans.map(x => {
    return {
      collateral: x['collateral'],
      principal: x['principal'],
      collateralToken: x['collateralToken'],
      loanToken: x['loanToken'],
      loanId: x['loanId'],
      currentMargin: x['currentMargin'],
      endTimestamp: x['endTimestamp'],
      interestDepositRemaining: x['interestDepositRemaining'],
      maintenanceMargin: x['maintenanceMargin']
    }
  })

  return objs
}

export const getFormattedName = (currency: string | any[]) => {
  const cases = {
    NWETH: currency?.slice(2),
    WBNB: currency?.slice(1),
    BUSD: currency,
    USDC: currency,
    USDT: currency,
    GNBU: currency,
    NBU: currency
  }
  // @ts-ignore
  return cases[currency]
}

export const addEllipsisToString = str => {
  if (str.length >= 66) {
    return str.substr(0, 13) + '...' + str.substr(str.length - 13, str.length)
  }
  return str
}

export const getExpiredLoans = async (chainId, setIsExpiredLoans) => {
  const currentDate = Date.now()
  const endTimestamps = []
  try {
    await getLoanCards(chainId).then(data => {
      data.filter(item => endTimestamps.push(item.endTimestamp))
    })
  } catch (err) {
    return
  }
  // get how many days left to credit expired
  endTimestamps.forEach(item => {
    const days = ((+item * 1000 - currentDate) / (1000 * 60 * 60 * 24)).toFixed()
    if (days <= 10) {
      setIsExpiredLoans(true)
    } else {
      return
    }
  })
}

// get collateralized percent from loans
export const getCollateralized = async (chainId, setIsLowCollateralized) => {
  const arr = []
  try {
    await getLoanCards(chainId).then(data => {
      data.filter(item => arr.push(item.currentMargin))
    })
  } catch (err) {
    return
  }

  arr.forEach(item => {
    const collateralized = (+item / 10 ** 18 + 100).toFixed(2)
    if (collateralized <= 130) {
      setIsLowCollateralized(true)
    } else {
      return
    }
  })
}

export async function getLiqCards(chainId) {
  const loanMaintananceContract = new web3.eth.Contract(lmAbi, getProtocol(chainId))
  const start = 0
  const count = await loanMaintananceContract.methods.getActiveLoansCount().call()
  const activeLoans = await loanMaintananceContract.methods.getActiveLoans(start, count, true).call()

  const objs = activeLoans.map(x => {
    return {
      collateral: x['collateral'],
      principal: x['principal'],
      loanId: x['loanId'],
      collateralToken: x['collateralToken'],
      loanToken: x['loanToken'],
      maxLiquidatable: x['maxLiquidatable'],
      maxSeizable: x['maxSeizable']
    }
  })

  return objs
}

export async function getRollCards(chainId) {
  const loanMaintananceContract = new web3.eth.Contract(lmAbi, getProtocol(chainId))
  const start = 0
  const count = await loanMaintananceContract.methods.getActiveLoansCount().call()
  const activeLoans = await loanMaintananceContract.methods.getActiveLoans(start, count, false).call()

  const objs = activeLoans.map(x => {
    return {
      collateral: x['collateral'],
      principal: x['principal'],
      loanId: x['loanId'],
      collateralToken: x['collateralToken'],
      loanToken: x['loanToken'],
      endTimestamp: x['endTimestamp']
    }
  })

  return objs
}

// contract - обычный токен в токен адресе при получении контракта (WETH, USDC, WBTC) spender => ай токен адрес(iWETH, USDC, WBTC ....)
export const approve = async (contract: object, account, spender, setIsApprovePending) => {
  return await contract.methods
    .approve(spender, MAX_VALUE)
    .send({ from: account })
    .on('transactionHash', function(hash) {})
    .on('receipt', function(receipt) {
      setIsApprovePending(false)
    })
    .on('error', function(error, receipt) {
      setIsApprovePending(false)
    })
}

export const checkApprove = async (
  contractAddress,
  func,
  contract,
  account,
  spender,
  setIsApprovedPending,
  chainId
) => {
  if (
    chainId === 56 || chainId === 97
      ? contractAddress === ADDRESSES_FACTORY[chainId]['WBNB'].address
      : contractAddress === ADDRESSES_FACTORY[chainId]['WETH'].address
  ) {
    return await func()
  }
  const data = await checkAllowance(contract, account, spender)
  if (data === '0') {
    setIsApprovedPending(true)
    approve(contract, account, spender, setIsApprovedPending).then(() => func())
  } else {
    await func()
  }
}

export const checkAllowance = async (contract, account, spender) => {
  return await contract.methods.allowance(account, spender).call()
}

export const getCollateralAmount = async (
  loanTokenAddress,
  collateralTokenAddress,
  loanTokenAmount,
  initialMargin,
  chainId
) => {
  const contract = new web3.eth.Contract(loAbi, getProtocol(chainId))
  return await contract.methods
    .getRequiredCollateral(
      loanTokenAddress,
      collateralTokenAddress,
      loanTokenAmount.toString(),
      initialMargin.toString(),
      true // isTorqueLoan
    )
    .call()
}

export const getAvailableForTransfer = async (account, contractAddress, web3) => {
  const nimbusContract = new web3.eth.Contract(nbuABI, contractAddress)
  return await nimbusContract.methods.availableForTransfer(account).call()
}

// uses iContractAddress
export const getToHumanValue = (iContractAddress, value, chainId) => {
  for (const key of Object.keys(ADDRESSES_FACTORY[chainId])) {
    if (ADDRESSES_FACTORY[chainId][key].iAddress === iContractAddress) {
      return +value / ADDRESSES_FACTORY[chainId][key].decimals
    }
  }
}

// uses contractAddress
export const getToHumanValueContract = (contractAddress, value, chainId) => {
  for (const key of Object.keys(ADDRESSES_FACTORY[chainId])) {
    if (ADDRESSES_FACTORY[chainId][key].address === contractAddress) {
      return +value / ADDRESSES_FACTORY[chainId][key].decimals
    }
  }
}

// uses iContractAddress
export const getMultipleFormattedValue = (iContractAddress, value, chainId) => {
  for (const key of Object.keys(ADDRESSES_FACTORY[chainId])) {
    if (ADDRESSES_FACTORY[chainId][key].iAddress === iContractAddress) {
      return (+value * ADDRESSES_FACTORY[chainId][key].decimals).toLocaleString('fullwide', { useGrouping: false })
    }
  }
}

// uses contractAddress
export const getMultipleFormattedValueContract = (contractAddress, value, chainId) => {
  for (const key of Object.keys(ADDRESSES_FACTORY[chainId])) {
    if (ADDRESSES_FACTORY[chainId][key].address === contractAddress) {
      return (+value * ADDRESSES_FACTORY[chainId][key].decimals).toLocaleString('fullwide', { useGrouping: false })
    }
  }
}

export const renderIco = (contractAddress, currency, chainId) => {
  contractAddress = typeof contractAddress !== 'undefined' ? contractAddress : ''

  if (chainId) {
    // check for incognito mode
    if (!currency) {
      for (const key of Object.keys(ADDRESSES_FACTORY[chainId])) {
        if (ADDRESSES_FACTORY[chainId][key].address === contractAddress) {
          return ADDRESSES_FACTORY[chainId][key].logo
        }
      }
    } else {
      for (const key of Object.keys(ADDRESSES_FACTORY[chainId])) {
        if (ADDRESSES_FACTORY[chainId][key].symbol === currency) {
          return ADDRESSES_FACTORY[chainId][key].logo
        }
      }
    }
  }
}

export const getCurrencyNameForIncognito = (contractAddress, chainId) => {
  if (chainId) {
    for (const key of Object.keys(ADDRESSES_FACTORY[chainId])) {
      if (ADDRESSES_FACTORY[chainId][key].address === contractAddress) {
        return ADDRESSES_FACTORY[chainId][key].symbol
      }
    }
  }
}

export const removeEFromNumber = x => {
  if (Math.abs(x) < 1.0) {
    const e = parseInt(x.toString().split('e-')[1])
    if (e) {
      x *= Math.pow(10, e - 1)
      x = '0.' + new Array(e).join('0') + x.toString().substring(2)
    }
  } else {
    let e = parseInt(x.toString().split('+')[1])
    if (e > 20) {
      e -= 20
      x /= Math.pow(10, e)
      x += new Array(e + 1).join('0')
    }
  }
  return x
}
