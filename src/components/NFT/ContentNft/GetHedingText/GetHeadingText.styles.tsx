import styled from 'styled-components'
import { colors } from '../../../../theme/index'

export const ContentWrapperNft = styled.div`
  width: 545px;
  @media (max-width: 800px) {
    width: 335px;
  }
`
export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
export const HeadingNft = styled.h3`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 28px;
  line-height: 36px;
  color: ${colors(false).text1};
  margin: 0 0 15px 0;
  @media (max-width: 555px) {
    font-size: 24px;
    line-height: 28px;
  }
`
export const HeadingTitleNft = styled.span`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 17px;
  line-height: 28px;
  font-weight: 400;
  color: ${colors(false).text3};
`
export const StakingTooltip = styled.ul`
  padding-left: 0;
  list-style: none;
  & > li:not(:last-child) {
    margin-bottom: 10px;
  }
`
