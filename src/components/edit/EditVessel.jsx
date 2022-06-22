import { useState } from "react";
import EditAvailabilityPeriod from "./EditAvailabilityPeriod";
import EditGeneral from "./EditGeneral";
import EditAddress from "./EditAddress";
import EditPhotos from "./EditPhotos";
import EditAmenities from "./EditAmenities";
import EditVesselDetails from "./EditVesselDetails";
import { Container, Nav } from "react-bootstrap";

export default function EditVessel({ vesselID }) {
  const [current, setCurrent] = useState(
    <EditGeneral serviceID={vesselID} type="vessel" />
  );
  function changeComponent(type) {
    switch (type) {
      case "general":
        setCurrent(<EditGeneral serviceID={vesselID} type="vessel" />);
        break;
      case "availability":
        setCurrent(
          <EditAvailabilityPeriod serviceID={vesselID} type="vessel" />
        );
        break;
      case "address":
        setCurrent(<EditAddress serviceID={vesselID} type="vessel" />);
        break;
      case "photos":
        setCurrent(<EditPhotos serviceID={vesselID} type="vessel" />);
        break;
      case "amenities":
        setCurrent(<EditAmenities serviceID={vesselID} type="vessel" />);
        break;
      case "details":
        setCurrent(<EditVesselDetails serviceID={vesselID} type="vessel" />);
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
        <Nav.Item>
          <Nav.Link onClick={() => changeComponent("details")}>
            Vessel details
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <>{current}</>
    </Container>
  );
}
