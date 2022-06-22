import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ServerName from "../../ServerName";

export default function PasswordChangeForm() {
  let navigate = useNavigate();
  const [passwords, setPasswords] = useState({ old: "", new: "", repeat: "" });

  const [errors, setErrors] = useState({
    repeatedPassword: "",
    password: "",
  });

  function onButtonClicked() {
    if (isValidForm()) {
      sendChangeRequest();
    }
  }
  function sendChangeRequest() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + token.accessToken,
      },
      params: {
        oldEmail: passwords.old,
        newEmail: passwords.new,
        repeat: passwords.repeat,
      },
    };
    axios
      .get(`${ServerName}user/change-password`, requestOptions)
      .then((res) => {
        if (res.data == 1) {
          toast.success("Password successfully changed.Pleas login again");
          navigate("/login");
        } else toast.error("Wrong Password");
      });
  }
  function handleChange(event) {
    setPasswords((prevPasswords) => {
      return {
        ...prevPasswords,
        [event.target.name]: event.target.value,
      };
    });
  }

  function isValidForm() {
    let currentErrors = errors;

    let valid = true;

    if (passwords.new === "" || passwords.new.length < 5) {
      toast.error("Password must be at least 5 characters long");
      valid = false;
    } else {
      currentErrors.password = "";
    }

    if (passwords.new !== passwords.repeat) {
      toast.error("Passwords do not match");
      valid = false;
    }
    setErrors({
      password: currentErrors.password,
      repeatedPassword: currentErrors.repeatedPassword,
    });
    return valid;
  }
  return (
    <Form>
      <Form.Group>
        <div className="mb-6">
          <Form.Label>Old password</Form.Label>
          <Form.Control
            type="password"
            name="old"
            onChange={handleChange}
          ></Form.Control>
        </div>
        <div className="mb-6">
          <Form.Label>New password</Form.Label>
          <Form.Control
            type="password"
            name="new"
            onChange={handleChange}
          ></Form.Control>
        </div>
        <div className="mb-6">
          <Form.Label>Repeat password </Form.Label>
          <Form.Control
            type="password"
            name="repeat"
            onChange={handleChange}
          ></Form.Control>
        </div>

        <Button
          variant="outline-dark"
          onClick={onButtonClicked}
          style={{ marginTop: "16px", marginBottom: "16px" }}
        >
          Change password
        </Button>
      </Form.Group>
    </Form>
  );
}
