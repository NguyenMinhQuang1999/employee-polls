import { Fragment, } from "react";
import { connect } from "react-redux";
import Card from "./Card";

const Home = (props) => {
 const doneQuestions = props.questionIds.filter(
   (id) =>
     props.questions[id].optionOne.votes.includes(props.authedUser) ||
     props.questions[id].optionTwo.votes.includes(props.authedUser)
 );

 const newQuestions = props.questionIds.filter(
   (id) => !doneQuestions.includes(id)
 );

  return (
    <div className="container mt-4">
      <h2>New Questions</h2>
      <div className="card-container">
        {newQuestions.map((id) => (
          <Fragment key={id}>
            <Card id={id} />
          </Fragment>
        ))}
      </div>
      <h2 className="mt-4">Done</h2>
      <div className="card-container" id="done-container">
        {doneQuestions.map((id) => (
          <Fragment key={id}>
            <Card id={id} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }) => ({
  questionIds: Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  ),
  questions,
  authedUser
});

export default connect(mapStateToProps)(Home);
