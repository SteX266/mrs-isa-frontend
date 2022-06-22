import React, { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import Address from "./Address";
import AvailabilityPeriod from "./AvailabilityPeriod";
import ConfirmCreate from "./ConfirmCreate";
import General from "./General";
import PhotoUpload from "./PhotoUpload";
import Utilities from "./Utilities";

function CreateAdventure() {
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
      type="adventure"
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
        <p className="left-container-text">What adventures await you?</p>
      </div>
      <Stack className="right-container">{currentComponent}</Stack>
    </Stack>
  );
}

export default CreateAdventure;
