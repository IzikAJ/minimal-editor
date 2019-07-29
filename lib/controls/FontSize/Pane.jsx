import React from 'react'
import DropDownItem from './DropDownItem'

const Line = ({ item, onClick, value }) => {
  return (
    <DropDownItem
      active={value === item.value}
      onClick={onClick}
    >
      <font size={item.value} children={item.title}/>
    </DropDownItem>
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
