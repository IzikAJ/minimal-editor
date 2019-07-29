import React from 'react'
import SaveFocus from '../../utils/SaveFocus'
import CheckCommand from '../../utils/CheckCommand'
import Drop from '../../visual/Dropdown'

import { AvailableItems } from './data'
import DropDownWrapper from './DropDownWrapper';
import Label from './Label';
import Pane from './Pane'

class Item extends React.Component {
  static key = 'FontSize'

  constructor(props) {
    super(props)
    this.handleDropdownSelect = this.handleDropdownSelect.bind(this)
    this.state = {
      value: '3',
      expanded: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const props = this.props || nextProps
    const document = props && props.document

    const enabled = this.isAvailable(document)
    if (enabled) {
      const size = this.getFontSize(document)
      this.setState({ enabled, size })
    }
  }

  isAvailable(document) {
    if (CheckCommand(document, 'fontSize') === undefined) {
      if (document.queryCommandEnabled('fontSize')) {
        return true
      }
    }
    return false
  }

  getFontSize(document) {
    return document.queryCommandValue('fontSize') || '3'
  }

  focusedUpdate(command, value) {
    const { root, window, document, onChange } = this.props
    root.focus()
    const focus = SaveFocus(window, root)
    document.execCommand(command, false, value)
    focus.restore()
    onChange()
  }

  handleDropdownSelect(value) {
    this.focusedUpdate('fontSize', value)
    this.setState({ value, expanded: false })
  }

  render() {
    return (
      <DropDownWrapper>
        <Drop customLabel={Label} dropToBody>
          <Pane items={AvailableItems} onChange={this.handleDropdownSelect} value={this.state.value} />
        </Drop>
      </DropDownWrapper>
    )
  }
}

export default Item
