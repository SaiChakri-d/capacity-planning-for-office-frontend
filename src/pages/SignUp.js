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
} from "react-router-dom";

function SignUp() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");

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

  const signUpSubmit = async (e) => {
    e.preventDefault();
    let validateSts = handleValidation();
    console.log(`sts: ${validateSts}`);
    if (validateSts) {
      console.log(`email:${email} password:${password}`);
      let usersCreate = await axiosFn(`/signup`, "post", {
        password: password,
        email: email,
        name: email,
      });

      if (usersCreate.status === 201) {
        // eslint-disable-next-line no-restricted-globals
        var btnSts = confirm("User created successfully!");
        if (btnSts) {
          setEmail("");
          setPassword("");
        }
      } else if (usersCreate.data.errorCode == "USER_EXISTS") {
       // eslint-disable-next-line no-restricted-globals
        confirm(usersCreate.data.message);
      } else {
       // eslint-disable-next-line no-restricted-globals
        confirm("Technical error occurred");
      }
      console.log(usersCreate);
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
            <form id="signupform" onSubmit={signUpSubmit}>
              <h1>SignUp</h1>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
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
                  value={password}
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
              <Link className="btn btn-secondary" to="/login">Login</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
