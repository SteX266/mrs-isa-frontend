import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Stack, Navbar, Dropdown } from "react-bootstrap";

export default function Utilities({ type, amenitiesDTO, save, next, back }) {
  const [selected, setSelected] = useState(amenitiesDTO);
  const [utilities, setUtilities] = useState([]);
  const [buttons, setButtons] = useState(<></>);
  const [showUtilities, setShowUtilities] = useState([]);
  function getUtilitiesByType() {
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
      setUtilities(data);
      setShowUtilities(data);
      setButtons(createButtons());
    });
  }
  useEffect(() => {
    getUtilitiesByType();
  }, []);
  useEffect(() => {
    setButtons(createButtons());
  }, [utilities]);

  function createButtons() {
    return showUtilities.map((item) => (
      <Button
        key={item}
        name={item}
        variant="outline-dark"
        style={{ margin: 5, width: 120, height: 100 }}
        onClick={selectUtility}
      >
        {item}
      </Button>
    ));
  }
  function selectUtility(event) {
    let nextUtilities = selected;
    if (!selected) nextUtilities = [event.target.name];
    else if (selected.indexOf(event.target.name) === -1) {
      nextUtilities.push(event.target.name);
    } else {
      nextUtilities.splice(selected.indexOf(event.target.name), 1);
    }
    setSelected(nextUtilities);
  }
  function onNext() {
    save(selected, "amenities");
    next();
  }

  return (
    <Container>
      <Stack>
        <Container style={{ width: "80%" }}>
          <p>Do you have any standout amenities?</p>
          <Dropdown>
            <Dropdown.Toggle variant="outline-dark">Amenities</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={selectUtility}>Action</Dropdown.Item>
              <Dropdown.Item onClick={selectUtility}>
                Another action
              </Dropdown.Item>
              <Dropdown.Item onClick={selectUtility}>
                Something else
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Stack direction="horizontal">{buttons}</Stack>
        </Container>
      </Stack>
      <Navbar collapseOnSelect expand="lg" className="navigation-buttons">
        <Container>
          <Button variant="outline-dark" onClick={back}>
            Back
          </Button>
          <Button variant="outline-dark" href="/captain/services">
            Cancel
          </Button>
          <Button variant="outline-dark" className="ms-auto" onClick={onNext}>
            Next
          </Button>
        </Container>
      </Navbar>
    </Container>
  );
}
