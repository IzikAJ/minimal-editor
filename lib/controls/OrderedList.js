import React from 'react'
import Button from '../visual/Button'
import SaveFocus from '../utils/SaveFocus'

const symbol = '\x4f'

const execute = (document, window, root) => {
  root.focus()
  const focus = SaveFocus(window, root)
  document.execCommand('insertOrderedList')
  focus.restore()
}

const Item = ({document, window, root}) => {
  return (
    <Button onClick={() => execute(document, window, root)} content={symbol} />
  )
}

export default Item
