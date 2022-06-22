import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form, Navbar, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import ServerName from "../../ServerName";

export default function EditAddress({ serviceID, type }) {
  const [address, setAddress] = useState({
    streetName: "",
    streetNumber: "",
    city: "",
    country: "",
  });
  function getAddressByID() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    let url = `${ServerName}entity/getDetailAdventure`;
    switch (type) {
      case "adventure":
        url = `${ServerName}entity/getDetailAdventure`;
        break;
      case "vessel":
        url = `${ServerName}entity/getDetailVessel`;
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
        streetName: res.data.streetName,
        streetNumber: res.data.streetNumber,
        city: res.data.city,
        country: res.data.country,
      };
      setAddress(data);
    });
  }
  useEffect(() => {
    getAddressByID();
  }, []);

  function onChange(event) {
    setAddress({ ...address, [event.target.name]: event.target.value });
    console.log(address);
  }
  function saveChanges() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const data = address;
    data["serviceID"] = serviceID;
    const url = `${ServerName}entity/editAddress`;
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
    <Container style={{ width: "80%" }}>
      <Navbar collapseOnSelect className="rounded border border-dark">
        <Container>
          <Button variant="outline-dark" onClick={saveChanges}>
            Save changes
          </Button>
        </Container>
      </Navbar>
      <Stack direction="vertical" gap={1}>
        <Form.Label>Street name</Form.Label>
        <Form.Control
          type="text"
          value={address.streetName}
          onChange={onChange}
          name="streetName"
        ></Form.Control>
        <Form.Label>Street number</Form.Label>
        <Form.Control
          type="number"
          value={address.streetNumber}
          name="streetNumber"
          onChange={onChange}
          min={0}
        />
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          value={address.city}
          onChange={onChange}
          name="city"
        ></Form.Control>
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          value={address.country}
          onChange={onChange}
          name="country"
        ></Form.Control>
      </Stack>
    </Container>
  );
}
