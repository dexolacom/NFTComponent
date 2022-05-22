// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import { DialogOverlay } from '@reach/dialog'
import { TYPE } from '../../../theme'
import { AutoColumn } from '../../../components/Column'
import { ButtonPrimary } from '../../Button'

import '@reach/dialog/styles.css'
import warning from '../../../assets/images/warning.svg'
import { BackButton } from '../../CustomModal/index'
import { useTranslation } from 'react-i18next'

export const ErrorModal = ({ isVisible, handleClose }) => {
  const { t } = useTranslation()

  return (
    <ModalBackdrop isVisible={isVisible}>
      <ScrollFix>
        <ModalPaddings>
          <ContentWrapper>
            <BackButton onClick={handleClose} className={'at-click at-nft-btn-back'} />
            <AutoColumn gap="24px" justify="center">
              <img src={warning} alt="Error" />
              <AutoColumn gap="12px" justify="center">
                <TYPE.mediumHeader>{t('statusModals.errorModal.modalTitle')}</TYPE.mediumHeader>
                <TYPE.subHeader color="#BBBBBB" fontSize="13px" style={{ textAlign: 'center' }}>
                  {t('nNFT.modal.errorModalText')}
                </TYPE.subHeader>
              </AutoColumn>
              <Button onClick={handleClose} className={'at-click at-nft-btn-tryAgain'}>
                {t('tryAgain')}
              </Button>
            </AutoColumn>
          </ContentWrapper>
        </ModalPaddings>
      </ScrollFix>
    </ModalBackdrop>
  )
}

const ModalBackdrop = styled(DialogOverlay)`
  ${props => (props.isVisible ? `display: flex;` : `display: none`)};
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(40, 40, 40, 0.8);
  z-index: 3;
`

const ScrollFix = styled.div`
  max-height: 100vh;
`

const ModalPaddings = styled.div`
  padding: 122px 0;
`

const ContentWrapper = styled.div`
  width: 356px;
  position: relative;
  padding: 24px;
  background: #343434;
  border: 1px solid #2d2d2d;
  box-sizing: border-box;
  border-radius: 24px;
`

const Button = styled(ButtonPrimary)`
  align-items: center;
  justify-content: center;
`
