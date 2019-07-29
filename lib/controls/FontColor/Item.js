import React from 'react'
import SaveFocus from '../../utils/SaveFocus'
import CheckCommand from '../../utils/CheckCommand'
import Drop from '../../visual/Dropdown'

import { AvailableColors } from './data'

import ColorPane from './ColorPane'
import Label from './Label';
import DropDownWrapper from './DropDownWrapper';
import ColorPaneWrapper from './ColorPaneWrapper';

class Item extends React.Component {
  static key = 'FontColor'

  constructor(props) {
    super(props)
    this.handleFgColor = this.handleFgColor.bind(this)
    this.handleBgColor = this.handleBgColor.bind(this)

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

  render() {
    const { fgColor, bgColor } = this.state
    return (
      <DropDownWrapper>
        <Drop customLabel={Label} dropToBody>
          <ColorPaneWrapper>
            <ColorPane title="Text color" colors={AvailableColors} value={fgColor} onChange={this.handleFgColor} line={8} />
            <ColorPane title="Background color" colors={AvailableColors} value={bgColor} onChange={this.handleBgColor} line={8} />
          </ColorPaneWrapper>
        </Drop>
      </DropDownWrapper>
    )
  }
}

export default Item
