import ContentEditable from './ContentEditable'
import styled from 'styled-components'

const EditorWrapper = styled.div`
  border: 1px solid silver;
  ${ContentEditable} {
    min-height: 200px;
    padding: 5px;
  }
`

export default EditorWrapper
