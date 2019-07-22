import React from 'react'
import ContentEditable from 'react-contenteditable'
import styled from 'styled-components'

import { FontIconsStyles } from './FontIcons'
import Pane from './Pane'
import SaveSelection from '../utils/SaveSelection'

const ContentEditableWrapper = styled.div`
  border-radius: 4px;
  border: 1px solid brown;

  padding: 0.2em 1em;
  margin: 0 auto;

  .ContentEditable {
    min-height: 100px;
    display: block;
    outline: none;
    margin: 0;
    padding: 0;
    line-height: 2em;
    p {
      margin: 0;
    }
  }
`

export class Editor extends React.Component {
  constructor() {
    super()
    this.contentEditable = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.state = {
      selection: undefined,
      html: `
        <p>Deer stuar, selswair checker for mine</p>
        <p>I wanna do it</p>
        <p>I wanna do it???</p>
      `,
    }
  }

  handleChange(evt) {
    console.log("handleChange ContentEditable", evt.target.value);

    this.setState({ html: evt.target.value });
  }

  handleBlur(evt) {
    const selection = SaveSelection(window, this.contentEditable.current)
    this.setState({ selection })
  }

  handleFocus(evt) {
    const { selection } = this.state
    if (selection === undefined) return
    selection.restore()
  }

  componentDidMount() {
    this.setState({ mounted: true })
  }

  componentWillUnmount() {
    this.setState({ mounted: false })
  }

  render() {
    return (
      <React.Fragment>
        <FontIconsStyles />
        {
          this.state.mounted && <Pane editor={this.contentEditable} />
        }
        <ContentEditableWrapper>
          <ContentEditable
            innerRef={this.contentEditable}
            html={this.state.html}
            disabled={false}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            tagName="div"
            className="ContentEditable"
          />
        </ContentEditableWrapper>
      </React.Fragment>
    );
  }
}
