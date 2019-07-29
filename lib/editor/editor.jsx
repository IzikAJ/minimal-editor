import React from 'react'
import PropTypes from 'prop-types'

import { FontIconsStyles } from './FontIcons'
import ContentEditable from './ContentEditable'
import EditorWrapper from './EditorWrapper'
import Pane from './Pane'

import SaveSelection from '../utils/SaveSelection'

export class Editor extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    controllsPane: PropTypes.elementType,
    showControlls: PropTypes.bool,
    readonly: PropTypes.bool,
    customWrapper: PropTypes.elementType,
  }

  static defaultProps = {
    controllsPane: Pane,
    showControlls: true,
    readonly: false,
    customWrapper: EditorWrapper,
  }

  constructor(props) {
    super(props)
    this.contentEditable = React.createRef()
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleCaretPosition = this.handleCaretPosition.bind(this)
    this.pushRefreshCaretPosition = this.pushRefreshCaretPosition.bind(this)
    this.forcedRevisionUpdate = this.forcedRevisionUpdate.bind(this)
    this.handleSelectionChange = this.handleSelectionChange.bind(this)
    this.updateTimerId = undefined
    this.state = {
      selection: undefined,
      revision: 1,
      html: props.value || '',
    }
  }

  handleChange(evt) {
    this.handleCaretPosition()
    const { onChange } = this.props
    const { value } = evt.target
    if (typeof (onChange) === 'function') {
      onChange.call(this, value)
    }
    this.setState({ html: value })
  }

  handleBlur(evt) {
    const selection = SaveSelection(window, this.contentEditable.current)
    this.setState({ selection })
  }

  handleFocus(evt) {
    this.handleCaretPosition(evt)
    const { selection } = this.state
    if (selection === undefined) return
    selection.restore()
  }

  pushRefreshCaretPosition() {
    this.updateTimerId = null
    this.forcedRevisionUpdate()
  }

  handleCaretPosition(evt) {
    const curr = (new Date()).getTime()
    if (this.updateTimerId) {
      clearTimeout(this.updateTimerId)
    }
    this.updateTimerId = setTimeout(this.pushRefreshCaretPosition, 300)
  }

  isInside(node, root) {
    if (!node) return false
    if (node.isSameNode(root)) return true
    while (node = node.parentNode) {
      if (node.isSameNode(root)) return true
    }
    return false
  }

  handleSelectionChange(evt) {
    const root = this.contentEditable.current
    const document = root && root.ownerDocument
    if (!document) return

    const selection = document.getSelection()
    if (!selection) return
    if (!this.isInside(selection.anchorNode, root)) return
    if (!this.isInside(selection.extentNode, root)) return
    this.handleCaretPosition(evt)
  }

  componentDidMount() {
    const root = this.contentEditable.current
    const document = root && root.ownerDocument
    document.addEventListener('selectionchange', this.handleSelectionChange, false)

    this.setState({ mounted: true })
  }

  componentWillUnmount() {
    const root = this.contentEditable.current
    const document = root && root.ownerDocument
    document.removeEventListener('selectionchange', this.handleSelectionChange, false)

    this.setState({ mounted: false })
  }

  forcedRevisionUpdate(props = {}) {
    this.setState({ ...props, revision: this.state.revision + 1 })
  }

  renderPane() {
    if (!this.props.showControlls) return ''
    if (!this.state.mounted) return ''
    const root = this.contentEditable.current
    const document = root && root.ownerDocument
    if (!(root && document)) return ''
    const { controllsPane: Controlls } = this.props
    return (
      <Controlls
        root={root}
        document={document}
        revision={this.state.revision}
        onChange={this.forcedRevisionUpdate}
      />
    )
  }

  render() {
    const { customWrapper: Wrapper, ...props } = this.props
    return (
      <React.Fragment>
        <FontIconsStyles />

        {this.renderPane()}

        <Wrapper {...props}>
          <ContentEditable
            innerRef={this.contentEditable}
            html={this.state.html}
            disabled={false}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onKeyDown={this.handleCaretPosition}
            tagName="div"
          />
        </Wrapper>
      </React.Fragment>
    );
  }
}
