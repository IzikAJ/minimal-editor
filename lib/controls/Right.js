import React from 'react'
import SimpleControl from '../utils/SimpleControl'

const symbol = '\x72'
const command = 'justifyRight'

const Item = (props) => {
  return <SimpleControl content={symbol} command={command} {...props} />
}

Item.key = 'Right'

export default Item
