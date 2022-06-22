import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Container, Form, Navbar, Stack, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";

export default function AvailabilityPeriod({ periodsDTO, save, next, back }) {
  const [periods, setPeriods] = useState(periodsDTO);
  const [id, setId] = useState(0);
  const [period, setPeriod] = useState({
    dateFrom: new Date(),
    dateTo: new Date(),
    id: id,
  });
  const [periodsTable, setPeriodsTable] = useState(<></>);
  function createTable() {
    if (!periods || periods == []) return <></>;
    return (
      <Table striped bordered hover>
        <thead>
          <th>Date from</th>
          <th>Date to</th>
        </thead>
        <tbody>
          {periods.map((period, index) => (
            <tr key={index}>
              <td>{period.dateFrom.toLocaleString()}</td>
              <td>{period.dateTo.toLocaleString()}</td>
              <td>
                <Button
                  onClick={removePeriod}
                  id={period.id}
                  variant="outline-dark"
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
  useEffect(() => {
    console.log(periods);
    setPeriodsTable(createTable());
  }, [periods]);

  function removePeriod(event) {
    let new_periods = periods;
    for (let i = 0; i < new_periods.length; i++) {
      const element = new_periods[i];
      if (element.id == event.target.id) {
        new_periods.splice(i, 1);
        break;
      }
    }
    setPeriods(new_periods);
    setPeriodsTable(createTable());
  }

  function addNewPeriod() {
    let new_periods;
    if (!periods) new_periods = [];
    else new_periods = periods;
    setId(id + 1);
    new_periods.push(period);
    setPeriods(new_periods);
    setPeriod({
      dateFrom: new Date(),
      dateTo: new Date(),
      id: id,
    });
    setPeriodsTable(createTable());
  }
  function onNext() {
    save(periods, "availabilityPeriod");
    next();
  }

  function addDisabled() {
    if (period.dateFrom >= period.dateTo) return true;
    if (!periods) return false;
    let disabled = false;
    periods.forEach((p) => {
      if (period.dateFrom < p.dateTo && period.dateFrom > p.dateFrom)
        disabled = true;
      if (period.dateFrom < p.dateFrom && period.dateTo > p.dateFrom)
        disabled = true;
    });
    return disabled;
  }

  function nextDisabled() {
    if (!periods || periods.length <= 0) return true;
    return false;
  }

  // eslint-disable-next-line react/display-name
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className="btn btn-warning" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  return (
    <Container>
      <Stack direction="vertical" gap={3}>
        <Form.Group>
          <Form.Label>Date from</Form.Label>
          <DatePicker
            selected={period.dateFrom}
            onChange={(date) => setPeriod({ ...period, dateFrom: date })}
            showTimeSelect
            minDate={new Date()}
            dateFormat="MMMM d, yyyy h:mm aa"
            customInput={<CustomInput />}
            withPortal
          />
          <Form.Label>Date to</Form.Label>
          <DatePicker
            selected={period.dateTo}
            onChange={(date) => setPeriod({ ...period, dateTo: date })}
            showTimeSelect
            minDate={period.dateFrom}
            dateFormat="MMMM d, yyyy h:mm aa"
            customInput={<CustomInput />}
            withPortal
          />
        </Form.Group>
        <Button
          onClick={addNewPeriod}
          variant="outline-dark"
          disabled={addDisabled()}
        >
          Add
        </Button>
      </Stack>
      {periodsTable}
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
    </Container>
  );
}
