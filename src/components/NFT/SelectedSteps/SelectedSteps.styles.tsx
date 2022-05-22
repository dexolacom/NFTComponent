import styled from 'styled-components'
import { colors } from '../../../theme/index'
import { FlexDivBase_v_1, Base_Flex_UL_v_3, Base_Flex_LI_v_3 } from '../helpers'

interface Props {
  isActive: boolean
}

const BaseSpan = styled.span`
  font-size: 17px;
  line-height: 28px;
`

export const SelectedStepsTitle = styled.p`
  font-size: 24px;
  line-height: 28px;
  color: ${colors(false).text1};
  margin: 39px 0 28px 0;
  @media (max-width: 500px) {
    margin: 40px 0 24px 0;
  }
`
export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(372px, 372px));
  grid-column-gap: 25px;
  grid-row-gap: 25px;
  @media (max-width: 500px) {
    /* margin: 0 auto; */
    grid-column-gap: 25px;
    grid-row-gap: 25px;
    grid-template-columns: repeat(auto-fill, minmax(332px, 332px));
  }
  @media (max-width: 378px) {
    margin: 0;
  }
`

export const SelectedListTitle = styled(BaseSpan)`
  color: ${colors(false).text2};
`
export const SelectedListNFTcode = styled.div`
  font-size: 24px;
  line-height: 28px;
  color: ${colors(false).text1};

  padding: 20px 0;
`
export const BtnContainer = styled(FlexDivBase_v_1)`
  min-height: 156px;
  margin-top: 15px;
`

export const ConnectWallet = styled(BaseSpan)`
  color: ${colors(false).text9};
`
const BaseList = styled(Base_Flex_UL_v_3)`
  padding: 0;
  margin: 0;
  list-style: none;
  align-content: space-between;
`
export const CardContainer = styled(FlexDivBase_v_1)<Props>`
  width: 372px;
  height: ${props => (props.isActive ? '100%' : '407px')};
  transition: 0.1s;
  padding: 20px;
  background: ${colors(false).bg13};
  border-radius: 10px;
  @media (max-width: 915px) {
    padding: 16px;
    width: 332px;
    height: ${props => (props.isActive ? '100%' : '358px')};
  }
`

export const TokenImg = styled.div`
  width: 332px;
  height: 80px;
  overflow: hidden;
  background-position: 100%;
  background-repeat: no-repeat;
  border-radius: 8px;
  @media (max-width: 915px) {
    height: 40px;
    width: 300px;
  }
`
export const List = styled(BaseList)``
export const ListItem = styled(Base_Flex_LI_v_3)`
  padding: 0 16px;
`
export const ListItemLi = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  height: 65px;
  padding: 8px 16px;
`
export const TokenDiv = styled.div`
  display: flex;
`
export const ListItemContainer = styled.div`
  /* display: flex; */
`
export const ListItemIcon = styled.span`
  padding-right: 20px;
`
export const ListItemAmount = styled.span`
  font-size: 24px;
  line-height: 31px;
  letter-spacing: 0.03em;
  color: ${colors(false).text1};
`
export const ListItemTitle = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.03em;
  color: ${colors(false).text6};
`
export const ListItemAmountRewards = styled.p`
  margin: 0;
  font-size: 24px;
  line-height: 31px;
  letter-spacing: 0.03em;
  color: ${colors(false).text12};
`
export const ListItemTitleRewards = styled.span`
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.03em;
  color: ${colors(false).text12};
`
export const Lane = styled.div`
  width: 100%;
  height: 1px;
  margin: 12px 0;
  background-color: ${colors(false).bg12};
`
export const SpanFlex = styled.span`
  display: flex;
  align-items: center;
`
