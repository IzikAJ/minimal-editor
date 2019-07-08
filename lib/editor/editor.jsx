import React from 'react'
import ContentEditable from 'react-contenteditable'
import styled from 'styled-components'

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
    this.state = {
      html: `
        <p>Deer stuar, selswair checker for mine</p>
        <p>I wanna do it</p>
      `,
    }
  }

  handleChange(evt) {
    console.log("handleChange ContentEditable", evt.target.value);

    this.setState({ html: evt.target.value });
  }

  render() {
    return (
      <ContentEditableWrapper>
        <ContentEditable
          innerRef={this.contentEditable}
          html={this.state.html}
          disabled={false}
          onChange={this.handleChange}
          tagName="div"
          className="ContentEditable"
        />
      </ContentEditableWrapper>
    );
  }
}
