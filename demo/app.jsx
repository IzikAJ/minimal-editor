import { hot } from 'react-hot-loader/root'
import React from 'react'

import Editor from '../lib'
// import Editor from '../dist/minimal-editor'

export const App = hot(() => (
  <React.Fragment>
    <div className="demo_wrapper">
      <h1>
        Simple Editor Demo
      </h1>

      <Editor />

      <i>
        Just try typing some text in editor
      </i>
    </div>
  </React.Fragment>
));
