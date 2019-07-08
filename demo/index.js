import React from 'react'
import ReactDOM from 'react-dom'

import './utils/rootFallback'
import './common.scss'
import { App } from './app'


ReactDOM.render(
  React.createElement(App),
  document.getElementById('app')
);
