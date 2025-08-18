import { Fragment } from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Fragment>
      <h1 className="text-center">404</h1>
      <h1 className="text-center">OOPS! PAGE NOT FOUND</h1>
      <h1 className="text-center">
        <Link to="/">Return to Home</Link>
      </h1>
    </Fragment>
  );
};

export default PageNotFound;
