import styled from 'styled-components'
import { DropDownID, MainSymbol, ToggleSymbol } from './data'
import Icon from '../../visual/Icon'

export const DropDownWrapper = styled.div.attrs(props => ({
  id: DropDownID,
}))`
  position: relative;
  height: 100%;
  min-width: 42px;
  height: 30px;
  margin: 6px;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
  ${
    ({expanded}) => expanded && `
      ${MainIcon} {
        background-color: rgba(32,33,36,0.122);
      }
    `
  }
`

export const MainIcon = styled(Icon).attrs(props => ({ content: MainSymbol }))`
  width: 40px;
  height: 30px;
  font-size: 22px;
  line-height: 30px;
  border-radius: 4px;
  text-align: center;
  padding-right: 10px;
  box-sizing: border-box;
  display: block;
`

export const DropDownItem = styled.div`
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

export const DropDown = styled.div`
  position: absolute;
  top: 100%;
  border: 1px solid silver;
  padding: 5px 0;
  background: white;
  right: -7px;
  box-shadow: 1px 1px 6px #aaa;
  box-sizing: border-box;
`

export const DropDownToggle = styled(Icon).attrs(props => ({ content: ToggleSymbol }))`
  display: block;
  position: absolute;
  right: 2px;
  top: 0;
  font-size: 12px;
  min-width: 14px;
  width: 14px;
  line-height: 30px;

  &:before {
    ${
      ({ expanded }) => expanded && `
        transform: rotate3d(0, 0, 1, 180deg);;
      `
    }
  }
`
