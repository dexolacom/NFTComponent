import React from 'react'
import { useTranslation } from 'react-i18next'

import {
  ContentWrapperNft,
  ListTitle,
  TextContainerNft,
  HeadingNft,
  HeadingTitleNft,
  List,
  ListItem
} from './SubTitleText.styles'

const SubTitle: React.FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <ContentWrapperNft>
        <TextContainerNft>
          <HeadingNft>{t('nNFT.subTitle.smartLender')}</HeadingNft>
          <HeadingTitleNft>
            <ListTitle>{t('nNFT.subTitle.heading')}</ListTitle>
            <List>
              <ListItem>{t('nNFT.subTitle.lend')}</ListItem>
              <ListItem>{t('nNFT.subTitle.BNB_NBUPool')}</ListItem>
              <ListItem>{t('nNFT.subTitle.BNB_GNBUPool')}</ListItem>
              {/* <ListItem>{t('header.tabs.lpStaking')}:</ListItem> */}
            </List>
            <ListTitle>{t('nNFT.subTitle.getClick')}</ListTitle>
            {/* <ListTitle>{t('nNFT.subTitle.CheckRewards')}</ListTitle> */}
            {/* <ListTitle>{t('nNFT.subTitle.redeemAnytime')}</ListTitle> */}
          </HeadingTitleNft>
        </TextContainerNft>
      </ContentWrapperNft>
    </>
  )
}

export default SubTitle