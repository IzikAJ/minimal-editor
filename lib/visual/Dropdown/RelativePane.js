import styled from 'styled-components'
import Pane from './Pane'

const RelativePane = styled.div`
  position: absolute;
  ${
    ({position}) => {
      switch (position) {
        case 'up':
          return `
          bottom: 100%;
          `
        default:
          return `
            top: 100%;
          `
      }
    }
  }
`

export default RelativePane
