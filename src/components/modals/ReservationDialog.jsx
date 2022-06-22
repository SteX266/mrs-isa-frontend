import {Modal, Button, FormLabel} from "react-bootstrap";
import React from "react";



export default function ComplaintDialog({showModal, confirmed, canceled}) {




  if(!showModal){
    return <></>;
}
else{
  return (
    <>
      <Modal show={true} onHide={canceled} >
        <Modal.Header closeButton>
          <Modal.Title>COMPLAINT</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <FormLabel style={{marginTop:"5px"}}>Are you sure you want to make reservation. It will cost you bla bla, cancellation fee is bla bla</FormLabel>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={canceled}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmed}>
            Confirm reservation
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

}


