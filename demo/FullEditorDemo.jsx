import React from 'react'

import Editor from '../lib'

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
    return (
      <React.Fragment>
        <Editor {...this.state.input} />
      </React.Fragment>
    )
  }
}

export default Demo
