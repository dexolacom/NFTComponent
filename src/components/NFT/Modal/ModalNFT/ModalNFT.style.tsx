import styled from 'styled-components'
import { DialogOverlay } from '@reach/dialog'
import { FlexDivBase_v_1 } from '../../helpers'

export const ModalBackdrop = styled(DialogOverlay)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(40, 40, 40, 0.8);
  z-index: 3;
`

export const PositionImgClose = styled.div`
  position: relative;
`

export const Container = styled(FlexDivBase_v_1)`
  width: 690px;
  height: 430px;
  position: relative;
  padding: 32px;
  background: #343434;
  border: 1px solid #2d2d2d;
  box-sizing: border-box;
  border-radius: 16px;
  align-content: space-between;
  overflow: auto;
  @media (max-width: 707px) {
    width: 335px;
    padding: 20px;
  }
`

export const StyledClosed = styled.img`
  position: absolute;
  right: 32px;
  top: 28px;
  cursor: pointer;
  z-index: 5;
`

export const ContentWrapperNft = styled.div`
  width: 100%;
`
export const TextContainerNft = styled.div``

export const HeadingNft = styled.h3`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 24px;
  line-height: 32px;
  color: #FFFFFF;
  margin: 0 0 20px 0;
`

export const HeadingTitleNft = styled.span`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 17px;
  line-height: 32px;
  font-weight: 400;
  color: #FFFFFF;
`

export const List = styled.ul`
  margin: 0;
  list-style-position: initial;
`

const BaseText = styled.p`
  color: #bbbbbb;
  font-size: 17px;
  line-height: 28px;
  padding: 0;
  margin: 0;
`

export const ListItem = styled.li`
  /* list-style-position: inside; */
`
export const ListTitle = styled(BaseText)`
  color: #FFFFFF;
`
export const ButtonPlug = styled.button`
  position: absolute;
  background-color: transparent;
  outline: none;
  border: none;
`
export const BtnContainer = styled.span`
  height: 44px;
  @media (max-width: 707px) {
    margin-top: 30px;
  }
`
