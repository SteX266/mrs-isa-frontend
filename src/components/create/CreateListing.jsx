import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import Address from "../create/Address";
import AvailabilityPeriod from "../create/AvailabilityPeriod";
import ConfirmCreate from "../create/ConfirmCreate";
import General from "../create/General";
import PhotoUpload from "../create/PhotoUpload";
import Utilities from "../create/Utilities";

export default function CreateListing() {
  const [componentCounter, setComponentCounter] = useState(0);
  const [currentComponent, setCurrentComponent] = useState("");

  const [vesselDTO, setVesselDTO] = useState({
    general: {
      name: "",
      rulesOfConduct: "",
      capacity: "",
      rentalFee: "",
      cancellationFee: "",
    },
    periods: [],
    address: {
      street: "",
      streetNumber: "",
      city: "",
      country: "",
    },
    photos: [],
    photoStrings:[],
    amenities: [],
  });
  const components = [
    <General
      key="GENERAL"
      next={next}
      back={back}
      save={save}
      generalDTO={vesselDTO.general}
      isFirst={true}
    />,
    <AvailabilityPeriod
      key="AVAILABILITY_PERIOD"
      save={save}
      next={next}
      back={back}
      peridosDTO={vesselDTO.periods}
    />,
    <Address
      key="ADDRESS"
      save={save}
      next={next}
      back={back}
      addressDTO={vesselDTO.address}
    />,
    <PhotoUpload
      key="PHOTO_UPLOAD"
      save={save}
      next={next}
      back={back}
      photosDTO={vesselDTO.photos}
    />,
    <Utilities
      key="UTILITIES"
      save={save}
      next={next}
      back={back}
      amenitiesDTO={vesselDTO.amenities}
    />,
    <ConfirmCreate
      key="CONFIRM"
      serviceDTO={vesselDTO}
      back={back}
      type="listing"
    />,
  ];

  useEffect(() => {
    setCurrentComponent(components[componentCounter]);
  }, [componentCounter]);

  function next() {
    setComponentCounter(componentCounter + 1);
  }

  function back() {
    setComponentCounter(componentCounter - 1);
  }
  function save(value, key) {
    setVesselDTO({ ...vesselDTO, [key]: value });
    console.log(vesselDTO);
  }
  return (
    <Stack direction="horizontal">
      <div className="left-container">
        <p className="left-container-text">What kind of place will you host?</p>
      </div>
      <Stack className="right-container">{currentComponent}</Stack>
    </Stack>
  );
}
