import React from 'react'
import { LightQuestionHelper } from '../../QuestionHelpers/index'
import { ContentWrapperNft, HeadingNft, HeadingTitleNft, StakingTooltip, TitleContainer } from './GetHeadingText.styles'

const GetHeadingText: React.FC = () => {
  const TooltipContent = (
    <StakingTooltip>
      <li> When purchasing n-NFT token you pay gas fee only once and your 
        tokens are automatically replenished in a number of dApps, instead 
        of paying it few times, when using each dApp. </li>
    </StakingTooltip>
  )

  return (
    <>
      <ContentWrapperNft>
        <TitleContainer>
          <HeadingNft>Smart LP n-NFT</HeadingNft>
          <LightQuestionHelper text={TooltipContent} />
        </TitleContainer>
        <HeadingTitleNft>
          Note that part of your tokens will be converted in TBT and BUSD. 
          You will get part of rewards in these tokens. Good news: 
          you're saving on gas fees
        </HeadingTitleNft>
      </ContentWrapperNft>
    </>
  )
}

export default GetHeadingText
