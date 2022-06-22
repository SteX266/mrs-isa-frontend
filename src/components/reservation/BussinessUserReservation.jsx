import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams } from "react-router";
import BigCalendar from "../BigCalendar";
import ReservationDialog from "../modals/ReservationDialog";
import toast from "react-hot-toast";
import { Form } from "react-bootstrap";

export default function BussinessUserReservation() {
  const params = useParams();
  const [excludeDates, setExcludeDates] = useState([]);
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [lastavailableDate, setLastAvailableDate] = useState(
    new Date("2034/02/08")
  );

  useEffect(() => {
    getReservations(params.id);
    getEntityAvailabilityPeriods(params.id);
  }, []);

  var preDates = [];
  var preEvents = [];

  async function makeReservation() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token.accessToken,
    };

    axios
      .post(
        "http://localhost:8080/reservation/makeReservationForClient",
        {
          dateFrom: startDate,
          dateTo: endDate,
          username: username,
          entityId: params.id,
        },
        { headers }
      )
      .then(async (result) => {
        if (result.data == "OK") {
          toast.success("Reservation created successfully!");
        }
      })
      .catch(() => {
        toast.error(
          "Reservation couldn't be made, either email was invalid or the selected period is reserved."
        );
      });
    closeModal();
  }
  async function getReservations(entityId) {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token.accessToken,
      },
      params: {
        id: entityId,
      },
    };

    await axios
      .get(
        "http://localhost:8080/reservation/getEntityReservations",
        requestOptions
      )
      .then((res) => {
        let dates = [];
        res.data.forEach((element) => {
          let startDate = new Date(element.startDate);
          let endDate = new Date(element.endDate);
          let event = { start: startDate, end: endDate };
          dates.push(event);
          addDatesToExclude(startDate, endDate);
        });
        preEvents.forEach((date) => {
          dates.push(date);
        });
        preEvents = dates;
        setEvents(dates);
      });
  }

  async function getEntityAvailabilityPeriods(entityId) {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token.accessToken,
      },
      params: {
        id: entityId,
      },
    };

    await axios
      .get(
        "http://localhost:8080/entity/getEntityAvailabilityPeriods",
        requestOptions
      )
      .then((res) => {
        let start = new Date();
        let dates = [];
        res.data.forEach((element) => {
          if (startDate.getTime() < new Date().getTime()) {
            start = new Date(element.dateTo);
          } else {
            let startDate = start;
            let endDate = new Date(element.dateFrom);
            start = new Date(element.dateTo);
            let event = { start: startDate, end: endDate };
            dates.push(event);
            addDatesToExclude(startDate, endDate);
          }
        });
        addDatesToExclude(start, new Date("2024/02/08"));
        let event = { start: start, end: new Date("2024/02/08") };
        dates.push(event);
        preEvents.forEach((date) => {
          dates.push(date);
        });
        preEvents = dates;
        setEvents(dates);
      });
  }

  function addDatesToExclude(startDate, endDate) {
    let dates = [];
    const date = new Date(startDate);
    date.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 1);
    while (date.getTime() < end.getTime()) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    preDates.forEach((date) => {
      dates.push(date);
    });
    setExcludeDates(dates);
    preDates = dates;
  }

  function StartDateSelected(date) {
    setStartDate(date);
    setEndDate(date);
    events.forEach((event) => {
      if (
        event.start.getTime() < lastavailableDate.getTime() &&
        event.start.getTime() > date.getTime()
      ) {
        setLastAvailableDate(event.start);
      }
    });
  }
  // eslint-disable-next-line react/display-name
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className="btn btn-warning" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  const filterStartTime = (time) => {
    const selectedDate = new Date(time);
    const currentDate = new Date();
    if (currentDate.getTime() >= selectedDate.getTime()) return false;
    let isFree = true;
    events.forEach((event) => {
      if (
        selectedDate.getTime() >= event.start.getTime() &&
        selectedDate.getTime() <= event.end.getTime()
      )
        isFree = false;
    });
    return isFree;
  };

  const filterEndTime = (time) => {
    const selectedDate = new Date(time);
    if (startDate.getTime() >= selectedDate.getTime()) return false;
    let isFree = true;
    events.forEach((event) => {
      if (
        selectedDate.getTime() >= event.start.getTime() &&
        selectedDate.getTime() <= event.end.getTime()
      )
        isFree = false;
    });
    return isFree;
  };

  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }

  return (
    <>
      <div className="container" style={{}}>
        <div className="row" style={{ padding: "15px" }}>
          <div className="col-md">
            Start date
            <DatePicker
              selected={startDate}
              onChange={(date) => StartDateSelected(date)}
              showTimeSelect
              minDate={new Date()}
              excludeDates={excludeDates}
              dateFormat="MMMM d, yyyy h:mm aa"
              customInput={<CustomInput />}
              filterTime={filterStartTime}
              withPortal
            />
          </div>
          <div className="col-md">
            End date
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate}
              maxDate={lastavailableDate}
              showTimeSelect
              filterTime={filterEndTime}
              dateFormat="MMMM d, yyyy h:mm aa"
              customInput={<CustomInput />}
              withPortal
            />
          </div>
          <div className="col-md">
            Email
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </div>
          <div className="col-md">
            <button
              className="btn btn-warning"
              style={{ margin: "15px" }}
              onClick={openModal}
            >
              Reserve
            </button>
          </div>
        </div>
        <BigCalendar />
      </div>
      <ReservationDialog
        showModal={showModal}
        confirmed={makeReservation}
        canceled={closeModal}
      />
    </>
  );
}
