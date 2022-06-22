import { useState } from "react";
import { Button, Container, Form, Navbar, Stack } from "react-bootstrap";

export default function VesselTypeSelect({ typeDTO, save, next }) {
  const [type, setType] = useState(typeDTO);
  const types = ["SHIP", "YACHT", "PEDAL_BOAT"];
  const buttons = types.map((type) => (
    <Button
      key={type}
      name={type}
      variant="outline-dark"
      className="mx-auto"
      onClick={onClick}
      style={{ width: 350, height: 100 }}
    >
      {type} <br />
      <Form.Text muted>This is a description.</Form.Text>
    </Button>
  ));
  function onClick(event) {
    setType(event.target.name);
  }
  function onNext() {
    save(type, "type");
    next();
  }
  return (
    <Container style={{ padding: 10 }}>
      <div>Selected type: {type}</div>
      <Stack gap={3}>{buttons}</Stack>
      <Navbar collapseOnSelect expand="lg" className="navigation-buttons">
        <Container>
          <Button variant="outline-dark" href="/captain/services">
            Cancel
          </Button>
          <Button
            variant="outline-dark"
            className="ms-auto"
            onClick={onNext}
            disabled={!type}
          >
            Next
          </Button>
        </Container>
      </Navbar>
    </Container>
  );
}
