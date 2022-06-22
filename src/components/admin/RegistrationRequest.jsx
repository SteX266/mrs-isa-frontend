import React from "react";
import { Container, Navbar, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import RegistrationRequestTable from "./RegistrationRequestTable";
import RegistrationRequestDialog from "../modals/RegistrationRequestDialog";
import toast from "react-hot-toast";

export default function RegistrationRequest() {
  const [requests, setRequests] = React.useState([]);

  const [searchRequests, setSearchRequests] = React.useState([]);

  const [showTaskDialog, setShowTaskDialog] = React.useState(false);

  const [client, setClient] = React.useState("");

  React.useEffect(() => {
    getRequests();
  }, [showTaskDialog]);

  async function getRequests() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const requestOptions = {
      headers: { Authorization: "Bearer " + token.accessToken },
    };
    axios
      .get(
        "http://localhost:8080/registrationRequest/getAllRegistrationRequests",
        requestOptions
      )
      .then((res) => {
        console.log(res.data);
        setRequests(res.data);
        setSearchRequests(res.data);
      });
  }
  async function AcceptRequest(client) {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token.accessToken,
    };

    axios
      .post(
        "http://localhost:8080/registrationRequest/acceptRegistrationRequest",
        { client: client },
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
    await setClient(c);
    setShowTaskDialog(true);
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
          <RegistrationRequestTable
            onAccept={onAccept}
            onDecline={onDecline}
            requests={searchRequests}
          ></RegistrationRequestTable>
        </Container>
      </div>
      <RegistrationRequestDialog
        showModal={showTaskDialog}
        client={client}
        confirmed={() => {
          setShowTaskDialog(false);
        }}
        canceled={() => setShowTaskDialog(false)}
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
