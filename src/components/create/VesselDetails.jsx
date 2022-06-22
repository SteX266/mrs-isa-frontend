import { useState } from "react";
import { Button, Container, Form, Navbar, Stack } from "react-bootstrap";

export default function VesselDetails({ vesselDetailsDTO, save, next, back }) {
  const [details, setDetails] = useState(vesselDetailsDTO);
  function onChange(event) {
    setDetails({ ...details, [event.target.name]: event.target.value });
  }
  function onNext() {
    save(details, "vesselDetails");
    next();
  }
  return (
    <Container style={{ padding: 10 }}>
      <Stack direction="vertical">
        <Form.Group>
          <Form.Label>Vessel Length</Form.Label>
          <Form.Control
            placeholder="Enter vessel length (Optional)"
            type="number"
            value={details.length}
            onChange={onChange}
            name="length"
          />
          <Form.Label>Max Speed</Form.Label>
          <Form.Control
            placeholder="Enter max speed in km/h (Optional)"
            type="number"
            value={details.maxSpeed}
            onChange={onChange}
            name="maxSpeed"
          />
          <Form.Label>Engine Number</Form.Label>
          <Form.Control
            placeholder="Enter engine number (Optional)"
            type="number"
            value={details.engineNumber}
            onChange={onChange}
            name="engineNumber"
          />
          <Form.Label>Engine Power</Form.Label>
          <Form.Control
            placeholder="Enter engine power (Optional)"
            type="number"
            value={details.enginePower}
            onChange={onChange}
            name="enginePower"
          />
        </Form.Group>
      </Stack>
      <Navbar collapseOnSelect expand="lg" className="navigation-buttons">
        <Container>
          <Button variant="outline-dark" onClick={back}>
            Back
          </Button>
          <Button variant="outline-dark" className="ms-auto" onClick={onNext}>
            Next
          </Button>
        </Container>
      </Navbar>
    </Container>
  );
}
