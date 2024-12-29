import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogout } from "../actions/authedUser";

const Nav = ({ dispatch, authedUser }) => {
  const logout = (e) => {
    e.preventDefault();
    dispatch(handleLogout());
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mt-1">
      <div className="container">
        <li className="nav-item">
          <Link data-testid="home" className="navbar-brand" to="/">
            Home
          </Link>
        </li>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" data-testid="new-poll" to="/new">
              New Poll
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-testid="leaderboard"
              to="/leaderboard"
            >
              Leaderboard
            </Link>
          </li>
          <li className="nav-item">
            <span className="nav-link" data-testid="authedUser">
              User: {authedUser}
            </span>
          </li>
          <li>
            <Link data-testid="logout" className="nav-link" onClick={logout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(Nav);
