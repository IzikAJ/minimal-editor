import React from 'react'
import SaveFocus from '../../utils/SaveFocus'
import CheckCommand from '../../utils/CheckCommand'
import ColorPane from './ColorPane'

import {
  DropDownID,
  AvailableColors,
} from './data'
import {
  DropDownWrapper,
  DropDown,
  DropDownToggle,
  MainIcon,
  ColorItem,
  ColorPaneWrapper,
} from './dropdown'

class Item extends React.Component {
  static key = 'FontColor'

  constructor(props) {
    super(props)
    this.handleDropdownToggle = this.handleDropdownToggle.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.handleFgColor = this.handleFgColor.bind(this)
    this.handleBgColor = this.handleBgColor.bind(this)
    this.onItemSelect = {}

    this.state = {
      expanded: false,
      fgColor: 'rgb(0, 0, 0)',
      bgColor: 'rgb(255, 255, 255)',
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
    this.setState({ expanded: false })
  }

  focusedUpdate(command, value) {
    const { root, window, document, onChange } = this.props
    root.focus()
    const focus = SaveFocus(window, root)
    document.execCommand(command, false, value)
    focus.restore()
    onChange()
  }

  handleFgColor(fgColor) {
    this.focusedUpdate('foreColor', fgColor)
    this.setState({fgColor})
  }

  handleBgColor(bgColor) {
    this.focusedUpdate('hiliteColor', bgColor)
    this.setState({bgColor})
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

  handleDropdownToggle() {
    this.setState({expanded: !this.state.expanded})
  }

  renderColorItem(item) {
    const active = Math.random() < 0.2;
    return (
      <ColorItem
        key={`ColorItem${item.id}`}
        color={item.rgb}
        active={active}
      />
    )
  }

  renderDropdown() {
    const { fgColor, bgColor } = this.state
    return (
      <ColorPaneWrapper>
        <ColorPane title="Background color" colors={AvailableColors} value={fgColor} onChange={this.handleFgColor} line={8} />
        <ColorPane title="Text color" colors={AvailableColors} value={bgColor} onChange={this.handleBgColor} line={8} />
      </ColorPaneWrapper>
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
