import React from 'react'
import styled from 'styled-components'
import { DialogOverlay } from '@reach/dialog'
import { TYPE } from '../../theme'
import { AutoColumn } from '../../components/Column'
import { ButtonPrimary } from '../Button'

import '@reach/dialog/styles.css'
import success from '../../assets/images/success.svg'
import warning from '../../assets/images/warning.svg'
import error from '../../assets/images/error.svg'
import { BackButton } from './index'
import { useTranslation } from 'react-i18next'

const ModalBackdrop = styled(DialogOverlay)`
  ${props => (props.visible ? `display: flex;` : `display: none`)};
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
  padding: 12px 44px;
  align-items: center;
  justify-content: center;
`

export const ErrorModal = ({ visible, handleClose, setIsErrorModal, setIsModalOpen }) => {
  const { t } = useTranslation()
  const setModal = () => {
    setIsErrorModal(false)
    setIsModalOpen(true)
  }
  return (
    <ModalBackdrop visible={visible}>
      <ScrollFix>
        <ModalPaddings>
          <ContentWrapper>
            <BackButton onClick={handleClose} />
            <AutoColumn gap="24px" justify="center">
              <img src={warning} alt="Error" />
              <AutoColumn gap="12px" justify="center">
                <TYPE.mediumHeader>{t('statusModals.errorModal.modalTitle')}</TYPE.mediumHeader>
                <TYPE.subHeader color="#BBBBBB" fontSize="13px">
                  {t('statusModals.errorModal.modalText')}
                </TYPE.subHeader>
              </AutoColumn>
              <Button onClick={setModal}>Try again</Button>
            </AutoColumn>
          </ContentWrapper>
        </ModalPaddings>
      </ScrollFix>
    </ModalBackdrop>
  )
}

export const SuccessModal = ({ visible, handleClose, text, title, buttonText }) => {
  const { t } = useTranslation()
  return (
    <ModalBackdrop visible={visible}>
      <ScrollFix>
        <ModalPaddings>
          <ContentWrapper>
            <AutoColumn gap="24px" justify="center">
              <img src={success} alt="Error" />
              <AutoColumn gap="12px" justify="center">
                <TYPE.mediumHeader>{title ? title : t('statusModals.successModal.modalTitle')}</TYPE.mediumHeader>
                <TYPE.subHeader color="#BBBBBB" fontSize="13px">
                  {text ? text : t('statusModals.successModal.modalText')}
                </TYPE.subHeader>
              </AutoColumn>
              <Button onClick={handleClose}>
                {buttonText ? buttonText : t('statusModals.successModal.buttonText')}
              </Button>
            </AutoColumn>
          </ContentWrapper>
        </ModalPaddings>
      </ScrollFix>
    </ModalBackdrop>
  )
}

export const RedErrorModal = ({ visible, handleClose, setIsErrorModal, setIsModalOpen }) => {
  const { t } = useTranslation()
  const setModal = () => {
    setIsErrorModal(false)
    setIsModalOpen(true)
  }
  return (
    <ModalBackdrop visible={visible} onClick={handleClose}>
      <ScrollFix>
        <ModalPaddings>
          <ContentWrapper>
            {/* <BackButton onClick={handleClose} /> */}
            <AutoColumn gap="24px" justify="center">
              <img src={error} alt="Error" />
              <AutoColumn gap="12px" justify="center">
                <TYPE.mediumHeader>{t('statusModals.redErrorModal.modalTitle')}</TYPE.mediumHeader>
                <TYPE.subHeader color="#BBBBBB" fontSize="13px">
                  {t('statusModals.redErrorModal.modalText')}
                </TYPE.subHeader>
              </AutoColumn>
              <Button onClick={setModal}>{t('tryAgain')}</Button>
            </AutoColumn>
          </ContentWrapper>
        </ModalPaddings>
      </ScrollFix>
    </ModalBackdrop>
  )
}
