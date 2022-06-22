import { Form, Stack } from "react-bootstrap";

function CancelationFeeRange({ state, onChange }) {
  return (
    <>
      <Form.Label>Cancelation fee </Form.Label>
      <Stack direction="vertical">
        <Form.Label>From</Form.Label>
        <Form.Range
          name="cancellationFeeFrom"
          min={0}
          max={state.cancellationFeeTo}
          step={10}
          value={state.cancellationFeeFrom}
          onChange={onChange}
        />
        <Form.Label>{state.cancellationFeeFrom}$</Form.Label>
        <Form.Label>To</Form.Label>
        <Form.Range
          name="cancellationFeeTo"
          min={state.cancellationFeeFrom}
          max={500}
          step={10}
          value={state.cancellationFeeTo}
          onChange={onChange}
        />
        <Form.Label>{state.cancellationFeeTo}$</Form.Label>
      </Stack>
    </>
  );
}

export default CancelationFeeRange;
