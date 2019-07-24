import React from 'react'
import SimpleControl from '../utils/SimpleControl'

const symbol = '\x6c'
const command = 'justifyLeft'

const Item = (props) => {
  return <SimpleControl content={symbol} command={command} {...props} />
}

Item.key = 'Left'

export default Item
