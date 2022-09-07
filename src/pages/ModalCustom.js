import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import HttpService from "./HttpService";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useNavigate,
} from "react-router-dom";

function ModalCustom() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [bodyContent, setBodyContent] = useState("");
  const navigator = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = (event) =>
    setShow(() => {
      debugger;
      setTitle(event.target.innerText);
      if (event.target.innerText == "Add new employee") {
        setBodyContent(true);
      } else if (event.target.innerText == "Assign work to registered employee") {
        setBodyContent(false);
      } else {
        localStorage.removeItem("_token");
        navigator("/login");
      }
      return true;
    });

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add new employee
      </Button>
      &nbsp;&nbsp;
      <Button variant="info" onClick={handleShow}>
        Assign work to registered employee
      </Button>
      &nbsp;&nbsp;
      <Button variant="danger" onClick={handleShow}>
        Logout
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodyContent ? <AddUser /> : <AddTask />}</Modal.Body>
      </Modal>
    </>
  );
}

function AddUser() {
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

  const userSubmit = async (e) => {
    e.preventDefault();
    let validateSts = handleValidation();
    console.log(`sts: ${validateSts}`);
    if (validateSts) {
      console.log(`email:${email} password:${password}`);
      let usersCreate = await HttpService(`/signup`, "POST", {
        password: password,
        email: email,
        name: email,
      });

      if (usersCreate.status === 201) {
        
        var btnSts = confirm("User created successfully!");
        if (btnSts) {
          setEmail("");
          setPassword("");
        }
      } else if (usersCreate.data.errorCode == "USER_EXISTS") {
        
        confirm(usersCreate.data.message);
      } else {
        
        confirm("Technical error occurred");
      }
      console.log(usersCreate);
    }
  };

  return (
    <Form onSubmit={userSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <Form.Text className="text-muted">{emailError}</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <Form.Text className="text-muted">{passwordError}</Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

function AddTask() {
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [emailError, setemailError] = useState("");
  const [descError, setdescError] = useState("");
  const [fromError, setfromError] = useState("");
  const [toError, settoError] = useState("");
  const navigator = useNavigate();

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

    if (!desc) {
      formIsValid = false;
      setdescError("Please enter the valid task description!");
      return false;
    } else {
      setdescError("");
      formIsValid = true;
    }

    if (!from) {
      formIsValid = false;
      setfromError("Please select the valid task from date");
      return false;
    } else {
      setfromError("");
      formIsValid = true;
    }

    if (!to) {
      formIsValid = false;
      settoError("Please select the valid task to date");
      return false;
    } else {
      settoError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const taskSubmit = async (e) => {
    e.preventDefault();
    let validateSts = handleValidation();
    console.log(`sts: ${validateSts}`);
    if (validateSts) {
      console.log(`email:${email} password:${desc}`);
      let taskCreate = await HttpService(`/add/task`, "POST", {
        desc: desc,
        email: email,
        from: from,
        to: to,
      });
      console.log(taskCreate);
      if (taskCreate.status === 201) {
        
        var btnSts = confirm("Task created successfully!");
        if (btnSts) {
          setEmail("");
          setDesc("");
          setFrom("");
          setTo("");
        }
      } else if (taskCreate.name == "TokenExpiredError") {
        
        let btnSts = confirm("Token Expired");
        if (btnSts) {
          navigator("/login");
        } else {
          navigator("/login");
        }
      } else if (taskCreate.data.errorCode == "USER_NOT_EXISTS") {
        
        let btnSts = confirm(taskCreate.data.message);
        setEmail("");
        setDesc("");
        setFrom("");
        setTo("");
      } else {
        
        let btnSts = confirm("Technical error occured");
        if (btnSts) {
          navigator("/login");
        } else {
          navigator("/login");
        }
      }
      console.log(taskCreate);
    }
  };

  return (
    <Form onSubmit={taskSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <Form.Text className="text-muted">{emailError}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Task Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Description"
          onChange={(event) => setDesc(event.target.value)}
          value={desc}
        />
        <Form.Text className="text-muted">{descError}</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="fromDate">
        <Form.Label>From</Form.Label>
        <Form.Control
          type="datetime-local"
          placeholder="dd-mm-yyyy"
          onChange={(event) => setFrom(event.target.value)}
          value={from}
        />
        <Form.Text className="text-muted">{fromError}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="toDate">
        <Form.Label>To</Form.Label>
        <Form.Control
          type="datetime-local"
          placeholder="dd-mm-yyyy"
          onChange={(event) => setTo(event.target.value)}
          value={to}
        />
        <Form.Text className="text-muted">{toError}</Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ModalCustom;
