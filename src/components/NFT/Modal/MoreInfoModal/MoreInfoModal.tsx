import React from 'react'
import Button from '../../Button/Button'
import { convertToHuman } from '../../../../hooks/useConvertToHuman'
import { useTranslation } from 'react-i18next'
import { LightQuestionHelper } from '../../QuestionHelpers/index'

import {
  BtnContainer,
  StyledPopupHr,
  StyledPopupTitle,
  ModalList,
  ModalListItem,
  ModalListItemTotal,
  ModalBackdrop,
  ScrollFix,
  ModalPaddings,
  ContentWrapper,
  ModalListItemSwath,
  StakingTooltip
} from './MoreInfoModal.style'

interface ModalProps {
  pools: {
    poolBNB: string
    poolNBU: string
    poolGNBU: string
    poolBUSD: string
    lpStaking: string
    lend: string
    deposit: string
    totalBNB: string
    totalNBU: string
    totalGNBU: string
    totalBUSD: string
  }

  isOpen?: boolean
  currencyName?: string
  currentBalance?: string
  handleClose?: () => void
}

const MoreInfoModal = ({ pools, isOpen, currencyName, handleClose }: ModalProps) => {
  const { t } = useTranslation()
  // Tooltip Text
  const TooltipContent = (
    <StakingTooltip>
      <li>{t('nNFT.nNFTtoolTip.4')}</li>
    </StakingTooltip>
  )

  return (
    <>
      <ModalBackdrop isOpen={isOpen}>
        <ScrollFix>
          <ModalPaddings>
            <ContentWrapper>
              <StyledPopupHr>
                {t('nNFT.modal.myTotalBalance')}
                <LightQuestionHelper text={TooltipContent} />
              </StyledPopupHr>
              <StyledPopupTitle>{t('nNFT.modal.modalHeadingText')}</StyledPopupTitle>
              <ModalList>
                <ModalListItemTotal>
                  {t('nNFT.modal.myOriginalDeposit')}
                  <span>
                    {convertToHuman(pools.deposit, '18')} {currencyName}
                  </span>
                </ModalListItemTotal>
                <ModalListItemSwath></ModalListItemSwath>
                <ModalListItemTotal>{t('nNFT.modal.depositRewards')}</ModalListItemTotal>
                <ModalListItem>
                  {currencyName === 'BUSD' ? (
                    <>
                      {t('nNFT.modal.PoolBUSD')}
                      <span>{convertToHuman(pools.poolBUSD, '18').toFixed(5)} BUSD</span>
                    </>
                  ) : (
                    <>
                      {t('nNFT.modal.PoolBNB')}
                      <span>{convertToHuman(pools.poolBNB, '18').toFixed(5)} BNB</span>
                    </>
                  )}
                </ModalListItem>
                <ModalListItem>
                  <>
                    {t('nNFT.modal.PoolNBU')}
                    <span>{Number(pools.poolNBU).toFixed(5)} NBU</span>
                  </>
                </ModalListItem>
                <ModalListItem>
                  {currencyName === 'BUSD' ? (
                    <>
                      {t('nNFT.modal.PoolBNB')}
                      <span>{convertToHuman(pools.poolBNB, '18').toFixed(5)} BNB</span>
                    </>
                  ) : (
                    <>
                      {t('nNFT.modal.PoolGNBU')}
                      <span>{convertToHuman(pools.poolGNBU, '18').toFixed(5)} GNBU</span>
                    </>
                  )}
                </ModalListItem>
                <ModalListItem>
                  {t('header.tabs.lpStaking')}:<span>{pools.lpStaking} NBU</span>
                </ModalListItem>
                <ModalListItem>
                  {t('lends.lendCard.lend')}:
                  <span>
                    {pools.lend} {currencyName}
                  </span>
                </ModalListItem>
                <ModalListItemSwath></ModalListItemSwath>
                <ModalListItemTotal>{t('nNFT.modal.currentTotal')}</ModalListItemTotal>
                <ModalListItemTotal>
                  {currencyName === 'BUSD' ? (
                    <>
                      {t('nNFT.modal.totalBUSD')}
                      <span>{pools.totalBUSD} BUSD</span>
                    </>
                  ) : (
                    <>
                      {t('nNFT.modal.totalBNB')}
                      <span>
                        <span>{convertToHuman(pools.totalBNB, '18').toFixed(5)} BNB</span>
                      </span>
                    </>
                  )}
                </ModalListItemTotal>
                <ModalListItemTotal>
                  <>
                    {t('nNFT.modal.totalNBU')}
                    <span>
                      <span>{Number(pools.totalNBU).toFixed(5)} NBU</span>
                    </span>
                  </>
                </ModalListItemTotal>
                <ModalListItemTotal>
                  {currencyName === 'BUSD' ? (
                    <>
                      {t('nNFT.modal.totalBNB')}
                      <span>
                        <span>{convertToHuman(pools.totalBNB, '18').toFixed(5)} BNB</span>
                      </span>
                    </>
                  ) : (
                    <>
                      {t('nNFT.modal.totalGNBU')}
                      <span>
                        <span>{convertToHuman(pools.poolGNBU, '18').toFixed(5)} GNBU</span>
                      </span>
                    </>
                  )}
                </ModalListItemTotal>
              </ModalList>
              <BtnContainer>
                <Button
                  className={'at-click at-nft-btn-close'}
                  size={'100%'}
                  height={'44px'}
                  fontSize={'17px'}
                  name={t('statusModals.successModal.buttonText')}
                  fontWeight="500"
                  color={'#fe5001'}
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

export default MoreInfoModal
