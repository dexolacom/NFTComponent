import React from 'react'
import { ContentWrapperNft, TextContainerNft, HeadingNft, HeadingTitleNft } from './HeadingText.styles'

const HeadingText: React.FC = () => {
  return (
    <>
      <ContentWrapperNft>
        <TextContainerNft>
          <HeadingNft>Non-Fungible Tokens (n-NFT)</HeadingNft>
          <HeadingTitleNft>
            Benefit from n-NFT - the first yield-generating NFT of its kind. 
            When you acquire it, the assets you supply get automatically 
            distributed across several dApps and start working for you. 
            This gives you ultimate risk mitigation and optimal yields, 
            while saving you time and gas fees.
          </HeadingTitleNft>
        </TextContainerNft>
      </ContentWrapperNft>
    </>
  )
}

export default HeadingText
