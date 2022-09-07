import React, { useState } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import react from "react-bootstrap";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useNavigate,
} from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const navigate = useNavigate();

  const handleValidation = (event) => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!password.match(/^[a-zA-Z]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    let validateSts = handleValidation();
    console.log(`sts: ${validateSts}`);
    if (validateSts) {
      console.log(`email:${email} password:${password}`);
      let usersCreate = await axiosFn(`/login`, "post", {
        password: password,
        email: email,
      });
      console.log(usersCreate);
      if (usersCreate.status == 200) {
        console.log(usersCreate.data.data.token);
        localStorage.setItem("_token", usersCreate.data.data.token);
        localStorage.setItem("email", usersCreate.data.data.email);
        navigate("/dashboard");
      }
    }
  };

  const axiosFn = async (url, method, request) => {
    //console.log(url + " " + method + " " + request);
    let response;
    const BASEURL = `https://capacity-planning-for-office.herokuapp.com${url}`;
    console.log(`url:${BASEURL}${url}`);
    try {
      response = await axios.post(BASEURL, request);
    } catch (e) {
      console.error(e);
    }

    return response;
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form id="loginform" onSubmit={loginSubmit}>
              <h1>Login</h1>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
              </div>
              <div className="form-group">
                <br />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              &nbsp;&nbsp;
              <Link className="btn btn-secondary" to="/signup">SignUp</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
