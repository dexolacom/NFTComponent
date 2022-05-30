import { useState, useLayoutEffect } from 'react'
import { shade } from 'polished'
import Vibrant from 'node-vibrant'
import { hex } from 'wcag-contrast'
import { Token, ChainId } from 'nimbus-swap-mod/sdk'

async function getColorFromToken(token: Token): Promise<string | null> {
  if (token.chainId === ChainId.RINKEBY && token.address === '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735') {
    return Promise.resolve('#FAAB14')
  }

  //const path = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${token.address}/logo.png`
  let path;
  switch (token.address) {
    case process.env.REACT_APP_NBU_TOKEN_CONTRACT:
    case process.env.REACT_APP_NBU_TOKEN_CONTRACT_ROPSTEN:
    case process.env.REACT_APP_NBU_TOKEN_CONTRACT_RINKEBY:
    case process.env.REACT_APP_NBU_TOKEN_CONTRACT_GÖRLI:
    case process.env.REACT_APP_NBU_TOKEN_CONTRACT_KOVAN:
      path = `./images/NBU_w_s.png`
      break

    case process.env.REACT_APP_GNBU_TOKEN_CONTRACT:
      return `./images/gnbu.png`;

    case process.env.REACT_APP_WETH_TOKEN_MAINNET:
    case process.env.REACT_APP_WETH_TOKEN_ROPSTEN:
    case process.env.REACT_APP_WETH_TOKEN_RINKEBY:
    case process.env.REACT_APP_WETH_TOKEN_GÖRLI:
    case process.env.REACT_APP_WETH_TOKEN_KOVAN:
      path = `./images/ethereum-eth-logo_s.png`
      break

    case process.env.REACT_APP_USDT_TOKEN_MAINNET:
    case process.env.REACT_APP_USDT_TOKEN_ROPSTEN:
    case process.env.REACT_APP_USDT_TOKEN_RINKEBY:
    case process.env.REACT_APP_USDT_TOKEN_GÖRLI:
    case process.env.REACT_APP_USDT_TOKEN_KOVAN:
      path = `./images/tether-usdt-logo_s.png`
      break

    default:
      path = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${token.address}/logo.png`
  }


  return Vibrant.from(path)
    .getPalette()
    .then(palette => {
      if (palette?.Vibrant) {
        let detectedHex = palette.Vibrant.hex
        let AAscore = hex(detectedHex, '#FFF')
        while (AAscore < 3) {
          detectedHex = shade(0.005, detectedHex)
          AAscore = hex(detectedHex, '#FFF')
        }
        return detectedHex
      }
      return null
    })
    .catch(() => null)
}

export function useColor(token?: Token) {
  const [color, setColor] = useState('#2172E5')

  useLayoutEffect(() => {
    let stale = false

    if (token) {
      getColorFromToken(token).then(tokenColor => {
        if (!stale && tokenColor !== null) {
          setColor(tokenColor)
        }
      })
    }

    return () => {
      stale = true
      setColor('#2172E5')
    }
  }, [token])

  return color
}
