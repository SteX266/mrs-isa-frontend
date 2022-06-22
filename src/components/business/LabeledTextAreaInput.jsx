import React, { Component } from "react";
import { Form } from "react-bootstrap";

class LabeledTextAreaInput extends Component {
  state = {};
  render() {
    return (
      <>
        <Form.Group className="mb3" controlId={this.props.controlId}>
          <Form.Label>{this.props.name}</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder={this.props.placeholder}
          />
        </Form.Group>
      </>
    );
  }
}

export default LabeledTextAreaInput;
