import React from 'react'

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
  return (
    <>
      <ContentWrapperNft>
        <TextContainerNft>
          <HeadingNft>Smart LP</HeadingNft>
          <HeadingTitleNft>
            <ListTitle>
              With Smart LP n-NFT, your assets get distributed between the 
              Nimbus Lend dApp (30% of assets) and Liquidity Providing to 
              Nimbus Swap (70% of assets). As a result, you receive 3 types of rewards:
            </ListTitle>
            <List>
              <ListItem>Flexible APR for lending;</ListItem>
              <ListItem>
                Share of a fixed 0,3% swap fee on all trades in the BNB/NBU and BNB/other pools;
              </ListItem>
              <ListItem>Fixed 100% APY for staking the received LP tokens.</ListItem>
              {/* <ListItem>{t('header.tabs.lpStaking')}:</ListItem> */}
            </List>
            <ListTitle>
              Receive rewards in real-time, save on gas fees, and redeem your assets any time.
            </ListTitle>
            {/* <ListTitle>{t('nNFT.subTitle.CheckRewards')}</ListTitle> */}
            {/* <ListTitle>{t('nNFT.subTitle.redeemAnytime')}</ListTitle> */}
          </HeadingTitleNft>
        </TextContainerNft>
      </ContentWrapperNft>
    </>
  )
}

export default SubTitle