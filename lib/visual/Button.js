import styled from 'styled-components'

export default styled.button`
  appearance: none;
  outline: none;

  min-width: 36px;
  min-height: 36px;
  margin: 3px;
  display: inline-block;
  vertical-align: middle;
  border: 0;
  border-radius: 4px;
  font-size: 18px;
  border: 1px solid transparent;
  transition: all .3s ease-in-out;

  &:hover {
    border: 1px solid silver;
    background: #eee;
  }

  &:active {
    border: 1px solid white;
    background: #aaa;
  }

  &:before {
    font-family: 'izicons';
    content: "${ ({ content }) => content }";
    display: inline-block;
  }
`
