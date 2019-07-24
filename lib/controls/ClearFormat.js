import React from 'react'
import SimpleControl from '../utils/SimpleControl'

const symbol = '🧹'
const command = 'removeFormat'

const Item = (props) => {
  return <SimpleControl content={symbol} command={command} {...props} />
}

Item.key = 'ClearFormat'

export default Item
