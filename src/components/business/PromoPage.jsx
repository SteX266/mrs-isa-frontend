import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormLabel,
  Modal,
  Nav,
  Navbar,
  Table,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useParams } from "react-router";
import toast from "react-hot-toast";

export default function BussinessPromoPage() {
  const [promos, setPromos] = useState([]);
  const [promo, setPromo] = useState({
    dateFrom: new Date(),
    dateTo: new Date(),
    price: "",
    description: "",
    capacity: "",
    systemEntityId: useParams()["id"],
  });
  const [promoTable, setPromoTable] = useState(<></>);
  const [show, setShow] = useState(false);
  const serviceID = useParams()["id"];
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function remove(event) {
    deleteByID(event.target.name);
  }
  function deleteByID(id) {
    const token = JSON.parse(localStorage.getItem("userToken"));
    let url = `http://localhost:8080/promo/delete/${id}`;
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + token.accessToken,
      },
      params: {
        id: id,
      },
    };
    axios.delete(url, requestOptions).then((res) => {
      if (res.status == 200) {
        toast.success(res.data);
        getPromosByID();
      } else toast.error(res.data);
    });
  }

  function getPromosByID() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    let url = "http://localhost:8080/promo/getEntityPromos";
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
      data = res.data;
      console.log(res.data);
      setPromos(data);
      setPromoTable(createPromoTable());
    });
  }
  useEffect(() => {
    getPromosByID();
  }, []);

  useEffect(() => {
    setPromoTable(createPromoTable());
  }, [promos]);

  function createPromoTable() {
    return (
      <Table>
        <thead>
          <th>Start date</th>
          <th>End date</th>
          <th>Price</th>
          <th>Capacity</th>
        </thead>
        <tbody>
          {promos.map((promo) => {
            return (
              <tr key={promo.id}>
                <td>{promo.dateFrom.toLocaleString()}</td>
                <td>{promo.dateTo.toLocaleString()}</td>
                <td>{promo.price}</td>
                <td>{promo.capacity}</td>
                <td>
                  <Button
                    variant="outline-dark"
                    onClick={remove}
                    name={promo.id}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }

  function create() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    let url = "http://localhost:8080/promo/create";
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + token.accessToken,
      },
    };
    console.log(promo.dateFrom.toJSON());
    axios.post(url, promo, requestOptions).then((res) => {
      if (res.status == 200) {
        toast.success(res.data);
        getPromosByID();
      } else toast.error(res.data);
    });
    handleClose();
  }
  function onChange(event) {
    setPromo({ ...promo, [event.target.name]: event.target.value });
  }
  // eslint-disable-next-line react/display-name
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className="btn btn-warning" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  return (
    <Container>
      <Navbar collapseOnSelect className="rounded border border-dark">
        <Container>
          <Navbar.Text className="text-dark">Create your promo</Navbar.Text>
        </Container>
        <Container>
          <Nav className="ms-auto">
            <Button variant="outline-dark" onClick={handleShow}>
              Create New Promo
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new promo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormLabel>Date from</FormLabel>
          <DatePicker
            selected={promo.dateFrom}
            showTimeSelect
            minDate={new Date()}
            onChange={(date) => setPromo({ ...promo, dateFrom: date })}
            dateFormat="MMMM d, yyyy h:mm aa"
            customInput={<CustomInput />}
            withPortal
          />
          <FormLabel>Date to</FormLabel>
          <DatePicker
            selected={promo.dateTo}
            minDate={promo.dateFrom}
            showTimeSelect
            onChange={(date) => setPromo({ ...promo, dateTo: date })}
            dateFormat="MMMM d, yyyy h:mm aa"
            customInput={<CustomInput />}
            withPortal
          />
          <FormLabel>Price</FormLabel>
          <Form.Control
            type="number"
            value={promo.price}
            name="price"
            onChange={onChange}
          ></Form.Control>
          <FormLabel>Capacity</FormLabel>
          <Form.Control
            type="number"
            value={promo.capacity}
            name="capacity"
            onChange={onChange}
          ></Form.Control>
          <FormLabel>Description</FormLabel>
          <Form.Control
            as="textarea"
            value={promo.description}
            name="description"
            onChange={onChange}
          ></Form.Control>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={create}>
            Create Promo
          </Button>
        </Modal.Footer>
      </Modal>
      {promoTable}
    </Container>
  );
}
