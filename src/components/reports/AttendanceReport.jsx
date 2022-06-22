import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Form } from "react-bootstrap";
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
export default function AttendanceReport() {
  const [graph, setGraph] = useState(<></>);
  const [type, setType] = useState("month");
  const [data, setData] = useState([]);
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
        <Bar dataKey="attendance" fill="#8884d8" />
      </BarChart>
    );
  }
  useEffect(() => {
    getData();
  }, [type]);
  useEffect(() => {
    setGraph(createGraph());
  }, [type, data]);
  useEffect(() => {}, []);

  function getData() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    let path = `${ServerName}entity/getReservationsAmountMonthly`;
    switch (type) {
      case "month":
        path = `${ServerName}entity/getReservationsAmountMonthly`;
        break;
      case "year":
        path = `${ServerName}entity/getReservationsAmountYearly`;
        break;
      case "week":
        path = `${ServerName}entity/getReservationsAmountWeekly`;
        break;

      default:
        break;
    }
    let values;
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + token.accessToken,
      },
    };
    axios.get(path, requestOptions).then((res) => {
      values = res.data;
      console.log(values);
      setData(values);
    });
  }
  function onSelect(event) {
    setType(event.target.value);
  }
  return (
    <Container>
      <Form.Select onChange={onSelect}>
        <option>Report type</option>
        <option value="year">Yearly</option>
        <option value="month">Monthly</option>
        <option value="week">Week</option>
      </Form.Select>
      {graph}
    </Container>
  );
}
