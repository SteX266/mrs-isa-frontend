import { Button, Container, Navbar } from "react-bootstrap";

export default function CreateNavigation(props) {
  return (
    <Navbar collapseOnSelect expand="lg" className="navigation-buttons">
      <Container>
        <Button
          variant="outline-dark"
          onClick={props.onBack}
          hidden={!props.backActive}
        >
          Back
        </Button>
        <Button
          variant="outline-dark"
          href="/captain"
          hidden={props.backActive}
        >
          Cancel
        </Button>
        <Button
          variant="outline-dark"
          className="ms-auto"
          onClick={props.onNext}
          hidden={!props.nextActive}
        >
          Next
        </Button>
        <Button
          variant="outline-dark"
          href="captain/services"
          className="ms-auto"
          onClick={props.onCreate}
          hidden={props.nextActive}
        >
          Create
        </Button>
      </Container>
    </Navbar>
  );
}
