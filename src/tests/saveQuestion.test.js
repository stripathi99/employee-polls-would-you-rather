import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA"; // Adjust path as necessary

describe("API Functions", () => {
  // -------------------------------
  // Tests for _saveQuestion
  // -------------------------------
  describe("_saveQuestion", () => {
    it("should return a properly formatted question when valid data is passed", async () => {
      const questionData = {
        optionOneText: "Option One",
        optionTwoText: "Option Two",
        author: "johndoe",
      };

      const savedQuestion = await _saveQuestion(questionData);

      expect(savedQuestion).toBeDefined();
      expect(savedQuestion).toHaveProperty("id");
      expect(typeof savedQuestion.id).toBe("string");
      expect(savedQuestion).toHaveProperty("timestamp");
      expect(typeof savedQuestion.timestamp).toBe("number");
      expect(savedQuestion).toHaveProperty("author", questionData.author);
      expect(savedQuestion.optionOne).toHaveProperty(
        "text",
        questionData.optionOneText
      );
      expect(Array.isArray(savedQuestion.optionOne.votes)).toBe(true);
      expect(savedQuestion.optionTwo).toHaveProperty(
        "text",
        questionData.optionTwoText
      );
      expect(Array.isArray(savedQuestion.optionTwo.votes)).toBe(true);
    });

    it("should reject with an error when required fields are missing", async () => {
      const incompleteQuestion = {
        optionOneText: "Option One",
        author: "johndoe",
      };

      await expect(_saveQuestion(incompleteQuestion)).rejects.toEqual(
        "Please provide optionOneText, optionTwoText, and author"
      );
    });
  });

  // -------------------------------
  // Tests for _saveQuestionAnswer
  // -------------------------------
  describe("_saveQuestionAnswer", () => {
    it("should reject with an error when required fields are missing", async () => {
      const invalidAnswer = {
        authedUser: "", // missing user
        qid: "8xf0y6ziyjabvozdd253nd",
        answer: "optionOne",
      };

      await expect(_saveQuestionAnswer(invalidAnswer)).rejects.toEqual(
        "Please provide authedUser, qid, and answer"
      );
    });
  });
});
