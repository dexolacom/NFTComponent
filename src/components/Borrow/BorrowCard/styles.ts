import styled from 'styled-components'

export const Card = styled.div`
  background: #343434;
  border: 1px solid #343434;
  box-sizing: border-box;
  border-radius: 24px;
  padding: 24px 24px 28px;
  cursor: pointer;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    max-width: 375px;
    min-width: 320px;
  `};

  ${({ theme }) => theme.mediaWidth.upToMobileSmall`
    width: 350px;
    max-width: 350px;
    min-width: 320px;
  `};
`

export const CurrencyName = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px 0;
`

export const Logo = styled.div`
  margin-right: 12px;

  img {
    height: 50px;
    width: 50px;
  }
`

export const AprStatus = styled.div`
  min-width: 100px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(61, 213, 152, 0.2);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 1.5px;
  color: #3dd598;
`

export const Divider = styled.div`
  height: 1px;
  margin: 24px -24px 14px -24px;
  background: rgba(228, 228, 228, 0.1);

  ${({ theme }) => theme.mediaWidth.upToLarge`
    margin: 24px -16px 14px -16px;
  `};
`
