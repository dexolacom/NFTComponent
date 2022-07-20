import styled from 'styled-components'

const BaseText = styled.p`
  color: #bbbbbb;
  font-size: 17px;
  line-height: 28px;
  padding: 0;
  margin: 0;
`

export const ContentWrapperNft = styled.div`
  width: 545px;
  @media (max-width: 555px) {
    width: 335px;
  }
`
export const TextContainerNft = styled.div``

export const HeadingNft = styled.h3`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 24px;
  line-height: 28px;
  color: #FFFFFF;
  margin: 0 0 20px 0;
`
export const HeadingTitleNft = styled.span`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 17px;
  line-height: 28px;
  font-weight: 400;
  color: #bbbbbb;
`

export const List = styled.ul`
  margin: 0;
  list-style-position: initial;
`

export const ListItem = styled.li`
  /* list-style-position: inside; */
`
export const ListTitle = styled(BaseText)``
