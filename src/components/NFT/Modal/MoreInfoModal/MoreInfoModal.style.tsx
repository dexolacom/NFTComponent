import styled from 'styled-components'
import { FlexDivBase_v_1,Base_UL_v_1 } from '../../helpers'

interface Props {
  isOpen?: boolean
}

const CustomLi = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 20px;
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
  width: 357px;
  padding: 20px;
  background: #343434;
  border: 1px solid #2d2d2d;
  box-sizing: border-box;
  border-radius: 16px;

  @media (max-width: 1280px) {
    min-width: 370px;
  };
`
export const StakingTooltip = styled.ul`
  padding-left: 0;
  list-style: none;
  & > li:not(:last-child) {
    margin-bottom: 10px;
  }
`
export const StyledPopupHr = styled.h3`
  font-size: 24px;
  line-height: 28px;
  font-weight: 400;
  margin: 0 0 16px 0;
  color: #FFFFFF;
  display: flex;
  justify-content: space-between;
`

export const StyledPopupTitle = styled.div`
  font-size: 17px;
  line-height: 24px;
  color: #bbbbbb;
  margin: 0 0 16px 0;
`

export const BtnContainer = styled(FlexDivBase_v_1)`
  width: 100%;
`

export const ModalList = styled(Base_UL_v_1)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > li {
    margin-bottom: 12px;
  }
`

export const ModalListItemSwath = styled.li`
  height: 1px;
  width: 100%;
  background-color: #c4c9d247;
`

export const ModalListItem = styled(CustomLi)`
  color: #bbbbbb;
`

export const ModalListItemTotal = styled(CustomLi)`
  color: #FFFFFF;
  &:last-child {
    margin-bottom: 28px;
  }
`
