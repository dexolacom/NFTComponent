import React from 'react'
import Loader16 from '../../../assets/images/Nft-img/Spinner_anime-16.svg'
import styled from 'styled-components'

const LoaderContainer = styled.div`
  background: rgb(255, 184, 0);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  > img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
`

const Loaders = () => {
  return (
    <LoaderContainer>
      <img src={`${Loader16}`} />
    </LoaderContainer>
  )
}

export default Loaders
