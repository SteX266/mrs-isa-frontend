import { Form, Stack } from "react-bootstrap";

function AddressFilter({ state, onChange }) {
  return (
    <>
      <Stack direction="vertical" gap={3}>
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          name="street"
          placeholder="Street"
          onChange={onChange}
          value={state.street}
        ></Form.Control>
        <Form.Control
          type="text"
          name="city"
          placeholder="City"
          onChange={onChange}
          value={state.city}
        ></Form.Control>
        <Form.Control
          type="text"
          name="country"
          placeholder="Country"
          onChange={onChange}
          value={state.country}
        ></Form.Control>
      </Stack>
    </>
  );
}

export default AddressFilter;
