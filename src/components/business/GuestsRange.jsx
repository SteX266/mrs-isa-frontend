import { Form, Stack } from "react-bootstrap";

function GuestsRange({ state, onChange }) {
  return (
    <>
      <Form.Label>Guest number</Form.Label>
      <Stack direction="vertical">
        <Form.Label>From</Form.Label>
        <Form.Range
          name="guestsFrom"
          min={1}
          max={state.guestsTo}
          value={state.guestsFrom}
          onChange={onChange}
          width="80%"
        />
        <Form.Label>{state.guestsFrom}</Form.Label>
        <Form.Label>To</Form.Label>
        <Form.Range
          name="guestsTo"
          min={state.guestsFrom}
          max={10}
          value={state.guestsTo}
          onChange={onChange}
          width="80%"
        />
        <Form.Label>{state.guestsTo}</Form.Label>
      </Stack>
    </>
  );
}

export default GuestsRange;
