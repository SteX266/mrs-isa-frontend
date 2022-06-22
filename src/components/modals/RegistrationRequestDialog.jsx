import { Modal, Button, FormLabel } from "react-bootstrap";
import React, { useState } from "react";
import { MDBInput } from "mdbreact";
import axios from "axios";
import toast from "react-hot-toast";
import ServerName from "../../ServerName";

export default function ComplaintDialog({
  showModal,
  client,
  confirmed,
  canceled,
  get,
}) {
  const [text, setText] = useState("");

  function textChanged(e) {
    setText(e.target.value);
  }

  async function DeclineRequest() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token.accessToken,
    };

    await axios
      .post(
        `${ServerName}registrationRequest/declineRegistrationRequest`,
        { client: client, description: text },
        { headers }
      )
      .then(async () => {
        toast.success(
          "Registration request from user " + client + " successfully declined "
        );
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
    get();
    confirmed();
  }

  if (!showModal) {
    return <></>;
  } else {
    return (
      <>
        <Modal show={true} onHide={canceled}>
          <Modal.Header closeButton>
            <Modal.Title>Decline Registration Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormLabel style={{ marginTop: "5px" }}>
              Please insert reason to decline request
            </FormLabel>

            <MDBInput
              onChange={textChanged}
              type="textarea"
              rows="2"
              icon="pencil-alt"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={canceled}>
              Cancel
            </Button>
            <Button variant="primary" onClick={DeclineRequest}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
