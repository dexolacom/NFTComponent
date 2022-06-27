// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import HeadingText from '../../components/NFT/ContentNft/HedingText/HeadingText'
import SubTitle from '../../components/NFT/ContentNft/SubTitleText/SubTitle'
import GetNFT_BNB from '../../components/NFT/GetTokens/GetNFT_BNB'
import GetNFT_BUSD from '../../components/NFT/GetTokens/GetNFT_BUSD'
import SelectedSteps from '../../components/NFT/SelectedSteps/SelectedSteps'
import Button from '../../components/NFT/Button/Button'
import dAppsBinance from '../../assets/svg/dAppsBinance.svg'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useWeb3React } from '@web3-react/core'
import { useWalletModalToggle } from '../../state/application/hooks'
import changeProvider from '../../utils/currentNetworkChanger'
import Web3 from 'web3'
// abi
import Abi from '../../components/NFT/abi_nft.json'
import AbiContract from '../../components/NFT/abi_contract_busd.json'
import { AbiItem } from 'web3-utils'
//
import { Tokens, TokensSmollList } from '../../components/NFT/Tokens/Tokens'
//

import {
  Container,
  ContainerSelected,
  Content,
  SelectedStepsTitle,
  SelectedBtn,
  TextContainer,
  SliderContainer,
  BtnContainer,
  BtnItemSpan,
  WarningBanner
} from './index.style'

const NFT: React.FC = () => {
  const history = useHistory()
  const { t } = useTranslation()
  const { account, chainId } = useWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  // 
  const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_NETWORK_URL)
  const NFT_CONTRACT = new web3.eth.Contract(Abi as AbiItem, process.env.REACT_APP_NFT_TOKEN_CONTRACT_BNB)
  const NFT_ADDRESS_CONTRACT_BUSD = new web3.eth.Contract(
    AbiContract as AbiItem,
    process.env.REACT_APP_NFT_TOKEN_CONTRACT
  )
  //
  const [userTokens, setUserTokens] = useState([])
  const [isShowPage, setIsShowPage] = useState(false)
  //

  //  получение всех id которые пренадлежат акаунту
  const getUserTokenId = async () => {
    if (account) {
      // получние ID NFT-BNB
      const getTokenId = await NFT_CONTRACT.methods.getUserTokens(account).call()
      const transferIdToken = getTokenId?.map((id: string) => getTokensBNB(id))
      // получние ID NFT-BUSD
      const getTokenIdBUSD = await NFT_ADDRESS_CONTRACT_BUSD.methods.getUserTokens(account).call()
      const transferIdTokene = getTokenIdBUSD?.map((id: string) => getTokensBUSD(id))
    }
  }
  useEffect(() => {
    if (account) {
      getUserTokenId()
    }
  }, [])

  useEffect(() => {
    // select only active
    const activeToken = userTokens?.filter(el => el.IsActive === true)
    if (activeToken?.length > 0) {
      setIsShowPage(true)
    }
  }, [userTokens])

  // получение обькта nft по id TokenId
  const getTokensBNB = async (id: string) => {
    const getTokenData = await NFT_CONTRACT.methods
      .tikSupplies(id)
      .call()
      .then((data: any) => setUserTokens(prev => [...prev, data]))
  }
  const getTokensBUSD = async (id: string) => {
    const getTokenData = await NFT_ADDRESS_CONTRACT_BUSD.methods
      .tikSupplies(id)
      .call()
      .then((data: any) => setUserTokens(prev => [...prev, data]))
  }

  return (
    <>
      <Container>
        <Content>
          <Route
            path={'/dapps/n-NFT-info'}
            render={() => (
              <>
                <ContainerSelected>
                  <SelectedStepsTitle>{t('nNFT.nNFTtext.getMoreNft')}</SelectedStepsTitle>
                  {chainId === 56 || chainId === 97 ? (
                    <>
                      <TokensSmollList />
                      <SelectedBtn>
                        {!account ? (
                          <Button
                            className={'at-click at-nft-btn-get-smart-lender-info'}
                            size={'209px'}
                            name={t('nNFT.btnNFT.getSmartLenderNFT')}
                            color={'#fe5001'}
                            height={'44px'}
                            clickHandler={toggleWalletModal}
                          />
                        ) : (
                          <Button
                            className={'at-click at-nft-btn-get-smart-lender-info'}
                            size={'209px'}
                            height={'44px'}
                            name={t('nNFT.btnNFT.getSmartLenderNFT')}
                            color={'#fe5001'}
                            clickHandler={() => history.push('/dapps/n-NFT')}
                          />
                        )}
                      </SelectedBtn>
                      <SelectedSteps />
                    </>
                  ) : (
                    <div style={{ marginTop: '15px' }}>
                      {!account ? null : (
                        <WarningBanner>
                          <img src={dAppsBinance} alt="ibnance Logo" />
                          {t('dApps.warningBanner')}
                        </WarningBanner>
                      )}
                      <Button
                        className={'at-click at-nft-btn-switchButton'}
                        clickHandler={() => changeProvider()}
                        name={t('dApps.switchButton')}
                        size={'274px'}
                        height={'44px'}
                        color={'#fe5001'}
                      />
                    </div>
                  )}
                </ContainerSelected>
              </>
            )}
            exact
          />

          <Route
            path={'/dapps/n-NFT'}
            render={() => (
              <>
                <TextContainer>
                  <HeadingText />
                </TextContainer>
                {chainId === 56 || chainId === 97 ? (
                  !account || userTokens.length === 0 ? null : (
                    <Button
                      className={'at-click at-nft-btn-back-to-my-nft'}
                      clickHandler={() => history.push('/dapps/n-NFT-info')}
                      name={t('nNFT.btnNFT.backToMyNFT')}
                      size={'160px'}
                      height={'44px'}
                      color={'#EDEDED'}
                      nameColor={'#000'}
                      fontWeight={'500'}
                    />
                  )
                ) : (
                  <div style={{ marginTop: '15px' }}>
                    {!account ? null : (
                      <WarningBanner>
                        <img src={dAppsBinance} alt="ibnance Logo" />
                        {t('dApps.warningBanner')}
                      </WarningBanner>
                    )}
                    <Button
                      className={'at-click at-nft-btn-switchButton'}
                      clickHandler={() => changeProvider()}
                      name={t('dApps.switchButton')}
                      size={'274px'}
                      height={'44px'}
                      color={'#fe5001'}
                    />
                  </div>
                )}
                <Tokens />
              </>
            )}
            exact
          />

          <Route path={'/dapps/getNFT-BNB'} render={() => <GetNFT_BNB />} exact />
          <Route path={'/dapps/getNFT-BUSD'} render={() => <GetNFT_BUSD />} exact />
        </Content>
      </Container>
    </>
  )
}
export default NFT
