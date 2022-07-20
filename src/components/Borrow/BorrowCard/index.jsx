import React from 'react'
import { AutoColumn } from '../../Column'
import Row, { RowBetween } from '../../Row'
import { TYPE } from '../../../theme'
import { AprStatus, Card, CurrencyName, Divider, Logo } from './styles'
import { getCurrencyNameForIncognito } from '../../../pages/dApps/service'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import TokenIcon from '../TokenIcon/TokenIcon'
import { useActiveWeb3React } from '../../../hooks'

const HideCondition = styled.div`
  ${1280`
    display: none;
  `};
`

const CustomLogo = styled(Logo)`
  @media (max-width: 1280px) {
    img {
      height: 24px;
      width: 24px;
    }
  }
`

const CustomTYPEbody = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 16px;
  color: #8e8e8e;

  @media (max-width: 1280px) {
    color: #FFFFFF;
  }
`

const BorrowCard = ({ cardProps, onLoanControlHandle }) => {
  const { apr, currency, liquidity, contractAddress } = cardProps
  const formattedCurrency = currency === 'iWETH' || currency === 'iWBNB' ? currency?.slice(2) : currency?.slice(1)
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()

  return (
    <Card className={`at-click at-borrow-${formattedCurrency.toLowerCase()}`} onClick={() => onLoanControlHandle('borrow', cardProps)}>
      <Row align="top">
        <Row>
          <CustomLogo>
            <TokenIcon contractAddress={contractAddress} currency={formattedCurrency} chainId={chainId}/>
          </CustomLogo>
          <CurrencyName>
            <div style={{ display: 'block', color: 'white', fontWeight: '500', fontSize: '18px' }}>
              {formattedCurrency ? formattedCurrency : getCurrencyNameForIncognito(contractAddress, chainId)}
            </div>
            <HideCondition>
              <div style={{ display: 'block', color: '#8E8E8E', fontWeight: '600', fontSize: '14px' }}>
                {formattedCurrency ? formattedCurrency : getCurrencyNameForIncognito(contractAddress, chainId)}
              </div>
            </HideCondition>
          </CurrencyName>
        </Row>
        <AprStatus>{(+apr).toFixed(2)}% {t('borrowing.loanCard.apr')}</AprStatus>
      </Row>

      <Divider />

      <AutoColumn gap="12px">
        <RowBetween>
          <CustomTYPEbody>{t('borrowing.loanCard.apr')}</CustomTYPEbody>
          <CustomTYPEbody>{t('borrowing.borrowCard.fixed')}</CustomTYPEbody>
        </RowBetween>
        <RowBetween>
          <CustomTYPEbody>{t('borrowing.borrowCard.liquidity')}</CustomTYPEbody>
          <CustomTYPEbody>
            {liquidity < 0.000001 ? <>&lt; 0.000001</> : <>{(+liquidity).toFixed(3).replace(/(\.0+|0+)$/, '')}</>}
          </CustomTYPEbody>
        </RowBetween>
      </AutoColumn>
    </Card>
  )
}

export default BorrowCard
