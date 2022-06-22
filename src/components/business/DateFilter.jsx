import React from "react";
import { Container, Stack } from "react-bootstrap";
import DatePicker from "react-datepicker";

function DateFilter({ state, onSelectDate }) {
  // eslint-disable-next-line react/display-name
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className="btn btn-warning" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  return (
    <Container style={{ padding: 10 }}>
      <Stack direction="horizontal" gap={3}>
        From
        <DatePicker
          selected={state.dateFrom}
          onChange={(date) => onSelectDate("dateFrom", date)}
          showTimeSelect
          minDate={new Date()}
          dateFormat="MMMM d, yyyy h:mm aa"
          customInput={<CustomInput />}
          withPortal
        />
        To
        <DatePicker
          selected={state.dateTo}
          onChange={(date) => onSelectDate("dateTo", date)}
          showTimeSelect
          minDate={state.dateFrom}
          dateFormat="MMMM d, yyyy h:mm aa"
          customInput={<CustomInput />}
          withPortal
        />
      </Stack>
    </Container>
  );
}

export default DateFilter;
