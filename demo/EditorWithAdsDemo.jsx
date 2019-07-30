import React from 'react'
import styled from 'styled-components'

import Editor, { EditorWrapper, ContentEditable } from '../lib'

const Ads = styled.div`
  height: 100px;
  background: orange;
`
const Root = styled.div`
  position: relative;
`
const Wrapper = styled(EditorWrapper)`
  position: static;
  background: cyan;
  max-height: ${ (props) => props.maxHeight};
  overflow: auto;
  ${ContentEditable} {
    position: static;
    min-height: ${ (props) => props.minHeight};
  }
`

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: {
        name: 'demo1',
        value: (new Array(20)).join('*').split('*').map(() => '<p>Test Value</p>').join('\n'),
        onChange: (value) => {
          console.log('demo1:', value);
        }
      }
    }
  }
  render() {
    return (
      <React.Fragment>
        <Root>
          <Editor
            {...this.state.input}
            minHeight={'100px'}
            maxHeight={'200px'}
            customWrapper={Wrapper}
            tail={<Ads />}
          />
        </Root>
      </React.Fragment>
    )
  }
}

export default Demo
