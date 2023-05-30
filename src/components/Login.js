import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
const Login = () => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const navigate = useNavigate();

  const authContext = useAuth();

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    if (await authContext.login(username, password)) {
      navigate(`/welcome/${username}`);
    } else {
      setShowErrorMessage(true);
    }
  };

  return (
    <div className="Login">
      <h1>Please Login</h1>
      {showErrorMessage && (
        <div className="errorMessage">
          Authenticated Failed.Please check your credentials.
        </div>
      )}
      <div>
        <label>Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUserNameChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <button onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
};

export default Login;
