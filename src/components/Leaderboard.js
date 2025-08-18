import { Fragment } from "react";
import { connect } from "react-redux";
import UserStats from "./UserStats";

const LeaderBoard = ({ userIDs }) => {
  return (
    <Fragment>
      <h2 className="text-center my-3">
        <small>Leaderboard</small>
      </h2>
      {userIDs.map((uId) => (
        <UserStats key={uId} id={uId} />
      ))}
    </Fragment>
  );
};

const mapStateToProps = ({ users }) => {
  // Precompute scores to avoid duplicate work in sort
  const userScores = Object.entries(users).map(([id, user]) => ({
    id,
    score: Object.keys(user.answers).length + user.questions.length,
  }));

  // Sort once using precomputed scores
  const sortedUserIDs = userScores
    .sort((a, b) => b.score - a.score)
    .map((user) => user.id);

  return {
    userIDs: sortedUserIDs,
  };
};

export default connect(mapStateToProps)(LeaderBoard);
