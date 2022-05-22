// @ts-nocheck
import { convertToHuman } from '../../../hooks/useConvertToHuman'

export const getTotal = (a: string, b: string) => {
  const result = Number(convertToHuman(a, '18')) + Number(convertToHuman(b, '18'))
  return String(result.toFixed(5))
}

export const getResultBNB = (c: string, d: string, a: string, b: string) => {
  const result = Number(c) + Number(d) + Number(a * 10 ** 18) + Number(b * 10 ** 18)
  return result
}
export const getSumResult = (a: string, b: string, c: string) => {
  const result = convertToHuman(a, '18') + convertToHuman(b, '18') + convertToHuman(c, '18')
  return result
}

export const getResult = (a?: string, b?: string, c?: string) => {
  const result = Number(a) + Number(b) + Number(c)
  return convertToHuman(String(result), '18').toFixed(5)
}
export const getResultPoolBNB = (c: string, d: string) => {
  const result = Number(+c * 10 ** 18) + Number(+d * 10 ** 18)
  return result
}
