// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import { DialogOverlay } from '@reach/dialog'
import { AutoColumn } from '../../Column'
import { ButtonPrimary } from '../../Button'
//
import Loaders from '../Loader/Loaders'
//
import '@reach/dialog/styles.css'
//import { BackButton } from './index'

interface IProps {
  isVisible?: boolean
  title?: string
}

export const PendingModal = ({ isVisible, title }: IProps) => {
  return (
    <ModalBackdrop isVisible={isVisible}>
      <ScrollFix>
        <ModalPaddings>
          <ContentWrapper>
            <AutoColumn gap="24px" justify="center">
              <Loaders />
              <AutoColumn gap="12px" justify="center">
                <div style={{ fontWeight: '500', fontSize: '20', color: '#FFFFFF'}}>{'Processing...'}</div>
                <div style={{ fontWeight: '400', fontSize: '13', color: '#BBBBBB', lineHeight: '24px'}}>
                  {title ? title : 'Please wait, your transaction is being processed on the blockchain... Soon your NFT will be issued and available in your wallet right away.'}
                </div>
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
