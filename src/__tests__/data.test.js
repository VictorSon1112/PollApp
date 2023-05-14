import { _saveQuestion, _saveQuestionAnswer } from "../data/_DATA";

describe("_saveQuestion", () => {
  it("should return  promise that resolves to a new question object", () => {
    const question = {
      optionOneText: "Option one",
      optionTwoText: "Option two",
      author: "sarahedo",
    };

    return _saveQuestion(question).then((result) => {
      expect(result).toBeDefined();
      expect(typeof result).toBe("object");
      expect(result.id).toBeDefined();
      expect(result.timestamp).toBeDefined();
      expect(result.optionOne.text).toBe(question.optionOneText);
      expect(result.optionTwo.text).toBe(question.optionTwoText);
      expect(result.author).toBe(question.author);
    });
  });

  it("should reject promise if required properties  missing", () => {
    const question = {
      optionOneText: "Option one",
      optionTwoText: "Option two",
    };

    return expect(_saveQuestion(question)).rejects.toBe(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("should return a Promise that resolves to true", () => {
    const authedUser = "sarahedo";
    const qid = "8xf0y6ziyjabvozdd253nd";
    const answer = "optionOne";

    return _saveQuestionAnswer({ authedUser, qid, answer }).then((result) => {
      expect(result).toBe(true);
    });
  });

  it("should reject the Promise if required properties are missing", () => {
    const authedUser = "sarahedo";
    const qid = "8xf0y6ziyjabvozdd253nd";

    return expect(_saveQuestionAnswer({ authedUser, qid })).rejects.toBe(
      "Please provide authedUser, qid, and answer"
    );
  });
});
