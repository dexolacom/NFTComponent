import React from 'react'
import { StyledBtn, StyledName, StyledIcon, StyledNameDisabled, StyledBtnDisabled } from './Button.styles'

export interface Props {
  name?: string
  clickHandler?: any
  icon?: any
  color?: string
  disabledName?: string
  isDisabled?: Boolean
  size?: string
  height?: string
  fontSize?: string
  fontWeight?: string
  nameColor?: string
  // this props needed for analytics
  className?: string
}

const Button = (args: Props) => {
  const {
    name = 'name btn',
    clickHandler,
    icon,
    color,
    isDisabled,
    size,
    disabledName,
    height = '44px',
    fontSize = '17px',
    fontWeight = '400',
    className,
    nameColor
  } = args
  // isDisabled color background: #C8CFD6B2;
  return (
    <>
      {isDisabled ? (
        <StyledBtnDisabled size={size}>
          <StyledNameDisabled>
            {disabledName}
            {icon && <StyledIcon>{icon}</StyledIcon>}
          </StyledNameDisabled>
        </StyledBtnDisabled>
      ) : (
        <StyledBtn onClick={clickHandler} color={color} size={size} height={height} className={className}>
          <StyledName color={color} fontSize={fontSize} fontWeight={fontWeight} nameColor={nameColor}>
            {name}
            {icon && <StyledIcon>{icon}</StyledIcon>}
          </StyledName>
        </StyledBtn>
      )}
    </>
  )
}

export default Button
