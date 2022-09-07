import axios from "axios";

const axiosFn = async (url, method, request) => {
  //console.log(url + " " + method + " " + request);
  let response;
  const BASEURL = `http://localhost:8080`;
  console.log(`url:${BASEURL}${url}`);
  try {
    switch (method) {
      case "get":
        response = await axios.get(url, request);
        console.log("called");
        break;
      case "put":
        response = await axios.put(url, request);
        break;
      case "post":
        response = await axios.post(url, request);
        break;
      case "delete":
        response = await axios.delete(url, request);
        break;
    }
  } catch (e) {
    console.error(e);
  }

  return response;
};

export default axiosFn;
