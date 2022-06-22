import {Modal, Button, FormLabel} from "react-bootstrap";
import React, { useState } from "react";
import { MDBInput } from "mdbreact";
import axios from "axios";
import toast from "react-hot-toast";



export default function ReviewDialog({showModal,reservationId, confirmed, canceled}) {

  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  function textChanged(e){
    setText(e.target.value);
  }


  function StarRating ()  {
    const [hover, setHover] = useState(0);
    return (
      <div className="proba">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };

  function createReview(){

    const token = JSON.parse(localStorage.getItem("userToken"));
    const username = localStorage.getItem("username");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token.accessToken,
      },
      params: {
        reservationId: reservationId,
        username:username,
        text:text,
        rating:rating
        
      },
    };

    axios.get(
      "http://localhost:8080/review/createReview",
      requestOptions
    ).then(async result=>{
      if(result.data =="OK"){
        toast.success('Review successfully created!');

      }
    }).catch(()=>{

      toast.error('You\'ve already reviewed this entity');

    });

    confirmed();
  }


  if(!showModal){
    return <></>;
}
else{
  return (
    <>
      <Modal show={true} onHide={canceled} >
        <Modal.Header closeButton>
          <Modal.Title>REVIEW</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <FormLabel style={{marginBottom:"5px"}}>Please select your rating!</FormLabel>

          <StarRating />
          <FormLabel style={{marginTop:"5px"}}>Please insert review text</FormLabel>

          <MDBInput onChange={textChanged} type="textarea"  rows="2" icon="pencil-alt" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={canceled}>
            Cancel
          </Button>
          <Button variant="primary" onClick={createReview}>
            Submit review
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

}


