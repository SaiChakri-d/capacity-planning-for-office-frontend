import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalCustom from "./ModalCustom.js";
import TaskList from "./TaskList.js";
import react from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useNavigate,
} from "react-router-dom";

function Dashboard() {
  return (
    <div className="App">      
      <div className="container">      
        <div className="row d-flex justify-content-center">
          <div className="col-md-12">
            <h1>OFFICE CAPACITY PLANNING FOR HRs</h1>
            <ModalCustom />
            <br />
            <br />
            <br />
            <h4>LIST OF ASSIGNED WORK</h4>
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
