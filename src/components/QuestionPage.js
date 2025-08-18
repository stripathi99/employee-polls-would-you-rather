import { Fragment } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import UnansweredQuestion from "./UnansweredQuestion";
import AnsweredQuestion from "./AnsweredQuestion";

const QuestionPage = ({ autherUserAnsweres }) => {
  const { id } = useParams();
  const answered = Object.prototype.hasOwnProperty.call(autherUserAnsweres, id);

  return (
    <Fragment>
      <h2 className="text-center my-3">
        <small>Would You Rather...?</small>
      </h2>
      {answered ? <AnsweredQuestion id={id} /> : <UnansweredQuestion id={id} />}
    </Fragment>
  );
};

function mapStateToProps({ authedUser, users }) {
  return {
    autherUserAnsweres: users[authedUser].answers,
  };
}

export default connect(mapStateToProps)(QuestionPage);
