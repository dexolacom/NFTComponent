
import { Suspense} from 'react'
import { 
  Route, 
  Switch,
  Redirect, 
} from 'react-router-dom'
import styled from 'styled-components'
import "@reach/dialog/styles.css"
import { ConnectButton, setStyles } from "tech-web3-connector"
import NFT from './NFT/index'

const customStyles = {
  // styled modal
  modalBackdrop: {},
  modalContainer: {},
  modalBtnClose: {},
  modalConnectorsContainer: { "background-color": "color" }, // example code
  modalConnectorsItem: {},
  modalBtnProvider: {},
  modalNameWallet: {color: "color"}, // example code

  // styled Button
  BtnBase:{},
  BtnContainer:{},
  BtnAddress:{},
  SpanBalance:{},
  BtnLogout:{},

  // hover Button
  "BtnBase:hover": {
    "background-color": "color", // example code
  },
};

// required  RPC

const RPC = {
  1: "https://mainnet.infura.io/v3/7d9d43def2584f2a9f01f2a4719327bc",
  3: "https://ropsten.infura.io/v3/8ca77c4631f14dccb88318200cfca61d",
  4: "https://rinkeby.infura.io/v3/8ca77c4631f14dccb88318200cfca61d",
  5: "https://goerly.infura.io/v3/8ca77c4631f14dccb88318200cfca61d",
  42: "https://kovan.infura.io/v3/8ca77c4631f14dccb88318200cfca61d",
  56: "https://bsc-dataseed.binance.org/",
  97: "https://data-seed-prebsc-2-s3.binance.org:8545",
  250: "https://rpc.ftm.tools",
};

const supportedConnectors =
[
    "metamask",
    "walletonnect",
    "coinbase",
    "formatic",
    "portis",
]

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

interface MobileBoxShadowProps {
  showTitle: boolean;
  openedMenu: boolean;
}

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: start;
  z-index: 1;
  flex: 1;
  padding: 50px 20px;
  padding:8px;
  /*fix for kiwi browser*/
  @media screen and (max-width: 720px) {
    padding: 78px 8px 8px 8px;
  }
`

function Appp() {

  setStyles(customStyles);

  return (
    <Suspense fallback={null}>
        <AppWrapper>
          <HeaderWrapper>
            <BodyWrapper>
              <div style={{'margin': '25px'}}>
                <ConnectButton
                  RPC={RPC}
                  portisId={"portisId-key-project"}
                  supportedConnectors={supportedConnectors}
                />
              </div>
              <Switch>
                  <Route
                    exact
                    strict
                    path={['/dapps/n-NFT', '/dapps/getNFT-BNB', '/dapps/getNFT-BUSD', '/dapps/n-NFT-info']}
                    component={NFT}
                  />
                  <Redirect from='/' to='/dapps/n-NFT'/>
                </Switch>
            </BodyWrapper>
          </HeaderWrapper>
        </AppWrapper>
    </Suspense>
  );
}

export default Appp;