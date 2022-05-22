import styled from 'styled-components'
import { colors } from '../helpers.js'

export interface Props {
  // button size props works only in @media rules !!!
  size?: any
  height?: string
  fontSize?: string
  fontWeight?: string
  nameColor?: string
  // button size props works only in @media rules !!!
}

export const StyledName = styled.p<Props>`
  display: flex;
  flex-direction: row-reverse;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  line-height: 24px;
  color: ${props => (props.nameColor ? colors.blackColor : colors.whiteColor)};
  margin: 0;
`

export const StyledIcon = styled.span`
  width: 30px;
  color: #262626;
`

export const StyledBtn = styled.button<Props>`
  width: ${props => props.size};
  height: ${props => props.height};
  background-color: ${props => (props.color ? props.color : colors.defaultBtnBgColor)};
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

export const StyledNameDisabled = styled.span<Props>`
  width: ${props => props.size};
  height: 44px;
  background-color: #3e3e3e;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 0;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 17px;
  line-height: 24px;
`

export const StyledBtnDisabled = styled.button<Props>`
  width: ${props => props.size};
  height: 44px;
  background-color: #3e3e3e;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  border-radius: 5px;
  ${StyledNameDisabled} {
    width: ${props => props.size};
    color: #809098;
  }
`
