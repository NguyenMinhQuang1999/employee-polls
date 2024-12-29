import { connect } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { handleAddQuestionAnswer } from "../actions/questions";
import { Fragment } from "react";

const PollPage = ({ dispatch, authedUser, users, questions }) => {
  const { id } = useParams();
  const question = questions[id];
    if (!question) {
      return <Navigate to="/404" />;
    }
  const author = users[question.author];

  if (!author) {
    return <Navigate to="/404" />;
  }

  const hasVotedOptionOne = question.optionOne.votes.includes(authedUser);
  const hasVotedOptionTwo = question.optionTwo.votes.includes(authedUser);
  const hasVoted = hasVotedOptionOne || hasVotedOptionTwo;

  const handleOptionOne = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestionAnswer(question, "optionOne"));
  };

  const handleOptionTwo = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestionAnswer(question, "optionTwo"));
  };

  const percentVote = (option, question) => {
    const numberVotesTotal =
      question.optionOne.votes.length + question.optionTwo.votes.length;
      if (option === "optionOne") {
        return (
              (
                (question.optionOne.votes.length / numberVotesTotal) *
                100
              ).toFixed(2) + "%"
            );
      }

      if (option === "optionTwo") {
            return (
              (
                (question.optionTwo.votes.length / numberVotesTotal) *
                100
              ).toFixed(2) + "%"
            );
      }
       return "";
  };

  return (
    <div className="poll-wrap">
      <div className="poll-container">
        <div className="poll-header">
          <p className="poll-by">{author.id}</p>
          <img src={author.avatarURL} alt="Avatar" className="avatar" />
        </div>
        <h2>Would You Rather</h2>
        <div className="row pt-3">
          <div className="col-md-6">
            <div className="card text-center w-100 card-vote">
              <p>{question.optionOne.text}</p>
              <button
                className="click-area btn btn-info w-100"
                onClick={handleOptionOne}
                disabled={hasVoted}
              >
                {!hasVoted ? (
                  "Click"
                ) : (
                  <Fragment className="text-xs">
                    Votes: {question.optionOne.votes.length} (
                    {percentVote("optionOne", question)})
                  </Fragment>
                )}
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card text-center w-100 card-vote">
              <p>{question.optionTwo.text}</p>
              <button
                className="click-area btn btn-info w-100"
                onClick={handleOptionTwo}
                disabled={hasVoted}
              >
                {!hasVoted ? (
                  <>Click</>
                ) : (
                  <Fragment className="text-xs">
                    Votes: {question.optionTwo.votes.length} (
                    {percentVote("optionTwo", question)})
                  </Fragment>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


};

const mapStateToProps = ({ authedUser, questions, users }) => {
  return { authedUser, questions, users };
};

export default connect(mapStateToProps)(PollPage);
