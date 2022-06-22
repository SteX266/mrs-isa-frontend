import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  CloseButton,
  Container,
  Form,
  Modal,
  Navbar,
  Stack,
} from "react-bootstrap";
import ServerName from "../../ServerName";

function EditPhotos({ serviceID, type }) {
  const [photos, setPhotos] = useState([]);
  const [photo, setPhoto] = useState();
  const [show, setShow] = useState(false);
  const [photoGallery, setPhotoGallery] = useState(<></>);
  function createGallery() {
    return (
      <Container>
        {photos.map((photo) => (
          <div className="card" style={{ maxWidth: 300 }} key={photo}>
            <CloseButton onClick={remove} name={[photo]} />
            <img src={photo} alt="" />
          </div>
        ))}
      </Container>
    );
  }
  function remove(event) {
    const allPhotos = photos;
    const targetImage = event.target.name;
    const index = allPhotos.indexOf(targetImage);
    console.log(index);
    if (index > -1) allPhotos.splice(index, 1);
    setPhotos(allPhotos);
    setPhotoGallery(createGallery());
  }
  function getPhotosByID() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    let url = `${ServerName}entity/getDetailAdventure`;
    switch (type) {
      case "adventure":
        url = `${ServerName}entity/getDetailAdventure`;
        break;
      case "vessel":
        url = `${ServerName}entity/getDetailVessel`;
        break;
      case "listing":
        url = `${ServerName}entity/getDetailVacation`;
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
      data = res.data.photos;
      setPhotos(data);
    });
  }
  useEffect(() => {
    getPhotosByID();
  }, []);

  function onUpload(event) {
    const selectedFiles = [];
    const targetFiles = event.target.files;
    const targetFilesObject = [...targetFiles];
    targetFilesObject.map((file) => {
      return selectedFiles.push(URL.createObjectURL(file));
    });
    setPhoto(selectedFiles);
  }
  function open() {
    setShow(true);
  }

  function close() {
    setShow(false);
  }
  useEffect(() => {
    setPhotoGallery(createGallery());
  }, [photos]);
  function save() {
    let newphotos = photos;
    newphotos.push(photo);
    setPhotos(newphotos);
    setShow(false);
    setPhoto([]);
    setPhotoGallery(createGallery());
  }
  function saveChanges() {}

  return (
    <Container style={{ width: "80%" }}>
      <Navbar collapseOnSelect className="rounded border border-dark">
        <Container>
          <Button variant="outline-dark" onClick={saveChanges}>
            Save changes
          </Button>
          <Button onClick={open} variant="outline-dark">
            Upload photo
          </Button>
        </Container>
      </Navbar>
      {photoGallery}
      <Stack direction="vertical" gap={1}></Stack>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Upload photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack direction="vertical" gap={1}>
            <Form.Control type="file" onChange={onUpload}></Form.Control>
            <div id="">
              <img src={photo} alt="Photo preview" />
            </div>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Stack direction="horizontal" gap={3}>
            <Button variant="outline-dark" onClick={close}>
              Cancel
            </Button>
            <Button variant="outline-dark" onClick={save}>
              Upload
            </Button>
          </Stack>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default EditPhotos;
