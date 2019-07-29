import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import Editor, { Pane } from '../lib'
// import Editor, { Pane } from '../dist/minimal-editor'

import FindOrCreateNode from '../lib/utils/FindOrCreateNode'

const portalNodeID = 'controllsInPortalDemoNodeID'

const ControllsWrap = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  background: #fff;
  margin: 10px;
`
const EditorWrap = styled.div`
  position: relative;
  overflow: hidden;
  width: 400px;
  height: 400px;
`

const PaneWrapper = styled.div`
  overflow: hidden;
  width: 400px;
  background: cyan;
`

const PaneInPortal = (props) => {
  return ReactDOM.createPortal(
    (
      <ControllsWrap>
        <Pane {...props} customWrapper={PaneWrapper}/>
      </ControllsWrap>
    ),
    FindOrCreateNode(portalNodeID),
  )
}

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      controlls: false,
      input: {
        name: 'demo1',
        value: '<p>Test Value</p>',
        onChange: (value) => {
          console.log('demo1:', value);
        }
      }
    }
  }

  render() {
    const { controlls, input } = this.state
    return (
      <EditorWrap>
        <div>
          <button onClick={() => this.setState({ controlls: !controlls })} children={controlls ? 'Hide Controlls' : 'Show Controlls'} />
        </div>
        <Editor {...input} controllsPane={PaneInPortal} showControlls={controlls} />
      </EditorWrap>
    )
  }
}

export default Demo
