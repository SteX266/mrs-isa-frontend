import { useState } from "react";
import { Button, Container, Form, Navbar, Stack } from "react-bootstrap";

export default function Address({ addressDTO, save, next, back }) {
  const [address, setAddress] = useState(addressDTO);
  function onChange(event) {
    setAddress({ ...address, [event.target.name]: event.target.value });
  }
  function onNext() {
    save(address, "address");
    next();
  }
  function nextDisabled() {
    return (
      !address.street ||
      !address.streetNumber ||
      !address.city ||
      !address.country
    );
  }
  return (
    <Stack>
      <Container>
        <Form.Group>
          <Form.Label>Street</Form.Label>
          <Form.Control
            placeholder="Street name"
            type="text"
            value={address.street}
            name="street"
            onChange={onChange}
          />
          <Form.Label>Street number</Form.Label>
          <Form.Control
            placeholder="Street number"
            type="number"
            value={address.streetNumber}
            name="streetNumber"
            onChange={onChange}
          />
          <Form.Label>City</Form.Label>
          <Form.Control
            placeholder="City"
            type="text"
            value={address.city}
            name="city"
            onChange={onChange}
          />
          <Form.Label>Country</Form.Label>
          <Form.Control
            placeholder="Country"
            type="text"
            value={address.country}
            name="country"
            onChange={onChange}
          />
        </Form.Group>
      </Container>
      <iframe
        title="location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89850.58713654711!2d19.779401147753827!3d45.271429996290316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475b10613de93455%3A0xb6f7d683724fe28!2sNovi%20Sad!5e0!3m2!1sen!2srs!4v1652710131702!5m2!1sen!2srs"
        width="100%"
        height="580"
        style={{ border: 0, padding: 10 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <Navbar collapseOnSelect expand="lg" className="navigation-buttons">
        <Container>
          <Button variant="outline-dark" onClick={back}>
            Back
          </Button>
          <Container>
            <Button variant="outline-dark" href="/captain/services">
              Cancel
            </Button>
          </Container>
          <Button
            variant="outline-dark"
            className="ms-auto"
            onClick={onNext}
            disabled={nextDisabled()}
          >
            Next
          </Button>
        </Container>
      </Navbar>
    </Stack>
  );
}
