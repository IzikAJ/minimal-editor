import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

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

import FontSize from '../controls/FontSize'
import LineHeight from '../controls/LineHeight'
import FontColor from '../controls/FontColor'
import Sub from '../controls/Sub'
import Super from '../controls/Super'

import ClearFormat from '../controls/ClearFormat'

const PaneWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3px auto;
  border-radius: 4px;
  border: 1px solid silver;
  flex-wrap: wrap;
`

const PaneGroup = styled.div`
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
`

// ☑️сделать абзац
// вставить гиперссылку
// ✅сделать bullet points, нумерацию
// ✅центрировать текст
// ✅поменять размер шрифта
// ✅сделать шрифт жирным / курсивом / подчеркнутым
// ✅поменять цвет шрифта
// ✅сделать заливку
// менять интервал(по аналогии с Word)
// ✅убрать формат

class Pane extends React.PureComponent {
  static key = 'PaneItem'

  static propTypes = {
    onChange: PropTypes.func,
    revision: PropTypes.number,
    root: PropTypes.object,
    document: PropTypes.object,
    customWrapper: PropTypes.elementType,
  }

  static defaultProps = {
    revision: 0,
    document: document,
    customWrapper: PaneWrapper,
  }

  renderGroup(items, itemProps) {
    return (
      <PaneGroup>
        {items.map(Item => <Item key={Item.key} {...itemProps} />)}
      </PaneGroup>
    )
  }

  render() {
    const { root, document, onChange, customWrapper: CustomWrapper } = this.props
    if (root === undefined || document === undefined || window === undefined) return ''

    const ctrl = {
      root,
      document,
      window,
      onChange,
    }

    return (
      <CustomWrapper>
        {this.renderGroup([Bold, Italic, Underline, Strike], ctrl)}
        {this.renderGroup([FontSize, FontColor, LineHeight], ctrl)}
        {this.renderGroup([OrderedList, UnorderedList], ctrl)}
        {this.renderGroup([Left, Center, Right, Justify], ctrl)}

        {this.renderGroup([Sub, Super], ctrl)}
        {this.renderGroup([ClearFormat], ctrl)}
      </CustomWrapper>
    );
  }
}

export default Pane
