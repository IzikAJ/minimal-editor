import React from 'react'
import { DropDownItem } from './dropdown'

const Line = ({ item, onClick, value }) => {
  return (
    <DropDownItem
      key={item.id}
      active={value === item.value}
      onClick={onClick}
      children={item.title}
    />
  )
}

const Item = ({ onChange, value, items }) => {
  const onSelect = (item) => {
    if (typeof(onChange) === 'function' && value !== item.value) {
      onChange.call(this, item.value)
    }
  }

  return items.map(item => <Line key={item.id} onClick={() => onSelect(item)} value={value} item={item} />)
}

export default Item
