import React, { useState } from "react";
import RegistrationDialog from "../modals/RegistrationDialog";
import "../../style/Errors.css";

function RegisterForm() {
  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    phoneNumber: "",
    addressLine: "",
    username: "",
    repeatedPassword: "",
    password: "",
  });

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const userType = "admin";
  const [registrtaionReason, setRegistrationReason] = useState("");

  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log(userType);

      if (userType == "client") {
        setRegistrationReason("");
        signup();
      } else {
        setShowRegistrationDialog(true);
        console.log("cekaj be");
      }
    }
  };

  function signup() {
    console.log(registrtaionReason);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        name,
        surname,
        phoneNumber,
        addressLine,
        password,
        userType,
      }),
    };

    fetch("http://localhost:8080/auth/usersignup", requestOptions).then(
      async (response) => {
        const data = await response.json();

        if (data.username !== null) {
          console.log("Uspesna registracija!");
        } else {
          console.log("Neuspesna registracija!");
        }
      }
    );
  }

  const emailValidation = (email) => {
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return !email || regex.test(email) === false;
  };

  const validateForm = () => {
    let currentErrors = errors;

    let valid = true;

    if (name === "") {
      currentErrors.name = "Name field must be filled";
      valid = false;
    } else {
      currentErrors.name = "";
    }
    if (surname === "") {
      currentErrors.surname = "Surname field must be filled";

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
    if (emailValidation(username)) {
      currentErrors.username = "Email is not valid!";
    } else {
      currentErrors.username = "";
    }
    if (password === "" || password.length < 5) {
      currentErrors.password = "Password must be at least 5 characters long";
    } else {
      currentErrors.password = "";
    }

    if (password !== repeatedPassword) {
      currentErrors.repeatedPassword = "Passwords do not match";
    } else {
      currentErrors.repeatedPassword = "";
    }

    setErrors({
      name: currentErrors.name,
      surname: currentErrors.surname,
      phoneNumber: currentErrors.phoneNumber,
      addressLine: currentErrors.addressLine,
      username: currentErrors.username,
      password: currentErrors.password,
      repeatedPassword: currentErrors.repeatedPassword,
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
      case "email":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "repeatedPassword":
        setRepeatedPassword(value);
        break;
      default:
        break;
    }
  };

  function confirmRegistration(text) {
    setRegistrationReason(text);
    setShowRegistrationDialog(false);
    signup();
  }
  function cancelRegistration() {
    setShowRegistrationDialog(false);
  }

  return (
    <>
      <div className="album py-5 bg-light">
        <div className="container">
          <form>
            <div className="mb-6">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                name="email"
                onChange={handleChange}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                Your email address will not be shared with anyone.
              </div>
              {errors.username.length > 0 && (
                <span className="error">{errors.username}</span>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                name="password"
                onChange={handleChange}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
              {errors.password.length > 0 && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Repeat passwrod
              </label>
              <input
                name="repeatedPassword"
                onChange={handleChange}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
              {errors.repeatedPassword.length > 0 && (
                <span className="error">{errors.repeatedPassword}</span>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                name="name"
                onChange={handleChange}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              {errors.name.length > 0 && (
                <span className="error">{errors.name}</span>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Surname
              </label>
              <input
                name="surname"
                onChange={handleChange}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              {errors.surname.length > 0 && (
                <span className="error">{errors.surname}</span>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Home address
              </label>
              <input
                name="addressLine"
                onChange={handleChange}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              {errors.addressLine.length > 0 && (
                <span className="error">{errors.addressLine}</span>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Phone number
              </label>
              <input
                name="phoneNumber"
                onChange={handleChange}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              {errors.phoneNumber.length > 0 && (
                <span className="error">{errors.phoneNumber}</span>
              )}
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <RegistrationDialog
        showModal={showRegistrationDialog}
        confirmed={confirmRegistration}
        canceled={cancelRegistration}
      />
    </>
  );
}

export default RegisterForm;
