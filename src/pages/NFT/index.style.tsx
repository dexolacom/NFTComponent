import styled from 'styled-components'
interface Props {
  acc: string
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 0;
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`
export const ContainerSelected = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* padding-left: 80px; */
  /* min-height: 450px; */
  @media (max-width: 510px) {
    display: flex;
    /* padding-left: 10px; */
    justify-content: center;
  }
`
export const Content = styled.div`
  width: 100%;
  padding: 0 0 0 35px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* ssss */
  @media (max-width: 550px) {
    width: 335px;
    padding: 0;
    margin: -45px auto;
  }
`
export const GetNFTContainer = styled.div`
  @media (max-width: 900px) {
    margin: 0 auto;
  }
`

export const SelectedStepsTitle = styled.p`
  font-size: 24px;
  line-height: 28px;
  color: #fff;
  /* margin: 0; */
  margin: 0 0 5px 0;
`
export const SelectedBtn = styled.span`
  margin: 45px 0 0 0;
  @media (max-width: 900px) {
    margin: 28px 0 0 0;
  }
`
export const TextContainer = styled.span`
  margin-bottom: 30px;
  @media (max-width: 555px) {
    margin-bottom: 30px;
  }
`

export const SliderContainer = styled.span`
  margin-bottom: 50px;
  @media (max-width: 555px) {
    margin-bottom: 40px;
  }
`
export const BtnContainer = styled.div<Props>`
  max-width: 425px;
  display: flex;
  justify-content: space-between;
  margin-top: ${props => (props.acc ? '52px ' : '25px')};
  @media (max-width: 555px) {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 105px;
  }
`
export const BtnItemSpan = styled.span`
  width: 202px;
  @media (max-width: 555px) {
    width: 335px;
  }
`

export const WarningBanner = styled.span`
  display: flex;
  align-items: center;
  margin: 0 0 25px 0;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #ffcc48;

  img {
    margin-right: 10px;
  }
`
