import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap";

import { Link } from "react-router-dom";

const NavigationBarClient = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/client">
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
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/client">
                  Home
                </a>
              </li>


              <li className="nav-item">
                <Link to="/client/subscriptions">
                  {" "}
                  <a className="nav-link" href="/subscriptions">
                    Subscriptions
                  </a>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/client/reservations">
                  {" "}
                  <a className="nav-link" >
                    Reservations
                  </a>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/client/reservationsHistory">
                  {" "}
                  <a className="nav-link" >
                    History
                  </a>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/client/clientProfile">
                  {" "}
                  <a className="nav-link" >
                    Profile
                  </a>
                </Link>
              </li>
            </ul>
            <Link to="/">
              <a className="btn btn-danger">Logout</a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBarClient;
