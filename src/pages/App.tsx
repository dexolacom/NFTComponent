
import React, { Suspense, useState, useEffect } from 'react'
import { 
  Route, 
  Switch, 
  //useLocation 
} from 'react-router-dom'
import styled from 'styled-components'
//import StakeContext from '../context/StakeContext'
//import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
//import AddressClaimModal from '../components/claim/AddressClaimModal'
//import Header from '../components/Header'
//import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
//import { ApplicationModal } from '../state/application/actions'
//import { useAddPopup, useModalOpen, useToggleModal } from '../state/application/hooks'
//import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
//import AddLiquidity from './AddLiquidity'
// import {
//   RedirectDuplicateTokenIds,
//   RedirectOldAddLiquidityPathStructure,
//   RedirectToAddLiquidity,
//   RedirectVotingPathStructure,
//   RedirectVotingInfoPathStructure
// } from './AddLiquidity/redirects'
// import Earn from './Earn'
// import Manage from './Earn/Manage'
// import MigrateV1 from './MigrateV1'
// import MigrateV1Exchange from './MigrateV1/MigrateV1Exchange'
// import RemoveV1Exchange from './MigrateV1/RemoveV1Exchange'
// import Pool from './Pool'
// import PoolFinder from './PoolFinder'
// import RemoveLiquidity from './RemoveLiquidity'
// import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
// import Swap from './Swap'
// import { OpenClaimAddressModalAndRedirectToSwap, RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'
// import Staking from './Staking'
// import LpStaking from './LpStaking'
// import Referral from './Referral'
// import Voting from './Voting'
// import Dapps from './dApps'
// import Vote from './Vote'
// import VotePage from './Vote/VotePage'
// import ProposalDetails from './Voting/ProposalDetails'
// import Lends from '../components/Lends/Lends'
// import BorrowPage from '../pages/BorrowPage/index'
// import TopRated from './dApps'
// import SideBar from '../components/SideBar'
//import Footer from '../components/Footer'
//import Wrap from '../components/Wrap'

//import TagManager from 'react-gtm-module'
import { useActiveWeb3React } from '../hooks'
//import Modal from '../components/Modal'
//import { TYPE } from '../theme'
import { ButtonPrimary } from '../components/Button'
//import coins from '../assets/images/banners/coins.png'
//import closeIcon from '../assets/images/banners/close.png'

// import P2P from './P2P'
// import MyAdverts from '../components/P2P/MyAdverts/Table'
// import MyTrades from '../components/P2P/MyTrades/Table'
// import MyChats from '../components/P2P/MyChats/Table'
// import CreateAdvert from '../components/P2P/Forms/CreateAdvert'
// import EditAdvert from '../components/P2P/Forms/EditAdvert'
// import CreateTrade from '../components/P2P/Forms/CreateTrade'
// import Chat from '../components/P2P/Chat/Chat'
// import { RedirectToMyAdverts } from '../components/P2P/TableRow/redirects'
// import NFT from './NFT/index'

const AppWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  overflow: hidden;
  /*fix for kiwi browser*/
  height: auto;
  min-height: 100vh !important;
  @media screen and (min-width: 720px) {
    min-height: auto;
    height: 100vh;
  }
`

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`

const MobileBoxShadow = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: #282828;
  opacity: ${props => (props.showTitle ? '0.8' : '0')};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display:${props => (props.openedMenu ? 'block' : 'none')};
  `};
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: start;
  z-index: 1;
  flex: 1;
  padding: 50px 20px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding:16px;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding:8px;
  `};
  /*fix for kiwi browser*/
  @media screen and (max-width: 720px) {
    padding: 78px 8px 8px 8px;
  }
`

const Marginer = styled.div`
  margin-top: 5rem;
`

const Banner = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  padding: 28px 28px 128px;
  background: url(${coins}) right 0 bottom 0 no-repeat, #e44b05;
`

const ActionButton = styled(ButtonPrimary)`
  width: 132px;
  height: 40px;
  background: #000;
  font-size: 14px;
  :hover {
    background: #242424;
  }
  :active {
    background: #242424;
  }
  :focus {
    background: #242424;
  }
`

const StyledClosed = styled.img`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
`

// function TopLevelModals() {
//   const open = useModalOpen(ApplicationModal.ADDRESS_CLAIM)
//   const toggle = useToggleModal(ApplicationModal.ADDRESS_CLAIM)
//   return <AddressClaimModal isOpen={open} onDismiss={toggle} />
// }

export default function App() {
  const [openedMenu, setOpenedMenu] = useState(window.innerWidth < 721 ? false : true)
  const [showTitle, setShowTitle] = useState(true)
  const [showBanner, setShowBanner] = useState(false)
  const [stakeValue, setStakeValue] = useState(null)
  const { account, chainId } = useActiveWeb3React()

  Number.prototype.toFixedDown = function(digits) {
    const re = new RegExp('(\\d+\\.\\d{' + digits + '})(\\d)'),
      m = this.toString().match(re)
    return m ? parseFloat(m[1]) : this.valueOf()
  }

  // const menuHandler = () => {
  //   setOpenedMenu(!openedMenu)
  // }

  //const location = useLocation()

  // useEffect(() => {
  //   const timer = setTimeout(() => setShowTitle(openedMenu), !openedMenu ? 300 : 0)
  //   const date = Date.now()
  //   const showBannerTime = localStorage.getItem('bannerСlosed')

  //   if (chainId !== 56 && chainId !== 97 && chainId !== undefined && date > showBannerTime) {
  //     setShowBanner(true)
  //   }

  //   if (!TagManager) {
  //     return () => {
  //       clearTimeout(timer)
  //     }
  //   }

  //   TagManager.dataLayer({
  //     dataLayer: {
  //       event: 'Pageview',
  //       pagePath: `/#${location.pathname + location.search}`,
  //       pageTitle: location.pathname.slice(1)
  //     }
  //   })

  //   if (account) {
  //     TagManager?.dataLayer({
  //       dataLayer: {
  //         user_id: account
  //       }
  //     })
  //     ;(window.dataLayer = window.dataLayer || []).push({ user_id: account, net_id: chainId })
  //   }

  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [openedMenu, location, account, chainId])

  const [oldChainId, setChainId] = useState([])

  useEffect(() => {
    setChainId([chainId])

    setChainId(prevState => {
      return [...prevState, chainId]
    })
    // if (account && oldChainId[oldChainId.length - 1]) {
    //   window.dataLayer.push({
    //     event: 'net_select',
    //     net_from: oldChainId[oldChainId.length - 1],
    //     net_to: chainId
    //   })
    // }
  }, [chainId])
  /*for banner*/
  const closeBanner = () => {
    const date = Date.now()
    localStorage.setItem(`bannerСlosed`, JSON.stringify(date + 86400000))
    setShowBanner(false)
  }

  return (
    <Suspense fallback={null}>
      {/* <Route component={GoogleAnalyticsReporter} /> */}
      {/* <Route component={DarkModeQueryParamReader} /> */}
      {/* <StakeContext.Provider value={{ stakeValue, setStakeValue }}> */}
        <AppWrapper>
          <MobileBoxShadow openedMenu={openedMenu} showTitle={showTitle} />
          {/* <SideBar
            openedMenu={openedMenu}
            showTitle={showTitle}
            setOpenMenu={setOpenedMenu}
            menuHandler={menuHandler}
          /> */}
          <HeaderWrapper>
            {/* <Header menuHandler={menuHandler} openedMenu={openedMenu} /> */}
            <BodyWrapper>
              {/* <Modal isOpen={showBanner} onDismiss={closeBanner} maxWidth={335}>
                <Banner>
                  <StyledClosed
                    className={'at-click at-pp-crazy-gas-orange-close'}
                    src={closeIcon}
                    width={24}
                    onClick={closeBanner}
                  />
                  <TYPE.main
                    fontSize={28}
                    color={'#fff'}
                    fontWeight={500}
                    style={{ marginBottom: '12px', lineHeight: '32px' }}
                  >
                    Tired of crazy <br />
                    Gas fees?
                  </TYPE.main>
                  <TYPE.subHeader
                    fontSize={16}
                    color={'#fff'}
                    fontWeight={500}
                    style={{ marginBottom: '20px', lineHeight: '150%' }}
                  >
                    Enjoy ~15 times lower fees - switch to Nimbus on Binance Smart Chain!
                  </TYPE.subHeader>
                  <ActionButton
                    className={'at-click at-pp-crazy-gas-orange-btn-how'}
                    onClick={() =>
                      window.open(
                        'https://nimbusplatform.medium.com/nimbus-guide-how-to-connect-to-binance-smart-chain-and-see-the-bep-20-nbu-gnbu-tokens-e71a1c190ce0',
                        '_blank'
                      )
                    }
                  >
                    How it works?
                  </ActionButton>
                </Banner>
              </Modal> */}
              {/* <Popups /> */}
              {/* <TopLevelModals /> */}
              <Web3ReactManager>
                <Switch>
                  {/* <Route exact strict path="/swap" component={Swap} />
                  <Route exact strict path="/claim" component={OpenClaimAddressModalAndRedirectToSwap} />
                  <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
                  <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
                  <Route exact strict path="/find" component={PoolFinder} />
                  <Route exact strict path="/pool" component={Pool} />
                  <Route exact strict path="/staking" component={Staking} />
                  <Route exact strict path="/lp-staking" component={LpStaking} />
                  <Route exact strict path="/referral" component={Referral} />
                  <Route exact strict path="/voting" component={Voting} />
                  <Route exact strict path="/dapps" component={TopRated} />
                  <Route exact strict path="/dapps/lend" component={Lends} />
                  <Route exact strict path="/dapps/borrow" component={BorrowPage} />
                  <Route exact strict path="/borrow/liquidations" component={BorrowPage} />
                  <Route exact strict path="/borrow/rollover" component={BorrowPage} />
                  <Route exact strict path="/referral" component={Referral} />
                  <Route exact strict path="/voting" component={Voting} />
                  <Route exact strict path="/uni" component={Earn} />
                  <Route exact strict path="/vote" component={Vote} />
                  <Route exact strict path="/create" component={RedirectToAddLiquidity} />
                  <Route exact path="/add" component={AddLiquidity} />
                  <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                  <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                  <Route exact path="/create" component={AddLiquidity} />
                  <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                  <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                  <Route exact strict path="/remove/v1/:address" component={RemoveV1Exchange} />
                  <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
                  <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                  <Route exact strict path="/migrate/v1" component={MigrateV1} />
                  <Route exact strict path="/migrate/v1/:address" component={MigrateV1Exchange} />
                  <Route exact strict path="/uni/:currencyIdA/:currencyIdB" component={Manage} />
                  <Route exact strict path="/vote/:id" component={VotePage} />
                  <Route exact strict path="/vote/:id" component={VotePage} />
                  <Route exact strict path="/voting/create" component={RedirectVotingPathStructure} />
                  <Route exact strict path="/voting/:idProposal" component={RedirectVotingInfoPathStructure} />
                  <Route exact strict path="/wrap" component={Wrap} />
                  <Route path="/dapps/p2p" component={P2P} />
                  <Route exact strict path="/dapps/p2p/my-adverts" component={MyAdverts} />
                  <Route exact strict path="/dapps/p2p/my-adverts/create-advert" component={CreateAdvert} />
                  <Route exact strict path="/dapps/p2p/my-adverts/edit-advert/:id" component={EditAdvert} />
                  <Route exact strict path="/dapps/p2p/my-adverts/delete-advert/:id" component={RedirectToMyAdverts} />
                  <Route exact strict path="/dapps/p2p/my-trades/open" component={MyTrades} />
                  <Route exact strict path="/dapps/p2p/my-trades/closed" component={MyTrades} />
                  <Route exact strict path="/dapps/p2p/my-trades/create-trade/:id" component={CreateTrade} />
                  <Route exact strict path="/dapps/p2p/my-trades/create-trade" component={CreateTrade} />
                  <Route exact strict path="/dapps/p2p/my-chats/about-my-ads" component={MyChats} />
                  <Route exact strict path="/dapps/p2p/my-chats/about-other-ads" component={MyChats} />
                  <Route exact strict path="/dapps/p2p/my-chats/chat/:id" component={Chat} />
                  <Route
                    exact
                    strict
                    path={['/dapps/n-NFT', '/dapps/getNFT-BNB', '/dapps/getNFT-BUSD', '/dapps/n-NFT-info']}
                    component={NFT}
                  />
                  <Route component={RedirectPathToSwapOnly} /> */}
                </Switch>
              </Web3ReactManager>
              <Marginer />
            </BodyWrapper>
            {/* <Footer /> */}
          </HeaderWrapper>
        </AppWrapper>
      {/* </StakeContext.Provider> */}
    </Suspense>
  )
}
