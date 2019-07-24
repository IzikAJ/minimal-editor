import React from 'react'
import SimpleControl from '../utils/SimpleControl'

const symbol = '\x63'
const command = 'justifyCenter'

const Item = (props) => {
  return <SimpleControl content={symbol} command={command} {...props} />
}

Item.key = 'Center'

export default Item
