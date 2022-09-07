import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
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

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    taskListFetch();
  }, []);

  let taskListFetch = async () => {
    console.log("token::" + localStorage.getItem("_token"));
    let taskGet = await HttpService(`/get/task`, "GET", {
      token: localStorage.getItem("_token"),
    });
    console.log("taskList::");
    if (taskGet && taskGet.status == 200) {
      console.log("Inside useState::" + JSON.stringify(taskGet.data.data));
      setTaskList(taskGet.data.data);
      console.log(taskList);
    } else {
      console.log(taskList);
      // eslint-disable-next-line no-restricted-globals
      const tkSts = confirm("Token Expired");
      if (tkSts) {
        navigator("/login");
      } else {
        navigator("/login");
      }
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Email</th>
          <th>Task Description</th>
          <th>TimeLogs</th>
        </tr>
      </thead>
      <tbody>
        {taskList.map((data, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{data.email}</td>
              <td>{data.desc}</td>
              <td>
                {data.from} - {data.to}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default TaskList;
