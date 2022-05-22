import React from 'react'
import { useTranslation } from 'react-i18next'
import { LightQuestionHelper } from '../../QuestionHelpers/index'
import { ContentWrapperNft, HeadingNft, HeadingTitleNft, StakingTooltip, TitleContainer } from './GetHeadingText.styles'

const GetHeadingText: React.FC = () => {
  const { t } = useTranslation()

  const TooltipContent = (
    <StakingTooltip>
      <li> {t('nNFT.nNFTtoolTip.3')}</li>
    </StakingTooltip>
  )

  return (
    <>
      <ContentWrapperNft>
        <TitleContainer>
          <HeadingNft>{t('nNFT.nNFTtext.GetheadingText')}</HeadingNft>
          <LightQuestionHelper text={TooltipContent} />
        </TitleContainer>
        <HeadingTitleNft>{t('nNFT.nNFTtext.GetheadingTextTitle')}</HeadingTitleNft>
      </ContentWrapperNft>
    </>
  )
}

export default GetHeadingText
