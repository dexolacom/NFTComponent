import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { LightQuestionHelper } from '../../QuestionHelper'
import { RowBetween } from '../../Row'
import { AutoColumn } from '../../Column'

import '@reach/dialog/styles.css'
import arrowIcon from '../../../assets/svg/arrow.svg'
import { Logo } from '../../Borrow/BorrowCard/styles'
import { renderIco } from '../../../pages/dApps/service'
import { useWeb3React } from '@web3-react/core'

const CustomModal = ({ isOpen, title, tipText, closeAction, formattedCurrency, children }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = 'unset')
  }, [])

  const { chainId } = useWeb3React()

  return ReactDOM.createPortal(
    <ModalBackdrop isOpen={isOpen}>
      <ScrollFix>
        <ModalPaddings>
          <ContentWrapper>
            <BackButton className={'at-click at-btn-back'} onClick={closeAction} />
            <AutoColumn gap="24px" style={{ justifyItems: 'center' }}>
              <RowBetween>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '27px' }}>
                  <ShowCondition>
                    <MiniLogo style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img src={renderIco('', formattedCurrency, chainId)} alt="Currency icon" />
                    </MiniLogo>
                  </ShowCondition>
                  {title && <div style={{ fontWeight: '500', fontSize: '20px' }}>{title}</div>}
                </div>
                {tipText && (
                  <HideCondition>
                    <LightQuestionHelper text={tipText} />
                  </HideCondition>
                )}
                <ShowCondition style={{ justifyContent: 'center', alignItems: 'center', height: '27px' }}>
                  <CloseButton onClick={closeAction} style={{ lineHeight: '1rem' }}>
                    &#215;
                  </CloseButton>
                </ShowCondition>
              </RowBetween>
              {children}
            </AutoColumn>
          </ContentWrapper>
        </ModalPaddings>
      </ScrollFix>
    </ModalBackdrop>,
    document.getElementById('root')
  )
}

export default CustomModal

const ModalBackdrop = styled.div`
  ${props => (props.isOpen ? `display: flex;` : `display: none`)};
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(40, 40, 40, 0.8);
  z-index: 2;
  overflow: auto;
`

const ScrollFix = styled.div`
  max-height: 100vh;
`

const ModalPaddings = styled.div`
  padding: 20px 0;
`

const ContentWrapper = styled.div`
  width: 390px;
  position: relative;
  padding: 24px;
  background: #343434;
  border: 1px solid #2d2d2d;
  box-sizing: border-box;
  border-radius: 24px;

  @media (max-width: 1280px) {
    min-width: 370px;
  };
`

export const BackButton = styled.div`
  width: 48px;
  height: 48px;
  background-color: #343434;
  border: 1px solid #2d2d2d;
  border-radius: 24px;
  position: absolute;
  top: 0;
  left: -72px;
  background-image: url(${arrowIcon});
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`

const HideCondition = styled.div`
  @media (max-width: 1280px) {
    display: none;
  };
`

const ShowCondition = styled.div`
  display: none;

  @media (max-width: 1280px) {
    display: flex;
  };
`

const CloseButton = styled.span`
  font-size: 30px;
  color: #bbb;

  &:hover {
    cursor: pointer;
  }
`

const MiniLogo = styled(Logo)`
  margin-right: 12px;

  img {
    width: 24px;
    height: 24px;
  }
`
