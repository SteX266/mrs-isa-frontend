import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Container, Form, Navbar, Stack } from "react-bootstrap";
import toast from "react-hot-toast";

export default function EditGeneral({ serviceID, type }) {
  const [general, setGeneral] = useState({
    name: "",
    description: "",
    rulesOfConduct: "",
    price: "",
    cancellationFee: "",
    capacity: "",
  });
  function getGeneralByID() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    let url = "http://localhost:8080/entity/getDetailAdventure";
    console.log(type);
    switch (type) {
      case "adventure":
        url = "http://localhost:8080/entity/getDetailAdventure";
        break;
      case "vessel":
        url = "http://localhost:8080/entity/getDetailVessel";
        break;
      case "listing":
        console.log("Usao");
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
      data = {
        name: res.data.name,
        description: res.data.description,
        rulesOfConduct: res.data.rulesOfConduct,
        price: res.data.price,
        cancellationFee: res.data.cancellationFee,
        capacity: res.data.capacity,
      };
      setGeneral(data);
    });
  }
  useEffect(() => {
    getGeneralByID();
  }, []);

  function onChange(event) {
    setGeneral({ ...general, [event.target.name]: event.target.value });
    console.log(general);
  }

  function saveChanges() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const data = general;
    data["serviceID"] = serviceID;
    const url = "http://localhost:8080/entity/editGeneral";
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
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={general.name}
          onChange={onChange}
          name="name"
        ></Form.Control>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          value={general.description}
          onChange={onChange}
          name="description"
        ></Form.Control>
        <Form.Label>Rules of conduct</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          value={general.rulesOfConduct}
          onChange={onChange}
          name="rulesOfConduct"
        ></Form.Control>
        <Form.Label>Capacity</Form.Label>
        <Form.Control
          type="number"
          value={general.capacity}
          name="capacity"
          onChange={onChange}
          min={0}
          max={20}
        />
        <Form.Label>Rental fee</Form.Label>
        <Form.Control
          type="number"
          value={general.price}
          name="price"
          onChange={onChange}
          min={0}
          max={10000}
          step={5}
        />
        <Form.Label>Cancellation fee</Form.Label>
        <Form.Control
          type="number"
          value={general.cancellationFee}
          name="cancellationFee"
          onChange={onChange}
          min={0}
          max={10000}
          step={5}
        />
      </Stack>
    </Container>
  );
}
