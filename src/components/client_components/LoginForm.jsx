import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import ServerName from "../../ServerName";

function LoginForm() {
  const [errors, setErrors] = useState({ email: "", password: "" });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [link, setLink] = useState("");

  if (link !== "") {
    return <Navigate to={link} />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      };
      fetch(`${ServerName}auth/login`, requestOptions).then(
        async (response) => {
          const data = await response.json();
          if (!response.ok) {
            toast.error("Credentials are not valid!");
          } else if (data.username !== null) {
            console.log("Uspesan login!");
            localStorage.setItem("userToken", JSON.stringify(data));
            localStorage.setItem("username", username);
            let role = data.userRole;

            if (role == "ROLE_CLIENT") {
              setLink("/client");
            } else if (role === "ROLE_ADMIN") {
              setLink("/admin/home");
            } else if (role === "ROLE_VACATION_OWNER") {
              setLink("/host/home");
            } else if (role === "ROLE_SHIP_OWNER") {
              setLink("/captain/home");
            } else if (role === "ROLE_INSTRUCTOR") {
              setLink("/instructor/home");
            }
          } else {
            console.log("Neuspesan login");
          }
        }
      );
    }
  };

  const validateForm = () => {
    let currentErrors = errors;

    let valid = true;

    if (username === "") {
      currentErrors.email = "Email field must be filled";
      valid = false;
    } else {
      currentErrors.email = "";
    }

    if (password === "" || password.length < 5) {
      currentErrors.password = "Password must be at least 5 characters long";
    } else {
      currentErrors.password = "";
    }

    setErrors({ email: currentErrors.email, password: currentErrors.password });
    return valid;
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case "email":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="album py-5 bg-light">
        <div className="container">
          <form>
            <div className="mb-6">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                onChange={handleChange}
                name="email"
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                Your email address will never be shared with anyone.
              </div>
              {errors.email.length > 0 && (
                <span className="error">{errors.email}</span>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                onChange={handleChange}
                name="password"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
              {errors.password.length > 0 && (
                <span className="error">{errors.password}</span>
              )}
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "10px" }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
