import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Modal,
  Navbar,
  Stack,
  Table,
} from "react-bootstrap";
import toast from "react-hot-toast";

function EditAmenities({ serviceID, type }) {
  const [amenities, setAmenities] = useState([]);
  const [showAmenities, setShowAmenities] = useState([]);
  const [newAmenity, setNewAmenity] = useState();
  const [amenityList, setAmenityList] = useState(<></>);
  const [show, setShow] = useState(false);

  function getAmenitiesByID() {
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
      data = res.data.amenities;
      setAmenities(data);
      console.log(data);
    });
  }
  function getShowAmenities() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    let url = "http://localhost:8080/entity/getAdventureUtilities";
    switch (type) {
      case "adventure":
        url = "http://localhost:8080/entity/getAdventureUtilities";
        break;
      case "vessel":
        url = "http://localhost:8080/entity/getVesselUtilities";
        break;
      case "listing":
        url = "http://localhost:8080/entity/getListingUtilities";
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
    };
    axios.get(url, requestOptions).then((res) => {
      data = res.data;
      console.log(data);
      setShowAmenities(data);
    });
  }

  function remove(event) {
    const allperiods = amenities;
    const index = event.target.name;
    console.log(index);
    if (index > -1) allperiods.splice(index, 1);
    setAmenities(allperiods);
    setAmenityList(createAmenityList());
  }
  function createAmenityList() {
    return (
      <Table striped bordered hover>
        <thead>
          <th>Name</th>
        </thead>
        <tbody>
          {amenities.map((amenity, index) => {
            return (
              <tr key={amenity}>
                <td>{amenity}</td>
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

  useEffect(() => {
    getAmenitiesByID();
    getShowAmenities();
  }, []);

  useEffect(() => {
    setAmenityList(createAmenityList());
  }, [amenities]);

  function open() {
    setShow(true);
  }

  function close() {
    setShow(false);
  }

  function onChange(event) {
    console.log(event.target.value);
    if (event.target.value == "") return;
    setNewAmenity(event.target.value);
  }

  function addAmenity() {
    let newamenities = amenities;
    if (!newAmenity) return;
    newamenities.push(newAmenity);
    setAmenities(newamenities);
    setShow(false);
    setNewAmenity("");
    setAmenityList(createAmenityList());
    console.log(amenities);
  }

  function saveChanges() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const data = { amenityList: amenities, serviceID: serviceID };
    const url = "http://localhost:8080/entity/editAmenities";
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
          <Button onClick={open} variant="outline-dark" className="ms-auto">
            Add amenity
          </Button>
        </Container>
      </Navbar>
      {amenityList}
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Upload photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack direction="vertical" gap={1}>
            <Form.Select onChange={onChange}>
              <option value="Amenities">Amenities</option>
              {showAmenities.map((amenity) => {
                return (
                  <option value={amenity} key={amenity}>
                    {amenity}
                  </option>
                );
              })}
            </Form.Select>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Stack direction="horizontal" gap={3}>
            <Button variant="outline-dark" onClick={close}>
              Cancel
            </Button>
            <Button variant="outline-dark" onClick={addAmenity}>
              Add amenity
            </Button>
          </Stack>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default EditAmenities;
