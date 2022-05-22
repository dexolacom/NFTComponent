import styled from 'styled-components'

export const colors = {
  blackColor: '#000000',
  whiteColor: '#fff',
  footnoteColor: '#505c62',
  buttonHoverColor: '#fe5001',
  defaultBtnBgColor: '#edf1f2',
  subTitleColor: '#889196',
  loaderBgColor: '#E8FDF2',
  titleColor: '#242728',
  doneColor: '#fe5001',
  progressColor: '#d8d8d8',
  calendarColor: '#fe5001',
}

// div
const BaseDiv = styled.div`
display: flex;
`
export const FlexDivBase_v_1= styled(BaseDiv)` 
flex-direction: column;
justify-content: space-between;
`

export const FlexDivBase_v_2= styled(BaseDiv)`
justify-content: space-between;
align-items: center;
`
export const FlexDivBase_v_3= styled(BaseDiv)`
  flex-direction: column;
  justify-content: center;
`
export const FlexDivBase_v_4= styled(BaseDiv)`
  justify-content: space-between;
  flex-wrap: wrap;
`

// div

// ul
export const Base_UL_v_1= styled.ul`
 padding: 0;
 margin: 0;
 list-style: none;
`
// export const Base_UL_v_1= styled.ul``
// export const Base_UL_v_2= styled.ul``
// export const Base_UL_v_3= styled.ul``

export const Base_Flex_UL_v_3= styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
// ul

// li
const BaseLi = styled.div`
display: flex;
`
// export const Base_LI_v_1= styled.li``
// export const Base_LI_v_2= styled.li``
// export const Base_LI_v_3= styled.li``

export const Base_Flex_LI_v_1= styled(BaseLi)`
  justify-content: space-between;
`
export const Base_Flex_LI_v_3= styled(BaseLi)`
  flex-direction: column;
  justify-content: space-between;
`
// li

// p
// export const Base_FontSizeP_v_1= styled.p`` 
// export const Base_FontSizeP_v_2= styled.p``
// export const Base_FontSizeP_v_3= styled.p``
// p

// span
export const Base_FontSizeSpan_v_1= styled.span`
 font-size: 12px;
  line-height: 16px;
` 
export const Base_FontSizeSpan_v_2= styled.span`
  font-size: 14px;
  line-height: 20px;
`
export const Base_FontSizeSpan_v_3= styled.span``


// export const Base_Span_v_1= styled.span``
// export const Base_Span_v_2= styled.span``
// export const Base_Span_v_3= styled.span``
// span