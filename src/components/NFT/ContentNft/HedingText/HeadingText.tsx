import React from 'react'
import { useTranslation } from 'react-i18next'
import { ContentWrapperNft, TextContainerNft, HeadingNft, HeadingTitleNft } from './HeadingText.styles'

const HeadingText: React.FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <ContentWrapperNft>
        <TextContainerNft>
          <HeadingNft>{t('nNFT.nNFTtext.headingText')}</HeadingNft>
          <HeadingTitleNft>
          {t('nNFT.nNFTtext.headingTitleInfo')}
          </HeadingTitleNft>
        </TextContainerNft>
      </ContentWrapperNft>
    </>
  )
}

export default HeadingText
