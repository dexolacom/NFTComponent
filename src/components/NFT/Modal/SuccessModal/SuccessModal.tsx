// @ts-nocheck
import React from 'react'
import { TYPE } from '../../../../theme'
import { AutoColumn } from '../../../../components/Column'
import { useWeb3React } from '@web3-react/core'

import {
  ModalBackdrop,
  BaseText,
  Heading,
  Title,
  SubTitle,
  Hash,
  ScrollFix,
  Container,
  ModalPaddings,
  ContentWrapper,
  Button,
  HashLink
} from './SuccessModal.styles'

import '@reach/dialog/styles.css'
import { useTranslation } from 'react-i18next'
import success from '../../../../assets/images/success.svg'

export const SuccessNFTModal = ({ isVisible, handleClose, buttonText, hashToken }) => {
  const { t } = useTranslation()
  const { chainId } = useWeb3React()
  return (
    <ModalBackdrop isVisible={isVisible}>
      <ScrollFix>
        <ModalPaddings>
          <ContentWrapper>
            <Container>
              <img src={success} alt="success" />
              <Heading>{t('nNFT.nNFTtext.yourNFTsuccessfully')}</Heading>
              <Title>{t('nNFT.modal.mayUsingYourNFT')}</Title>
              <SubTitle>{t('nNFT.modal.tokenAddress')}</SubTitle>
            </Container>
            <HashLink
              href={
                chainId === 97 ? `https://testnet.bscscan.com/tx/${hashToken}` : `https://bscscan.com/tx/${hashToken}`
              }
              target="_blank"
            >
              <Hash>{hashToken}</Hash>
            </HashLink>
            <Button onClick={handleClose} className={'at-click at-nft-btn-close-success'}>
              {buttonText}
            </Button>
          </ContentWrapper>
        </ModalPaddings>
      </ScrollFix>
    </ModalBackdrop>
  )
}
