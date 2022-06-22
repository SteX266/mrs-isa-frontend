import "../../style/Header.css";

import vacation from "../../images/333.png";
import vessel from "../../images/111.png";
import fishing from "../../images/222.png";
import business from "../../images/ljudi.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={vacation} alt="First slide" />
            <Link to="/vacations">
              <div className="carousel-caption d-none d-md-block">
                <h3>Vacations</h3>
                <p>Reserve your stay at weekend cottages</p>
              </div>
            </Link>
          </div>

          <div className="carousel-item">
            <img className="d-block w-100" src={vessel} alt="Second slide" />
            <Link to="/vessels">
              <div className="carousel-caption d-none d-md-block">
                <h3>Vessels</h3>
                <p>Two clicks away from shipboard</p>
              </div>
            </Link>
          </div>

          <div className="carousel-item">
            <img className="d-block w-100" src={fishing} alt="Third slide" />
            <Link to="/adventures">
              <div className="carousel-caption d-none d-md-block">
                <h3>Adventures and fishing classNamees</h3>
                <p>
                  Best instructors in region. Adventures that will take your
                  breath away
                </p>
              </div>
            </Link>
          </div>

          <div className="carousel-item">
            <img className="d-block w-100" src={business} alt="Fourth slide" />
            <Link to="/">
              <div className="carousel-caption d-none d-md-block">
                <h3>Business</h3>
                <p>
                  Registration for home and vessel owners, as well as
                  instructors
                </p>
              </div>
            </Link>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Header;
