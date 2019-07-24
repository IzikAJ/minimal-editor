import React from 'react'
import SaveFocus from '../../utils/SaveFocus'
import CheckCommand from '../../utils/CheckCommand'

import { AvailableSize, SizeLabel, DropDownID } from './data'
import {
  DropDownWrapper,
  DropDownItem,
  DropDown,
  DropDownToggle,
  MainIcon,
} from './dropdown'

class Item extends React.Component {
  static key = 'FontSize'

  constructor(props) {
    super(props)
    this.handleDropdownToggle = this.handleDropdownToggle.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.onItemSelect = {}
    AvailableSize.forEach(size => {
      this.onItemSelect[size] = () => this.handleDropdownSelect(size)
    })

    const initialIndex = 2
    const { document } = props
    this.state = {
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

  handleClickOutside(evt) {
    if (!this.state.expanded) return
    if (evt.target.closest(`#${DropDownID}`)) return

    evt.preventDefault()
    evt.stopPropagation()
    console.log('handleClickOutside', evt);
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

  handleDropdownSelect(size) {
    this.focusedUpdate('fontSize', size)
    this.setState({ size, expanded: false })
  }

  handleDropdownToggle() {
    this.setState({expanded: !this.state.expanded})
  }

  renderDropdownItem(size) {
    const active = this.state.size === size;
    return (
      <DropDownItem
        key={`dropItem${size}`}
        active={active}
        children={<font size={size}>{SizeLabel[size]}</font>}
        onClick={this.onItemSelect[size]}
      />
    )
  }

  renderDropdown() {
    return (
      <React.Fragment>
        {AvailableSize.map(size => this.renderDropdownItem(size))}
      </React.Fragment>
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
