import { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { setAuthedUser } from "../actions/authedUser";
import Avatar from "./Avatar";

const NavBar = ({ user, dispatch }) => {
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(null));
  };

  return (
    <Fragment>
      <Navbar
        bg="light"
        expand="lg"
        variant="light"
        sticky="top"
        className="my-3 border"
      >
        <Navbar.Brand as={Link} to="/">
          <h2>
            <small>Employee-Polls |</small>
          </h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/" exact>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add">
              New Question
            </Nav.Link>
            <Nav.Link as={NavLink} to="/leaderboard">
              Leaderboard
            </Nav.Link>
          </Nav>
          <Nav className="align-items-center">
            <Navbar.Text>@{user.id}</Navbar.Text>
            <Avatar avatarURL={user.avatarURL} className="mx-3" />
            <Button variant="outline-dark" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

function mapStateToProps({ users, authedUser }) {
  return {
    user: users[authedUser],
  };
}

export default connect(mapStateToProps)(NavBar);
