import React from 'react'
import Button from '../visual/Button'
import SaveFocus from '../utils/SaveFocus'

const symbol = '\x63'

const execute = (document, window, root) => {
  const focus = SaveFocus(window, root)
  document.execCommand('justifyCenter')
  focus.restore()
}

const Item = ({document, window, root}) => {
  return (
    <Button onClick={() => execute(document, window, root)} content={symbol} />
  )
}

export default Item
