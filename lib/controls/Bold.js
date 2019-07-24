import React from 'react'
import SimpleControl from '../utils/SimpleControl'

const symbol = '\x62'
const command = 'bold'

const Item = (props) => {
  return <SimpleControl content={symbol} command={command} {...props} />
}

Item.key = 'Bold'

export default Item
