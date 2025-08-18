import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { handleAddQuestion } from "../actions/questions";

const NewQuestion = ({ dispatch }) => {
  const navigate = useNavigate();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "optionOne") setOptionOne(value);
    else if (name === "optionTwo") setOptionTwo(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(optionOne, optionTwo));
    setOptionOne("");
    setOptionTwo("");
    navigate("/", { replace: true });
  };

  return (
    <>
      <h2 className="text-center my-3">
        <small>Would You Rather...?</small>
      </h2>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card bg="light" className="m-3 text-center">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="optionOne">
                  <Form.Label>Choice One</Form.Label>
                  <Form.Control
                    type="text"
                    name="optionOne"
                    value={optionOne}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <h3>
                  <small>OR</small>
                </h3>
                <Form.Group controlId="optionTwo">
                  <Form.Label>Choice Two</Form.Label>
                  <Form.Control
                    type="text"
                    name="optionTwo"
                    value={optionTwo}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-dark"
                  disabled={optionOne === "" || optionTwo === ""}
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default connect()(NewQuestion);
