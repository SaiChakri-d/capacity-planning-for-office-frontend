import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

const HttpService = async (url, method, request) => {
  const BASEURL = `https://capacity-planning-for-office.herokuapp.com`;
  console.log(url + " " + method + " " + JSON.stringify(request));
  let response;
  const reqUrl = `${BASEURL}${url}`;
  console.log(`URL::${reqUrl}`);
  try {
    let config = {
      headers: {
        Authorization: "Bearer " + request.token,
      },
    };
    switch (method) {
      case "GET":
        response = await axios.get(reqUrl, config);
        break;
      case "POST":
        response = await axios.post(reqUrl, request);
        break;
    }
  } catch (e) {
    console.error(e);
  }

  return response;
};

export default HttpService;
