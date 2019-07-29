import React from 'react'
import styled from 'styled-components'
import { MainSymbol, ToggleSymbol } from './data'
import Icon from '../../visual/Icon'

const MainIcon = styled(Icon).attrs(props => ({ content: MainSymbol }))`
  width: 40px;
  height: 30px;
  font-size: 22px;
  line-height: 30px;
  border-radius: 4px;
  text-align: center;
  padding-right: 10px;
  box-sizing: border-box;
  display: block;
  ${
    ({expanded}) => expanded && `
      background-color: rgba(32,33,36,0.122);
    `
  }
`

const DropDownToggle = styled(Icon).attrs(props => ({ content: ToggleSymbol }))`
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

const Label = ({expanded}) => (
  <React.Fragment>
    <MainIcon expanded={expanded} />
    <DropDownToggle expanded={expanded} />
  </React.Fragment>
)

export default Label
