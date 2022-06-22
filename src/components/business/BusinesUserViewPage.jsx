import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import BusinessUserEntityList from "./BusinessUserEntityList";
import BussinessSearchBar from "./BussinessSearchBar";

export default function BusinessUserViewServicesPage(props) {
  const [user, setUser] = React.useState({ type: "" });
  const [services, setServices] = React.useState([]);

  const [servicesTable, setServicesTable] = useState(
    <BusinessUserEntityList services={services} userType={props.type} />
  );
  const [searchFilters, setSearchFilters] = useState({
    rentalFeeFrom: 0,
    rentalFeeTo: 500,
    cancellationFeeFrom: 0,
    cancellationFeeTo: 500,
    guestsFrom: 1,
    guestsTo: 10,
    street: "",
    city: "",
    country: "",
    dateFrom: new Date(),
    dateTo: new Date("2034/02/08"),
  });

  useEffect(() => {
    setServicesTable(createServicesTable());
  }, [services]);

  function createServicesTable() {
    return <BusinessUserEntityList services={services} userType={props.type} />;
  }

  React.useEffect(() => {
    switch (props.type) {
      case "host":
        setUser({
          type: "listings",
        });
        break;
      case "instructor":
        setUser({
          type: "adventures",
        });
        break;

      case "captain":
        setUser({
          type: "vessels",
        });
    }
    getServiceData();
    console.log(searchFilters);
  }, []);

  function getServiceData() {
    const token = JSON.parse(localStorage.getItem("userToken"));

    let path = "http://localhost:8080/entity/getCurrentUserEntities";
    axios
      .get(path, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + token.accessToken,
        },
        params: {
          email: localStorage.getItem("username"),
        },
      })
      .then((res) => {
        setServices(res.data);
      });
  }
  function search() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.accessToken,
    };
    console.log(searchFilters);

    axios
      .post("http://localhost:8080/entity/getFilteredEntities", searchFilters, {
        headers,
      })
      .then((res) => {
        setServices(res.data);
        console.log(res.data);
      });
    console.log("ALOO KOJI KURAAC");
  }
  return (
    <div style={{ padding: "55px" }}>
      <Container
        style={({ maxWidth: "80%" }, { padding: "20px" })}
        className="rounded border border-dark"
      >
        <Navbar collapseOnSelect className="rounded border border-dark">
          <Container>
            <Navbar.Text className="text-dark">
              {services.length + " " + user.type}
            </Navbar.Text>
          </Container>

          <Container>
            <BussinessSearchBar
              setSearchFilters={setSearchFilters}
              search={search}
            />
          </Container>

          <Container>
            <Nav className="ms-auto">
              <Link to="create">
                <Button variant="outline-dark">
                  Create New {user.type.slice(0, -1)}
                </Button>
              </Link>
            </Nav>
          </Container>
        </Navbar>
        {servicesTable}
      </Container>
    </div>
  );
}
