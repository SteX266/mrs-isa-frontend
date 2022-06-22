import {Modal, Button, FormLabel} from "react-bootstrap";
import React, { useState } from "react";
import { MDBInput } from "mdbreact";



export default function RegistrationDialog({showModal, confirmed, canceled}) {

  const [text, setText] = useState("");

  function textChanged(e){
    setText(e.target.value);
  }


  if(!showModal){
    return <></>;
}
else{
  return (
    <>
      <Modal show={true} onHide={canceled} >
        <Modal.Header closeButton>
          <Modal.Title>REGISTRATION REQUEST</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <FormLabel style={{marginTop:"5px"}}>Please insert the reason behind your registration</FormLabel>

          <MDBInput onChange={textChanged} type="textarea"  rows="2" icon="pencil-alt" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={canceled}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => confirmed(text)}>
            Submit request
          </Button>
        </Modal.Footer>
      </Modal>
      

    </>
  );
}

}


