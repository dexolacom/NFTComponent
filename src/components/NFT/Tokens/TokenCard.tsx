import React from 'react'
import { LightQuestionHelper } from '../QuestionHelpers/index'
import Button from '../Button/Button'
import { useHistory } from 'react-router-dom'
import { convertToHuman } from '../../../hooks/useConvertToHuman'
import Frame_1 from '../../../assets/images/Nft-img/icon/Frame_1.svg'
import Frame_2 from '../../../assets/images/Nft-img/icon/Frame_2.svg'
import Frame_3 from '../../../assets/images/Nft-img/icon/Frame_3.svg'
import { useWeb3React } from '@web3-react/core'
//import { useWalletModalToggle } from '../../../state/application/hooks'
// import DefaultLogo from '../../../assets/images/Nft-img/icon/defaultLogo.svg'
import {
  // Container,
  SmollCardContainer,
  List,
  ListItem,
  CardContainer,
  TokenImg,
  TokenDiv,
  TokenName,
  TokenStatus,
  TokenAmountDiv,
  TokenMinCost,
  TokenAmount,
  ListItemContainer,
  ListItemIcon,
  ListItemAmount,
  ListItemTitle,
  ListItemHelpers,
  BtnContainer,
  ListItemLi,
  Lane,
  TokenClosetatus,
  CloseToken
} from './Tokens.style'

interface iTokenProps {
  lendTooltipContent?: JSX.Element
  lPRewardsTooltipContent?: JSX.Element
  lPStakingTooltipContent?: JSX.Element
  historyRoute?: string
  currencyLogo?: string
  tokenName?: string
  tokenStatus?: string
  amount?: string
  lendAPR?: string
  orangeBtnName?: string
  grayBtnName?: string
  modalTitle?: string
  imageNft?: string
  // fn
  openModal(arg0: boolean): void
  currentModal(title: string): void
}
interface iCloseTokenProps {
  currencyLogo?: string
  tokenName?: string
  tokenStatus?: string
  amount?: string
  isClose?: boolean
  modalTitle?: string
  currency?: string
  imageNft?: string
}
export const TokenCard = ({
  lendTooltipContent,
  lPRewardsTooltipContent,
  lPStakingTooltipContent,
  currencyLogo,
  historyRoute,
  tokenName,
  tokenStatus,
  amount,
  lendAPR,
  orangeBtnName,
  grayBtnName,
  modalTitle,
  openModal,
  currentModal,
  imageNft
}: iTokenProps) => {
  const history = useHistory()
  const { account } = useWeb3React()
  //const toggleWalletModal = useWalletModalToggle()

  // <TokenImg
  //         style={{
  //           backgroundImage: `url(${currency === 'BNB' ? arrImage96[[idx] % 3] : arrImage98[[idx] % 3]})`
  //         }}
  //       ></TokenImg>

  return (
    <CardContainer isClose={false}>
      <List>
        <TokenImg
          style={{
            backgroundImage: `url(${imageNft})`
          }}
        ></TokenImg>
        {/* <TokenImg src={imageNft} alt="Logo NFT"></TokenImg> */}
        <ListItem>
          <TokenDiv>
            <TokenName>{tokenName}</TokenName>
            <TokenStatus>&#160;{tokenStatus}</TokenStatus>
          </TokenDiv>
          <TokenAmountDiv>
            <img src={currencyLogo} alt="Currensy logo" /> &#160;
            <TokenMinCost>Min cost: &#160;</TokenMinCost>
            <TokenAmount>
              &#160;{amount}&#160;{modalTitle}
            </TokenAmount>
          </TokenAmountDiv>
        </ListItem>
        <ListItemLi>
          <ListItemIcon>
            <img src={Frame_1} alt="Frame_1" />
          </ListItemIcon>
          <ListItemContainer>
            <ListItemAmount>{convertToHuman(String(lendAPR), '18').toFixed(2)}%</ListItemAmount>
            <ListItemHelpers>
              <LightQuestionHelper text={lendTooltipContent} />
            </ListItemHelpers>
            <ListItemTitle>Lend APR</ListItemTitle>
          </ListItemContainer>
        </ListItemLi>
        {/* border-bottom-lane */}
        <Lane></Lane>
        <ListItemLi>
          <ListItemIcon>
            <img src={Frame_2} alt="Frame_2" />
          </ListItemIcon>
          <ListItemContainer>
            <ListItemAmount>0.3%</ListItemAmount>
            <ListItemHelpers>
              <LightQuestionHelper text={lPRewardsTooltipContent} />
            </ListItemHelpers>
            <ListItemTitle>LP Reward</ListItemTitle>
          </ListItemContainer>
        </ListItemLi>
        {/* border-bottom-lane */}
        <Lane></Lane>
        <ListItemLi>
          <ListItemIcon>
            <img src={Frame_3} alt="Frame_3" />
          </ListItemIcon>
          <ListItemContainer>
            <ListItemAmount>100%</ListItemAmount>
            <ListItemHelpers>
              <LightQuestionHelper text={lPStakingTooltipContent} />
            </ListItemHelpers>
            <ListItemTitle>LP Staking APY</ListItemTitle>
          </ListItemContainer>
        </ListItemLi>
        {/* border-bottom-lane */}
        <Lane></Lane>
        <BtnContainer>
          {!account ? (
            <>
              <Button
                className={'at-click at-nft-btn-get-smart-lp'}
                size={'100%'}
                height={'44px'}
                fontSize={'17px'}
                name={orangeBtnName}
                color={'#fe5001'}
                //clickHandler={toggleWalletModal}
              />
              <Button
                className={'at-click at-nft-btn-how-it-works'}
                size={'100%'}
                height={'44px'}
                fontSize={'17px'}
                name={grayBtnName}
                color={'#c6d5dc51'}
                //clickHandler={toggleWalletModal}
              />
            </>
          ) : (
            <>
              <Button
                className={'at-click at-nft-btn-get-smart-lp'}
                size={'100%'}
                height={'44px'}
                fontSize={'17px'}
                name={orangeBtnName}
                color={'#fe5001'}
                clickHandler={() => history.push(`${historyRoute}`)}
              />
              <Button
                className={'at-click at-nft-btn-how-it-works'}
                size={'100%'}
                height={'44px'}
                fontSize={'17px'}
                name={grayBtnName}
                color={'#c6d5dc51'}
                clickHandler={() => {
                  openModal(true)
                  currentModal(`${modalTitle}`)
                }}
              />
            </>
          )}
        </BtnContainer>
      </List>
    </CardContainer>
  )
}

export const CloseTokenCard = ({ tokenName, tokenStatus, amount, currencyLogo, imageNft }: iCloseTokenProps) => {
  return (
    <CardContainer isClose={true}>
      <List>
        <TokenImg
          style={{
            backgroundImage: `url(${imageNft})`
          }}
        ></TokenImg>
        {/* <TokenImg src={imageNft} alt="Logo NFT"></TokenImg> */}
        <ListItem>
          <TokenDiv>
            <TokenName>{tokenName}</TokenName>
            <TokenClosetatus>&#160;{tokenStatus}</TokenClosetatus>
          </TokenDiv>
          <TokenAmountDiv>
            <img src={currencyLogo} alt="Currensy logo" /> &#160;
            <TokenMinCost>Min cost: &#160;</TokenMinCost>
            <TokenAmount>
              &#160;{amount}
              {/* &#160;{convertToHuman(String(amount), '18')} */}
            </TokenAmount>
          </TokenAmountDiv>
        </ListItem>
        <CloseToken></CloseToken>
        <Button
          className={'at-click at-nft-btn-coming-soon'}
          size={'100%'}
          height={'44px'}
          fontSize={'17px'}
          isDisabled={true}
          disabledName="Coming soon..."
        />
      </List>
    </CardContainer>
  )
}

export const SmollTokenCard = ({
  tokenName,
  tokenStatus,
  amount,
  currencyLogo,
  isClose,
  modalTitle,
  currency,
  imageNft
}: iCloseTokenProps) => {
  return (
    <SmollCardContainer>
      <List>
        <TokenImg
          style={{
            backgroundImage: `url(${imageNft})`
          }}
        ></TokenImg>
        <ListItem>
          <TokenDiv>
            <TokenName>{tokenName}</TokenName>
            {isClose ? (
              <TokenClosetatus>&#160;{tokenStatus}</TokenClosetatus>
            ) : (
              <TokenStatus>&#160;{tokenStatus}</TokenStatus>
            )}
          </TokenDiv>
          <TokenAmountDiv>
            <img src={currencyLogo} alt="Currensy logo" /> &#160;
            <TokenMinCost>Min cost: &#160; </TokenMinCost>
            <TokenAmount>
              &#160;{amount}&#160;{modalTitle} {currency ? currency : null}
            </TokenAmount>
          </TokenAmountDiv>
        </ListItem>
      </List>
    </SmollCardContainer>
  )
}
