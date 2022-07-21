//import React from 'react'
import Button from '../../Button/Button'
//import { convertToHuman } from '../../../../hooks/useConvertToHuman'
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
  // totals: {
  //   totalBNB: string
  //   totalNBU: string
  //   totalGNBU: string
  //   totalBUSD: string
  // }
  totalsWithTBT: {
    totalBNB: string
    totalBUSD: string
    totalTBT: string
  }
  isOpen?: boolean
  currencyName?: string
  tokenId?: number | undefined
  handleClose?: () => void
  handleAprove(id: number | undefined): Function
}

const BurnModal = ({ 
  //totals, 
  totalsWithTBT,
  isOpen, 
  tokenId, 
  currencyName, 
  handleClose, 
  handleAprove 
}: ModalProps) => {

  return (
    <>
      <ModalBackdrop isOpen={isOpen}>
        <ScrollFix>
          <ModalPaddings>
            <ContentWrapper>
              <StyledPopupHr>
                {'Burn your NFT'} - {tokenId} ?
              </StyledPopupHr>
              <StyledPopupTitle>
                Your NFT Total Balance with Rewards will be 
                transfered to your wallet (in tokens listed below)
              </StyledPopupTitle>
              <ModalList>
                <ModalListItem>
                  {currencyName === 'BUSD' ? (
                    <>
                      Total BUSD:
                      {/* <span>{totals.totalBUSD} BUSD</span> */}
                    </>
                  ) : (
                    <>
                      Total BNB:
                      {/* <span> {convertToHuman(totals.totalBNB, '18').toFixed(5)} BNB</span> */}
                      <span> {totalsWithTBT.totalBNB} BNB</span>
                    </>
                  )}
                </ModalListItem>
                <ModalListItem>
                  <>
                    {/* Total NBU: */}
                    {/* <span>{Number(totals.totalNBU).toFixed(5)} NBU</span> */}
                    Total BUSD:
                    <span>{totalsWithTBT.totalBUSD} BUSD</span>
                  </>
                </ModalListItem>
                <ModalListItem>
                  {currencyName === 'BUSD' ? (
                    <>
                      Total BNB:
                      {/* <span> {convertToHuman(totals.totalBNB, '18').toFixed(5)} BNB</span> */}
                    </>
                  ) : (
                    <>
                      Total TBT:
                      {/* <span>{convertToHuman(totals.totalGNBU, '18').toFixed(5)} GNBU</span> */}
                      <span>{totalsWithTBT.totalTBT} TBT</span>
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
                  name={'Confirm'}
                  fontWeight="500"
                  color={'#fe5001'}
                  clickHandler={() => handleAprove(tokenId)}
                />
                <Button
                  className={'at-click at-nft-btn-cancel'}
                  size={'100%'}
                  height={'44px'}
                  fontSize={'17px'}
                  name={'Cancel'}
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
