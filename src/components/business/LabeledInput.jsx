import React, { Component } from "react";
import { Form } from "react-bootstrap";
class LabeledInput extends Component {
  render() {
    return (
      <>
        <Form.Group className="mb3" controlId={this.props.controlId}>
          <Form.Label>{this.props.name}</Form.Label>
          <Form.Control
            placeholder={this.props.placeholder}
            type={this.props.type}
            defaultValue={this.props.defaultValue}
            disabled={this.props.disabled}
          />
        </Form.Group>
      </>
    );
  }
}

export default LabeledInput;
