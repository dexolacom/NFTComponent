interface Token {
  chainId: string
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
}

// hook
export const useConvertHuman = (tokens: Token[], addressToken: string, value: number) => {
  let val = 0
  tokens.filter((el: Token) => el.address === addressToken && (val = value / 10 ** el.decimals))
  return val
}

// function
export const convertHuman = (tokens: Token[], addressToken: string, value: number) => {
  let val = 0
  tokens.filter((el: Token) => el.address === addressToken && (val = value / 10 ** el.decimals))
  return val
}
