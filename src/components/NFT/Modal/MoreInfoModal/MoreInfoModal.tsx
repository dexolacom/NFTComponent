import React from 'react'
import Button from '../../Button/Button'
import { convertToHuman } from '../../../../hooks/useConvertToHuman'
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

  totalsWithTBT: {
    totalBNB: string
    totalBUSD: string
    totalTBT: string
  }

  isOpen?: boolean
  currencyName?: string
  currentBalance?: string
  handleClose?: () => void
}

const MoreInfoModal = ({ pools, totalsWithTBT, isOpen, currencyName, handleClose }: ModalProps) => {
  // Tooltip Text
  const TooltipContent = (
    <StakingTooltip>
      <li>
        With NFT, your assets get distributed between several financial 
        instruments to maximize your rewards. This includes swaping some 
        of your tokens. So once you redeem your NFT, you will receive some 
        of your initial assets in NBU and GNBU (these tokens are used in 
        Liquidity Providing).
      </li>
    </StakingTooltip>
  )

  return (
    <>
      <ModalBackdrop isOpen={isOpen}>
        <ScrollFix>
          <ModalPaddings>
            <ContentWrapper>
              <StyledPopupHr>
              My Total NFT Balance
                <LightQuestionHelper text={TooltipContent} />
              </StyledPopupHr>
              <StyledPopupTitle>
                Here is the total amount of the assets that back your NFT and 
                how they are distributed between dApps.
              </StyledPopupTitle>
              <ModalList>
                <ModalListItemTotal>
                  My original deposit:
                  <span>
                    {convertToHuman(pools.deposit, '18')} {currencyName}
                  </span>
                </ModalListItemTotal>
                <ModalListItemSwath></ModalListItemSwath>
                <ModalListItemTotal>Deposit with Rewards distribution</ModalListItemTotal>
                <ModalListItem>
                  {currencyName === 'BUSD' ? (
                    <>
                      Pool BUSD:
                      <span>{convertToHuman(pools.poolBUSD, '18').toFixed(5)} BUSD</span>
                    </>
                  ) : (
                    <>
                      Pool BNB:
                      <span>{convertToHuman(pools.poolBNB, '18').toFixed(5)} BNB</span>
                    </>
                  )}
                </ModalListItem>
                <ModalListItem>
                  <>
                    Pool NBU:
                    <span>{Number(pools.poolNBU).toFixed(5)} NBU</span>
                  </>
                </ModalListItem>
                <ModalListItem>
                  {currencyName === 'BUSD' ? (
                    <>
                      PoolBNB
                      <span>{convertToHuman(pools.poolBNB, '18').toFixed(5)} BNB</span>
                    </>
                  ) : (
                    <>
                      Pool GNBU:
                      <span>{convertToHuman(pools.poolGNBU, '18').toFixed(5)} GNBU</span>
                    </>
                  )}
                </ModalListItem>
                <ModalListItem>
                  LP Staking:<span>{pools.lpStaking} NBU</span>
                </ModalListItem>
                <ModalListItem>
                  Lend:
                  <span>
                    {pools.lend} {currencyName}
                  </span>
                </ModalListItem>
                <ModalListItemSwath></ModalListItemSwath>
                <ModalListItemTotal>Current total balance</ModalListItemTotal>
                <ModalListItemTotal>
                  {currencyName === 'BUSD' ? (
                    <>
                      Total BUSD:
                      <span>{pools.totalBUSD} BUSD</span>
                    </>
                  ) : (
                    <>
                      Total BNB:
                      <span>
                        {/* <span>{convertToHuman(pools.totalBNB, '18').toFixed(5)} BNB</span> */}
                        <span>{totalsWithTBT.totalBNB} BNB</span>
                      </span>
                    </>
                  )}
                </ModalListItemTotal>
                <ModalListItemTotal>
                  <>
                    {/* Total NBU: */}
                    Total BUSD:
                    <span>
                      {/* <span>{Number(pools.totalNBU).toFixed(5)} NBU</span> */}
                      <span>{totalsWithTBT.totalBUSD} BUSD</span>
                    </span>
                  </>
                </ModalListItemTotal>
                <ModalListItemTotal>
                  {currencyName === 'BUSD' ? (
                    <>
                      Total BNB:
                      <span>
                        <span>{convertToHuman(pools.totalBNB, '18').toFixed(5)} BNB</span>
                      </span>
                    </>
                  ) : (
                    <>
                      {/* Total GNBU: */}
                      Total TBT
                      <span>
                        {/* <span>{convertToHuman(pools.poolGNBU, '18').toFixed(5)} GNBU</span> */}
                        <span>{Number(totalsWithTBT.totalTBT).toFixed(5)} TBT</span>
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
                  name={'Close'}
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
