import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams } from "react-router";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function BigCalendar() {
  const params = useParams();

  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    getReservations(params.id);
    getEntityAvailabilityPeriods(params.id);
    getEntityPromos(params.id);
  }, []);

  function getReservations(entityId) {
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

    axios
      .get(
        "http://localhost:8080/reservation/getEntityReservations",
        requestOptions
      )
      .then((res) => {
        let events = [];
        res.data.forEach((element) => {
          let startDate = new Date(element.startDate);
          let endDate = new Date(element.endDate);
          events.push({
            title: element.client,
            start: startDate,
            end: endDate,
          });
        });
        setAllEvents(events);
      });
  }
  function getEntityAvailabilityPeriods(entityId) {
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

    axios
      .get(
        "http://localhost:8080/entity/getEntityAvailabilityPeriods",
        requestOptions
      )
      .then((res) => {
        let events = [];
        res.data.forEach((element) => {
          let startDate = new Date(element.dateFrom);
          if (startDate.getTime() < new Date().getTime())
            startDate = new Date();
          let endDate = new Date(element.dateTo);
          events.push({
            title: "available",
            start: startDate,
            end: endDate,
          });
          setAllEvents((prevState) => [
            ...prevState,
            {
              title: "available",
              start: startDate,
              end: endDate,
            },
          ]);
        });
      });
  }

  function getEntityPromos(entityId) {
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

    axios
      .get("http://localhost:8080/promo/getEntityPromos", requestOptions)
      .then((res) => {
        let events = [];
        res.data.forEach((element) => {
          let startDate = new Date(element.dateFrom);
          if (startDate.getTime() < new Date().getTime())
            startDate = new Date();
          let endDate = new Date(element.dateTo);
          events.push({
            title: "promo",
            start: startDate,
            end: endDate,
          });
          setAllEvents((prevState) => [
            ...prevState,
            {
              title: "PROMO",
              start: startDate,
              end: endDate,
            },
          ]);
        });
      });
  }

  const eventPropGetter = React.useCallback(
    (event) => ({
      ...(!event.title.includes("available") && {
        style: {
          backgroundColor: "#6ac454",
        },
      }),
      ...(event.title.includes("PROMO") && {
        style: {
          backgroundColor: "#73021e",
          color: "white",
        },
      }),
    }),
    []
  );

  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 800, margin: "50px", backgroundColor: "white" }}
        eventPropGetter={eventPropGetter}
      />
    </div>
  );
}
