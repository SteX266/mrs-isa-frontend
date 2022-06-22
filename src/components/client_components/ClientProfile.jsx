import Dialog from "../modals/Dialog";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/Errors.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ServerName from "../../ServerName";

function ClientProfile() {
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const[showEditDialog, setShowEditDialog] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    phoneNumber: "",
    addressLine: "",
  });

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [email, setEmail] = useState("");
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [penaltyNumber, setPenaltyNumber] = useState(0);
  const [clientTier, setClientTier] = useState("REGULAR");
  const [benefits, setBenefits] = useState(0);

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
          email: email,
          name: name,
          surname: surname,
          phoneNumber: phoneNumber,
          addressLine: addressLine,
        },
      };
      axios.get(`${ServerName}user/editUserData`, requestOptions);
      toast.success("Profile changed successfully!");
    } else {
      toast.error("Form is not valid!");
    }
  };

  function confirmDeleteProfile (text) {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.accessToken,
      },
      params: {
        username: email,
        text: text,
      },
    };

    axios.get(
      `${ServerName}cancellationRequest/createCancellationRequest`,
      requestOptions
    );
    setShowTaskDialog(false);
  };

  const cancelDeleteProfile = () => {
    setShowTaskDialog(false);
  };

  const validateForm = () => {
    let currentErrors = errors;

    let valid = true;

    if (name === "" || name.length < 3) {
      currentErrors.name = "Name must contain at least 3 characters";
      valid = false;
    } else {
      currentErrors.name = "";
    }
    if (surname === "" || surname.length < 3) {
      currentErrors.surname = "Surname must contain at least 3 characters";

      valid = false;
    } else {
      currentErrors.surname = "";
    }
    if (phoneNumber === "" || phoneNumber.length < 9) {
      currentErrors.phoneNumber =
        "Phone number must contain at least 9 characters";

      valid = false;
    } else {
      currentErrors.phoneNumber = "";
    }
    if (addressLine === "") {
      currentErrors.addressLine = "Address line field is required!";
      valid = false;
    } else {
      currentErrors.addressLine = "";
    }

    setErrors({
      name: currentErrors.name,
      surname: currentErrors.surname,
      phoneNumber: currentErrors.phoneNumber,
      addressLine: currentErrors.addressLine,
    });
    return valid;
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "surname":
        setSurname(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "addressLine":
        setAddressLine(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const requestOptions = {
      headers: { Authorization: "Bearer " + token.accessToken },
      params: { username: localStorage.getItem("username") },
    };
    axios
      .get(`${ServerName}user/getUserByUsername`, requestOptions)
      .then((res) => {
        setName(res.data.name);
        setSurname(res.data.surname);
        setEmail(res.data.email);
        setPhoneNumber(res.data.phoneNumber);
        setAddressLine(res.data.addressLine);
        setLoyaltyPoints(res.data.loyaltyPoints);
        setPenaltyNumber(res.data.penalties);
        setClientTier(res.data.tier);
        setBenefits(res.data.benefits);
      });
  }, []);

  return (
    <>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                alt=""
              />
              <span className="font-weight-bold">
                {name} {surname}
              </span>
              <span className="text-black-50">{email}</span>
              <span> </span>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Name</label>
                  <input
                    onChange={handleChange}
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    value={name}
                  />
                  {errors.name.length > 0 && (
                    <span classNameName="error">{errors.name}</span>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="labels">Surname</label>
                  <input
                    onChange={handleChange}
                    name="surname"
                    type="text"
                    className="form-control"
                    placeholder="surname"
                    value={surname}
                  />
                  {errors.surname.length > 0 && (
                    <span classNameName="error">{errors.surname}</span>
                  )}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Phone Number</label>
                  <input
                    onChange={handleChange}
                    name="phoneNumber"
                    type="text"
                    className="form-control"
                    placeholder="enter phone number"
                    value={phoneNumber}
                  />
                  {errors.phoneNumber.length > 0 && (
                    <span classNameName="error">{errors.phoneNumber}</span>
                  )}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Address Line</label>
                  <input
                    onChange={handleChange}
                    name="addressLine"
                    type="text"
                    className="form-control"
                    placeholder="enter address line"
                    value={addressLine}
                  />
                  {errors.addressLine.length > 0 && (
                    <span classNameName="error">{errors.addressLine}</span>
                  )}
                </div>
              </div>

              <div className="mt-5 text-center">
                <button
                  onClick={()=>{setShowEditDialog(true);}}
                  className="btn btn-primary profile-button"
                  type="button"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 py-5">

            <div className="d-flex justify-content-between align-items-center experience">
                <span>Penalties</span>
                <span className="border px-3 p-1 add-experience">
                  <i className="fa fa-plus"></i>&nbsp;{penaltyNumber}
                </span>
              </div>
              <br />

              <div className="d-flex justify-content-between align-items-center experience">
                <span>Loyalty points</span>
                <span className="border px-3 p-1 add-experience">
                  <i className="fa fa-plus"></i>&nbsp;{loyaltyPoints}
                </span>
              </div>
              <br />
              <div className="d-flex justify-content-between align-items-center experience">
                <span>Client tier</span>
                <span className="border px-3 p-1 add-experience">
                  <i className="fa fa-plus"></i>&nbsp;{clientTier}
                </span>
              </div>
              <br />
              <div className="d-flex justify-content-between align-items-center experience">
                <span>Benefits</span>
                <span className="border px-3 p-1 add-experience">
                  <i className="fa fa-plus"></i>&nbsp;{benefits}% off on all
                  reservations
                </span>
              </div>
              <br />
              <div className="d-flex justify-content-end align-items-center experience">

              <Link to="/client/changePassword">
              <button
                  onClick={() => {
                    setShowTaskDialog(true);
                  }}
                  className="btn btn-primary delete-button"
                  type="button"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Change password 
                </button>
                </Link>

                <button
                style={{marginLeft:"15px"}}

                  onClick={() => {
                    setShowTaskDialog(true);
                  }}
                  className="btn btn-danger delete-button"
                  type="button"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Delete Profile
                </button>


              </div>
              <br />
            </div>
          </div>
        </div>
      </div>

      <Dialog
        show={showTaskDialog}
        title="Delete profile?"
        description="Are you sure you want to delete your profile?"
        confirmed={confirmDeleteProfile}
        canceled={cancelDeleteProfile}
        hasText={true}
      />

      <Dialog
        show={showEditDialog}
        title="Edit profile?"
        description="Are you sure you want to edit your profile?"
        confirmed={confirmEditProfile}
        canceled={cancelEditProfile}
        hasText={false}
      />
    </>
  );

  function confirmEditProfile(){

    handleSubmit();
    setShowEditDialog(false);

  }
  function cancelEditProfile(){

    setShowEditDialog(false);
  }
}

export default ClientProfile;
