import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import ServerName from "../../ServerName";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
export default function RevenueReport() {
  const [graph, setGraph] = useState(<></>);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // eslint-disable-next-line react/display-name
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className="btn btn-warning" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  function createGraph() {
    return (
      <BarChart
        width={1200}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#8884d8" />
      </BarChart>
    );
  }
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setGraph(createGraph());
  }, [data]);
  useEffect(() => {}, []);
  function getData() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    let path = `${ServerName}entity/getRevenueReportData`;
    let values;

    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + token.accessToken,
      },
      params: {
        startDate: startDate,
        endDate: endDate,
      },
    };
    axios.get(path, requestOptions).then((res) => {
      values = res.data;
      console.log(values);
      setData(values);
    });
  }
  function onClick() {
    console.log(startDate, endDate);
    getData();
  }
  return (
    <Container>
      Start date:
      <DatePicker
        dateFormat="MMMM d, yyyy"
        withPortal
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        customInput={<CustomInput />}
      />
      End date:
      <DatePicker
        minDate={startDate}
        dateFormat="MMMM d, yyyy"
        withPortal
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        customInput={<CustomInput />}
      />
      <Button onClick={onClick} variant="outline-dark">
        Get Report
      </Button>
      {graph}
    </Container>
  );
}
