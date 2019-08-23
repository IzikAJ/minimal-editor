import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import Editor, { Pane, ContentEditable } from '../lib'
// import Editor, { Pane } from '../dist/minimal-editor'
// import { ContentEditable } from '@izikaj/minimal-editor'

const EditorWrap = styled.div`
  position: relative;
  overflow: hidden;
  width: 400px;
  height: 400px;
`
const WrapperPannel = styled.div`
  font-weight: bold;
  line-height: 20px;
  background: transparent;
  width: 98%;
  margin: 0 1% 5px;
`
const PaneRoot = styled.div`
`

const EditorWrapper = styled.div`
  // border: none;
  border: 1px solid silver;
  ${ContentEditable} {
    min-height: ${ (props) => props.minHeight};
    max-height: ${ (props) => props.maxHeight};
    overflow: auto;
    padding: 5px 10px 5px 5px;

    ul {
      list-style-type: disc;
    }
    ol {
      list-style-type: decimal;
    }
    ul, ol {
      &, li {
        margin: initial;
        padding: initial;
        list-style-position: inside;
      }
    }
  }
`

const PaneInPortal = (targetRef) => (props) => {
  let target = targetRef && targetRef.current
  if (!target) return null

  return ReactDOM.createPortal(
    (
      <WrapperPannel>
        <Pane {...props} />
      </WrapperPannel>
    ),
    target,
  )
}

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.panelRef = React.createRef()

    this.onChange = this.onChange.bind(this)

    this.state = {
      controlls: false,
      html: '<p>Test Value</p>',
      input: {
        name: 'demo1',
        value: '<p>Test Value</p>',
        onChange: (value) => {
          console.log('demo1:', value);
        }
      }
    }
  }

  onChange(html) {
    // const { input } = this.props
    // const cleanHtml = Sanitize(html)
    console.log('onChange', { html, state: this.state });

    this.setState({
      html: html,
      input: {
        ...this.state.input,
        value: html,
      }
    })
  }

  render() {
    const { input, controlls } = this.state
    const Panel = PaneInPortal(this.panelRef)
    const minHeight = '200px'
    const maxHeight = '270px'
    const toggleControlls = () => {
      this.setState({ controlls: !this.state.controlls })
    }
    return (
      <EditorWrap>
        <div>
          <button onClick={toggleControlls} children={controlls ? 'Hide Controlls' : 'Show Controlls'} />
        </div>
        <Editor
          {...input}
          controllsPane={Panel}
          onChange={this.onChange}
          value={this.state.html}
          showControlls={controlls}
          customWrapper={EditorWrapper}
          minHeight={minHeight}
          maxHeight={maxHeight}
          tail={<PaneRoot ref={this.panelRef} />}
        />
      </EditorWrap>
    )
  }
}

export default Demo
