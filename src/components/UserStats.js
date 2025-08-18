import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Avatar from "./Avatar";

const UserStats = ({ user }) => {
  const { name, id, avatarURL, answers, questions } = user;
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            <Avatar avatarURL={avatarURL} className="mr-2" />
            {name} | @{id}
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <ul>
                <div>Questions</div>
                <li>Answered: {Object.keys(answers).length}</li>
                <li>Created: {questions.length}</li>
              </ul>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            Score: {Object.keys(answers).length + questions.length}
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ users }, { id }) => {
  return {
    user: users[id],
  };
};

export default connect(mapStateToProps)(UserStats);
