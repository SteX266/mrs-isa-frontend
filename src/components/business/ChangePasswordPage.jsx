import React, { Component } from "react";
import { Container } from "react-bootstrap";
import PasswordChangeForm from "./PasswordChangeForm";

class ChangePasswordPage extends Component {
  state = {};
  render() {
    return (
      <div style={{ padding: "55px" }}>
        <Container
          style={{ maxWidth: "30%" }}
          className="rounded border border-dark"
        >
          <PasswordChangeForm></PasswordChangeForm>
        </Container>
      </div>
    );
  }
}

export default ChangePasswordPage;
