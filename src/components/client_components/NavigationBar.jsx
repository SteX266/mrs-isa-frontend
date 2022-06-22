import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap";

import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <h2 className="text-secondary">Fish&Ships</h2>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mob-navbar"
            aria-label="Toggle"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mob-navbar">
            <ul className="navbar-nav mb-2 mb-lg-0 mx-auto">

            </ul>
            <Link to="/login">
              <a className="btn btn-secondary">Login</a>
            </Link>
            <a
              href="/registration"
              style={{ marginLeft: "5px" }}
              className="btn btn-secondary"
            >
              Sing up
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
