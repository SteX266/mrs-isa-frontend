import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form, Navbar, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import ServerName from "../../ServerName";

export default function EditVesselDetails({ serviceID, type }) {
  const [details, setDetails] = useState({
    maxSpeed: "",
    engineNumber: "",
    enginePower: "",
  });
  function getDetailsByID() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    let url = `${ServerName}entity/getDetailAdventure`;
    console.log(type);
    switch (type) {
      case "adventure":
        url = `${ServerName}entity/getDetailAdventure`;
        console.log("NESTO");
        break;
      case "vessel":
        url = `${ServerName}entity/getDetailVessel`;
        console.log("NESTO");
        break;
      case "listing":
        url = `${ServerName}entity/getDetailVacation`;
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
      data = {
        maxSpeed: res.data.maxSpeed,
        engineNumber: res.data.engineNumber,
        enginePower: res.data.enginePower,
      };
      setDetails(data);
    });
  }
  useEffect(() => {
    getDetailsByID();
  }, []);
  function onChange(event) {
    setDetails({ ...details, [event.target.name]: event.target.value });
  }

  function saveChanges() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const data = details;
    data["serviceID"] = serviceID;
    const url = `${ServerName}entity/editVesselDetails`;
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
  return (
    <Container style={{ width: "50%" }}>
      <Navbar collapseOnSelect className="rounded border border-dark">
        <Container>
          <Button variant="outline-dark" onClick={saveChanges}>
            Save changes
          </Button>
        </Container>
      </Navbar>
      <Stack direction="vertical" gap={1}>
        <Form.Label>Max speed</Form.Label>
        <Form.Control
          type="number"
          value={details.maxSpeed}
          name="maxSpeed"
          onChange={onChange}
          min={0}
        />
        <Form.Label>Engine number</Form.Label>
        <Form.Control
          type="number"
          value={details.engineNumber}
          onChange={onChange}
          name="engineNumber"
          min={0}
        ></Form.Control>
        <Form.Label>Engine power</Form.Label>
        <Form.Control
          type="number"
          value={details.enginePower}
          onChange={onChange}
          name="enginePower"
          min={0}
        ></Form.Control>
      </Stack>
    </Container>
  );
}
