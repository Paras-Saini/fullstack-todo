import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { retrieveHelloWorldPathVariable } from "../api/HelloWorldService";
import { useAuth } from "../security/AuthContext";

const Welcome = () => {
  const { username } = useParams();

  const authContext = useAuth();

  const [message, setMessage] = useState(null);

  // console.log(username);

  const callHelloWorldRestApi = () => {
    /* axios
      .get("http://localhost:8080/hello-world")
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup")); */

    /* retrieveHelloWorldBean()
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup")); */

    retrieveHelloWorldPathVariable("Paras", authContext.token)
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup"));
  };

  const successfulResponse = (response) => {
    console.log(response);
    setMessage(response.data.message);
  };

  const errorResponse = (error) => {
    console.log(error);
  };

  return (
    <div className="Welcome">
      <h1>Welcome {username}</h1>
      <div>
        Your todos- <Link to="/todos">Go here</Link>
      </div>
      <div>
        <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>
          Call Hello World
        </button>
      </div>
      <div className="text-info">{message}</div>
    </div>
  );
};

export default Welcome;
