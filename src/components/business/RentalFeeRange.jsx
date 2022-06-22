import { Form, Stack } from "react-bootstrap";

function RentalFeeRange({ onChange, state }) {
  return (
    <>
      <Form.Label>Rental fee</Form.Label>
      <Stack direction="vertical">
        <Form.Label>From</Form.Label>
        <Form.Range
          name="rentalFeeFrom"
          min={0}
          max={state.rentalFeeTo}
          step={10}
          value={state.rentalFeeFrom}
          onChange={onChange}
        />
        <Form.Label>{state.rentalFeeFrom}$</Form.Label>
        <Form.Label>To</Form.Label>
        <Form.Range
          name="rentalFeeTo"
          min={state.rentalFeeFrom}
          max={500}
          step={10}
          value={state.rentalFeeTo}
          onChange={onChange}
        />
        <Form.Label>{state.rentalFeeTo}$</Form.Label>
      </Stack>
    </>
  );
}

export default RentalFeeRange;
