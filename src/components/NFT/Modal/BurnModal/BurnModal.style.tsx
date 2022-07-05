import styled from 'styled-components'
import { FlexDivBase_v_1, Base_Flex_UL_v_3 } from '../../helpers'

interface Props {
  isOpen?: boolean
}

const CustomLi = styled.li`
  font-size: 14px;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
  color: #FFFFFF;
`

export const ModalBackdrop = styled.div<Props>`
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

export const ScrollFix = styled.div`
  max-height: 100vh;
`

export const ModalPaddings = styled.div`
  padding: 20px 0;
`

export const ContentWrapper = styled.div`
  width: 390px;
  /* position: relative; */
  padding: 24px;
  background: #343434;
  border: 1px solid #2d2d2d;
  box-sizing: border-box;
  border-radius: 16px;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    min-width: 370px;
  `};
`

export const StyledPopupHr = styled.h3`
  font-size: 26px;
  line-height: 28px;
  font-weight: 400;
  margin: 0 0 16px 0;
  color: #FFFFFF;
`

export const StyledPopupTitle = styled.div`
  font-size: 17px;
  line-height: 24px;
  color: #bbbbbb;
  margin: 0 0 16px 0;
`

export const BtnContainer = styled(FlexDivBase_v_1)`
  width: 100%;
  height: 105px;
`

export const ModalList = styled(Base_Flex_UL_v_3)`
  list-style: none;
  padding: 0;
  margin: 0;
  & > li {
    margin-bottom: 12px;
  }
`

export const ModalListItemSwath = styled.li`
  height: 1px;
  width: 100%;
  background-color: #c4c9d247;
`

export const ModalListItem = styled(CustomLi)``

export const ModalListItemTotal = styled(CustomLi)`
  &:last-child {
    margin-bottom: 28px;
  }
`
