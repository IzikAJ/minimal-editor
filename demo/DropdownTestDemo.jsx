import React from 'react'
import styled from 'styled-components'

import Drop from '../lib/visual/Dropdown'

const GoodContent = styled.span`
  padding: 10px;
  font-size: 20px;
  display: inline-block;
  z-index: 100;
`

const CustomLabel = styled.span`
  background: black;
  color: white;
  padding: 5px;
  ${
    ({expanded}) => expanded && `
      background: #eee;
      color: #600;
    `
  }
`
const CustomWrapper = styled.div`
  position: relative;
  display: inline-block;
  background: orange;
  padding: 3px;
`
const CustomPane = styled.div`
  background: cyan;
  padding: 10px;
  width: 300px;
  max-width: 300px;
`

export default () => (
  <React.Fragment>
    <h4>Normal Dropdown</h4>

    <Drop label="Some label">
      <GoodContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium perferendis quia, eius est quam nam ipsam deleniti possimus assumenda esse modi, ratione iste recusandae porro expedita dolor placeat sed sint!
        </GoodContent>
    </Drop>

    <h4>Absolute Dropdown</h4>
    <Drop label="Some label" dropToBody={true} customWrapper={CustomWrapper}>
      <GoodContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium perferendis quia, eius est quam nam ipsam deleniti possimus assumenda esse modi, ratione iste recusandae porro expedita dolor placeat sed sint!
        </GoodContent>
    </Drop>

    <h4>Customized Dropdown</h4>
    <Drop label="Some label" customLabel={CustomLabel} customPane={CustomPane} customWrapper={CustomWrapper}>
      <GoodContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium perferendis quia, eius est quam nam ipsam deleniti possimus assumenda esse modi, ratione iste recusandae porro expedita dolor placeat sed sint!
        </GoodContent>
    </Drop>

  </React.Fragment>
)
