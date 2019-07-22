import React from 'react'
import styled from 'styled-components'

import Bold from '../controls/Bold'
import Italic from '../controls/Italic'
import Underline from '../controls/Underline'
import Strike from '../controls/Strike'

import OrderedList from '../controls/OrderedList'
import UnorderedList from '../controls/UnorderedList'

import Right from '../controls/Right'
import Left from '../controls/Left'
import Center from '../controls/Center'
import Justify from '../controls/Justify'

import ClearFormat from '../controls/ClearFormat'

const PaneWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3px auto;
  border-radius: 4px;
  border: 1px solid silver;
`

const PaneGroup = styled.div`
  &:not(:last-child) {
    border-right: 1px solid silver;
  }
  &:not(:first-child) {
    border-left: 1px solid silver;
  }

  display: inline-block;
  vertical-align: middle;
`

// сделать абзац
// вставить гиперссылку
// ✅сделать bullet points, нумерацию
// ✅центрировать текст
// поменять размер шрифта
// ✅сделать шрифт жирным / курсивом / подчеркнутым
// поменять цвет шрифта
// сделать заливку
// менять интервал(по аналогии с Word)
// ✅убрать формат

const Pane = ({ editor, ...props }) => {
  const root = editor && editor.current
  const document = root && editor.current.ownerDocument
  if (document === undefined || window === undefined) return ''
  const ctrl = {
    root,
    document,
    window,
  }

  return (
    <PaneWrapper>
      <PaneGroup>
        <Bold {...ctrl} />
        <Italic {...ctrl} />
        <Underline {...ctrl} />
        <Strike {...ctrl} />
      </PaneGroup>

      <PaneGroup>
        <OrderedList {...ctrl} />
        <UnorderedList {...ctrl} />
      </PaneGroup>

      <PaneGroup>
        <Left {...ctrl} />
        <Center {...ctrl} />
        <Right {...ctrl} />
        <Justify {...ctrl} />
      </PaneGroup>

      <PaneGroup>
        <ClearFormat {...ctrl} />
      </PaneGroup>
    </PaneWrapper>
  )
}

export default Pane
