import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Spinner from "react-bootstrap/Spinner";
import Login from "./Login";
import Dashboard from "./Dashboard";

const App = ({ authedUser, dispatch, loadingBar }) => {
  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  if (loadingBar.default === undefined || loadingBar.default === 1) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner
          animation="border"
          role="status"
          variant="secondary"
          className="my-5"
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  } else {
    return <Fragment>{!authedUser ? <Login /> : <Dashboard />}</Fragment>;
  }
};

const mapStateToProps = ({ authedUser, loadingBar }) => {
  return {
    authedUser,
    loadingBar,
  };
};

export default connect(mapStateToProps)(App);
