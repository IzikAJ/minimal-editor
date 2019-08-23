import React from 'react'
import Button from '../visual/Button'
import Icon from '../visual/Icon'
import SaveFocus from './SaveFocus'
import CheckCommand from './CheckCommand'

const execute = (command, document, window, root, onChange) => {
  root.focus()
  const focus = SaveFocus(window, root)
  document.execCommand(command)
  requestAnimationFrame(() => {
    focus.restore()
    onChange()
  })
}

const isDisabled = (command, document) => CheckCommand(document, command) !== undefined

const isChecked = (command, document) => document.queryCommandState(command)

const Item = ({content, command, document, window, root, onChange}) => {
  const onClick = () => execute(command, document, window, root, onChange)
  const disabled = isDisabled(command, document)
  const checked = isChecked(command, document)

  return (
    <Button
      disabled={disabled}
      checked={checked}
      content={content}
      onClick={onClick}
      children={<Icon content={content} />}
    />
  )
}

export default Item
