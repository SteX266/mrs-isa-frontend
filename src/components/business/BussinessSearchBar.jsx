import { useState } from "react";
import { Button, Stack } from "react-bootstrap";

import FilterModal from "./FilterModal";

export default function BussinessSearchBar({ setSearchFilters, search }) {
  const [show, setShow] = useState(false);
  const toggleModal = () => {
    setShow(!show);
  };

  return (
    <Stack direction="horizontal" gap={3}>
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
