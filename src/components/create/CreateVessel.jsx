import React, { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import "./CreateVessel.css";
import Address from "./Address";
import General from "./General";
import VesselTypeSelect from "./VesselTypeSelect";
import PhotoUpload from "./PhotoUpload";
import Utilities from "./Utilities";
import AvailabilityPeriod from "./AvailabilityPeriod";
import VesselDetails from "./VesselDetails";
import ConfirmCreate from "./ConfirmCreate";

export default function CreateVessel() {
  const [componentCounter, setComponentCounter] = useState(0);
  const [currentComponent, setCurrentComponent] = useState("");

  const [vesselDTO, setVesselDTO] = useState({
    type: "",
    general: {
      name: "",
      rulesOfConduct: "",
      capacity: "",
      rentalFee: "",
      cancellationFee: "",
      description: "",
    },
    availabilityPeriod: [],
    address: {
      street: "",
      streetNumber: "",
      city: "",
      country: "",
    },
    photos: [],
    photoStrings:[],
    amenities: [],
    vesselDetails: {
      length: "",
      maxSpeed: "",
      engineNumber: "",
      enginePower: "",
    },
  });
  const components = [
    <VesselTypeSelect
      key="TYPE_SELECT"
      next={next}
      save={save}
      typeDTO={vesselDTO.type}
    />,
    <General
      key="GENERAL"
      next={next}
      back={back}
      save={save}
      generalDTO={vesselDTO.general}
      isFirst={false}
    />,
    <AvailabilityPeriod
      key="AVAILABILITY_PERIOD"
      save={save}
      next={next}
      back={back}
      peridosDTO={vesselDTO.availabilityPeriod}
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
      type="vessel"
      key="UTILITIES"
      save={save}
      next={next}
      back={back}
      amenitiesDTO={vesselDTO.amenities}
    />,
    <VesselDetails
      key="VESSEL_DETAILS"
      save={save}
      next={next}
      back={back}
      vesselDetailsDTO={vesselDTO.vesselDetails}
    />,
    <ConfirmCreate
      key="CONFIRM"
      serviceDTO={vesselDTO}
      back={back}
      type="vessel"
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
    console.log(key);
    console.log(value);
    setVesselDTO({ ...vesselDTO, [key]: value });
    console.log(vesselDTO);
  }
  return (
    <Stack direction="horizontal">
      <div className="left-container">
        <p className="left-container-text">Are your boats the best in town?</p>
      </div>
      <Stack className="right-container">{currentComponent}</Stack>
    </Stack>
  );
}
