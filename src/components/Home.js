import { Fragment } from "react";
import { connect } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";
import BriefQuestionsList from "./BriefQuestionsList";

const Home = ({ answeredQuestionIds, unansweredQuestionIds }) => (
  <Fragment>
    <Tabs>
      <Tab eventKey="unanswered" title="Unanswered Questions">
        <BriefQuestionsList
          idsList={unansweredQuestionIds}
          emptyListNote="No more Unanswered Questions! Time to create some new ones!"
        />
      </Tab>
      <Tab eventKey="answered" title="Answered Questions">
        <BriefQuestionsList
          idsList={answeredQuestionIds}
          emptyListNote="No Answered Questions yet! What are you waiting for???"
        />
      </Tab>
    </Tabs>
  </Fragment>
);

const mapStateToProps = ({ authedUser, questions, users }) => {
  const answeredQuestionIds = Object.keys(questions)
    .filter((id) => users[authedUser].answers.hasOwnProperty(id))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  const unansweredQuestionIds = Object.keys(questions)
    .filter((id) => !users[authedUser].answers.hasOwnProperty(id))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  return {
    answeredQuestionIds,
    unansweredQuestionIds,
  };
};

export default connect(mapStateToProps)(Home);
