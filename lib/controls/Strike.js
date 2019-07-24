import React from 'react'
import SimpleControl from '../utils/SimpleControl'

const symbol = '\x73'
const command = 'strikeThrough'

const Item = (props) => {
  return <SimpleControl content={symbol} command={command} {...props} />
}

Item.key = 'Strike'

export default Item
