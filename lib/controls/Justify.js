import React from 'react'
import SimpleControl from '../utils/SimpleControl'

const symbol = '\x6a'
const command = 'justifyFull'

const Item = (props) => {
  return <SimpleControl content={symbol} command={command} {...props} />
}

Item.key = 'Justify'

export default Item
