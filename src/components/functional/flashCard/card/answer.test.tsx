import { render, screen, fireEvent } from "@testing-library/react";
import Answer from "./answer";
import { flashCardSettings } from "@/types/flashCardSettings";
import "@testing-library/jest-dom";

describe("Answer component", () => {
  const currentQuestion = {
    id: "eccaf203-6ad5-7f02-ff3b-9ad1629cbef0",
    en: "Hello",
    ja: "こんにちは",
  };
  const flashCardSettings: flashCardSettings = {
    mode: "ja-en",
    isAnswerWithKeyboard: true,
    isRandom: false,
    efficiencyMode: false,
  };

  test("renders input when isShowAnswer is false", () => {
    render(
      <Answer
        currentQuestion={currentQuestion}
        flashCardSettings={flashCardSettings}
        isRight={false}
        setIsRight={() => {}}
      />
    );

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  test("renders answer when isShowAnswer is true", () => {
    render(
      <Answer
        currentQuestion={currentQuestion}
        flashCardSettings={flashCardSettings}
        isRight={false}
        setIsRight={() => {}}
      />
    );

    const buttonElement = screen.getByText("解答する");
    fireEvent.click(buttonElement);

    const answerElement = screen.getByText(currentQuestion.en);
    expect(answerElement).toBeInTheDocument();
  });

  test("sets isRight to true when correct answer is selected", () => {
    let isRight = false;
    const setIsRight = (value: boolean) => {
      isRight = value;
    };

    render(
      <Answer
        currentQuestion={currentQuestion}
        flashCardSettings={flashCardSettings}
        isRight={isRight}
        setIsRight={setIsRight}
      />
    );

    const buttonElement = screen.getByText("解答する");
    fireEvent.click(buttonElement);

    const correctAnswerElement = screen.getByLabelText("◯");
    fireEvent.click(correctAnswerElement);

    expect(isRight).toBe(true);
  });
});
