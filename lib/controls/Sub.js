import React from 'react'
import SimpleControl from '../utils/SimpleControl'

const symbol = 'Aₐ'
const command = 'subscript'

const Item = (props) => {
  return <SimpleControl content={symbol} command={command} {...props} />
}

Item.key = 'Sub'

export default Item
