import styled from 'styled-components'
import Icon from './Icon'

export default styled.button`
  appearance: none;
  outline: none;
  background: transparent;

  width: 30px;
  height: 30px;
  margin: 6px;
  padding: 0;
  display: inline-block;
  vertical-align: middle;
  border: 0;
  border-radius: 4px;
  font-size: 18px;
  transition: all .3s ease-in-out;
  transition: background-color 200 ease-in-out;

  &:hover {
    background-color: rgba(32,33,36,0.059);
  }

  &:active {
    background-color: #aaa;
  }

  & ${Icon}:before {
    min-width: 30px;
    min-height: 30px;
    font-size: 18px;
    line-height: 30px;
  }

  ${
    ({ checked }) => checked && `
      background-color: rgba(32,33,36,0.122);
      &:hover {
        background-color: rgba(32,33,36,0.122);
      }
    ` || ''
  }
`
