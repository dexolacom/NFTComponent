import React from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
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
              <HeadingNft>{t('nNFT.subTitle.smartLender')}</HeadingNft>
              <HeadingTitleNft>
                <ListTitle>{t('nNFT.subTitle.heading')}</ListTitle>
                <List>
                  <ListItem>{t('nNFT.subTitle.lend')}</ListItem>
                  <ListItem>{t('nNFT.subTitle.BNB_NBUPool', { name: currensyName })}</ListItem>
                  <ListItem>{t('nNFT.subTitle.BNB_GNBUPool')}</ListItem>
                </List>
                <ListTitle>{t('nNFT.subTitle.getClick')}</ListTitle>
              </HeadingTitleNft>
            </TextContainerNft>
          </ContentWrapperNft>
          <BtnContainer>
            <Button
              className={'at-click at-nft-btn-get-smart-lp'}
              size={'200px'}
              height={'44px'}
              fontSize={'17px'}
              name="Get Smart LP"
              color={'#fe5001'}
              clickHandler={getRouteForm}
            />
          </BtnContainer>
        </Container>
      </ModalBackdrop>
    </>
  )
}
