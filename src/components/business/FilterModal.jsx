import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import RentalFeeRange from "./RentalFeeRange";
import CancelationFeeRange from "./CancelationFeeRange";
import GuestsRange from "./GuestsRange";
import AddressFilter from "./AddressFilter";
import DateFilter from "./DateFilter";

function FilterModal({ setState, show, toggleModal }) {
  const [filters, setFilters] = useState({
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
    dateTo: new Date(),
  });
  function onChange(event) {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  }
  function onSelectDate(type, date) {
    setFilters({ ...filters, [type]: date });
    console.log(filters);
  }

  return (
    <Modal show={show} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Filters</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RentalFeeRange state={filters} onChange={onChange} />
        <CancelationFeeRange state={filters} onChange={onChange} />
        <GuestsRange state={filters} onChange={onChange} />
        <AddressFilter state={filters} onChange={onChange} />
        <DateFilter state={filters} onSelectDate={onSelectDate} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-dark"
          onClick={() => {
            toggleModal();
            setState(filters);
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FilterModal;
