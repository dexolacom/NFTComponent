// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { LightQuestionHelper } from '../QuestionHelpers/index'
import { escapeRegExp } from '../../../utils'
import Button from '../Button/Button'
import { useHistory } from 'react-router-dom'
import { convertToHuman } from '../../../hooks/useConvertToHuman'
import { useTranslation } from 'react-i18next'
import { SuccessNFTModal } from '../Modal/SuccessModal/SuccessModal'
import { ErrorModal } from '../Modal/ErrorModal'
import GetHeadingText from '../ContentNft/GetHedingText/GetHeadingText'
import { PendingModal } from '../MadalPending/PendingModal'
import changeProvider from '../../../utils/currentNetworkChanger'
import dAppsBinance from '../../../assets/svg/dAppsBinance.svg'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import { ADDRESSES_FACTORY } from '../../../constants/borrow-lends/constants'
import Abi_borrow_lends from '../../../constants/borrow-lends/logicAbi.json'
import { useWalletModalToggle } from '../../../state/application/hooks'
// 
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
  const { t } = useTranslation()
  const { account, chainId } = useWeb3React()
  const history = useHistory()
  const toggleWalletModal = useWalletModalToggle()
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
  }, [curentBalance])

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
      const estimateGas = await contract.methods.buySmartLP().estimateGas({ from: account, value: value })
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
      .buySmartLP()
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
      <li>{t('nNFT.nNFTtoolTip.1')}</li>
      <li>{t('nNFT.nNFTtoolTip.2')}</li>
    </StakingTooltip>
  )

  return (
    <>
      {isPendingModal && <PendingModal isVisible={isPendingModal} />}
      {isSuccessModal && (
        <SuccessNFTModal
          isVisible={isSuccessModal}
          handleClose={e => handleClose(e)}
          buttonText={t('nNFT.btnNFT.goToMyNFTs')}
          title={t('nNFT.nNFTtext.yourNFTsuccessfully')}
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
                <SpanTextHead>{t('nNFT.getNFT.getNftTitle')}</SpanTextHead>
                <LightQuestionHelper text={TooltipContent} />
              </LiHeading>
              <LiAmount>
                <SpanText>{t('p2p.listingModal.minAmount')}</SpanText>
                <SpanAmount>{convertToHuman(String(minPurchaseToken), 18)} BNB</SpanAmount>
              </LiAmount>
              <LiAmount>
                <SpanText>{t('nNFT.getNFT.LP_Tokens_NBU_BNB_APR')}</SpanText>
                <SpanAmount>100%</SpanAmount>
              </LiAmount>
              <LiAmount>
                <SpanText>{t('nNFT.getNFT.LP_Tokens_GNBU_BNB_APR')}</SpanText>
                <SpanAmount>100%</SpanAmount>
              </LiAmount>
              <LiAmount>
                <SpanText>{t('nNFT.getNFT.Lend_APR')}</SpanText>
                <SpanAmount>{(+apr).toFixed(2)}%</SpanAmount>
              </LiAmount>
            </Ul>
            <InputWrapper>
              <AmountContainer>
                <AmountDiv>{t('nNFT.getNFT.amount')}</AmountDiv>
                <BalanceDiv>
                  {t('wrapMachine.balance')}&#160;
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
                    {t('nNFT.getNFT.warningInsufficient')}
                    {convertToHuman(+minPurchaseToken, 18).toFixed(2)} BNB
                  </ErrorBalance>
                ) : null}
                {isMissingAmountErrorText ? (
                  <ErrorBalance>
                    {t('nNFT.getNFT.warningBalance')}
                    &#160;{convertToHuman(String(missingAmount), 18).toFixed(9)}
                  </ErrorBalance>
                ) : null}
              </>
            ) : !account ? null : (
              <>
                <WarningBanner style={{ margin: '20px 0px  0px' }}>
                  <img src={dAppsBinance} alt="" />
                  {t('dApps.warningBanner')}
                </WarningBanner>
              </>
            )}
            <BtnContainer>
              {!account ? (
                <Button
                  className={'at-click at-nft-btn-conecct-wallet'}
                  size={'100%'}
                  name={t('nNFT.btnNFT.getNFT')}
                  color={'#fe5001'}
                  clickHandler={toggleWalletModal}
                />
              ) : chainId === 56 || chainId === 97 ? (
                <Button
                  className={'at-click at-nft-btn-get-nft'}
                  size={'100%'}
                  name={t('nNFT.btnNFT.getNFT')}
                  isDisabled={isDisabled}
                  disabledName={t('nNFT.btnNFT.enterAnotherAmount')}
                  color={'#fe5001'}
                  clickHandler={getNFTToken}
                />
              ) : (
                <>
                  <Button
                    className={'at-click at-btn-switchButton'}
                    clickHandler={() => changeProvider()}
                    name={t('dApps.switchButton')}
                    size={'100%'}
                    color={'#fe5001'}
                  />
                </>
              )}
              <Button
                className={'at-click at-nft-btn-back-to-info'}
                size={'100%'}
                name={t('nNFT.btnNFT.backToinfo')}
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
