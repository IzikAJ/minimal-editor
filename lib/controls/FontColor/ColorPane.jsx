import React from 'react'
import styled from 'styled-components'

import ColorItem from './ColorItem'

const ColorLine = styled.div`
  display: flex;
  margin-bottom: 10px;
  & + & + & {
    margin-bottom: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
`
const ColorPane = styled.div`
  margin: 0 7px 2px;
  display: block;
`
const ColorPaneTitle = styled.div`
  display: block;
  margin: 5px 0;
`

const inGroupsOf = (items, cnt) => {
  let cursor = 0
  return (new Array(Math.ceil(items.length / cnt))).join('*').split('*').map(() => {
    return items.slice(cursor, cursor = cursor + cnt)
  })
}

const ColorsLine = ({ items, onChange, value }) => {
  const onSelect = (item) => {
    if (typeof (onChange) === 'function' && value !== item.rgb) {
      onChange.call(this, item.rgb)
    }
  }
  return (
    <ColorLine>
      {
        items.map(color => (
          <ColorItem
            key={color.id}
            active={value === color.rgb}
            onClick={() => onSelect(color)}
            color={color.rgb}
            title={color.title}
          />
        ))
      }
    </ColorLine>
  )
}

const Item = ({ onChange, value, colors, title, line = 8}) => {
  const delegateProps = { onChange, value }
  return (
    <ColorPane>
      {title && <ColorPaneTitle children={title} />}
      {inGroupsOf(colors, line).map(items => <ColorsLine key={items[0].id} items={items} {...delegateProps} />) }
    </ColorPane>
  )
}

export default Item
