import styled from 'styled-components'

const DropDownItem = styled.div`
  padding: 2px 10px;
  white-space: nowrap;

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
  line-height: 1em;
  font {
    line-height: 1em;
    &[size="1"] {
      line-height: 2.5em;
    }
    &[size="2"] {
      line-height: 2.1em;
    }
    &[size="3"] {
      line-height: 1.8em;
    }
    &[size="4"] {
      line-height: 1.4em;
    }
    &[size="5"] {
      line-height: 1.2em;
    }
  }
`

export default DropDownItem
