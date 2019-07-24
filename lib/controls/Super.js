import React from 'react'
import SimpleControl from '../utils/SimpleControl'

const symbol = 'A²'
const command = 'superscript'

const Item = (props) => {
  return <SimpleControl content={symbol} command={command} {...props} />
}

Item.key = 'Super'

export default Item
