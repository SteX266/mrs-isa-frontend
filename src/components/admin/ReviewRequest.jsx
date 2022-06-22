import React from "react";
import { Container, Navbar, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import ReviewTable from "./ReviewTable";
import toast from "react-hot-toast";
import ServerName from "../../ServerName";

export default function ReviwRequest() {
  const [requests, setRequests] = React.useState([]);

  const [searchRequests, setSearchRequests] = React.useState([]);

  React.useEffect(() => {
    getRequests();
  }, []);

  async function getRequests() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const requestOptions = {
      headers: { Authorization: "Bearer " + token.accessToken },
    };
    axios
      .get(`${ServerName}review/getAllReviws`, requestOptions)
      .then((res) => {
        console.log(res.data);
        setRequests(res.data);
        setSearchRequests(res.data);
      });
  }
  async function AcceptRequest(report) {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token.accessToken,
    };

    axios
      .post(
        `${ServerName}review/acceptReview`,
        {
          client: report.client,
          owner: report.owner,
          id: report.id,
          text: report.text,
        },
        { headers }
      )
      .then(async () => {
        toast.success(
          "Registration request from user " +
            report.client +
            " successfully accepted "
        );
        getRequests();
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }

  async function DeclineRequest(client) {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token.accessToken,
    };

    axios
      .post(
        `${ServerName}review/declineReviw`,
        { id: client },
        { headers }
      )
      .then(async () => {
        toast.success(
          "Registration request from user " + client + " successfully accepted "
        );
        getRequests();
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }

  function onSearchFieldChange(event) {
    const searchResult = [];
    const searchParam = event.target.value.toLowerCase();
    for (let index = 0; index < requests.length; index++) {
      const r = requests[index];
      if (
        r.client.toLowerCase().includes(searchParam) ||
        r.description.toLowerCase().includes(searchParam)
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

  async function onAccept(client) {
    await AcceptRequest(client);
  }
  async function onDecline(c) {
    await DeclineRequest(c);
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
          <ReviewTable
            onAccept={onAccept}
            onDecline={onDecline}
            requests={searchRequests}
          ></ReviewTable>
        </Container>
      </div>
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
