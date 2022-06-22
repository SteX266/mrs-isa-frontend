import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Container, Navbar, Stack, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

export default function EditAvailabilityPeriod({ serviceID, type }) {
  const [availabilityPeriod, setAvailabilityPeriod] = useState([]);
  const [period, setPeriod] = useState({
    dateFrom: new Date(),
    dateTo: new Date(),
  });
  const [periodList, setPeriodList] = useState(<></>);

  function getPeriodByID() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    let url = "http://localhost:8080/entity/getDetailAdventure";
    switch (type) {
      case "adventure":
        url = "http://localhost:8080/entity/getDetailAdventure";
        break;
      case "vessel":
        url = "http://localhost:8080/entity/getDetailVessel";
        break;
      case "listing":
        url = "http://localhost:8080/entity/getDetailVacation";
        break;
      default:
        break;
    }
    let data;
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + token.accessToken,
      },
      params: {
        id: serviceID,
      },
    };
    axios.get(url, requestOptions).then((res) => {
      console.log(res.data);
      data = res.data.availabilityPeriod.map((period) => {
        return {
          dateFrom: new Date(period.dateFrom),
          dateTo: new Date(period.dateTo),
        };
      });
      setAvailabilityPeriod(data);
    });
  }

  useEffect(() => {
    getPeriodByID();
  }, []);

  useEffect(() => {
    setPeriodList(createPeriodList());
  }, [availabilityPeriod]);

  function createPeriodList() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date from</th>
            <th>Date to</th>
          </tr>
        </thead>
        <tbody>
          {availabilityPeriod.map((period, index) => {
            return (
              <tr key={index}>
                <td>{period.dateFrom.toLocaleString()}</td>
                <td>{period.dateTo.toLocaleString()}</td>
                <td>
                  <Button variant="outline-dark" onClick={remove} name={index}>
                    Remove
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
  function remove(event) {
    const allperiods = availabilityPeriod;
    const index = event.target.name;
    console.log(index);
    if (index > -1) allperiods.splice(index, 1);
    setAvailabilityPeriod(allperiods);
    setPeriodList(createPeriodList());
  }

  function addPeriod() {
    let newList = availabilityPeriod;
    newList.push(period);
    setAvailabilityPeriod(newList);
    setPeriodList(createPeriodList());
    setPeriod({ dateFrom: new Date(), dateTo: new Date() });
  }

  function saveChanges() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const data = {
      availabilityPeriodDTOS: availabilityPeriod,
      serviceID: serviceID,
    };
    const url = "http://localhost:8080/entity/editAvailabilityPeriod";
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + token.accessToken,
      },
    };
    console.log(data);
    axios.post(url, data, requestOptions).then((res) => {
      if (res.status == 200) {
        toast.success(res.data);
        console.log(res.data);
      } else toast.error(res.data);
    });
  }

  function addDisabled() {
    if (period.dateFrom >= period.dateTo) return true;
    if (!availabilityPeriod) return false;
    let disabled = false;
    availabilityPeriod.forEach((p) => {
      if (period.dateFrom < p.dateTo && period.dateFrom > p.dateFrom)
        disabled = true;
      if (period.dateFrom < p.dateFrom && period.dateTo > p.dateFrom)
        disabled = true;
    });
    return disabled;
  }
  // eslint-disable-next-line react/display-name
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className="btn btn-warning" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <Container style={{ width: "80%" }}>
      <Navbar collapseOnSelect className="rounded border border-dark">
        <Container>
          <Stack direction="horizontal" gap={3}>
            <Button variant="outline-dark" onClick={saveChanges}>
              Save changes
            </Button>
            Date from
            <DatePicker
              selected={period.dateFrom}
              onChange={(date) =>
                setPeriod({ ...period, dateFrom: date, dateTo: date })
              }
              showTimeSelect
              minDate={new Date()}
              dateFormat="MMMM d, yyyy h:mm aa"
              customInput={<CustomInput />}
              withPortal
            />
          </Stack>
          <Stack direction="horizontal" gap={3}>
            Date to
            <DatePicker
              selected={period.dateTo}
              onChange={(date) => setPeriod({ ...period, dateTo: date })}
              minDate={period.dateFrom}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              customInput={<CustomInput />}
              withPortal
            />
          </Stack>

          <Button
            onClick={addPeriod}
            variant="outline-dark"
            className="ms-auto"
            disabled={addDisabled()}
          >
            Add period
          </Button>
        </Container>
      </Navbar>
      {periodList}
    </Container>
  );
}
