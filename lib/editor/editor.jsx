import React from 'react'
import ContentEditable from 'react-contenteditable'
import styled from 'styled-components'

import { FontIconsStyles } from './FontIcons'
import Pane from './Pane'
import SaveSelection from '../utils/SaveSelection'

const ContentEditableWrapper = styled.div`
  border-radius: 4px;
  border: 1px solid brown;

  padding: 0.2em 1em;
  margin: 0 auto;

  .ContentEditable {
    min-height: 200px;
    display: block;
    outline: none;
    margin: 0;
    padding: 0;
    line-height: 2em;
    p {
      margin: 0;
    }
  }
`

export class Editor extends React.Component {
  constructor() {
    super()
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
      html: `
        <p>Deer stuar, selswair checker for mine</p>
        <p>I wanna do it</p>
        <p>I wanna do it???</p>
      `,
    }
  }

  handleChange(evt) {
    // console.log("handleChange ContentEditable", evt.target.value);
    this.handleCaretPosition()
    this.setState({ html: evt.target.value })
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

  forcedRevisionUpdate() {
    this.setState({ revision: this.state.revision + 1 })
  }

  renderPane() {
    if (!this.state.mounted) return ''
    const root = this.contentEditable.current
    const document = root && root.ownerDocument
    return (
      <Pane
        root={root}
        document={document}
        revision={this.state.revision}
        onChange={this.forcedRevisionUpdate}
      />
    )
  }

  render() {
    return (
      <React.Fragment>
        <FontIconsStyles />

        {this.renderPane()}

        <ContentEditableWrapper>
          <ContentEditable
            innerRef={this.contentEditable}
            html={this.state.html}
            disabled={false}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onKeyDown={this.handleCaretPosition}
            tagName="div"
            className="ContentEditable"
          />
        </ContentEditableWrapper>
      </React.Fragment>
    );
  }
}
