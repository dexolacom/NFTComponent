// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import { DialogOverlay } from '@reach/dialog'
import { TYPE } from '../../../theme'
import { AutoColumn } from '../../Column'
import { ButtonPrimary } from '../../Button'
//
import Loaders from '../Loader/Loaders'
//
import '@reach/dialog/styles.css'
import { BackButton } from './index'
import { useTranslation } from 'react-i18next'

interface IProps {
  isVisible?: boolean
  title?: string
}

export const PendingModal = ({ isVisible, title }: IProps) => {
  const { t } = useTranslation()
  return (
    <ModalBackdrop isVisible={isVisible}>
      <ScrollFix>
        <ModalPaddings>
          <ContentWrapper>
            <AutoColumn gap="24px" justify="center">
              <Loaders />
              <AutoColumn gap="12px" justify="center">
                <TYPE.mediumHeader>{t('nNFT.modal.processing')}</TYPE.mediumHeader>
                <TYPE.subHeader color="#BBBBBB" fontSize="13px" lineHeight="24px">
                  {title ? title : t('nNFT.modal.modalText')}
                </TYPE.subHeader>
              </AutoColumn>
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
  text-align: center;
`

const Button = styled(ButtonPrimary)`
  height: 44px;
  align-items: center;
  justify-content: center;
`
