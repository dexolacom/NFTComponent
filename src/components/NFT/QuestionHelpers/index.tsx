import { useState } from 'react'
import styled from 'styled-components'
import Tooltip from '../../Tooltip/index'

export function LightQuestionHelper({ text }: { text: any }) {
  const [show, setShow] = useState<boolean>(false)

  return (
    <span style={{ marginLeft: 4 }}>
      <Tooltip text={text} show={show} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        <LightQuestionWrapper onClick={() => setShow(true)} onMouseEnter={() => setShow(true)}>
          <QuestionMark>?</QuestionMark>
        </LightQuestionWrapper>
      </Tooltip>
    </span>
  )
}

const LightQuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;
  width: 20px;
  height: 20px;
  background-color: #616161;
  color: #FFFFFF;

  :hover,
  :focus {
    opacity: 0.7;
  }
`

const QuestionMark = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
`
