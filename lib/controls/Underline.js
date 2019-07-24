import React from 'react'
import SimpleControl from '../utils/SimpleControl'

const symbol = '\x75'
const command = 'underline'

const Item = (props) => {
  return <SimpleControl content={symbol} command={command} {...props} />
}

Item.key = 'Underline'

export default Item
