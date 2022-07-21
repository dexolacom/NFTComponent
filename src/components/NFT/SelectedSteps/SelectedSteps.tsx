// @ts-nocheck
import React, { useState, useEffect } from 'react'
import Button from '../Button/Button'
//
import nftOne95 from '../../../assets/images/Nft-img/nft-one-95.png'
import nftTwo95 from '../../../assets/images/Nft-img/nft-two-95.png'
import nftHree95 from '../../../assets/images/Nft-img/nft-three-95.png'
//
import nftOne96 from '../../../assets/images/Nft-img/nft-one-96.png'
import nftTwo96 from '../../../assets/images/Nft-img/nft-two-96.png'
import nftHree96 from '../../../assets/images/Nft-img/nft-three-96.png'
//
import nftOne98 from '../../../assets/images/Nft-img/nft-one-98.png'
import nftTwo98 from '../../../assets/images/Nft-img/nft-two-98.png'
import nftHree98 from '../../../assets/images/Nft-img/nft-three-98.png'

// icon card
import Frame_0 from '../../../assets/images/Nft-img/icon/Frame_0.svg'
import Frame_1 from '../../../assets/images/Nft-img/icon/Frame_1.svg'
import Frame_2 from '../../../assets/images/Nft-img/icon/Frame_2.svg'
import Frame_4 from '../../../assets/images/Nft-img/icon/Frame_4.svg'

import BurnModal from '../Modal/BurnModal/BurnModal'
import MoreInfoModal from '../Modal/MoreInfoModal/MoreInfoModal'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import Abi from '../abi_nft.json'
import { convertToHuman } from '../../../hooks/useConvertToHuman'
import { ErrorModal, SuccessModal } from '../../CustomModal/StatusModals'
import { PendingModal } from '../MadalPending/PendingModal'
//import { useWalletModalToggle } from '../../../state/application/hooks'
//
import Abi_nbu_pair from '../abi_nbu-pair.json'
import Abi_Token from '../abi_token_busd.json'
import Abi_Contract from '../abi_contract_busd.json'
import { AbiItem } from 'web3-utils'
// функции подсчета суммы наград
import { getTotal, getResult, getResultPoolBNB, getResultBNB, getSumResult } from './TotalRewrads'

import {
  Container,
  SelectedListNFTcode,
  SelectedStepsTitle,
  BtnContainer,
  ConnectWallet,
  CardContainer,
  TokenImg,
  List,
  ListItem,
  ListItemLi,
  TokenDiv,
  ListItemContainer,
  ListItemIcon,
  ListItemAmount,
  ListItemTitle,
  Lane,
  SpanFlex,
  ListItemAmountRewards,
  ListItemTitleRewards
} from './SelectedSteps.styles'
import { findAllByAltText } from '@testing-library/react'

const SelectedSteps = () => {
  //const toggleWalletModal = useWalletModalToggle()
  const { account, chainId } = useWeb3React()
  // bnb
  const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_NETWORK_URL)
  const NFT_CONTRACT = new web3.eth.Contract(Abi as AbiItem, process.env.REACT_APP_NFT_TOKEN_CONTRACT_BNB)
  // busd
  // REACT_APP_NFT_TOKEN_CONTRACT aprove allowens
  const BUSD_TOKEN = new web3.eth.Contract(Abi_Token as AbiItem, process.env.REACT_APP_NFT_CONTRACT_BUSD)
  // REACT_APP_NFT_CONTRACT_BUSD  методы
  const NFT_ADDRESS_CONTRACT_BUSD = new web3.eth.Contract(
    Abi_Contract as AbiItem,
    process.env.REACT_APP_NFT_TOKEN_CONTRACT
  )
  //
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenInfo, setIsOpenInfo] = useState(false)
  const [isSuccessModal, setIsSuccessModal] = useState(false)
  const [isErrorModal, setIsErrorModal] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPendingModal, setIsPendingModal] = useState(false)
  const [modalTokenId, setTokenIdModal] = useState(null)
  //
  const [tokenRewardsBNB, setTokenRewardsBNB] = useState([])
  const [tokenRewardsBUSD, setTokenRewardsBUSD] = useState([])
  const [allRewardsToken, setAllRewardsToken] = useState([])
  //
  const [burnAmount, setBurnAmount] = useState([])
  const [currentToken, setCurrentToken] = useState([])

  const [pools, setPools] = useState({
    poolBNB: '0.000',
    poolNBU: '0.000',
    poolGNBU: '0.000',
    poolBUSD: '0.000',
    lpStaking: '0.000',
    lend: '0.000',
    deposit: '0.000',
    totalBNB: '0.000',
    totalNBU: '0.000',
    totalGNBU: '0.000',
    totalBUSD: '0.000'
  })
  // lpBnbTbtUserRewards and lpBnbBusdUserRewards of all tokens
  const [tokenRewardsAmounts, setTokenRewardsAmounts] = useState([])
  // Total Amounts Of Rewards of all tokens
  const [totalAmountsOfRewards, setTotalAmountsOfRewards] = useState([])

  //const [totals, setTotals] = useState({ totalBNB: '0.000', totalNBU: '0.000', totalGNBU: '0.000', totalBUSD: '0.000' })
  const [totalsWithTBT, setTotalsWithTBT] = useState({ totalBNB: '0.000', totalBUSD: '0.000', totalTBT: '0.000' })
  // все токены купленые юзером
  const [userAllTokens, setUserAllTokens] = useState([])
  // получаем буквы для отображения валюты BNB && BUSD ...
  const [tokenCurrency, setTokenCurrency] = useState('')
  // image token card

  //  получение всех id token BUSD которые пренадлежат акаунту
  const getUserTokenIdBUSD = async () => {
    const getTokenId = await NFT_ADDRESS_CONTRACT_BUSD.methods.getUserTokens(account).call()
    const transferIdToken = getTokenId?.map((id: string) => getBUSDToken(id))
  }
  const getBUSDToken = async (id: string) => {
    const getTokenData = await NFT_ADDRESS_CONTRACT_BUSD.methods
      .tikSupplies(id)
      .call()
      .then((data: any) => {
        const newData = [...userAllTokens, data].map(el => ({ ...el, isOpen: false, currency: 'BUSD' }))
        setUserAllTokens(prev => [...prev, ...newData])
      })
  }
  //  получение всех id token BNB которые пренадлежат акаунту
  const getUserTokenIdBNB = async () => {
    const getTokenId = await NFT_CONTRACT.methods.getUserTokens(account).call()
    const transferIdToken = getTokenId?.map((id: string) => getBNBTokens(id))
    const tokenRewardsAmounts = getTokenId?.map((id: string) => getTokenRewardsAmounts(id))
    const totalRewardsAmounts = getTokenId?.map((id: string) => getTotalAmountsOfRewards(id))
  }
  // получение обькта nft по id TokenId
  const getBNBTokens = async (id: string) => {
    const getTokenData = await NFT_CONTRACT.methods
      .tikSupplies(id)
      .call()
      .then((data: any) => {
        const newData = [...userAllTokens, data].map(el => ({ ...el, isOpen: false, currency: 'BNB' }))
        setUserAllTokens(prev => [...prev, ...newData])
      })
  }
  // receiving token rewards
  const getTokenRewardsAmounts = async (id: string) => {
    const tokenRewards = await NFT_CONTRACT.methods
      .getTokenRewardsAmounts(id)
      .call()
      .then((data: any) => {
        const newData = [...tokenRewardsAmounts, data].map(el => ({ ...el, tokenID: id }))
        setTokenRewardsAmounts(prev => [...prev, ...newData])
      })
  }
  // receiving total amount of Rewards
  const getTotalAmountsOfRewards = async (id: string) => {
    const tokenTotalRewards = await NFT_CONTRACT.methods
      .getTotalAmountsOfRewards(id)
      .call()
      .then((data: any) => {
        const newData = [...totalAmountsOfRewards, {tbtReward: data}].map(el => ({ ...el, tokenID: id }))
        setTotalAmountsOfRewards(prev => [...prev, ...newData])
      })
  }

  useEffect(() => {
    getUserTokenIdBNB()
    // getUserTokenIdBUSD()
  }, [])

  // получение и обновление BUSD сымы rewards

  useEffect(() => {
    setAllRewardsToken(tokenRewardsBNB.concat(tokenRewardsBUSD))
  }, [tokenRewardsBNB, tokenRewardsBUSD])

  useEffect(() => {}, [allRewardsToken])

  const getRewardsBUSD = () => {
    // BUSD ID
    const getTokenBUSDId = userAllTokens
      ?.filter(el => el.currency === 'BUSD' && el.IsActive === true)
      ?.map(el => el.TokenId)
    const transferBUSDTokenId = getTokenBUSDId?.map((id: string) => getUpdateRewardsBUSD(id))

    Promise.all(transferBUSDTokenId).then(data => {
      const result = data.map((item, index) => {
        return {
          userRewards: +item?.nbuReward,
          rewardTokenId: getTokenBUSDId[index]
        }
      })
      setTokenRewardsBUSD(result)
    })
  }

  // получение и обновление BNB сымы rewards
  const getRewardsBNB = () => {
    //BNB
    const getTokenBNBId = userAllTokens
      ?.filter(el => el.currency === 'BNB' && el.IsActive === true)
      ?.map(el => el.TokenId)
    const transferBNBTokenId = getTokenBNBId?.map((id: string) => getUpdateRewardsBNB(id))

    Promise.all(transferBNBTokenId).then(data => {
      const result = data.map((item, index) => {
        return {
          userRewards: Number(item?.lpBnbGnbuUserRewards) + Number(item?.lpBnbNbuUserRewards),
          rewardTokenId: getTokenBNBId[index]
        }
      })
      setTokenRewardsBNB(result)
    })
    //BNB
  }

  const getUpdateRewardsBNB = (id: string) => {
    return NFT_CONTRACT.methods.getTokenRewardsAmounts(id).call()
  }
  const getUpdateRewardsBUSD = (id: string) => {
    return NFT_ADDRESS_CONTRACT_BUSD.methods.getTotalAmountsOfRewards(id).call()
  }
  // очистка интервала - по другому ошибка (clearInterval is a window error bla bla bla ...)
  const clearInterval = () => {
    return () => clearInterval(intervalId)
  }
  // обновление суммы Rewards каждые 45 сек
  useEffect(() => {
    getRewardsBNB()
    getRewardsBUSD()

    const fetchFunc = () => {
      getRewardsBNB()
      getRewardsBUSD()
    }
    const intervalId = setInterval(() => {
      fetchFunc()
    }, 45000)
    clearInterval(intervalId)
  }, [userAllTokens])

  // получение суммы Rewards для отображения
  const getRewardAmount = (id: string) => {
    const tokenReward = allRewardsToken?.find(el => el.rewardTokenId === id)
    if (tokenReward) {
      return convertToHuman(String(tokenReward?.userRewards), 18).toFixed(5)
    } else return '0.0000'
  }
  // getting the lpBnbBusdUserRewards amount to display
  const getLPBUSD = (id: string) => {
    const tokenReward = tokenRewardsAmounts?.find(el => el.tokenID === id)
    if (tokenReward) {
      return convertToHuman(String(tokenReward?.lpBnbBusdUserRewards), 18).toFixed(5)
    } else return '0.0000'
  }
  // getting the lpBnbTbtUserRewards amount to display 
  const getLPTBT = (id: string) => {
    const tokenReward = tokenRewardsAmounts?.find(el => el.tokenID === id)
    if (tokenReward) {
      return convertToHuman(String(tokenReward?.lpBnbTbtUserRewards), 18).toFixed(5)
    } else return '0.0000'
  }
  // getting the totalAmountsOfRewardsTBT amount to display 
  const getTotalAmountsOfRewardsTBT = (id: string) => {
    const tokenReward = totalAmountsOfRewards?.find(el => el.tokenID === id)
    if (tokenReward) {
      return convertToHuman(String(tokenReward?.tbtReward), 18).toFixed(5)
    } else return '0.0000'
  }
  // определение по какому контракту действовать
  const getCurrentContract = (id: string) => {
    const currentToken = userAllTokens.find(el => el.TokenId === id)

    let currentСontract = ''
    if (currentToken.currency === 'BNB') {
      currentСontract = NFT_CONTRACT
    }
    if (currentToken.currency === 'BUSD') {
      currentСontract = NFT_ADDRESS_CONTRACT_BUSD
    }

    return currentСontract
  }

  // подтверждение получения награды
  const aproveRewardsUser = async (id: string) => {
    const withdrawUserRewards = await getCurrentContract(id)
      .methods.withdrawUserRewards(id)
      .send({ from: account })
      .on('transactionHash', function(hash) {
        setIsPendingModal(true)
      })
      .on('receipt', function(receipt) {
        setIsSuccessModal(true)
      })
      .on('error', function(error, receipt) {
        setIsErrorModal(true)
      })
  }

  // сжигание токена
  const redeemToken = async (id: string) => {
    const currentToken = userAllTokens.find(el => el.TokenId === id)
    let currentСontract = ''
    if (currentToken.currency === 'BNB') {
      //currentСontract = NFT_CONTRACT.methods.burnSmartLP(id)
      currentСontract = NFT_CONTRACT.methods.burnSmartStaker(id)
    }
    if (currentToken.currency === 'BUSD') {
      currentСontract = NFT_ADDRESS_CONTRACT_BUSD.methods.burnSmartLender(id)
    }

    setIsOpen(false)
    const tokenBurning = await currentСontract
      .send({ from: account })
      .on('transactionHash', function(hash) {
        setIsPendingModal(true)
      })
      .on('receipt', function(receipt) {
        setIsSuccessModal(true)
        const reloadTokens = userAllTokens.map(el => (el.TokenId === id ? { ...el, IsActive: false } : el))
        setUserAllTokens(reloadTokens)
      })
      .on('error', function(error, receipt) {
        setIsErrorModal(true)
      })
  }

  const handleClose = e => {
    e.stopPropagation()
    e.preventDefault()
    setIsSuccessModal(false)
    setIsPendingModal(false)
    setIsErrorModal(false)
    setIsOpen(false)
    setIsModalOpen(false)
    setIsOpenInfo(false)
    getRewardsBNB()
    getRewardsBUSD()
  }

  // получение награды по текущему токену который просматривают \ открыт
  const getBurnAmount = (id: string) => {
    const currentToken = userAllTokens.find(el => el.TokenId === id)
    setTokenCurrency(currentToken.currency)
    let currentСontract = ''
    if (currentToken.currency === 'BNB') {
      currentСontract = NFT_CONTRACT
    }
    if (currentToken.currency === 'BUSD') {
      currentСontract = NFT_ADDRESS_CONTRACT_BUSD
    }

    getAmount(id)
    setTokenIdModal(id)
    const reward = currentСontract.methods
      .getTokenRewardsAmounts(id)
      .call()
      .then(data => setBurnAmount(data))

    getTotalsOfToken(id)
  }
  // получение обьекта  с ценой токена
  const getAmount = (id: string) => {
    const currentActiveToken = userAllTokens?.filter(el => el.IsActive === true).find(el => el.TokenId === id)
    setCurrentToken(currentActiveToken)
  }

  const GetPair = async (b: string, c: string) => {
    // nimbus pair BNB_NBU_Pair
    const contractBNB_NBU = '0x016AAECe9C13F09aD8FAD1A104266795df97d3a7'
    // nimbus pair BNB_GNBU_Pair
    const contractBNB_GNBU = '0x7496Bfbdf1B26eFf11B9311900Ab5cC0FEe4c16C'

    const BNB_NBU_PAIR = new web3.eth.Contract(Abi_nbu_pair as AbiItem, contractBNB_NBU)
    const BNB_GNBU_PAIR = new web3.eth.Contract(Abi_nbu_pair as AbiItem, contractBNB_GNBU)

    const totalSupplyBNB_NBU_PAIR = await BNB_NBU_PAIR.methods.totalSupply().call()
    const result0 =
      Number(convertToHuman(currentToken?.NbuBnbLpAmount, '18')) / Number(convertToHuman(totalSupplyBNB_NBU_PAIR, '18'))

    const totalSupplyBNB_GNBU_PAIR = await BNB_GNBU_PAIR.methods.totalSupply().call()
    const result1 =
      Number(convertToHuman(currentToken?.GnbuBnbLpAmount, '18')) /
      Number(convertToHuman(totalSupplyBNB_GNBU_PAIR, '18'))

    const getReservesBNB_NBU = await BNB_NBU_PAIR.methods.getReserves().call()
    const getReservesBNB_GNBU = await BNB_GNBU_PAIR.methods.getReserves().call()

    const poolNBU = Number(result0) * Number(convertToHuman(getReservesBNB_NBU[1], '18')) //1
    const poolGNBU = Number(result1) * Number(convertToHuman(getReservesBNB_GNBU[0], '18')) //0

    if (poolNBU && poolGNBU) {
      setPools(prev => ({
        ...prev,
        poolBNB: getResultPoolBNB(poolNBU, poolGNBU),
        poolNBU: getSumResult(
          currentToken?.PoolNbuAmount,
          burnAmount?.lpBnbGnbuUserRewards,
          burnAmount?.lpBnbNbuUserRewards
        ),
        poolGNBU: currentToken?.PoolGnbuAmount,
        totalBNB: getResultBNB(
          currentToken?.LendedBNBAmount,
          burnAmount?.lendedUserRewards,
          String(poolNBU),
          String(poolGNBU)
        ),
        totalNBU: getSumResult(
          currentToken?.PoolNbuAmount,
          burnAmount?.lpBnbGnbuUserRewards,
          burnAmount?.lpBnbNbuUserRewards
        ),
        totalGNBU: String(poolNBU)
      }))

      // setTotals(prev => ({
      //   ...prev,
      //   totalNBU: getSumResult(currentToken?.PoolNbuAmount, b, c),
      //   totalBNB: getResultBNB(
      //     currentToken?.LendedBNBAmount,
      //     burnAmount?.lendedUserRewards,
      //     String(poolNBU),
      //     String(poolGNBU)
      //   ),
      //   totalGNBU: currentToken?.PoolGnbuAmount
      // }))
    }
  }

  useEffect(() => {
    if (currentToken.currency === 'BUSD') {
      setPools(prev => ({
        ...prev,
        poolBNB: currentToken?.PoolBnbAmount,
        poolNBU: getResult(
          currentToken?.PoolNbuAmount,
          burnAmount?.lpBnbNbuUserRewards,
          burnAmount?.lpNbuBusdUserRewards
        ),
        poolBUSD: currentToken?.PoolBusdAmount,
        lpStaking: getRewardAmount(currentToken.TokenId),
        lend: getTotal(currentToken?.LendedBusdAmount, burnAmount?.lendedUserRewards),
        deposit: currentToken?.ProvidedBusd,
        //
        totalBNB: currentToken?.PoolBnbAmount,
        totalNBU: getResult(
          currentToken?.PoolNbuAmount,
          burnAmount?.lpBnbNbuUserRewards,
          burnAmount?.lpNbuBusdUserRewards
        ),
        totalBUSD: getResult(
          currentToken?.PoolBusdAmount,
          currentToken?.LendedBusdAmount,
          burnAmount?.lendedUserRewards
        )
      }))

      // setTotals(prev => ({
      //   ...prev,
      //   totalBNB: currentToken?.PoolBnbAmount,
      //   totalNBU: getResult(
      //     currentToken?.PoolNbuAmount,
      //     burnAmount?.lpBnbNbuUserRewards,
      //     burnAmount?.lpNbuBusdUserRewards
      //   ),
      //   totalBUSD: getResult(
      //     currentToken?.PoolBusdAmount,
      //     currentToken?.LendedBusdAmount,
      //     burnAmount?.lendedUserRewards
      //   )
      // }))
    }

    if (currentToken.currency === 'BNB') {
      GetPair(burnAmount?.lpBnbGnbuUserRewards, burnAmount?.lpBnbNbuUserRewards)

      setPools(prev => ({
        ...prev,
        lpStaking: getRewardAmount(currentToken?.TokenId),
        lend: getTotal(currentToken?.LendedBNBAmount, burnAmount?.lendedUserRewards),
        deposit: currentToken?.ProvidedBnb
      }))
    }
  }, [currentToken, burnAmount, allRewardsToken])
  
  const getTotalsOfToken = (id: string) => {
    const tikSupplies = userAllTokens?.find(el => el.TokenId === id)
    const tbtReward = totalAmountsOfRewards?.find(el => el.tokenID === id).tbtReward;
    if (tikSupplies) {
      const totalsWithTBT = {
        totalBNB: convertToHuman(String(tikSupplies.ProvidedBnb / 2), 18).toFixed(5),
        totalBUSD: convertToHuman(String(tikSupplies.PoolBusdAmount), 18).toFixed(5),
        totalTBT: convertToHuman(String(Number(tikSupplies.PoolTbtAmount) + Number(tbtReward)), 18).toFixed(5)
      }

      setTotalsWithTBT(totalsWithTBT);
    }
  }

  //useEffect(() => {}, [totals, burnAmount, pools])

  // fn more info logik
  const isOpenMoreInfo = (TokenId: string) => {
    const data = userAllTokens.map(el => {
      if (el.TokenId === TokenId) {
        return {
          ...el,
          isOpen: true
        }
      }
      return {
        ...el,
        isOpen: false
      }
    })
    setUserAllTokens(data)
  }
  // token Logo
  const arrImage95 = [nftOne95, nftTwo95, nftHree95]
  const arrImage96 = [nftOne96, nftTwo96, nftHree96]
  const arrImage98 = [nftOne98, nftTwo98, nftHree98]

  return (
    <>
      {isPendingModal && <PendingModal isVisible={isPendingModal} title={'Please wait, your transaction is being processed on the blockchain...'} />}
      {isSuccessModal && <SuccessModal visible={isSuccessModal} handleClose={e => handleClose(e)} />}
      {isErrorModal && (
        <ErrorModal
          visible={isErrorModal}
          handleClose={e => handleClose(e)}
          setIsErrorModal={setIsErrorModal}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <ConnectWallet>{'Connect your wallet to see the list of NFT'}</ConnectWallet>
      <SelectedStepsTitle>{'My NFTs'} </SelectedStepsTitle>
      {!account ? (
        <>
          <div style={{ marginTop: '20px' }}>
            <Button
              className={'at-click at-connect-to-wallet-nft'}
              size={'185px'}
              height="44px"
              fontSize="14px"
              name={'Connect to a wallet'}
              color={'#fe5001'}
              //clickHandler={toggleWalletModal}
            />
          </div>
        </>
      ) : (
        <Container>
          {userAllTokens
            ?.filter(el => el.IsActive === true)
            ?.sort((a, b) => a.TokenId - b.TokenId)
            ?.map(
              (
                {
                  GnbuBnbLpAmount,
                  LendedBNBAmount,
                  NbuBnbLpAmount,
                  ProvidedBnb,
                  TokenId,
                  currency,
                  ProvidedBusd,
                  NbuBusdLpAmount,
                  LendedBusdAmount,
                  isOpen
                },
                idx
              ) => (
                <>
                  <CardContainer isActive={isOpen}>
                    <List>
                      <TokenImg
                        style={{
                          backgroundImage: `url(${currency === 'BNB' ? arrImage96[[idx] % 3] : arrImage98[[idx] % 3]})`
                        }}
                      ></TokenImg>
                      <ListItem>
                        <TokenDiv>
                          <SelectedListNFTcode>
                            {'Smart LP'} - {TokenId}
                          </SelectedListNFTcode>
                        </TokenDiv>
                      </ListItem>
                      <ListItemLi>
                        <ListItemIcon>
                          <img src={Frame_0} alt="Frame_0" />
                        </ListItemIcon>
                        <ListItemContainer>
                          <SpanFlex>
                            <ListItemAmount>
                              {currency === 'BNB'
                                ? convertToHuman(ProvidedBnb, 18).toFixed(3)
                                : convertToHuman(ProvidedBusd, 18).toFixed(3)}
                              &#160;
                            </ListItemAmount>
                            <ListItemTitle>{currency}</ListItemTitle>
                          </SpanFlex>
                          <ListItemTitle>{'Initially supplied assets'}</ListItemTitle>
                        </ListItemContainer>
                      </ListItemLi>
                      <Lane></Lane>
                      {isOpen ? (
                        <>
                          <ListItemLi>
                            <ListItemIcon>
                              <img src={Frame_2} alt="Frame_2" />
                            </ListItemIcon>
                            <ListItemContainer>
                              {/* <SpanFlex>
                                <ListItemAmount>
                                  {convertToHuman(NbuBnbLpAmount, 18).toFixed(4)}
                                  &#160;
                                </ListItemAmount>
                                <ListItemTitle>LP_NBU</ListItemTitle>
                              </SpanFlex> */}
                              <SpanFlex>
                                <ListItemAmount>
                                  {getLPBUSD(TokenId)}
                                  &#160;
                                </ListItemAmount>
                                <ListItemTitle>LP_BUSD</ListItemTitle>
                              </SpanFlex>
                              <ListItemTitle>{'LP Staking'}</ListItemTitle>
                            </ListItemContainer>
                          </ListItemLi>
                          <Lane></Lane>
                          <ListItemLi>
                            <ListItemIcon>
                              <img src={Frame_2} alt="Frame_2" />
                            </ListItemIcon>
                            <ListItemContainer>
                              {/* <SpanFlex>
                                <ListItemAmount>
                                  {currency === 'BNB'
                                    ? convertToHuman(GnbuBnbLpAmount, 18).toFixed(4)
                                    : convertToHuman(NbuBusdLpAmount, 18).toFixed(4)}
                                  &#160;
                                </ListItemAmount>
                                <ListItemTitle>{currency === 'BUSD' ? 'LP_BUSD' : 'LP_GNBU'}</ListItemTitle>
                              </SpanFlex> */}
                              <SpanFlex>
                                <ListItemAmount>
                                  {getLPTBT(TokenId)}
                                  &#160;
                                </ListItemAmount>
                                <ListItemTitle>{'LP_TBT'}</ListItemTitle>
                              </SpanFlex>
                              <ListItemTitle>{'Lp Staking'}</ListItemTitle>
                            </ListItemContainer>
                          </ListItemLi>
                          <Lane></Lane>
                          {/* <ListItemLi>
                            <ListItemIcon>
                              <img src={Frame_1} alt="Frame_1" />
                            </ListItemIcon>
                            <ListItemContainer>
                              <SpanFlex>
                                <ListItemAmount>
                                  {currency === 'BNB'
                                    ? convertToHuman(LendedBNBAmount, 18).toFixed(4)
                                    : convertToHuman(LendedBusdAmount, 18).toFixed(4)}
                                  &#160;
                                </ListItemAmount>
                                <ListItemTitle>{currency}</ListItemTitle>
                              </SpanFlex>
                              <ListItemTitle>{'Lend Pool'}</ListItemTitle>
                            </ListItemContainer>
                          </ListItemLi> 
                          <Lane></Lane> */}
                        </>
                      ) : null}
                      <ListItemLi>
                        <ListItemIcon>
                          <img src={Frame_4} alt="Frame_4" />
                        </ListItemIcon>
                        <ListItemContainer>
                          {/* <SpanFlex>
                            <ListItemAmountRewards>{getRewardAmount(TokenId)}&#160;</ListItemAmountRewards>
                            <ListItemTitle>NBU</ListItemTitle>
                          </SpanFlex> */}
                          <SpanFlex>
                            <ListItemAmountRewards>{getTotalAmountsOfRewardsTBT(TokenId)}&#160;</ListItemAmountRewards>
                            <ListItemTitle>TBT</ListItemTitle>
                          </SpanFlex>
                          <ListItemTitleRewards>{'Rewards ready for withdrawal'}</ListItemTitleRewards>
                        </ListItemContainer>
                      </ListItemLi>
                      {!isOpen ? (
                        <div style={{ marginTop: '20px' }}>
                          <Button
                            className={'at-click at-nft-btn-more-info'}
                            size={'100%'}
                            height={'44px'}
                            fontSize={'17px'}
                            name={'More info'}
                            color={'#c6d5dc51'}
                            clickHandler={() => isOpenMoreInfo(TokenId)}
                          />
                        </div>
                      ) : null}
                      {isOpen && (
                        <>
                          <BtnContainer>
                            <Button
                              className={'at-click at-nft-btn-get-rewards'}
                              size={'100%'}
                              height={'44px'}
                              fontSize={'17px'}
                              name={'Get Rewards'}
                              color={'#fe5001'}
                              clickHandler={() => aproveRewardsUser(TokenId)}
                            />
                            <Button
                              className={'at-click at-nft-btn-show-balance-info'}
                              size={'100%'}
                              height={'44px'}
                              fontSize={'17px'}
                              name={'Show Balance Info'}
                              color={'#c6d5dc51'}
                              clickHandler={() => {
                                setIsOpenInfo(true)
                                getBurnAmount(TokenId)
                              }}
                            />
                            <Button
                              className={'at-click at-nft-btn-redeem-nft'}
                              size={'100%'}
                              height={'44px'}
                              fontSize={'17px'}
                              name={'Redeem NFT'}
                              color={'#c6d5dc51'}
                              clickHandler={() => {
                                setIsOpen(true)
                                getBurnAmount(TokenId)
                              }}
                            />
                          </BtnContainer>
                        </>
                      )}
                    </List>
                  </CardContainer>
                </>
              )
            )}
        </Container>
      )}
      <MoreInfoModal
        currencyName={tokenCurrency}
        isOpen={isOpenInfo}
        tokenId={modalTokenId}
        pools={pools}
        totalsWithTBT={totalsWithTBT}
        handleClose={e => handleClose(e)}
      />
      <BurnModal
        currencyName={tokenCurrency}
        isOpen={isOpen}
        tokenId={modalTokenId}
        //totals={totals}
        totalsWithTBT={totalsWithTBT}
        handleAprove={redeemToken}
        handleClose={e => handleClose(e)}
      />
    </>
  )
}

export default SelectedSteps
