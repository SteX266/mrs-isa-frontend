import Dialog from "../modals/Dialog";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/Errors.css";
export default function LoyaltyProgram() {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [errors, setErrors] = useState({
    pointsPerReservation: "",
    pointsForBusiness: "",
    silverLimit: "",
    goldLimit: "",
    platinumLimit: "",
    silverDiscount: "",
    goldDiscount: "",
    platinumDiscount: "",
  });

  const [pointsPerReservation, setPointsPerReservation] = useState(0);
  const [pointsForBusiness, setPointsForBusiness] = useState(0);
  const [silverLimit, setSilverLimit] = useState(0);
  const [goldLimit, setgoldLimit] = useState(0);
  const [platinumLimit, setplatinumLimit] = useState(0);
  const [silverDiscount, setSilverDiscount] = useState(0);
  const [goldDiscount, setgoldDiscount] = useState(0);
  const [platinumDiscount, setplatinumDiscount] = useState(0);

  const handleSubmit = () => {
    if (validateForm()) {
      const token = JSON.parse(localStorage.getItem("userToken"));

      const requestOptions = {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + token.accessToken,
        },
        params: {
          id: 1,
          platinumLimit: platinumLimit,
          pointsPerReservation: pointsPerReservation,
          pointsForBusiness: pointsForBusiness,
          silverLimit: silverLimit,
          goldLimit: goldLimit,
          goldDiscount: goldDiscount,
          silverDiscount: silverDiscount,
          platinumDiscount: platinumDiscount,
        },
      };
      axios.get("http://localhost:8080/loyalty/editLoyalty", requestOptions);
      console.log("Podaci uspesno izmenjeni!");
    } else {
      console.log("Invalid Form");
    }
  };
  function isInDesiredForm(str) {
    return !/^\+?(0|[1-9]\d*)$/.test(str);
  }
  const validateForm = () => {
    let currentErrors = errors;

    let valid = true;

    if (pointsPerReservation === "" || isInDesiredForm(pointsPerReservation)) {
      currentErrors.pointsPerReservation = "Must be an integer";
      valid = false;
    } else {
      currentErrors.pointsPerReservation = "";
    }
    if (pointsForBusiness === "" || isInDesiredForm(pointsForBusiness)) {
      currentErrors.pointsForBusiness = "Must be an integer";

      valid = false;
    } else {
      currentErrors.pointsForBusiness = "";
    }
    if (silverLimit === "" || isInDesiredForm(silverLimit)) {
      currentErrors.silverLimit = "Must be an integer";

      valid = false;
    } else {
      currentErrors.silverLimit = "";
    }
    if (goldLimit === "" || isInDesiredForm(goldLimit)) {
      currentErrors.goldLimit = "Must be an integer";
      valid = false;
    } else {
      currentErrors.goldLimit = "";
    }

    if (silverDiscount === "" || isInDesiredForm(silverDiscount)) {
      currentErrors.silverDiscount = "Must be an integer";

      valid = false;
    } else {
      currentErrors.silverDiscount = "";
    }
    if (goldDiscount === "" || isInDesiredForm(goldDiscount)) {
      currentErrors.goldDiscount = "Must be an integer";

      valid = false;
    } else {
      currentErrors.goldDiscount = "";
    }
    if (platinumDiscount === "" || isInDesiredForm(platinumDiscount)) {
      currentErrors.platinumDiscount = "Must be an integer";

      valid = false;
    } else {
      currentErrors.platinumDiscount = "";
    }

    setErrors({
      pointsPerReservation: currentErrors.pointsPerReservation,
      pointsForBusiness: currentErrors.pointsForBusiness,
      silverLimit: currentErrors.silverLimit,
      goldLimit: currentErrors.silverLimit,
      platinumLimit: currentErrors.platinumLimit,
      silverDiscount: currentErrors.silverDiscount,
      goldDiscount: currentErrors.goldDiscount,
      platinumDiscount: currentErrors.platinumDiscount,
    });
    return valid;
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case "pointsPerReservation":
        setPointsPerReservation(value);
        break;
      case "pointsForBusiness":
        setPointsForBusiness(value);
        break;
      case "silverLimit":
        setSilverLimit(value);
        break;
      case "goldLimit":
        setgoldLimit(value);
        break;
      case "platinumLimit":
        setplatinumLimit(value);
        break;
      case "platinumDiscount":
        setplatinumDiscount(value);
        break;
      case "goldDiscount":
        setgoldDiscount(value);
        break;
      case "silverDiscount":
        setSilverDiscount(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const requestOptions = {
      headers: { Authorization: "Bearer " + token.accessToken },
    };
    axios
      .get("http://localhost:8080/loyalty/getLoyalty", requestOptions)
      .then((res) => {
        setPointsPerReservation(res.data.pointsPerReservation);
        setPointsForBusiness(res.data.pointsForBusiness);
        setplatinumLimit(res.data.platinumLimit);
        setSilverLimit(res.data.silverLimit);
        setgoldLimit(res.data.goldLimit);
        setplatinumDiscount(res.data.platinumDiscount);
        setSilverDiscount(res.data.silverDiscount);
        setgoldDiscount(res.data.goldDiscount);
      });
  }, []);

  return (
    <>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div>
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Loyalty Program</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">points per reservation</label>
                  <input
                    onChange={handleChange}
                    name="pointsPerReservation"
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    value={pointsPerReservation}
                  />
                  {errors.pointsPerReservation.length > 0 && (
                    <span classNameName="error">
                      {errors.pointsPerReservation}
                    </span>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="labels">points for business</label>
                  <input
                    onChange={handleChange}
                    name="pointsForBusiness"
                    type="text"
                    className="form-control"
                    placeholder="surname"
                    value={pointsForBusiness}
                  />
                  {errors.pointsForBusiness.length > 0 && (
                    <span classNameName="error">
                      {errors.pointsForBusiness}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">silver limit</label>
                  <input
                    onChange={handleChange}
                    name="silverLimit"
                    type="text"
                    className="form-control"
                    placeholder="enter phone number"
                    value={silverLimit}
                  />
                  {errors.silverLimit.length > 0 && (
                    <span classNameName="error">{errors.silverLimit}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="labels">silver Discount %</label>
                  <input
                    onChange={handleChange}
                    name="silverDiscount"
                    type="text"
                    className="form-control"
                    placeholder="enter phone number"
                    value={silverDiscount}
                  />
                  {errors.silverDiscount.length > 0 && (
                    <span classNameName="error">{errors.silverDiscount}</span>
                  )}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">gold limit</label>
                  <input
                    onChange={handleChange}
                    name="goldLimit"
                    type="text"
                    className="form-control"
                    placeholder="enter phone number"
                    value={goldLimit}
                  />
                  {errors.goldLimit.length > 0 && (
                    <span classNameName="error">{errors.goldLimit}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="labels">gold Discount %</label>
                  <input
                    onChange={handleChange}
                    name="goldDiscount"
                    type="text"
                    className="form-control"
                    placeholder="enter phone number"
                    value={goldDiscount}
                  />
                  {errors.goldDiscount.length > 0 && (
                    <span classNameName="error">{errors.goldDiscount}</span>
                  )}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">platinum limit</label>
                  <input
                    onChange={handleChange}
                    name="platinumLimit"
                    type="text"
                    className="form-control"
                    placeholder="enter phone number"
                    value={platinumLimit}
                  />
                  {errors.platinumLimit.length > 0 && (
                    <span classNameName="error">{errors.platinumLimit}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="labels">platinum Discount %</label>
                  <input
                    onChange={handleChange}
                    name="platinumDiscount"
                    type="text"
                    className="form-control"
                    placeholder="enter phone number"
                    value={platinumDiscount}
                  />
                  {errors.platinumDiscount.length > 0 && (
                    <span classNameName="error">{errors.platinumDiscount}</span>
                  )}
                </div>
              </div>

              <div className="mt-5 text-center">
                <button
                  onClick={() => {
                    setShowEditDialog(true);
                  }}
                  className="btn btn-primary profile-button"
                  type="button"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        show={showEditDialog}
        title="Edit Loyalty Program?"
        description="Are you sure you want to edit Loyalty Program?"
        confirmed={confirmEditProfile}
        canceled={cancelEditProfile}
        hasText={false}
      />
    </>
  );

  function confirmEditProfile() {
    handleSubmit();
    setShowEditDialog(false);
  }
  function cancelEditProfile() {
    setShowEditDialog(false);
  }
}
