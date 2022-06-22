import { useEffect, useState } from "react";
import {
  Button,
  CloseButton,
  Container,
  Form,
  Navbar,
  Stack,
} from "react-bootstrap";

export default function PhotoUpload({ photosDTO, save, next, back }) {
  const [photoStrings,setPhotoStrings] = useState([]);
  const [photos, setPhotos] = useState(photosDTO);
  const [photoGallery, setPhotoGallery] = useState(<></>);

  function createGallery() {
    return (
      <Stack direction="horizontal">
        {photos.map((photo) => (
          <div className="card" style={{ maxWidth: 300 }} key={photo}>
            <CloseButton onClick={removeImage} name={[photo]} />
            <img src={photo} alt="" />
          </div>
        ))}
      </Stack>
    );
  }
  useEffect(() => {
    setPhotoGallery(createGallery());
  }, [photos]);
  function clear() {
    setPhotos([]);
  }
  function onUpload(event) {
    const selectedFiles = [];
    var photoStringsList = [];
    const targetFiles = event.target.files;
    const targetFilesObject = [...targetFiles];
    targetFilesObject.map((file) => {

      console.log(file);
      var picturePath = new FileReader();

      picturePath.readAsDataURL(file);
      picturePath.onload = e => {


        photoStringsList.push(e.target.result);
      }
      

      return selectedFiles.push(URL.createObjectURL(file));
    });
    setPhotos(selectedFiles);
    console.log("NA CREATE");

    console.log(photoStringsList);
    setPhotoStrings(photoStringsList);
    event.target.value = "";
  }



  function removeImage(event) {
    const allPhotos = photos;
    const targetImage = event.target.name;
    const index = allPhotos.indexOf(targetImage);
    console.log(index);
    if (index > -1) allPhotos.splice(index, 1);
    setPhotos(allPhotos);
    setPhotoGallery(createGallery());
  }

  function onNext() {
    save(photos, "photos");
    console.log("NA SAVEE");
    console.log(photoStrings);
    save(photoStrings,"photoStrings");
    next();
  }
  function disabled() {
    if (!photos || photos.length <= 0) return true;
    return false;
  }
  return (
    <Container>
      <Navbar collapseOnSelect className="rounded border border-dark">
        <Container>
          <Container>
            <Form.Group className="mb3">
              <Form.Control
                type="file"
                multiple
                onChange={onUpload}
                name="photos"
                accept="image/*"
              />
            </Form.Group>
          </Container>

          <Button
            variant="outline-dark"
            className="ms-auto"
            onClick={clear}
            disabled={disabled()}
          >
            Clear
          </Button>
        </Container>
      </Navbar>
      <Stack direction="horizontal">{photoGallery}</Stack>

      <Navbar collapseOnSelect expand="lg" className="navigation-buttons">
        <Container>
          <Button variant="outline-dark" onClick={back}>
            Back
          </Button>
          <Container>
            <Button variant="outline-dark" href="/captain/services">
              Cancel
            </Button>
          </Container>
          <Button
            variant="outline-dark"
            className="ms-auto"
            onClick={onNext}
            disabled={disabled()}
          >
            Next
          </Button>
        </Container>
      </Navbar>
    </Container>
  );
}
