import { useState } from "react";
import EditAvailabilityPeriod from "./EditAvailabilityPeriod";
import EditGeneral from "./EditGeneral";
import EditAddress from "./EditAddress";
import EditPhotos from "./EditPhotos";
import EditAmenities from "./EditAmenities";
import { Container, Nav } from "react-bootstrap";

export default function EditListing({ listingID }) {
  const [current, setCurrent] = useState(
    <EditGeneral serviceID={listingID} type="listing" />
  );
  function changeComponent(type) {
    switch (type) {
      case "general":
        setCurrent(<EditGeneral serviceID={listingID} type="listing" />);
        break;
      case "availability":
        setCurrent(
          <EditAvailabilityPeriod serviceID={listingID} type="listing" />
        );
        break;
      case "address":
        setCurrent(<EditAddress serviceID={listingID} type="listing" />);
        break;
      case "photos":
        setCurrent(<EditPhotos serviceID={listingID} type="listing" />);
        break;
      case "amenities":
        setCurrent(<EditAmenities serviceID={listingID} type="listing" />);
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
