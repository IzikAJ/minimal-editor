import React from 'react'
import SaveFocus from '../../utils/SaveFocus'
import CheckCommand from '../../utils/CheckCommand'

import { AvailableItems, DropDownID } from './data'
import {
  DropDownWrapper,
  DropDownItem,
  DropDown,
  DropDownToggle,
  MainIcon,
} from './dropdown'
import LineHeightPane from './LineHeightPane'

class Item extends React.Component {
  static key = 'LineHeight'

  constructor(props) {
    super(props)
    this.handleDropdownToggle = this.handleDropdownToggle.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.handleDropdownSelect = this.handleDropdownSelect.bind(this)

    const { document } = props
    this.state = {
      expanded: false,
      value: undefined,
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

  handleClickOutside(evt) {
    if (!this.state.expanded) return
    if (evt.target.closest(`#${DropDownID}`)) return

    evt.preventDefault()
    evt.stopPropagation()
    this.setState({ expanded: false })
  }

  componentDidMount() {
    const { document } = this.props
    document.addEventListener('click', this.handleClickOutside, false)
    document.addEventListener('touchstart', this.handleClickOutside, false)
  }

  componentWillUnmount() {
    const { document } = this.props;
    document.removeEventListener('click', this.handleClickOutside, false)
    document.removeEventListener('touchstart', this.handleClickOutside, false)
  }

  getValue(document) {
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

  handleDropdownToggle() {
    this.setState({expanded: !this.state.expanded})
  }

  renderDropdownItem(item) {
    const active = this.state.value === item.value;
    return (
      <DropDownItem
        key={`dropItem${item.id}`}
        active={active}
        children={item.title}
      />
    )
  }

  renderDropdown() {
    return (
      <LineHeightPane items={AvailableItems} onChange={this.handleDropdownSelect} value={this.state.value} />
    )
  }

  render() {
    const { size, up, down, enabled, expanded } = this.state
    return (
      <React.Fragment>
        <DropDownWrapper expanded={expanded} onClick={this.handleDropdownToggle}>
          <MainIcon />
          <DropDownToggle expanded={expanded} />
          {expanded && <DropDown children={this.renderDropdown()} />}
        </DropDownWrapper>
      </React.Fragment>
    );
  }
}

export default Item
