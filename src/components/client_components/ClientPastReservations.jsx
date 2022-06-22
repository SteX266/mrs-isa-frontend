import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  Navbar,
  Table,
  Form,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";
import ComplaintDialog from "../modals/ComplaintDialog";
import ReviewDialog from "../modals/ReviewDialog";
import ServerName from "../../ServerName";

export default function ClientReservationsTable(props) {
  const [sortedByPrice, setSortedByPrice] = useState(false);
  const [sortedByDate, setSortedByDate] = useState(false);
  const [sortedByDuration, setSortedByDuration] = useState(false);

  const [pastReservations, setPastReservations] = useState([]);

  const [searchPastReservations, setSearchPastReservations] = useState([]);

  const headers = [
    "Type",
    "Name",
    "Location",
    "Start of reservation",
    "End of reservation",
    "Price",
    "Owner",
    "Status",
    "Button"
  ];

  useEffect(() => {
    getReservations(props.clientEmail);
  }, []);
  function getReservations(clientEmail) {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token.accessToken,
      },
      params: {
        email: clientEmail,
      },
    };

    axios
      .get(
        `${ServerName}reservation/getClientReservations`,
        requestOptions
      )
      .then((res) => {
        let future = [];
        let past = [];

        var today = new Date();
        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        var time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        var dateTime = date + " " + time;

        var todayDate = new Date(dateTime);

        res.data.forEach((element) => {
          var startDate = new Date(element.startDate);
          if (startDate < todayDate) {
            element.status = "EXPIRED";
            element.startDate = element.startDate.replace("T", " ");
            element.endDate = element.endDate.replace("T", " ");
            past.push(element);
          } else {
            element.startDate = element.startDate.replace("T", " ");
            element.endDate = element.endDate.replace("T", " ");
            future.push(element);
          }
        });
        setPastReservations(past);
        setSearchPastReservations(past);
      });
  }
  function onSearchFieldChange(event) {
    console.log(pastReservations);

    const searchResult = [];
    const searchParam = event.target.value.toLowerCase();
    for (let index = 0; index < pastReservations.length; index++) {
      const reservation = pastReservations[index];
      if (
        reservation.entityName.toLowerCase().includes(searchParam) ||
        reservation.owner.toLowerCase().includes(searchParam) ||
        reservation.location.toLowerCase().includes(searchParam)
      ) {
        searchResult.push(reservation);
      }
    }
    setSearchPastReservations(searchResult);
  }
  function filterPastEntities(event) {
    var filterType = event.target.name;
    if (filterType === "SHOW_ALL") {
      setSearchPastReservations(pastReservations);
      return;
    } else {
      const filterResult = [];

      for (let index = 0; index < pastReservations.length; index++) {
        const reservation = pastReservations[index];
        if (reservation.entityType == filterType) {
          filterResult.push(reservation);
        }
      }

      setSearchPastReservations(filterResult);
    }
  }



  function sortPastReservations(event) {
    var sortParam = event.target.name;
    const sortResult = [];
    for (let index = 0; index < searchPastReservations.length; index++) {
      const reservation = searchPastReservations[index];
      sortResult.push(reservation);
    }

    console.log(sortResult);

    if (sortParam == "PRICE") {
      if (sortedByPrice) {
        sortResult.reverse();
      } else {
        sortResult.sort((a, b) => {
          return a.fee - b.fee;
        });
        setSortedByPrice(true);
        setSortedByDuration(false);
        setSortedByDate(false);
      }
    } else if (sortParam == "START_DATE") {
      if (sortedByDate) {
        sortResult.reverse();
      } else {
        sortResult.sort((a, b) => {
          return a.startDate < b.startDate;
        });
        setSortedByPrice(false);
        setSortedByDuration(false);
        setSortedByDate(true);
      }
    } else if (sortParam == "DURATION") {
      if (sortedByDuration) {
        sortResult.reverse();
      } else {
        sortResult.sort((a, b) => {
          const startDateA = new Date(a.startDate);
          const endDateA = new Date(a.endDate);
          const resultA = Math.abs(startDateA - endDateA);

          const startDateB = new Date(b.startDate);
          const endDateB = new Date(b.endDate);
          const resultB = Math.abs(startDateB - endDateB);

          return resultA - resultB;
        });
        setSortedByPrice(false);
        setSortedByDuration(true);
        setSortedByDate(false);
      }
    }

    setSearchPastReservations(sortResult);
  }

  return (
    <Container style={{ maxWidth: "95%" }}>


      <Navbar collapseOnSelect className="rounded border border-dark" style={{marginTop:"15px"}}>
        <Container>
          <Navbar.Text className="text-dark"> Reservation history </Navbar.Text>
        </Container>

        <Dropdown style={{ padding: "5px" }}>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            Entities
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              as="button"
              onClick={filterPastEntities}
              name="SHOW_ALL"
            >
              Show all
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={filterPastEntities}
              name="VACATION"
            >
              Vacations
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={filterPastEntities}
              name="VESSEL"
            >
              Vessels
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={filterPastEntities}
              name="ADVENTURE"
            >
              Adventures
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown style={{ padding: "5px" }}>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            Sort by
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              as="button"
              onClick={sortPastReservations}
              name="START_DATE"
            >
              Start date
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={sortPastReservations}
              name="PRICE"
            >
              Price
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={sortPastReservations}
              name="DURATION"
            >
              Duration
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <SearchForm onSearchFieldChange={onSearchFieldChange} />
      </Navbar>
      <Table striped hover className="rounded table-dark bg-light" style={{ paddingTop: "125px", marginTop:"15px" }}>
        <TableHeader headers={headers} />
        <TableBody reservations={searchPastReservations} />
      </Table>
    </Container>
  );
}

function SearchForm(props) {
  return (
    <Form>
      <FormControl
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        onChange={props.onSearchFieldChange}
      />
    </Form>
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
      {props.reservations.map((reservation) => (
        <Reservation key={reservation.id} reservation={reservation} />
      ))}
    </tbody>
  );
}

function Reservation(props) {
  const reservation = props.reservation;
  const button = getButton();
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showComplaintDialog,setShowComplaintDialog] = useState(false);

  function getButton() {
     if (reservation.status == "EXPIRED") {
      return (
        <>
          <Button
            onClick={() => {setShowReviewDialog(true);}}
            variant="outline-light"
            style={{ marginRight: "5px" }}
          >
            Review
          </Button>
          <Button onClick={() => {setShowComplaintDialog(true);}} variant="outline-light">
            Complaint
          </Button>
        </>
      );
    } else {
      return <></>;
    }
  }

  return (
    <>
    <tr id={reservation.id}>
      <td>{reservation.entityType}</td>
      <td> {reservation.entityName}</td>
      <td>{reservation.location}</td>
      <td>{reservation.startDate}</td>
      <td>{reservation.endDate}</td>
      <td>{reservation.fee}$</td>
      <td>{reservation.owner}</td>
      <td>{reservation.status}</td>
      <td>{button}</td>
    </tr>

<ReviewDialog
showModal={showReviewDialog}
reservationId={reservation.id}
confirmed={closeReviewDialog}
canceled={closeReviewDialog}
/>
<ComplaintDialog
showModal={showComplaintDialog}
reservationId={reservation.id}
confirmed={closeComplaintDialog}
canceled={closeComplaintDialog}
/>

</>
  );

function closeReviewDialog(){
  setShowReviewDialog(false);
}

function closeComplaintDialog(){
  setShowComplaintDialog(false);
}

}
