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

export const ColorItem = styled.span`
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

export const ColorLine = styled.div`
  display: flex;
  margin-bottom: 10px;
  & + & + & {
    margin-bottom: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
`

export const ColorPane = styled.div`
  margin: 0 7px 2px;
  display: block;
`

export const ColorPaneTitle = styled.div`
  display: block;
  margin: 5px 0;
`

export const ColorPaneWrapper = styled.div`
  display: flex;
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
