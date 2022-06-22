import { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import EditAddress from "./EditAddress";
import EditAmenities from "./EditAmenities";
import EditAvailabilityPeriod from "./EditAvailabilityPeriod";
import EditGeneral from "./EditGeneral";
import EditPhotos from "./EditPhotos";

export default function EditAdventurePage({ adventureID }) {
  const [current, setCurrent] = useState(
    <EditGeneral serviceID={adventureID} type="adventure" />
  );
  function changeComponent(type) {
    switch (type) {
      case "general":
        setCurrent(<EditGeneral serviceID={adventureID} type="adventure" />);
        break;
      case "availability":
        setCurrent(
          <EditAvailabilityPeriod serviceID={adventureID} type="adventure" />
        );
        break;
      case "address":
        setCurrent(<EditAddress serviceID={adventureID} type="adventure" />);
        break;
      case "photos":
        setCurrent(<EditPhotos serviceID={adventureID} type="adventure" />);
        break;
      case "amenities":
        setCurrent(<EditAmenities serviceID={adventureID} type="adventure" />);
        break;
      default:
        break;
    }
  }
  return (
    <Container style={{ width: "80%" }}>
      <Nav fill variant="tabs">
        <Nav.Item>
          <Nav.Link onClick={() => changeComponent("general")}>
            General
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => changeComponent("availability")}>
            Availability period
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => changeComponent("address")}>
            Address
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => changeComponent("photos")}>Photos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => changeComponent("amenities")}>
            Amenities
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <>{current}</>
    </Container>
  );
}
