import { useState } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { setAuthedUser } from "../actions/authedUser";

const Login = ({ dispatch, userNames }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser !== "") {
      dispatch(setAuthedUser(selectedUser));
      setErrorMsg("");
    } else {
      setErrorMsg("You must choose a username");
    }
  };

  return (
    <Row className="justify-content-center align-items-center min-vh-100">
      <Col xs={12} md={4}>
        <Card bg="light" className="text-center">
          <Card.Header>Login</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formGridState">
                <Form.Label>Username</Form.Label>
                {errorMsg && <p className="text-danger">{errorMsg}</p>}
                <Form.Control
                  as="select"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  <option value="">Select user</option>
                  {userNames.map((item) => (
                    <option value={item.value} key={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button type="submit" variant="outline-dark">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

function mapStateToProps({ users }) {
  return {
    userNames: Object.keys(users).map((id) => ({
      value: id,
      label: users[id].name,
    })),
  };
}

export default connect(mapStateToProps)(Login);
