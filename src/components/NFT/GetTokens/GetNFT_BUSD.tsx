// @ts-nocheck
import { useState, useEffect } from 'react'
import { LightQuestionHelper } from '../QuestionHelpers/index'
import { escapeRegExp } from '../../../utils'
import Button from '../Button/Button'
import { useHistory } from 'react-router-dom'
import { convertToHuman } from '../../../hooks/useConvertToHuman'
import { SuccessNFTModal } from '../Modal/SuccessModal/SuccessModal'
import { ErrorModal } from '../Modal/ErrorModal'
import GetHeadingText from '../ContentNft/GetHedingText/GetHeadingText'
import { PendingModal } from '../MadalPending/PendingModal'
import dAppsBinance from '../../../assets/svg/dAppsBinance.svg'
import BUSDcurrency from '../../../assets/images/Nft-img/icon/BUSDcurrency.svg'
import Loader from '../../../components/Loader'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import Abi_borrow_lends from '../../../constants/borrow-lends/logicAbi.json'
//import { useWalletModalToggle } from '../../../state/application/hooks'
import { MAX_VALUE } from '../../../constants/index'

import Abi_Token from '../abi_token_busd.json'
import Abi_Contract from '../abi_contract_busd.json'
import { AbiItem } from 'web3-utils'

import {
  FormContainer,
  StakingTooltip,
  Ul,
  LiHeading,
  LiAmount,
  SpanTextHead,
  SpanText,
  SpanAmount,
  InputWrapper,
  AmountContainer,
  GetTokenDiv,
  AmountDiv,
  BalanceDiv,
  InputNft,
  Сurrency,
  СurrencyIcon,
  СurrencyName,
  BalanceAmount,
  ErrorBalance,
  InfoContainer,
  BtnContainer,
  GetNFTContainer,
  PageContent,
  WarningBanner
} from './GetNFT_BUSD.styles'

const GetNFT_BUSD = () => {
  const { account, chainId } = useWeb3React()
  const history = useHistory()
  //const toggleWalletModal = useWalletModalToggle()
  //
  const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_NETWORK_URL)
  const BUSD_TOKEN = new web3.eth.Contract(Abi_Token as AbiItem, process.env.REACT_APP_NFT_CONTRACT_BUSD)
  const NFT_ADDRESS_CONTRACT_BUSD = new web3.eth.Contract(
    Abi_Contract as AbiItem,
    process.env.REACT_APP_NFT_TOKEN_CONTRACT
  )
  //
  const [isMissingAmountErrorText, setIsMissingAmountErrorText] = useState(false)
  const [isInSufficientErrorText, setIsInSufficientErrorText] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isErrorBalance, setIsErrorBalance] = useState(false)
  const [aprBUSD, setAprBUSD] = useState('0.00')
  const [isSuccessModal, setIsSuccessModal] = useState(false)
  const [isErrorModal, setIsErrorModal] = useState(false)
  const [isPendingModal, setIsPendingModal] = useState(false)
  const [hashTokens, setHashTokens] = useState()
  const [curentBalance, setCurentBalance] = useState(0.0)
  const [minPurchaseToken, setMinPurchaseToken] = useState('0.000')
  //
  const [missingAmount, setMissingAmount] = useState('')
  const [inputSense, setInputSense] = useState('')
  const [amountFoGas, setAmountFoGas] = useState('')
  const [isApproveFetching, setIsApproveFetching] = useState(false)
  const [allowance, setAllowanc] = useState('')

  // получение apr WBNB
  const getApr = async () => {
    const iContractBUSD = new web3.eth.Contract(Abi_borrow_lends as AbiItem, process.env.REACT_APP_NFT_LEND_APR_IBUSD)
    if (iContractBUSD) {
      const totalAssetSupply = await iContractBUSD.methods.totalAssetSupply().call()
      const apr = await iContractBUSD.methods.totalSupplyInterestRate(totalAssetSupply).call()

      setAprBUSD(web3.utils.fromWei(apr))
    }
  }

  // получение баланса NFT сонтракта busd
  const getUserBalance = async () => {
    const userBalance = await BUSD_TOKEN.methods.balanceOf(account).call()
    setCurentBalance(userBalance)
  }

  // получение стоимости за Token
  const getMinPurchase = async () => {
    const minPurchase = await NFT_ADDRESS_CONTRACT_BUSD.methods.minPurchaseAmount().call()
    setMinPurchaseToken(minPurchase)
  }

  useEffect(() => {
    getMinPurchase()
    if (account) {
      getUserBalance()
    }
    getApr()
  }, [curentBalance])

  // const onMAXbtn = () => {
  //   if (+curentBalance <= 0) {
  //     return
  //   } else getEstimatedGas(NFT_CONTRACT, curentBalance).then(res => setInputSense(res.toString()))
  //   setInputSense(curentBalance.toString())
  // }

  // валидация ввода числа
  const enforcer = (nextUserInput: string) => {
    const inputLength = nextUserInput.length
    const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)
    if (inputLength > 30) {
      return
    }
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      setInputSense(nextUserInput)
    }
  }
  // получение газа от суммы value
  const getEstimatedGas = async (contract, value) => {
    if (value !== 0) {
      const estimateGas = await contract.methods.buySmartLender(value).estimateGas({ from: account })
      const gasPrice = await web3.eth.getGasPrice()
      const gas = estimateGas * gasPrice * 1.6
      const val = value - gas
      return val / 10 ** 18
    } else if (value === 0) return
  }

  //валидация значения введенного в INPUT
  useEffect(() => {
    getEstimatedGas(NFT_ADDRESS_CONTRACT_BUSD, curentBalance).then(res => setAmountFoGas(+res * 10 ** 18))

    if (+amountFoGas < +inputSense * 10 ** 18) {
      getEstimatedGas(NFT_ADDRESS_CONTRACT_BUSD, curentBalance).then(res => setMissingAmount(res))
      setIsMissingAmountErrorText(true)
      setIsDisabled(true)
    } else if (inputSense === '') {
      setIsDisabled(true)
      setIsMissingAmountErrorText(false)
    } else {
      setIsMissingAmountErrorText(false)
      setIsDisabled(false)
      setIsErrorBalance(false)
    }

    if (+curentBalance < +minPurchaseToken) {
      setIsInSufficientErrorText(true)
      setIsErrorBalance(true)
      setIsDisabled(true)
    } else {
      setIsInSufficientErrorText(false)
      setIsErrorBalance(false)
    }

    if (inputSense === '') {
      return
    } else if (minPurchaseToken > +inputSense * 10 ** 18) {
      setIsInSufficientErrorText(true)
      setIsDisabled(true)
    } else setIsInSufficientErrorText(false)
  }, [inputSense, curentBalance, missingAmount, minPurchaseToken])

  // покупка nft
  const getToken = async () => {
    const transformationInputValue = +inputSense * 10 ** 18
    const res = BigInt(transformationInputValue).toString()

    return await NFT_ADDRESS_CONTRACT_BUSD.methods
      .buySmartLender(res)
      .send({
        from: account
        // value: transformationInputValue
      })
      .on('transactionHash', function(hash) {
        setIsPendingModal(true)
        setHashTokens(hash)
      })
      .on('receipt', function(receipt) {
        setIsSuccessModal(true)
        setInputSense('')
      })
      .on('error', function(error, receipt) {
        setIsErrorModal(true)
        setInputSense('')
      })
  }

  const getAllowance = async () => {
    const allowance = await BUSD_TOKEN.methods.allowance(account, process.env.REACT_APP_NFT_TOKEN_CONTRACT).call()
    setAllowanc(allowance)
  }

  const initialApprove = async () => {
    setIsApproveFetching(true)

    await BUSD_TOKEN.methods
      .approve(process.env.REACT_APP_NFT_TOKEN_CONTRACT, MAX_VALUE)
      .send({ from: account })
      .on('receipt', function(receipt: any) {
        setIsApproveFetching(false)
        getAllowance()
      })
      .on('error', function(error: any, receipt: any) {
        setIsApproveFetching(false)
      })
  }

  const getNFTToken = () => {
    if (+allowance > 0) {
      getToken()
    } else {
      initialApprove()
      getAllowance()
    }
  }

  useEffect(() => {
    if (account) {
      getAllowance()
    }
  }, [allowance])

  const handleClose = e => {
    e.stopPropagation()
    e.preventDefault()
    if (isSuccessModal) {
      history.push('/dapps/n-NFT-info')
    }
    setIsPendingModal(false)
    setIsSuccessModal(false)
    setIsErrorModal(false)
  }
  // Tooltip Text
  const TooltipContent = (
    <StakingTooltip>
      <li>{'Note that APR is constantly changing due to fluctuations on the market.'}</li>
      <li>{'The indicated rate reflects the current market conditions but it is not guaranteed for the future.'}</li>
    </StakingTooltip>
  )

  return (
    <>
      {isPendingModal && <PendingModal isVisible={isPendingModal} />}
      {isSuccessModal && (
        <SuccessNFTModal
          isVisible={isSuccessModal}
          handleClose={e => handleClose(e)}
          buttonText={'Go to My NFTs'}
          title={'Your NFT successfully issued'}
          hashToken={hashTokens}
        />
      )}
      {isErrorModal && <ErrorModal isVisible={isErrorModal} handleClose={e => handleClose(e)} />}
      <GetNFTContainer>
        <PageContent>
          <GetHeadingText />
          <FormContainer>
            <Ul>
              <LiHeading>
                <SpanTextHead>{'Select amount'}</SpanTextHead>
                <LightQuestionHelper text={TooltipContent} />
              </LiHeading>
              <LiAmount>
                <SpanText>{'Min amount'}</SpanText>
                <SpanAmount>{convertToHuman(String(minPurchaseToken), 18)} BUSD</SpanAmount>
              </LiAmount>
              <LiAmount>
                <SpanText>{'LP Staking APY (BNB/TBT pair):'}</SpanText>
                <SpanAmount>100%</SpanAmount>
              </LiAmount>
              <LiAmount>
                <SpanText>{'LP Staking APY (BNB/BUSD pair):'}</SpanText>
                <SpanAmount>100%</SpanAmount>
              </LiAmount>
              <LiAmount>
                <SpanText>{'Lend APR'}</SpanText>
                <SpanAmount>{(+aprBUSD).toFixed(2)}%</SpanAmount>
              </LiAmount>
            </Ul>
            <InputWrapper>
              <AmountContainer>
                <AmountDiv>{'Amount:'}</AmountDiv>
                <BalanceDiv>
                  {'Balance: '}&#160;
                  <BalanceAmount isWarning={isErrorBalance}>
                    BUSD &#160;{convertToHuman(String(curentBalance), 18).toFixed(4)}
                  </BalanceAmount>
                </BalanceDiv>
              </AmountContainer>
              <GetTokenDiv>
                <InputNft
                  className={'at-click at-nft-input'}
                  onChange={e => {
                    enforcer(e.target.value)
                  }}
                  pattern='^[0-9]*[.,]?[0-9]*$'
                  type='text'
                  placeholder='0.00'
                  inputMode='decimal'
                  autoComplete='off'
                  autoCorrect='off'
                  spellCheck='false'
                  min='1'
                  max='5'
                  value={inputSense}
                />
                <InfoContainer>
                  {/* <MaxBtn>Max</MaxBtn> */}
                  {/* <Button
                    className={'at-click at-nft-btn-max'}
                    name="Max"
                    height="40px"
                    fontSize="14px"
                    fontWeight="600"
                    clickHandler={onMAXbtn}
                  /> */}
                  {/* <MaxBtn>Max</MaxBtn> */}
                  <Сurrency>
                    <СurrencyIcon>
                      <img src={BUSDcurrency} alt='Logo BUSD' />
                    </СurrencyIcon>
                    <СurrencyName>BUSD</СurrencyName>
                  </Сurrency>
                </InfoContainer>
              </GetTokenDiv>
            </InputWrapper>
            {chainId === 56 || chainId === 97 ? (
              <>
                {isInSufficientErrorText ? (
                  <ErrorBalance>
                    {'Insufficient account balance. Min amount'}
                    {convertToHuman(+minPurchaseToken, 18).toFixed(2)} BUSD
                  </ErrorBalance>
                ) : null}
                {isMissingAmountErrorText ? (
                  <ErrorBalance>
                    {'The balance is less than the entered amount. \n Available amount'} &#160; {missingAmount}
                  </ErrorBalance>
                ) : null}
              </>
            ) : !account ? null : (
              <>
                <WarningBanner style={{ margin: '20px 0px  0px', color: 'red' }}>
                  <img src={dAppsBinance} alt='binance Logo' />
                  {'This dApp works on binance network'}
                </WarningBanner>
              </>
            )}
            <BtnContainer>
              {!account ? (
                <Button
                  className={'at-click at-nft-btn-get-nft'}
                  size={'100%'}
                  name={'Get NFT'}
                  color={'#fe5001'}
                  //clickHandler={toggleWalletModal}
                />
              ) : chainId === 56 || chainId === 97 ? (
                <Button
                  className={'at-click at-nft-btn-aprrove-nft'}
                  size={'100%'}
                  // name={'Get NFT'}
                  name={+allowance <= 0 ? 'Approve' : 'Get NFT'}
                  isDisabled={isDisabled}
                  disabledName={'Enter the amount'}
                  icon={isApproveFetching ? <Loader stroke='white' style={{ marginRight: '10px' }} /> : null}
                  color={'#fe5001'}
                  clickHandler={getNFTToken}
                />
              ) : (
                <>
                  <Button
                    className={'at-click at-btn-switchButton'}
                    //clickHandler={() => changeProvider()}
                    name={'Switch the network to Binance'}
                    size={'100%'}
                    color={'#fe5001'}
                  />
                </>
              )}
              <Button
                className={'at-click at-nft-btn-back-to-info'}
                size={'100%'}
                name={'Back to info'}
                color={'#616161'}
                clickHandler={() => history.push('/dapps/n-NFT')}
              />
            </BtnContainer>
          </FormContainer>
        </PageContent>
      </GetNFTContainer>
    </>
  )
}
export default GetNFT_BUSD
