import styled from 'styled-components'

const ColorItem = styled.span`
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
  border: 1px solid #fff;
  background: ${ ({ color }) => color };
  &:hover {
    border: 1px solid #000;
  }
  ${
    ({active}) => active && `
      outline: 1px solid #000;
      z-index: 2;
      &:before {
        content: '✓';
        display: block;
        text-shadow: 0px 0px 2px #fff;
        text-align: center;
        width: 16px;
        line-height: 16px;
        font-size: 16px;
      }
    `
  }
`

export default ColorItem
