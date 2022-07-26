// @ts-nocheck
import { useState, useEffect } from 'react'
import Web3 from 'web3'
import { convertToHuman } from '../../../hooks/useConvertToHuman'
import BNBcurrency from '../../../assets/images/Nft-img/icon/BNBcurrency.svg'
//import BUSDcurrency from '../../../assets/images/Nft-img/icon/BUSDcurrency.svg'
import DefaultLogo from '../../../assets/images/Nft-img/icon/defaultLogo.svg'
//
import nftOne95 from '../../../assets/images/Nft-img/nft-one-95.png'
import nftOne96 from '../../../assets/images/Nft-img/nft-one-96.png'
// import nftOne98 from '../../../assets/images/Nft-img/nft-one-98.png'
//
import { ModalNFT } from '../Modal/ModalNFT/ModalNFT'
import { TokenCard, CloseTokenCard, SmollTokenCard } from './TokenCard'
import { useWeb3React } from '@web3-react/core'
//
import { Container, TokenTooltip } from './Tokens.style'
//
import Abi from '../abi_nft.json'
import Abi_Contract from '../abi_contract_busd.json'
import AbiBorrowLends from '../../../constants/borrow-lends/logicAbi.json'
import { AbiItem } from 'web3-utils'

export const Tokens = () => {
  const { account } = useWeb3React()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [currensyName, setCurrensyName] = useState('')
  const [minAmountBNBToken, setMinAmountBNBToken] = useState('0.00')
  const [minAmountBUSDToken, setMinAmountBUSDToken] = useState('0.00')
  const [aprBNB, setAprBNB] = useState('0.00')
  const [aprBUSD, setAprBUSD] = useState('0.00')
  //
  const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_NETWORK_URL)
  const NFT_CONTRACT = new web3.eth.Contract(Abi as AbiItem, process.env.REACT_APP_NFT_TOKEN_CONTRACT_BNB)
  //
  const NFT_ADDRESS_CONTRACT_BUSD = new web3.eth.Contract(
    Abi_Contract as AbiItem,
    process.env.REACT_APP_NFT_TOKEN_CONTRACT
  )
  //
  // получение apr WBNB
  const getApr = async () => {
    // APR token BNB
    const iContract = new web3.eth.Contract(AbiBorrowLends as AbiItem, process.env.REACT_APP_NFT_LEND_APR)
    if (iContract) {
      const totalAssetSupply = await iContract.methods.totalAssetSupply().call()
      const apr = await iContract.methods.totalSupplyInterestRate(totalAssetSupply).call()

      setAprBNB(apr)
    }
    // APR token IBUSD
    const iContractBUSD = new web3.eth.Contract(AbiBorrowLends as AbiItem, process.env.REACT_APP_NFT_LEND_APR_IBUSD)
    if (iContractBUSD) {
      const totalAssetSupply = await iContractBUSD.methods.totalAssetSupply().call()
      const apr = await iContractBUSD.methods.totalSupplyInterestRate(totalAssetSupply).call()

      setAprBUSD(apr)
    }
  }

  // получение стоимости за Token BNB
  const getMinPurchase = async () => {
    const minPurchaseBNB = await NFT_CONTRACT.methods.minPurchaseAmount().call()
    setMinAmountBNBToken(minPurchaseBNB)

    const minPurchaseBUSD = await NFT_ADDRESS_CONTRACT_BUSD.methods.minPurchaseAmount().call()
    setMinAmountBUSDToken(minPurchaseBUSD)
  }
  useEffect(() => {
    getApr()
    getMinPurchase()
  }, [aprBNB, aprBUSD, minAmountBNBToken])

  const closeModal = () => {
    setIsOpenModal(false)
  }

  const openCurrentModal = (title: string) => {
    if (title === 'BNB') {
      setCurrensyName('GNBU')
    } else if (title === 'BUSD') {
      setCurrensyName('BUSD')
    }
  }

  // Tooltip Text Smart LP BNB
  const LendTooltipContentBNB = (
    <TokenTooltip>
      <li>{' – 30% of your BNB go to Lend dApp as loans. The APR there is flexible. The APR there is based on the market conditions so your rewards will vary'}</li>
      <li>{' - The rewards accrue in BNB, and can be withdrawn when burning the NFT.'}</li>
    </TokenTooltip>
  )
  const LPRewardsTooltipContentBNB = (
    <TokenTooltip>
      <li>{' – 70% of your assets are provided as liquidity to BNB/BUSD and BNB/TBT pairs at Nimbus Swap. You receive 0,3% swap fees from all transactions made in these pairs. But while the swap fee level is fixed, your actual rewards depend on your pool share and the trade volume;'}</li>
      <li>{' – The rewards accrue in BNB, BUD, and TBT, and can be withdrawn when burning the NFT.'}</li>
    </TokenTooltip>
  )
  const LPStakingTooltipContentBNB = (
    <TokenTooltip>
      <li>{' – When providing liquidity to the Nimbus Swap, LP tokens are received as a representation of your liquidity. They then get staked at a fixed rate of 100% APY. But since they represent your pool share, which fluctuates, your actual rewards also fluctuate over time;'}</li>
      <li>{'– The rewards accrue in TBT, and can be withdrawn any time.'}</li>
    </TokenTooltip>
  )
  //   Tooltip Text Smart LP BUSD
  const LPRewardsTooltipContentBUSD = (
    <TokenTooltip>
      <li>{'– 70% of your assets are provided as liquidity to BNB/BUSD and NBU/TBT pairs at Nimbus Swap. You receive 0,3% swap fees from all transactions made in these pairs. But while the swap fee level is fixed, your actual rewards depend on your pool share and the trade volume;'}</li>
      <li>{' – The rewards accrue in BNB, BUSD, and TBT, and can be withdrawn when burning the NFT'}</li>
    </TokenTooltip>
  )
  const getRoute = () => {}
  return (
    <>
      <Container>
        <TokenCard
          lendTooltipContent={LendTooltipContentBNB}
          lPRewardsTooltipContent={LPRewardsTooltipContentBNB}
          lPStakingTooltipContent={LPStakingTooltipContentBNB}
          currencyLogo={BNBcurrency}
          imageNft={nftOne96}
          historyRoute={'/dapps/getNFT-BNB'}
          tokenName={'Smart LP'}
          tokenStatus={'Live'}
          amount={convertToHuman(minAmountBNBToken, '18')}
          lendAPR={aprBNB}
          orangeBtnName={'Get Smart LP'}
          grayBtnName={'How it works'}
          modalTitle="BNB"
          openModal={setIsOpenModal}
          currentModal={openCurrentModal}
        />
        {/* <TokenCard
          lendTooltipContent={LendTooltipContentBNB}
          lPRewardsTooltipContent={LPRewardsTooltipContentBUSD}
          lPStakingTooltipContent={LPStakingTooltipContentBNB}
          currencyLogo={BUSDcurrency}
          imageNft={nftOne98}
          historyRoute="/dapps/getNFT-BUSD"
          tokenName={'Smart LP'}
          tokenStatus={'Live'}
          amount="500"
          amount={convertToHuman(String(minAmountBUSDToken), '18')}
          lendAPR={aprBUSD}
          orangeBtnName={'Get Smart LP'}
          grayBtnName={'How it works'}
          modalTitle="BUSD"
          openModal={setIsOpenModal}
          currentModal={openCurrentModal}
        /> */}
        <CloseTokenCard
          currencyLogo={DefaultLogo}
          imageNft={nftOne95}
          tokenName={'Smart Staker'}
          tokenStatus={'In development'}
          amount={'--'}
        />
      </Container>
      <ModalNFT isOpen={isOpenModal} handleClose={closeModal} currensyName={currensyName} />
    </>
  )
}

export const TokensSmollList = () => {

  const [minAmountBNBToken, setMinAmountBNBToken] = useState('0.00')
  const [minAmountBUSDToken, setMinAmountBUSDToken] = useState('0.00')
  //
  const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_NETWORK_URL)
  const NFT_CONTRACT = new web3.eth.Contract(Abi as AbiItem, process.env.REACT_APP_NFT_TOKEN_CONTRACT_BNB)
  //
  const NFT_ADDRESS_CONTRACT_BUSD = new web3.eth.Contract(
    Abi_Contract as AbiItem,
    process.env.REACT_APP_NFT_TOKEN_CONTRACT
  )
  // получение стоимости за Token BNB
  const getMinPurchase = async () => {
    const minPurchaseBNB = await NFT_CONTRACT.methods.minPurchaseAmount().call()
    setMinAmountBNBToken(minPurchaseBNB)

    const minPurchaseBUSD = await NFT_ADDRESS_CONTRACT_BUSD.methods.minPurchaseAmount().call()
    setMinAmountBUSDToken(minPurchaseBUSD)
  }
  useEffect(() => {
    getMinPurchase()
  }, [minAmountBNBToken])

  return (
    <Container>
      <SmollTokenCard
        currencyLogo={BNBcurrency}
        tokenName={'Smart LP'}
        tokenStatus={'Live'}
        currency="BNB"
        imageNft={nftOne96}
        amount={convertToHuman(minAmountBNBToken, '18')}
      />
      {/* <SmollTokenCard
        currencyLogo={BUSDcurrency}
        tokenName={'Smart LP'}
        tokenStatus={'Live'}
        currency="BUSD"
        imageNft={nftOne98}
        amount={convertToHuman(String(minAmountBUSDToken), '18')}
      /> */}
      <SmollTokenCard
        isClose={true}
        currencyLogo={DefaultLogo}
        imageNft={nftOne95}
        tokenName={'Smart Staker'}
        tokenStatus={'In development'}
        amount="--"
      />
    </Container>
  )
}
