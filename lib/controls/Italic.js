import React from 'react'
import SimpleControl from '../utils/SimpleControl'

const symbol = '\x69'
const command = 'italic'

const Item = (props) => {
  return <SimpleControl content={symbol} command={command} {...props} />
}

Item.key = 'Italic'

export default Item
