import React, { Component } from "react";
import { Button, Form, Container } from "react-bootstrap";
import LabeledInput from "./LabeledInput";

class ProfileEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "Imenko",
        surname: "Prezimenic",
        email: "mejl@mail.com",
        address: "Serbia, Novi Sad, Gogoljeva 11",
        phoneNumber: "0652988290",
      },
      backupUser: {
        name: "Imenko",
        surname: "Prezimenic",
        email: "mejl@mail.com",
        address: "Serbia, Novi Sad, Gogoljeva 11",
        phoneNumber: "0652988290",
      },
    };
  }
  onCancel = () => {
    this.setState({ user: this.state.backupUser });
  };
  onSave = () => {
    this.setState({ backupUser: this.state.user });
  };
  render() {
    return (
      <div style={{ padding: "55px" }}>
        <Container
          style={({ maxWidth: "35%" }, { padding: "20px" })}
          className="rounded border border-dark"
        >
          <Form>
            <LabeledInput
              name="First name"
              defaultValue={this.state.user.name}
              controlId="first-name-input"
            />
            <LabeledInput
              name="Last name"
              defaultValue={this.state.user.surname}
              controlId="last-name-input"
            />
            <LabeledInput
              name="Email"
              defaultValue={this.state.user.email}
              controlId="email-input"
              type="email"
            />
            <LabeledInput
              name="Address"
              defaultValue={this.state.user.address}
              controlId="address-input"
            />
            <LabeledInput
              name="Phone number"
              defaultValue={this.state.user.phoneNumber}
              controlId="first-name-input"
              type="tel"
            />
            <Button
              style={{
                marginTop: "16px",
                marginBottom: "16px",
                marginRight: "69%",
              }}
              variant="outline-dark"
              onClick={this.onSave}
            >
              Save
            </Button>
            <Button
              style={{ marginTop: "16px", marginBottom: "16px" }}
              variant="outline-danger"
              onClick={this.onCancel}
            >
              Cancel
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default ProfileEditForm;
