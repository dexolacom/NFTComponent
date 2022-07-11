import React, { useEffect, useState } from 'react'
import { renderIco } from '../../../pages/dApps/service'

interface IconProps {
  contractAddress: string
  currency: string
  chainId: number | string
}

const TokenIcon = ({contractAddress, currency, chainId}: IconProps) => {
  const [img, setImg] = useState('')

  useEffect(() => {
    setImg(renderIco(contractAddress, currency, chainId))
  }, [currency, chainId]);

  return (
    <>
      <img src={img} alt='Token icon'/>
    </>
  )
}

export default TokenIcon