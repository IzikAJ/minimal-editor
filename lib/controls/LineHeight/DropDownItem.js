import styled from 'styled-components'

const DropDownItem = styled.div`
  padding: 2px 10px;
  white-space: nowrap;
  line-height: 1.5em;

  ${
    ({ active }) => active && `
      &:before {
        content: '✓';
        display: inline-block;
        width: 20px;
        vertical-align: middle;
      }
    ` || `
      padding-left: 30px;
    `
  }
  &:hover {
    background-color: #eee;
  }
`

export default DropDownItem
