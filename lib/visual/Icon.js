import styled from 'styled-components'

export default styled.span`
  min-width: 24px;
  min-height: 24px;
  display: inline-block;
  vertical-align: middle;

  &:before {
    font-family: 'izicons';
    content: "${ ({ content }) => content }";
    display: inline-block;
  }
`
