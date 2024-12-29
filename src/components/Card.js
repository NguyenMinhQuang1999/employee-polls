import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate, formatQuestion } from "../utils/helpers";

const Card = (props) => {
  const { id, author, timestamp } = props.question;
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{author}</h5>
        <p className="card-text">Created on : {formatDate(timestamp)}</p>
        <Link to={"question/" + id} className="btn btn-outline-success btn-show">
          Show
        </Link>
      </div>
    </div>
  );
};
const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];
  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  };
};
export default connect(mapStateToProps)(Card);
