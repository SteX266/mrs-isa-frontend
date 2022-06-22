import axios from "axios";
import { Button, Card, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import ServerName from "../../ServerName";
const paths = {
  adventure: "/instructor/services",
  vessel: "/captain/services",
  listing: "/host/services",
};

export default function ConfirmCreate({ serviceDTO, back, type }) {
  const path = paths[type];
  function createVessel() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    let data;
    let url = `${ServerName}entity/createVessel`;
    switch (type) {
      case "adventure":
        url = `${ServerName}entity/createAdventure`;
        data = {
          name: serviceDTO.general.name,
          cancellationFee: serviceDTO.general.cancellationFee,
          price: serviceDTO.general.rentalFee,
          description: serviceDTO.general.description,
          rulesOfConduct: serviceDTO.general.rulesOfConduct,
          capacity: serviceDTO.general.capacity,
          city: serviceDTO.address.city,
          country: serviceDTO.address.country,
          streetName: serviceDTO.address.street,
          streetNumber: serviceDTO.address.streetNumber,
          amenities: serviceDTO.amenities,
          availabilityPeriod: serviceDTO.availabilityPeriod,
          photos: serviceDTO.photos,
          photoStrings:serviceDTO.photoStrings
        };
        break;
      case "vessel":
        url = `${ServerName}entity/createVessel`;
        data = {
          name: serviceDTO.general.name,
          cancellationFee: serviceDTO.general.cancellationFee,
          price: serviceDTO.general.rentalFee,
          description: serviceDTO.general.description,
          rulesOfConduct: serviceDTO.general.rulesOfConduct,
          capacity: serviceDTO.general.capacity,
          city: serviceDTO.address.city,
          country: serviceDTO.address.country,
          streetName: serviceDTO.address.street,
          streetNumber: serviceDTO.address.streetNumber,
          amenities: serviceDTO.amenities,
          availabilityPeriod: serviceDTO.availabilityPeriod,
          photos: serviceDTO.photos,
          photoStrings:serviceDTO.photoStrings,
          maxSpeed: serviceDTO.vesselDetails.maxSpeed,
          length: serviceDTO.vesselDetails.length,
          engineNumber: serviceDTO.vesselDetails.engineNumber,
          enginePower: serviceDTO.vesselDetails.enginePower,
          vesselType: serviceDTO.type,
        };
        break;
      case "listing":
        url = `${ServerName}entity/createListing`;
        data = {
          name: serviceDTO.general.name,
          cancellationFee: serviceDTO.general.cancellationFee,
          price: serviceDTO.general.rentalFee,
          description: serviceDTO.general.description,
          rulesOfConduct: serviceDTO.general.rulesOfConduct,
          capacity: serviceDTO.general.capacity,
          city: serviceDTO.address.city,
          country: serviceDTO.address.country,
          streetName: serviceDTO.address.street,
          streetNumber: serviceDTO.address.streetNumber,
          amenities: serviceDTO.amenities,
          availabilityPeriod: serviceDTO.availabilityPeriod,
          photos: serviceDTO.photos,
          photoStrings:serviceDTO.photoStrings
        };
        break;
      default:
        break;
    }
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + token.accessToken,
      },
    };
    console.log(serviceDTO);
    console.log(data);
    axios.post(url, data, requestOptions).then((res) => {
      if (res.status == 200) {
        toast.success(res.data);
        console.log(res.data);
      } else toast.error(res.data);
    });
  }
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Are you sure this is everything?</Card.Title>
          <Stack direction="horizontal" gap={3}>
            <Button onClick={createVessel} variant="outline-dark" >
              Create
            </Button>
            <Button variant="outline-dark" href={path}>
              Cancel
            </Button>
            <Button onClick={back} variant="outline-dark">
              Back
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </>
  );
}
