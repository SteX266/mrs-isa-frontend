import React, { useEffect, useState } from "react";
import "../../style/ListingProfilePage.css";
import axios from "axios";
import CarouselItem from "./CarouselItem";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Dialog from "../modals/Dialog";
import Map from "./Map";
import { Table, Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import ServerName from "../../ServerName";

export default function ListingProfilePage(props) {
  const params = useParams();

  const [listing, setListing] = useState({
    id: -1,
    photos: [],
    name: "",
    description: "",
    price: 0,
    averageScore: 0,
    capacity: 0,
    address: "",
    firstImage: "",
    type: "",
    rulesOfConduct: "",
    owner: "",
    ownersPhoneNumber: "",
    amenities: "",
  });
  const [show, setShow] = useState(false);

  const [calendar, setCalendar] = useState("");
  const [promos, setPromos] = useState([]);
  const [button, setButton] = useState(<></>);
  const [description, setDescription] = useState("");
  const [firstPhoto, setFirstPhoto] = useState("");

  const headers = ["Start", "End", "Price", "Button"];

  function renderAllPhotos(photo) {
    if (photo == listing.firstImage) {
      return <></>;
    }
    return <CarouselItem photo={photo} />;
  }

  function removePromo(promoId) {
    for (var i = 0; i < promos.length; i++) {
      var promo = promos[i];
      if (promo.id == promoId) {
        promos.splice(i, 1);
      }
    }
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const entityId = params.id;
    const requestOptions = {
      headers: { Authorization: "Bearer " + token.accessToken },
      params: { id: entityId },
    };

    axios
      .get(`${ServerName}entity/getEntityById`, requestOptions)
      .then((res) => {
        setListing(res.data);
        setListing({
          id: res.data.id,
          photos: res.data.photos,
          name: res.data.name,
          description: res.data.description,
          price: res.data.price,
          averageScore: res.data.averageScore,
          capacity: res.data.capacity,
          address: res.data.address,
          firstImage: res.data.firstImage,
          type: res.data.type,
          rulesOfConduct: res.data.rulesOfConduct,
          owner: res.data.owner,
          ownersPhoneNumber: res.data.ownersPhoneNumber,
          amenities: res.data.amenities,
          cancelationFee: res.data.cancelationFee,
        });
        var link = "/" + props.type + "/calendar/" + res.data.id;
        setCalendar(link);

        const desc =
          "Are you sure you want to make a reservation? Cancellation fee is " +
          res.data.cancelationFee;
        setDescription(desc);
        getFirstPhoto(res.data.firstImage);
      });

    getEntityPromos();
    getSubscribeState();
  }, []);

  function getFirstPhoto(first) {
    let ext = first.split(".");
    axios
      .get(`${ServerName}auth/getImage/` + first, {
        responseType: "blob",
        params: { extension: ext[1] },
      })
      .then((response) => {
        setFirstPhoto(URL.createObjectURL(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getSubscribeState() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const username = localStorage.getItem("username");
    const requestOptions = {
      headers: { Authorization: "Bearer " + token.accessToken },
      params: { entityId: params.id, username: username },
    };
    axios
      .get(`${ServerName}user/getSubscribeState`, requestOptions)
      .then((res) => {
        if (res.data) {
          setButton(
            <button
              onClick={unsubscribe}
              className="btn btn-warning"
              style={{ marginRight: "10px", marginTop: "15px" }}
            >
              Unsubscribe
            </button>
          );
        } else {
          setButton(
            <button
              onClick={subscribe}
              className="btn btn-warning"
              style={{ marginRight: "10px", marginTop: "15px" }}
            >
              Subscribe
            </button>
          );
        }
      });
  }

  async function getEntityPromos() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const requestOptions = {
      headers: { Authorization: "Bearer " + token.accessToken },
      params: { id: params.id },
    };
    axios
      .get(`${ServerName}promo/getEntityPromos`, requestOptions)
      .then((res) => {
        setPromos(res.data);
      });
  }

  function subscribe() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const username = localStorage.getItem("username");
    const requestOptions = {
      headers: { Authorization: "Bearer " + token.accessToken },
      params: { entityId: params.id, username: username },
    };
    axios.get(
      `${ServerName}entity/createSubscription`,
      requestOptions
    );

    setButton(
      <button
        onClick={unsubscribe}
        className="btn btn-warning"
        style={{ marginRight: "10px", marginTop: "15px" }}
      >
        Unsubscribe
      </button>
    );
  }

  function unsubscribe() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const username = localStorage.getItem("username");
    const requestOptions = {
      headers: { Authorization: "Bearer " + token.accessToken },
      params: { entityId: params.id, username: username },
    };
    axios.get(`${ServerName}entity/unsubscribe`, requestOptions);

    setButton(
      <button
        onClick={subscribe}
        className="btn btn-warning"
        style={{ marginRight: "10px", marginTop: "15px" }}
      >
        Subscribe
      </button>
    );
  }
  function openDeleteModal() {
    setShow(true);
  }

  function closeDeleteModal() {
    setShow(false);
  }
  function deleteEntity() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const requestOptions = {
      headers: { Authorization: "Bearer " + token.accessToken },
      params: { id: listing.id },
    };
    let path = `${ServerName}entity/deleteVessel`;
    switch (listing.type) {
      case "vessel":
        path = `${ServerName}entity/deleteVessel`;
        break;
      case "listing":
        path = `${ServerName}entity/deleteListing`;
        break;
      case "adventure":
        path = `${ServerName}entity/deleteAdventure`;
        break;
      default:
        break;
    }
    axios
      .delete(path, requestOptions)
      .then((res) => {
        if (res.status == 200) toast.success(res.data);
      })
      .catch((res) => {
        console.log(res);
        toast.error("Couldn't delete listing.");
      });
    closeDeleteModal();
  }

  return (
    <>
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={firstPhoto}
                      className="rounded"
                      alt="Admin"
                      width="350"
                    />
                    <div className="mt-3">
                      <h4>{listing.name}</h4>
                      <p className="text-secondary mb-1">{listing.type}</p>
                      <p className="text-muted font-size-sm">
                        {listing.address}
                      </p>
                      {props.type == "client" && button}
                      {!(
                        props.type == "admin" || props.type == "unregistered"
                      ) && (
                        <Link to={calendar}>
                          <button
                            className="btn btn-outline-warning"
                            style={{ marginRight: "10px", marginTop: "15px" }}
                          >
                            Reserve
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3">
                <div
                  id="carouselExampleControls"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src={firstPhoto}
                        className="d-block w-100"
                        alt="..."
                      />
                    </div>
                    {listing.photos.map(renderAllPhotos)}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Owner</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {listing.owner}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Owner&apos;s phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {listing.ownersPhoneNumber}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {listing.address}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Description</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {listing.description}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Amenities</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {listing.amenities}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Rules of conduct</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {listing.rulesOfConduct}
                    </div>
                  </div>
                  {!(
                    props.type == "client" || props.type == "unregistered"
                  ) && (
                    <div className="row">
                      <div className="col-sm-12">
                        {!(props.type == "admin") && (
                          <a
                            className="btn btn-warning "
                            href={"/" + props.type + "/edit/" + listing.id}
                          >
                            Edit
                          </a>
                        )}
                        <button
                          className="btn btn-danger "
                          style={{ marginLeft: "20px" }}
                          onClick={openDeleteModal}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="row gutters-sm">
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <Table
                        striped
                        hover
                        className="rounded  bg-light"
                        style={{ paddingTop: "125px", marginTop: "15px" }}
                      >
                        <TableHeader headers={headers} />
                        <TableBody
                          promos={promos}
                          removePromo={removePromo}
                          description={description}
                        />
                      </Table>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <Map address={listing.address}></Map>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete entity?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete this listing? Delete is permanent.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Stack direction="horizontal" gap={3}>
            <Button variant="outline-dark" onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button
              variant="outline-dark"
              onClick={deleteEntity}
              href={"/" + props.type + "/services"}
            >
              Confirm
            </Button>
          </Stack>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function TableHeader(props) {
  return (
    <thead>
      <tr>
        {props.headers.map((header, index) => (
          <th key={index}>{header}</th>
        ))}
      </tr>
    </thead>
  );
}

function TableBody(props) {
  return (
    <tbody>
      {props.promos.map((promo) => (
        <Promo
          key={promo.id}
          promo={promo}
          removePromo={props.removePromo}
          description={props.description}
        />
      ))}
    </tbody>
  );
}

function Promo(props) {
  const promo = props.promo;
  const button = getButton();
  const desc = props.description;

  const [showDialog, setShowDialog] = useState(false);

  function confirmReservation() {
    reservePromo();
    setShowDialog(false);
  }
  function cancelReservation() {
    setShowDialog(false);
  }

  function reservePromo() {
    const username = localStorage.getItem("username");
    const token = JSON.parse(localStorage.getItem("userToken"));
    const requestOptions = {
      headers: { Authorization: "Bearer " + token.accessToken },
      params: { promoId: promo.id, username: username },
    };
    axios
      .get(
        `${ServerName}reservation/createPromoReservation`,
        requestOptions
      )
      .then((res) => {
        console.log(res);
      });
  }

  function getButton() {
    return (
      <Button
        value={promo.id}
        onClick={() => {
          setShowDialog(true);
        }}
        variant="outline-dark"
      >
        Reserve
      </Button>
    );
  }

  return (
    <>
      <tr id={promo.id}>
        <td>{promo.dateFrom}</td>
        <td> {promo.dateTo}</td>
        <td>{promo.price}</td>
        <td>{button}</td>
      </tr>

      <Dialog
        show={showDialog}
        title="Create reservation?"
        description={desc}
        confirmed={confirmReservation}
        canceled={cancelReservation}
        hasText={false}
      />
    </>
  );
}
