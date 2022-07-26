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
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import { ADDRESSES_FACTORY } from '../../../constants/borrow-lends/constants'
import Abi_borrow_lends from '../../../constants/borrow-lends/logicAbi.json'
import Abi from '../abi_nft.json'
import { AbiItem } from 'web3-utils'
//

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
  StepsStyle,
  WarningBanner
} from './GetNFT_BNB.styles'

const GetNFT_BNB = () => {
  const { account, chainId } = useWeb3React()
  const history = useHistory()
  //const toggleWalletModal = useWalletModalToggle()
  //
  const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_NETWORK_URL)
  const NFT_CONTRACT = new web3.eth.Contract(Abi as AbiItem, process.env.REACT_APP_NFT_TOKEN_CONTRACT_BNB)
  //
  const [missingAmount, setMissingAmount] = useState('')
  const [isMissingAmountErrorText, setIsMissingAmountErrorText] = useState(false)
  const [isInSufficientErrorText, setIsInSufficientErrorText] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isErrorBalance, setIsErrorBalance] = useState(false)
  const [apr, setApr] = useState('0.00')
  const [isSuccessModal, setIsSuccessModal] = useState(false)
  const [isErrorModal, setIsErrorModal] = useState(false)
  const [isPendingModal, setIsPendingModal] = useState(false)
  const [hashTokens, setHashTokens] = useState()
  //
  const [curentBalance, setCurentBalance] = useState(0.0)
  const [inputSense, setInputSense] = useState('')
  const [changeInput, setChangeInput] = useState('')
  //
  const [amountFoGas, setAmountFoGas] = useState('')
  const [minPurchaseToken, setMinPurchaseToken] = useState('0.000')

  // получение apr WBNB
  const getApr = async () => {
    const iContract = new web3.eth.Contract(Abi_borrow_lends as AbiItem, process.env.REACT_APP_NFT_LEND_APR)
    if (iContract) {
      const totalAssetSupply = await iContract.methods.totalAssetSupply().call()
      const apr = await iContract.methods.totalSupplyInterestRate(totalAssetSupply).call()
      setApr(web3.utils.fromWei(apr))
    }
  }
  // получение баланса кошелька
  useEffect(() => {
    getApr()
    if (account) {
      const balance = web3.eth.getBalance(account).then(value => setCurentBalance(value))
    }
  }, [curentBalance, account])

  // получение баланса NFT сонтракта
  const getUserBalance = async () => {
    const userBalance = await NFT_CONTRACT.methods.balanceOf(account).call()
  }

  // получение стоимости за Token
  const getMinPurchase = async () => {
    const minPurchase = await NFT_CONTRACT.methods.minPurchaseAmount().call()
    setMinPurchaseToken(minPurchase)
  }

  useEffect(() => {
    getMinPurchase()
    if (account) {
      getUserBalance()
    }
  }, [missingAmount])

  const onMAXbtn = () => {
    if (+curentBalance <= 0) {
      return
    } else getEstimatedGas(NFT_CONTRACT, curentBalance).then(res => setInputSense(res.toString()))
    setInputSense(curentBalance.toString())
  }

  // валидация ввода числа
  const enforcer = (nextUserInput: string) => {
    let inputLength = nextUserInput.length
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
      // const estimateGas = await contract.methods.buySmartLP().estimateGas({ from: account, value: value })
      const estimateGas = await contract.methods.buySmartStaker().estimateGas({ from: account, value: value })
      const gasPrice = await web3.eth.getGasPrice()
      const gas = estimateGas * gasPrice * 1.6
      const val = value - gas
      return val / 10 ** 18
    } else if (value === 0) return
  }

  //валидация значения введенного в INPUT
  useEffect(() => {
    getEstimatedGas(NFT_CONTRACT, curentBalance).then(res => setAmountFoGas(+res * 10 ** 18))

    if (+amountFoGas < +inputSense * 10 ** 18) {
      getEstimatedGas(NFT_CONTRACT, curentBalance).then(res => setMissingAmount(+res * 10 ** 18))
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
  }, [inputSense, curentBalance, minPurchaseToken])

  // покупка nft
  const getToken = async () => {
    const transformationInputValue = +inputSense * 10 ** 18

    return await NFT_CONTRACT.methods
      //.buySmartLP()
      .buySmartStaker()
      .send({
        from: account,
        value: transformationInputValue
      })
      .on('transactionHash', function(hash) {
        setIsPendingModal(true)
        if (hash) {
          setHashTokens(hash)
        }
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
  const getNFTToken = () => {
    getToken()
  }
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
      <li>Note that APR is constantly changing due to fluctuations on the market.</li>
      <li>The indicated rate reflects the current market conditions but it is not guaranteed for the future.</li>
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
                <SpanAmount>{convertToHuman(String(minPurchaseToken), 18)} BNB</SpanAmount>
              </LiAmount>
              <LiAmount>
                <SpanText>{'LP Staking APY (BNB/BUSD pair):'}</SpanText>
                <SpanAmount>100%</SpanAmount>
              </LiAmount>
              <LiAmount>
                <SpanText>{'LP Staking APY (BNB/TBT pair):'}</SpanText>
                <SpanAmount>100%</SpanAmount>
              </LiAmount>
              <LiAmount>
                <SpanText>{'Lend APR'}</SpanText>
                <SpanAmount>{(+apr).toFixed(2)}%</SpanAmount>
              </LiAmount>
            </Ul>
            <InputWrapper>
              <AmountContainer>
                <AmountDiv>{'Amount:'}</AmountDiv>
                <BalanceDiv>
                  {'Balance:'}&#160;
                  <BalanceAmount warning={isErrorBalance}>
                    BNB &#160;{convertToHuman(String(curentBalance), 18).toFixed(4)}
                  </BalanceAmount>
                </BalanceDiv>
              </AmountContainer>
              <GetTokenDiv>
                <InputNft
                  className={'at-click at-nft-input'}
                  onChange={e => {
                    enforcer(e.target.value)
                  }}
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  type="text"
                  placeholder="0.00"
                  inputMode="decimal"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  min="1"
                  max="5"
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
                      <img src="https://cryptologos.cc/logos/binance-coin-bnb-logo.svg" alt="LogoBNB" />
                    </СurrencyIcon>
                    <СurrencyName>BNB</СurrencyName>
                  </Сurrency>
                </InfoContainer>
              </GetTokenDiv>
            </InputWrapper>
            {chainId === 56 || chainId === 97 ? (
              <>
                {isInSufficientErrorText ? (
                  <ErrorBalance>
                    {'Insufficient account balance. Min amount'}&nbsp;
                    {convertToHuman(+minPurchaseToken, 18).toFixed(1)} BNB
                  </ErrorBalance>
                ) : null}
                {isMissingAmountErrorText ? (
                  <ErrorBalance>
                    {'The balance is less than the entered amount. \n Available amount'}
                    &#160;{convertToHuman(String(missingAmount), 18).toFixed(9)}
                  </ErrorBalance>
                ) : null}
              </>
            ) : !account ? null : (
              <>
                <WarningBanner style={{ margin: '20px 0px  0px', color: 'red' }}>
                  <img src={dAppsBinance} alt="" />
                  {'This dApp works on binance network'}
                </WarningBanner>
              </>
            )}
            <BtnContainer>
              {!account ? (
                <Button
                  className={'at-click at-nft-btn-conecct-wallet'}
                  size={'100%'}
                  name={'Get NFT'}
                  color={'#fe5001'}
                  //clickHandler={toggleWalletModal}
                />
              ) : chainId === 56 || chainId === 97 ? (
                <Button
                  className={'at-click at-nft-btn-get-nft'}
                  size={'100%'}
                  name={'Get NFT'}
                  isDisabled={isDisabled}
                  disabledName={'Enter the amount'}
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
export default GetNFT_BNB
