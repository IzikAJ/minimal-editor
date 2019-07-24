import React from 'react'
import SimpleControl from '../utils/SimpleControl'

const symbol = '\x4f'
const command = 'insertOrderedList'

const Item = (props) => {
  return <SimpleControl content={symbol} command={command} {...props} />
}

Item.key = 'OrderedList'

export default Item
