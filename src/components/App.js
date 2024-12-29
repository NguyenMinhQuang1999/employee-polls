import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import { handleInitialData } from "../actions/shared";
import { useEffect, Fragment } from "react";
import Login from "./Login";
import Nav from "./Nav";
import Home from "./Home";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import PageNotFound from "./PageNotFound";
import PollPage from "./PollPage";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  console.log(props.authedUser, "props.authedUser");
 if (!props.authedUser) {
   return props.loading === true ? null : <Login />;
 }
  return (
    <div>
      <Fragment>
        <LoadingBar />
        {props.loading === true ? null : (
          <div className="container">
            <Nav />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/new" element={<NewQuestion />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/404" exact element={<PageNotFound />} />
              <Route path="*" exact element={<PageNotFound />} />
              <Route path="/question/:id" element={<PollPage />} />
            </Routes>
          </div>
        )}
      </Fragment>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  loading: !users,
  authedUser: authedUser,
});
export default connect(mapStateToProps)(App);
