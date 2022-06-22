import { Modal, Button, FormLabel } from "react-bootstrap";
import React, { useState } from "react";
import { MDBInput } from "mdbreact";
import axios from "axios";
import toast from "react-hot-toast";

export default function ClientComplaintDialog({
  showModal,
  reservationId,
  confirmed,
  canceled,
}) {
  const [text, setText] = useState("");

  function textChanged(e) {
    setText(e.target.value);
  }

  function createComplaint() {
    const token = JSON.parse(localStorage.getItem("userToken"));

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token.accessToken,
    };

    axios
      .post(
        "http://localhost:8080/complaint/answerComplaint",
        { reservationId: reservationId, text: text },
        { headers }
      )
      .then(async (result) => {
        if (result.data == "OK") {
          toast.success("Answer successfully submited!");
        }
      })
      .catch(() => {
        toast.error("Answer couldn't be made");
      });
    confirmed();
  }

  if (!showModal) {
    return <></>;
  } else {
    return (
      <>
        <Modal show={true} onHide={canceled}>
          <Modal.Header closeButton>
            <Modal.Title>COMPLAINT ANSWER</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormLabel style={{ marginTop: "5px" }}>
              Please insert answer text
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
            <Button variant="primary" onClick={createComplaint}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
