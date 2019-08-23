import React from 'react'
import PropTypes from 'prop-types'

import { FontIconsStyles } from './FontIcons'
import ContentEditable from './ContentEditable'
import EditorWrapper from './EditorWrapper'
import TailWrapper from './TailWrapper'
import Pane from './Pane'
import { debounce } from 'lodash-es'
import later from '../utils/Later'

import SaveSelection from '../utils/SaveSelection'

const HTML_MIME_TYPE = 'text/html'

export class Editor extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    sanitize: PropTypes.func,
    value: PropTypes.string,
    controllsPane: PropTypes.elementType,
    showControlls: PropTypes.bool,
    readonly: PropTypes.bool,
    customWrapper: PropTypes.elementType,
    tail: PropTypes.element,
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
    this.handlePaste = this.handlePaste.bind(this)
    this.forcedRevisionUpdate = this.forcedRevisionUpdate.bind(this)
    this.handleCaretPosition = debounce(this.forcedRevisionUpdate, 300)

    this.state = {
      selection: undefined,
      revision: 1,
      html: props.value || '',
      clean: true,
    }
  }

  get parser() {
    return this._parser || (this._parser = new DOMParser())
  }

  normalize(raw) {
    let data = this.parser.parseFromString(raw, HTML_MIME_TYPE)
    data = data && data.body && data.body.innerHTML
    // need to discard any style inconsistency
    data = data && data.replace(/\<\w+\s+.*?style=\"(.*?)\".*?\>/gi, (m, s) => {
      return m.replace(s, s.replace(/[\s;]/g, ''))
    })
    return data
  }

  sanitize(raw) {
    if (!(raw && raw.length > 0)) return raw
    const { sanitize } = this.props
    if (typeof sanitize === 'function') {
      const clear = sanitize(raw)
      if (!(clear && clear.length > 0)) return ''
      if (this.normalize(raw) !== this.normalize(clear)) return clear
    }
    return raw
  }

  handleChange(evt) {
    this.handleCaretPosition(evt)
    const { onChange } = this.props
    let value = evt.target.value
    if (value === '') {
      value = '<p><br></p>'
    }
    if (!this.state.clean) {
      // const selection = SaveSelection(window, this.contentEditable.current)
      // setTimeout(later, 200, () => selection && selection.after())
      value = this.sanitize(value)
    }
    if (typeof onChange === 'function') {
      onChange.call(this, value)
    }
    this.setState({ html: value, clean: true })
  }

  componentWillReceiveProps(props) {
    if (props.value !== this.state.html) {
      const cleanState = this.sanitize(this.state.html)
      if (cleanState === props.value) return
      // console.log('componentWillReceiveProps', { cleanState, recived: props.value, isEq: (cleanState === props.value) })

      this.setState({ html: props.value})
    }
  }

  handleBlur(evt) {
    const selection = SaveSelection(window, this.contentEditable.current)
    this.setState({ selection })
  }

  handleFocus(evt) {
    if (document.queryCommandValue('formatBlock') === '') {
      console.log('force formatBlock to "p"')
      document.execCommand('formatBlock', false, 'p')
    }
    if (document.queryCommandState('styleWithCss')) {
      console.log('force styleWithCss to false')
      document.execCommand('styleWithCss', false, false)
    }
    this.handleCaretPosition(evt)
    const { selection } = this.state
    if (selection === undefined) return
    selection.restore()
  }

  isInside(node, root) {
    if (!node) return false
    if (node.isSameNode(root)) return true
    while (node = node.parentNode) {
      if (node.isSameNode(root)) return true
    }
    return false
  }

  handlePaste(evt) {
    if (this.selection) {
      console.log(this.selection)
      this.selection = undefined
    }
    this.setState({ clean: false })
  }

  componentDidMount() {
    const root = this.contentEditable && this.contentEditable.current
    if (root) {
      root.addEventListener('paste', this.handlePaste, false)
    }
    this.setState({ mounted: true })
  }

  componentWillUnmount() {
    const root = this.contentEditable && this.contentEditable.current
    if (root) {
      root.removeEventListener('paste', this.handlePaste, false)
    }
    this.setState({ mounted: false })
  }

  forcedRevisionUpdate(props = {}) {
    this.setState({revision: this.state.revision + 1})
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
    const { customWrapper: Wrapper, minHeight, maxHeight, head, tail, ...props } = this.props
    return (
      <React.Fragment>
        <FontIconsStyles />

        {this.renderPane()}

        <Wrapper
          {...props}
          minHeight={minHeight}
          maxHeight={maxHeight}
          tailHeight={this.state.tailHeight}
        >
          <ContentEditable
            innerRef={this.contentEditable}
            html={this.state.html}
            disabled={false}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            tagName="div"
          />
          {tail && <TailWrapper children={tail} />}
        </Wrapper>
      </React.Fragment>
    );
  }
}
