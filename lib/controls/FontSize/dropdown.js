import styled from 'styled-components'
import { DropDownID, MainSymbol, ToggleSymbol } from './data'
import Icon from '../../visual/Icon'

export const DropDownWrapper = styled.div.attrs(props => ({
  id: DropDownID,
}))`
  position: relative;
  height: 100%;
  min-width: 42px;
  line-height: 42px;
  padding: 0 14px 0 10px;
  box-sizing: border-box;
`

export const MainIcon = styled(Icon).attrs(props => ({ content: MainSymbol }))`
  width: 30px;
  height: 30px;
  font-size: 24px;
  line-height: 30px;
`

export const DropDownItem = styled.div`
  padding: 2px 10px;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  white-space: nowrap;

  ${
    ({ active }) => active && `
      background-color: #eee;
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
  &:first-child {
    border-top: 0;
  }
  &:last-child {
    border-bottom: 0;
  }
  &:hover {
    border-color: silver;
  }
  line-height: 1.2em;
  font {
    line-height: 1em;
  }
`

export const DropDown = styled.div`
  position: absolute;
  top: 100%;
  border: 1px solid silver;
  padding: 0;
  background: white;
  right: -1px;
  box-sizing: border-box;
`

export const DropDownToggle = styled(Icon).attrs(props => ({ content: ToggleSymbol }))`
  position: absolute;
  right: 0;
  font-size: 14px;
  min-width: 16px;
  width: 16px;

  &:before {
    ${
      ({ expanded }) => expanded && `
        transform: rotate3d(0, 0, 1, 180deg);;
      `
    }
    // display: inline-block;
    // vertical-align: middle;
  }
`

// export const MainIcon = styled(Icon).attrs(props => ({ content: MainSymbol }))`
//   width: 30px;
//   height: 30px;
//   font-size: 24px;
//   line-height: 30px;
// `
