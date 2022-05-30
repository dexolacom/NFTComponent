interface Token {
  chainId: string
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
}

// hook
export const useGetAddress = (tokens: Token[], nameToken: string) => {
  const data: Token[] = tokens.filter((el: Token) => el.symbol === nameToken && el.address)
  return data[0].address
}

// function
export const getAddress = (tokens: Token[], nameToken: string) => {
  const data: Token[] = tokens.filter((el: Token) => el.symbol === nameToken && el.address)
  return data[0].address
}
