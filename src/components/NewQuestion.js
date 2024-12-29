import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleAddQuestion } from "../actions/questions";

const NewQuestion = ({ dispatch, authedUser }) => {
  const navigate = useNavigate();
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");

  const handleFirstOptionChange = (e) => {
    setFirstOption(e.target.value);
  };

  const handleSecondOptionChange = (e) => {
    setSecondOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      handleAddQuestion({
        optionOneText: firstOption,
        optionTwoText: secondOption,
      })
    );
    setFirstOption("");
    setSecondOption("");
    navigate("/");
  };

  return (
    <div className="container wrap-new-question">
      <div className="poll-form">
        <h2>Would You Rather</h2>
        <p>Create Your Own Poll</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstOption" className="form-label">
              First Option
            </label>
            <input
              type="text"
              className="form-control"
              id="firstOption"
              placeholder="Option One"
              data-testid="firstOption"
              onChange={handleFirstOptionChange}
              value={firstOption}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="secondOption"
              data-testid="secondOptionLabel"
              className="form-label"
            >
              Second Option
            </label>
            <input
              type="text"
              className="form-control"
              id="secondOption"
              placeholder="Option Two"
              onChange={handleSecondOptionChange}
              value={secondOption}
              data-testid="secondOption"
            />
          </div>
          <button
            type="submit"
            data-testid="submit-poll"
            className="btn btn-light submit-button"
            disabled={firstOption === "" || secondOption === ""}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default connect()(NewQuestion);
