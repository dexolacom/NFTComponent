import { useEffect, useState } from 'react'
import { useActiveWeb3React } from './index'
import Web3 from 'web3'

// method передавать имя метода строкой пример 'mintWithBnb'
export const useEstimateGas = (contract: any, value: string, method: string, params: any) => {
  const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_NETWORK_URL)
  const { account } = useActiveWeb3React()
  const [estimateGas, setEstimateGas] = useState<number>(0)

  const getGas = async () => {
    const gas = await contract.methods[method](...params).estimateGas({ from: account, value: value })
    const gasPrice: any = await web3.eth.getGasPrice()
    setEstimateGas(gas * gasPrice * 1.5)
  }

  useEffect(() => {
    getGas()
  }, [])

  return estimateGas
};
