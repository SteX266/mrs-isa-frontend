import { useState } from "react";
import { Button, Container, Form, Navbar, Stack } from "react-bootstrap";

export default function General({ generalDTO, save, next, back, isFirst }) {
  const max_capacity = 10;
  const max_fee = 10000;
  const max_map = { CAPACITY: 10, FEE: 10000 };
  const min = 0;
  const [general, setGeneral] = useState(generalDTO);
  function onChange(event, type) {
    let value = event.target.value;
    console.log(value, type);
    if (type !== "TEXT") {
      if (value > max_map[type]) value = max_map[type];
      else if (value < min) value = min;
    }
    setGeneral({ ...general, [event.target.name]: event.target.value });
  }
  function onPlus(event, step, max) {
    let value = general[event.target.name];
    if (!value) value = 0;
    value = parseInt(value);
    value += step;
    if (value > max) value = max;
    setGeneral({ ...general, [event.target.name]: value });
  }
  function onMinus(event, step, min) {
    let value = event.target.value;
    if (!value) value = 0;
    value = parseInt(value);
    value -= step;
    if (value < min) value = min;
    setGeneral({ ...general, [event.target.name]: value });
  }
  function onNext() {
    save(general, "general");
    next();
  }
  function nextDisabled() {
    return (
      !general.name ||
      !general.description ||
      !general.rulesOfConduct ||
      !general.capacity ||
      !general.rentalFee ||
      !general.cancellationFee
    );
  }
  return (
    <Container style={{ padding: 10 }}>
      <Stack>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            placeholder="Name"
            type="text"
            value={general.name}
            name="name"
            onChange={(e) => onChange(e, "TEXT")}
          />
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description"
            name="description"
            value={general.description}
            onChange={(e) => onChange(e, "TEXT")}
          />
          <Form.Label>Rules</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Rules"
            name="rulesOfConduct"
            value={general.rules}
            onChange={(e) => onChange(e, "TEXT")}
          />
          <Form.Label>Capacity</Form.Label>
          <Stack direction="horizontal" gap={2}>
            <Button
              name="capacity"
              onClick={(e) => onMinus(e, 1, min)}
              disabled={general.capacity <= min}
              variant="outline-dark"
            >
              -
            </Button>
            <Form.Control
              placeholder="Capacity"
              type="number"
              value={general.capacity}
              name="capacity"
              onChange={(e) => onChange(e, "CAPACITY")}
            />
            <Button
              name="capacity"
              disabled={general.capacity >= max_capacity}
              onClick={(e) => onPlus(e, 1, max_capacity)}
              variant="outline-dark"
            >
              +
            </Button>
          </Stack>
          <Form.Label>Rental fee</Form.Label>
          <Stack direction="horizontal" gap={2}>
            <Button
              name="rentalFee"
              onClick={(e) => onMinus(e, 5, min)}
              disabled={general.rentalFee <= min}
              variant="outline-dark"
            >
              -
            </Button>
            <Form.Control
              placeholder="Rental fee"
              type="number"
              value={general.rentalFee}
              name="rentalFee"
              onChange={(e) => onChange(e, "FEE")}
            />
            <Button
              name="rentalFee"
              disabled={general.rentalFee >= max_fee}
              onClick={(e) => onPlus(e, 5, max_fee)}
              variant="outline-dark"
            >
              +
            </Button>
          </Stack>
          <Form.Label>Cancellation fee</Form.Label>
          <Stack direction="horizontal" gap={2}>
            <Button
              name="cancellationFee"
              onClick={(e) => onMinus(e, 5, min)}
              disabled={general.cancellationFee <= min}
              variant="outline-dark"
            >
              -
            </Button>
            <Form.Control
              placeholder="Cancellation fee"
              type="number"
              value={general.cancellationFee}
              name="cancellationFee"
              onChange={(e) => onChange(e, "FEE")}
            />
            <Button
              name="cancellationFee"
              disabled={general.cancellationFee >= max_fee}
              onClick={(e) => onPlus(e, 5, max_fee)}
              variant="outline-dark"
            >
              +
            </Button>
          </Stack>
        </Form.Group>
      </Stack>
      <Navbar collapseOnSelect expand="lg" className="navigation-buttons">
        <Container>
          {isFirst && (
            <Button variant="outline-dark" onClick={back}>
              Back
            </Button>
          )}
          <Button variant="outline-dark" href="/captain/services">
            Cancel
          </Button>
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
    </Container>
  );
}
