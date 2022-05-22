import React from 'react'
import Button from '../../Button/Button'
import { useTranslation } from 'react-i18next'
import { convertToHuman } from '../../../../hooks/useConvertToHuman'
import {
  BtnContainer,
  StyledPopupHr,
  StyledPopupTitle,
  ModalList,
  ModalListItem,
  ModalBackdrop,
  ScrollFix,
  ModalPaddings,
  ContentWrapper
} from './BurnModal.style'

interface ModalProps {
  totals: {
    totalBNB: string
    totalNBU: string
    totalGNBU: string
    totalBUSD: string
  }
  isOpen?: boolean
  currencyName?: string
  tokenId?: number | undefined
  handleClose?: () => void
  handleAprove(id: number | undefined): Function
}

const BurnModal = ({ totals, isOpen, tokenId, currencyName, handleClose, handleAprove }: ModalProps) => {
  const { t } = useTranslation()

  return (
    <>
      <ModalBackdrop isOpen={isOpen}>
        <ScrollFix>
          <ModalPaddings>
            <ContentWrapper>
              <StyledPopupHr>
                {t('nNFT.modal.burnYourNFT')} - {tokenId} ?
              </StyledPopupHr>
              <StyledPopupTitle>{t('nNFT.modal.burnMadalHeading')}</StyledPopupTitle>
              <ModalList>
                <ModalListItem>
                  {currencyName === 'BUSD' ? (
                    <>
                      {t('nNFT.modal.totalBUSD')}
                      <span>{totals.totalBUSD} BUSD</span>
                    </>
                  ) : (
                    <>
                      {t('nNFT.modal.totalBNB')}
                      <span> {convertToHuman(totals.totalBNB, '18').toFixed(5)} BNB</span>
                    </>
                  )}
                </ModalListItem>
                <ModalListItem>
                  <>
                    {t('nNFT.modal.totalNBU')}
                    <span>{Number(totals.totalNBU).toFixed(5)} NBU</span>
                  </>
                </ModalListItem>
                <ModalListItem>
                  {currencyName === 'BUSD' ? (
                    <>
                      {t('nNFT.modal.totalBNB')}
                      <span> {convertToHuman(totals.totalBNB, '18').toFixed(5)} BNB</span>
                    </>
                  ) : (
                    <>
                      {t('nNFT.modal.totalGNBU')}
                      <span>{convertToHuman(totals.totalGNBU, '18').toFixed(5)} GNBU</span>
                    </>
                  )}
                </ModalListItem>
              </ModalList>
              <BtnContainer>
                <Button
                  className={'at-click at-nft-btn-confirm'}
                  size={'100%'}
                  height={'44px'}
                  fontSize={'17px'}
                  name={t('p2p.header.confirm')}
                  fontWeight="500"
                  color={'#fe5001'}
                  clickHandler={() => handleAprove(tokenId)}
                />
                <Button
                  className={'at-click at-nft-btn-cancel'}
                  size={'100%'}
                  height={'44px'}
                  fontSize={'17px'}
                  name={t('voting.cancel')}
                  fontWeight="500"
                  color={'#c6d5dc51'}
                  clickHandler={handleClose}
                />
              </BtnContainer>
            </ContentWrapper>
          </ModalPaddings>
        </ScrollFix>
      </ModalBackdrop>
    </>
  )
}

export default BurnModal
