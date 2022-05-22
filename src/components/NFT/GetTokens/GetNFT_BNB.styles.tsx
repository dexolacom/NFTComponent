import styled from 'styled-components'
import { FlexDivBase_v_1, FlexDivBase_v_2, Base_UL_v_1, Base_Flex_LI_v_1 } from '../helpers'
import { colors } from '../../../theme/index'

interface Props {
  warning: boolean
}
const BaseSpan = styled.span`
  font-size: 14px;
  line-height: 24px;
`
const BaseFontSize = styled.span`
  font-size: 14px;
  line-height: 20px;
`
const BaseAmount = styled.div`
  color: ${colors(false).text6};
  line-height: 20px;
  font-size: 14px;
`

export const StakingTooltip = styled.ul`
  padding-left: 0;
  list-style: none;
  & > li:not(:last-child) {
    margin-bottom: 10px;
  }
`

export const GetNFTContainer = styled.div`
  width: 100%;
  display: flex;
  @media (max-width: 900px) {
    margin: 0 auto;
    flex-direction: column;
    justify-content: space-between;
    /* background-color: #696666; */
  }
`

export const FormContainer = styled(FlexDivBase_v_1)`
  width: 350px;
  min-height: 460px;
  margin-top: 50px;
  @media (max-width: 900px) {
    width: 335px;
  }
`

export const PageContent = styled.div`
  /* background-color: #4e3b3b; */
  @media (max-width: 900px) {
    margin: 0 auto;
  }
`
export const StepsStyle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px;
  @media (max-width: 900px) {
    margin-top: -70px;
  }
`
// StepsStyle
export const Ul = styled(Base_UL_v_1)``
export const LiHeading = styled(Base_Flex_LI_v_1)`
  width: 100%;
  margin-bottom: 22px;
`
export const LiAmount = styled(Base_Flex_LI_v_1)`
  width: 100%;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 24px;
  }
`

export const SpanTextHead = styled.span`
  font-size: 24px;
  line-height: 28px;
  color: ${colors(false).text1};
`
export const SpanText = styled(BaseSpan)`
  color: ${colors(false).text2};
`
export const SpanAmount = styled(BaseSpan)`
  color: ${colors(false).text1};
`

export const InputWrapper = styled(FlexDivBase_v_1)`
  width: 100%;
  height: 108px;
  border: 0.5px solid #888888;
  border-radius: 4px;
  padding: 15px;
  background: ${colors(false).bg7};
`
export const AmountContainer = styled(FlexDivBase_v_2)``
export const GetTokenDiv = styled(FlexDivBase_v_2)`
  align-items: center;
  height: 40px;
`
export const AmountDiv = styled(BaseAmount)``
export const BalanceDiv = styled(BaseAmount)``

export const InputNft = styled.input`
  width: 160px;
  height: 40px;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  color: ${colors(false).text1};
  background: transparent;
  outline: none;
  border: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${colors(false).text6};
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
  }
`
export const Сurrency = styled.span`
  width: 92px;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: ${colors(false).bg6};
  border-radius: 4px;
`
export const СurrencyIcon = styled.span`
  width: 20px;
  height: 20px;
`

export const СurrencyName = styled.span``
export const MaxBtn = styled.button`
  height: 40px;
  font-weight: 600;
  background: ${colors(false).grey2};
  font-size: 14px;
  line-height: 20px;
  color: black;
  outline: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

export const BalanceAmount = styled(BaseFontSize)<Props>`
  color: ${props => (props.warning ? colors(false).text7 : colors(false).text1)};
`

export const ErrorBalance = styled.p`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: ${colors(false).text7};
  letter-spacing: 0.2px;
`

export const InfoContainer = styled.div`
  width: 151px;
  display: flex;
  /* justify-content: space-between; */
  justify-content: flex-end;
  align-items: center;
`
export const BtnContainer = styled(FlexDivBase_v_1)`
  height: 100px;
  margin-top: 20px;
`
export const WarningBanner = styled(BaseFontSize)`
  display: flex;
  align-items: center;
  margin: 0 0 25px 0;
  font-weight: 500;
  color: ${colors(false).text8};

  img {
    margin-right: 10px;
  }
`
