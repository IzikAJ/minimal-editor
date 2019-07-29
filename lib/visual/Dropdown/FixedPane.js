import styled from 'styled-components'

const FixedPane = styled.div`
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  transform: translate3d(${({ fixedX, fixedY }) => `${fixedX}px, ${fixedY}px, 0`});
`

export default FixedPane
