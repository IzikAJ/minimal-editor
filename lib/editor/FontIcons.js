import { createGlobalStyle } from 'styled-components'

const woff = require('../../vendor/izicons.woff')
const woff2 = require('../../vendor/izicons.woff2')
const svg = require('../../vendor/izicons.svg')

export const FontIconsStyles = createGlobalStyle`
  @font-face {
    font-family: 'izicons';
    src: url(${woff2}) format('woff2'),
         url(${woff}) format('woff'),
         url(${svg}) format('svg');
    font-weight: normal;
    font-style: normal;
  }
`
