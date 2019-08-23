import React from 'react'
import styled from 'styled-components'

import Editor, { EditorWrapper, ContentEditable } from '../lib'
import sanitizer from 'sanitize-html'


// Match HEX
const HEX_VALUE = /^\#(0x)?[0-9a-f]+$/i
// Match RGB
const RGB_VALUE = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/
const ALIGN_VALUE = /^(?:left|right|center|justify)$/
// Match any number with px, em, or %
const SIZE_VALUE = /^\d+(?:px|em|rem|vw|vh|%)$/
const DEFAULT_VALUE = /^(?:inherit|none)$/
const DECIMAL_VALUE = /^\d+$/
const WORD_VALUE = /^\w+$/
const MULTIWORD_VALUE = /^(?:(?:[\w\s\"\'])+\s*)+$/
const MULTISIZE_VALUE = /^(?:\d+(?:px|em|%)\s+){0,3}\d+(?:px|em|%)$/
const ALLOWED_POSITIONS_VALUE = /^(?:relative|absolute)$/

const SanitizeConfig = {
  allowedTags: [
    'p', 'div', 'span', 'font', 'i', 'b', 'em', 'strong', 'u',
    'li', 'ul', 'ol', 'center', 'br', 'a', 'img',
    'pre', 'code', 'article', 'main', 'header', 'footer',
  ],
  allowedAttributes: {
    '*': ['style', 'title', 'id'],
    'a': ['href', 'target', 'rel'],
    'img': ['src'],
  },
  allowedStyles: {
    '*': {
      'color': [HEX_VALUE, RGB_VALUE],
      'background-color': [HEX_VALUE, RGB_VALUE],
      'text-align': [ALIGN_VALUE],
      'font-size': [SIZE_VALUE],
      'outline': [DEFAULT_VALUE],
      'line-height': [SIZE_VALUE],
      'margin': [SIZE_VALUE, MULTISIZE_VALUE, DEFAULT_VALUE],
      'padding': [SIZE_VALUE, MULTISIZE_VALUE, DEFAULT_VALUE],
      'vertical-align': [WORD_VALUE, DEFAULT_VALUE],
      'text-shadow': [DEFAULT_VALUE],
      'font-family': [MULTIWORD_VALUE],
      'font-weight': [DECIMAL_VALUE, WORD_VALUE],
      'width': [SIZE_VALUE, DEFAULT_VALUE],
      'height': [SIZE_VALUE, DEFAULT_VALUE],
      'display': [WORD_VALUE, DEFAULT_VALUE],
      'position': [ALLOWED_POSITIONS_VALUE, DEFAULT_VALUE],
    },
  }
}

const SanitizeStrictConfig = {
  allowedTags: [
    'p', 'div', 'span', 'font', 'i', 'b', 'em', 'strong', 'u',
    'li', 'ul', 'ol', 'center', 'br', 'a',
  ],
  // allowedAttributes: {
  //   '*': ['style', 'title', 'id'],
  //   'a': ['href', 'target', 'rel'],
  // },
  // allowedStyles: {
  //   '*': {
  //     'color': [HEX_VALUE, RGB_VALUE],
  //     'background-color': [HEX_VALUE, RGB_VALUE],
  //     'text-align': [ALIGN_VALUE],
  //     'font-size': [SIZE_VALUE],
  //     'line-height': [SIZE_VALUE],
  //     'font-family': [MULTIWORD_VALUE],
  //     'font-weight': [DECIMAL_VALUE, WORD_VALUE],
  //   },
  // }
}

const Wrapper = styled(EditorWrapper)`
  max-height: 50vh;
  overflow: auto;
  ${ContentEditable} {
    // position: static;
    // min-height: ${ (props) => props.minHeight};
  }
`

const sanitize = (raw) => {
  console.group('Sanitize')
  console.time('sanitization')
  const clean = sanitizer(raw, SanitizeConfig)
  console.timeEnd('sanitization')
  console.groupEnd('Sanitize')
  return clean
}

const sanitizeStrict = (raw) => {
  console.group('Sanitize')
  console.time('sanitization')
  const clean = sanitizer(raw, SanitizeStrictConfig)
  console.timeEnd('sanitization')
  console.groupEnd('Sanitize')
  return clean
}

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      input: {
        name: 'demoSanitize',
        value: '<p>Test Value</p>',
        onChange: this.handleChange,
        sanitize,
      }
    }
  }

  handleChange(raw) {
    console.log('demoSanitize:', { raw })
    // this.setState({ input: {...this.state.input, value} })
  }

  render() {
    return (
      <React.Fragment>
        <Editor {...this.state.input} customWrapper={Wrapper} />
        <h4>Strict sanitize:</h4>
        <Editor {...this.state.input} sanitize={sanitizeStrict} customWrapper={Wrapper} />
      </React.Fragment>
    )
  }
}

export default Demo
