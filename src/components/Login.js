import { connect } from "react-redux";
import { useState } from "react";
import { handleLogin } from "../actions/authedUser";

 const Login = ({dispatch}) => {
    const [username, setUserName] = useState("mtsamis");
    const [password, setPassword] = useState("xyz123");

    const handleUserName = (e) => {
      setUserName(e.target.value);
    };

    const handlePassword = (e) => {
      setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(handleLogin(username, password));
      setUserName("");
      setPassword("");
    };

    return (
      <div className="container">
        <div className="login-container">
          <div className="logo">
            <img src="https://avatar.iran.liara.run/public" alt="Logo" />
          </div>
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="UserName" className="form-label">
                User
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                data-testid="username"
                value={username}
                onChange={handleUserName}
                placeholder="User"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                data-testid="password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
              />
            </div>
            <button type="submit" data-testid="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
 }

 const mapStateToProps = ({ authedUser }) => ({
   authedUser,
 });

 export default connect(mapStateToProps)(Login);
