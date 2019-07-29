import React from 'react'
import SaveFocus from '../../utils/SaveFocus'
import CheckCommand from '../../utils/CheckCommand'
import Drop from '../../visual/Dropdown'

import { AvailableItems, DefaultValue } from './data'
import Label from './Label'
import DropDownWrapper from './DropDownWrapper'
import Pane from './Pane'

class Item extends React.Component {
  static key = 'LineHeight'

  constructor(props) {
    super(props)
    this.handleDropdownSelect = this.handleDropdownSelect.bind(this)

    this.state = {
      expanded: false,
      value: DefaultValue,
    }
  }

  componentWillReceiveProps(nextProps) {
    const props = this.props || nextProps
    const document = props && props.document

    const enabled = this.isAvailable(document)
    if (enabled) {
      const value = this.getValue(document)
      this.setState({ enabled, value })
    }
  }

  isAvailable(document) {
    if (CheckCommand(document, 'formatBlock') === undefined) {
      if (document.queryCommandEnabled('formatBlock')) {
        return true
      }
    }
    return false
  }

  getValue(_document) {
    const nodes = this.filterSelection()
    let style = undefined
    if (!nodes) return
    for (const node of nodes) {
      const ns = node && node.style && node.style.lineHeight
      if (ns === undefined) continue
      if (style !== undefined && style !== ns) return
      style = ns
    }
    if (style) return style
    return DefaultValue
  }

  filterSelection() {
    const { root } = this.props
    const sel = document.getSelection()
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0)
      return Array.prototype.slice.call(root.childNodes).filter(node => range.intersectsNode(node))
    }
  }

  focusedUpdate(value) {
    const { root, window, document, onChange } = this.props
    root.focus()
    const focus = SaveFocus(window, root)

    const nodes = this.filterSelection()
    if (!nodes) return
    let updated = false

    nodes.forEach(node => {
      if (node && node.style && node.style.lineHeight !== value) {
        node.style.lineHeight = value
        updated = true
      }
    })
    focus.restore()
    if (!updated) return

    const html = root.innerHTML
    onChange.call(this, { html })
  }

  handleDropdownSelect(value) {
    this.focusedUpdate(value)
    this.setState({ value, expanded: false })
  }

  render() {
    return (
      <DropDownWrapper>
        <Drop customLabel={Label} dropToBody>
          <Pane items={AvailableItems} onChange={this.handleDropdownSelect} value={this.state.value} />
        </Drop>
      </DropDownWrapper>
    );
  }
}

export default Item
