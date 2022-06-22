import { useState } from "react";
import { Button, Stack, Dropdown } from "react-bootstrap";

import FilterModal from "./FilterModal";

function ClientSearchBar({ setSearchFilters, search, setEntityType }) {
  const [show, setShow] = useState(false);
  const toggleModal = () => {
    setShow(!show);
  };
  function setType(event) {
    console.log("ALO BA");
    setEntityType(event.target.name);
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <Dropdown style={{ padding: "5px" }}>
        <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
          Entities
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item as="button" onClick={setType} name="SHOW_ALL">
            Show all
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={setType} name="VACATION">
            Vacations
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={setType} name="VESSEL">
            Vessels
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={setType} name="ADVENTURE">
            Adventures
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Button onClick={toggleModal} variant="outline-dark">
        Filters
      </Button>
      <Button onClick={search} variant="outline-dark">
        Search
      </Button>

      <FilterModal
        setState={setSearchFilters}
        show={show}
        toggleModal={toggleModal}
      />
    </Stack>
  );
}

export default ClientSearchBar;
