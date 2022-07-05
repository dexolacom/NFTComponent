import styled from 'styled-components'
import { DialogOverlay } from '@reach/dialog'
import { ButtonPrimary } from '../../../Button'
import { FlexDivBase_v_3, FlexDivBase_v_1 } from '../../helpers'

interface Props {
  isVisible?: boolean
}

export const ModalBackdrop = styled(DialogOverlay)<Props>`
  ${props => (props.isVisible ? `display: flex;` : `display: none`)};
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
const CustomText = styled.div`
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 12px;
`
export const Heading = styled.div`
  font-size: 20px;
  line-height: 24px;
  color: #FFFFFF;
  margin-bottom: 12px;
`
export const Title = styled(CustomText)`
  color: #bbbbbb;
`
export const SubTitle = styled(CustomText)`
  color: #bbbbbb;
`
export const Hash = styled(CustomText)`
  color: #E44B05;
  margin-bottom: 25px;
  text-align: center;
`
export const HashLink = styled.a`
  text-decoration: none;
  color: #E44B05;
  margin-bottom: 25px;
  text-align: center;
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 12px;
`
export const ScrollFix = styled.div`
  max-height: 100vh;
`
export const Container = styled(FlexDivBase_v_3)`
  width: 308px;
  word-wrap: break-word;
  align-items: center;
  > img {
    width: 48px;
    margin-bottom: 24px;
  }
`
export const ModalPaddings = styled.div`
  padding: 122px 0;
`
export const ContentWrapper = styled(FlexDivBase_v_1)`
  width: 356px;
  min-height: 332px;
  position: relative;
  padding: 24px;
  background: #343434;
  border: 1px solid #2d2d2d;
  box-sizing: border-box;
  border-radius: 24px;
  overflow-wrap: break-word;
`
export const Button = styled(ButtonPrimary)`
  height: 44px;
  align-items: center;
  justify-content: center;
`
