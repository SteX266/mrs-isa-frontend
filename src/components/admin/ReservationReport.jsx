import React from "react";
import { Container, Navbar, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import ReservationReportTable from "./ReservationReportTable";
import SanctionReportDialog from "../modals/SanctionReportDialog";
import DeclineReportDialog from "../modals/DeclineReportDialog";

export default function ReservationReport() {
  const [requests, setRequests] = React.useState([]);

  const [searchRequests, setSearchRequests] = React.useState([]);

  const [showTaskDialog, setShowTaskDialog] = React.useState(false);
  const [showDeclineDialog, setShowDeclineDialog] = React.useState(false);

  const [report, setReport] = React.useState("");

  React.useEffect(() => {
    getRequests();
  }, [showDeclineDialog, showTaskDialog]);

  async function getRequests() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const requestOptions = {
      headers: { Authorization: "Bearer " + token.accessToken },
    };
    axios
      .get(
        "http://localhost:8080/reservationReport/getAllReservationReports",
        requestOptions
      )
      .then((res) => {
        console.log(res.data);
        setRequests(res.data);
        setSearchRequests(res.data);
      });
  }

  function onSearchFieldChange(event) {
    const searchResult = [];
    const searchParam = event.target.value.toLowerCase();
    for (let index = 0; index < requests.length; index++) {
      const r = requests[index];
      if (
        r.client.toLowerCase().includes(searchParam) ||
        r.text.toLowerCase().includes(searchParam)
      ) {
        searchResult.push(r);
      }
    }
    setSearchRequests(searchResult);
  }
  let len = searchRequests.length;
  if (len == undefined) {
    len = 0;
  }

  async function onAccept(report) {
    await setReport(report);
    setShowTaskDialog(true);
  }
  async function onDecline(report) {
    await setReport(report);
    setShowDeclineDialog(true);
  }

  return (
    <>
      <div style={{ padding: "55px" }}>
        <Container
          style={({ maxWidth: "80%" }, { padding: "20px" })}
          className="rounded border border-primary"
        >
          <Navbar collapseOnSelect className="rounded border border-primary">
            <Container>
              <Navbar.Text className="text-Primary">
                {len + " Requests"}
              </Navbar.Text>
            </Container>

            <Container>
              <SearchForm searchFieldChanged={onSearchFieldChange} />
            </Container>
          </Navbar>
          <ReservationReportTable
            onAccept={onAccept}
            onDecline={onDecline}
            requests={searchRequests}
          ></ReservationReportTable>
        </Container>
      </div>
      <SanctionReportDialog
        showModal={showTaskDialog}
        report={report}
        confirmed={() => setShowTaskDialog(false)}
        canceled={() => setShowTaskDialog(false)}
        get={getRequests}
      />
      <DeclineReportDialog
        showModal={showDeclineDialog}
        report={report}
        confirmed={() => {
          setShowDeclineDialog(false);
        }}
        canceled={() => {
          setShowDeclineDialog(false);
        }}
        get={getRequests}
      />
    </>
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
        onChange={props.searchFieldChanged}
      />
    </Form>
  );
}
