import React from 'react'
import iconCloses from '../../../../assets/images/banners/iconCloses.png'
import Button from '../../Button/Button'
import { useHistory } from 'react-router-dom'
// import { useWeb3React } from '@web3-react/core'
// import { useWalletModalToggle } from '../../../../state/application/hooks'

import {
  StyledClosed,
  ModalBackdrop,
  Container,
  ContentWrapperNft,
  TextContainerNft,
  HeadingNft,
  HeadingTitleNft,
  List,
  ListItem,
  ListTitle,
  ButtonPlug,
  BtnContainer
} from './ModalNFT.style'

interface ModalProps {
  isOpen?: boolean
  currensyName?: string
  handleClose?: () => void
}
export const ModalNFT = ({ isOpen, handleClose, currensyName }: ModalProps) => {
  const history = useHistory()
  // const { account } = useWeb3React()
  // const toggleWalletModal = useWalletModalToggle()

  const getRouteForm = () => {
    if (currensyName === 'GNBU') {
      history.push('/dapps/getNFT-BNB')
    } else if (currensyName === 'BUSD') {
      history.push('/dapps/getNFT-BUSD')
    }
  }

  return (
    <>
      <ModalBackdrop isOpen={isOpen}>
        <ButtonPlug />
        <Container>
          <StyledClosed src={iconCloses} width={32} onClick={handleClose} />
          <ContentWrapperNft>
            <TextContainerNft>
              <HeadingNft>Smart LP</HeadingNft>
              {/* <HeadingTitleNft>
                <ListTitle>
                  With Smart LP n-NFT, your assets get distributed 
                  between the Nimbus Lend dApp (30% of assets) and Liquidity 
                  Providing to Nimbus Swap (70% of assets). As a result, you 
                  receive 3 types of rewards:
                </ListTitle>
                <List>
                  <ListItem>Flexible APR for lending;</ListItem>
                  <ListItem>{`Share of a fixed 0,3% swap fee on all trades in the BNB/NBU and BNB/${currensyName} pools;`}</ListItem>
                  <ListItem>Fixed 100% APY for staking the received LP tokens.</ListItem>
                </List>
                <ListTitle>Receive rewards in real-time, save on gas fees, and redeem your assets any time.</ListTitle>
              </HeadingTitleNft> */}
            </TextContainerNft>
          </ContentWrapperNft>
          <BtnContainer>
            <Button
              className={'at-click at-nft-btn-get-smart-lp'}
              size={'200px'}
              height={'44px'}
              fontSize={'17px'}
              name='Get Smart LP'
              color={'#fe5001'}
              clickHandler={getRouteForm}
            />
          </BtnContainer>
        </Container>
      </ModalBackdrop>
    </>
  )
}
