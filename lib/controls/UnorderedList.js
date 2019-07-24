import React from 'react'
import SimpleControl from '../utils/SimpleControl'

const symbol = '\x55'
const command = 'insertUnorderedList'

const Item = (props) => {
  return <SimpleControl content={symbol} command={command} {...props} />
}

Item.key = 'UnorderedList'

export default Item
