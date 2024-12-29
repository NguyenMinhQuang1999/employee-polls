const { _saveQuestionAnswer, _saveQuestion } = require("./_DATA");

describe("_saveQuestion", () => {
   it("should return success if data is passed to the function", async () => {
     var optionOneText = "Apple";
     var optionTwoText = "SamSum";
     var author = "sarahedo";
     var result = await _saveQuestion({ optionOneText, optionTwoText, author });
     expect(result).toHaveProperty("id");
     expect(result).toHaveProperty("author");
     expect(result).toHaveProperty("timestamp");
     expect(result).toHaveProperty("optionOne");
     expect(result).toHaveProperty("optionTwo");
     expect(result.optionOne).toHaveProperty("votes");
     expect(result.optionOne).toHaveProperty("text");
     expect(result.optionTwo).toHaveProperty("votes");
     expect(result.optionTwo).toHaveProperty("text");
     expect(result.optionOne.text).toEqual(optionOneText);
     expect(result.optionTwo.text).toEqual(optionTwoText);
     expect(result.author).toEqual(author);
   });

  it("should return error if miss parameters", async () => {
    const response = await _saveQuestion({
      optionOneText: "Option One Text",
    }).catch((error) => error);
    expect(response).toBe(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("should return true for correct parameters", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: "6ni6ok3ym7mf1p33lnez",
      answer: "optionTwo",
    });

    expect(response).toBeTruthy();
  });

  it("should throw error if miss parameters", async () => {
    const response = await _saveQuestionAnswer({
      answer: "optionOne",
      authedUser: "sarahedo",
    }).catch((error) => error);

    expect(response).toBe("Please provide authedUser, qid, and answer");
  });
});
