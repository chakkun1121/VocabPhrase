import { render, screen } from "@testing-library/react";
import CardResult from "./index";
import { fileType } from "@/types/fileType";
import { cardResult } from "@/types/cardResult";
import "@testing-library/jest-dom";

describe("CardResult component", () => {
  const fileContent: fileType = {
    mode: null,
    content: [
      {
        id: "eccaf203-6ad5-7f02-ff3b-9ad1629cbef0",
        en: "Hello",
        ja: "こんにちは",
      },
      {
        id: "eccaf203-6ad5-7f02-ff3b-9ad1629cbef1",
        en: "Goodbye",
        ja: "さようなら",
      },
    ],
  };
  const results: cardResult = {
    fileInfo: {
      id: "test",
    },
    achievement: {
      "ja-en": {
        "eccaf203-6ad5-7f02-ff3b-9ad1629cbef0": 90,
        "eccaf203-6ad5-7f02-ff3b-9ad1629cbef1": 0,
      },
    },
  };
  const mode = "ja-en";
  const currentResult = {
    "eccaf203-6ad5-7f02-ff3b-9ad1629cbef0": true,
    "eccaf203-6ad5-7f02-ff3b-9ad1629cbef1": false,
  };
  const setResults = jest.fn();
  const saveResults = jest.fn();

  test("renders the 'もう一度' button", () => {
    render(
      <CardResult
        fileContent={fileContent}
        results={results}
        mode={mode}
        currentResult={currentResult}
        setResults={setResults}
        saveResults={saveResults}
      />
    );

    const buttonElement = screen.getByText("もう一度");
    expect(buttonElement).toBeInTheDocument();
  });

  test("renders the data table with correct content", () => {
    render(
      <CardResult
        fileContent={fileContent}
        results={results}
        mode={mode}
        currentResult={currentResult}
        setResults={setResults}
        saveResults={saveResults}
      />
    );

    const questionElement = screen.getByText("Hello");
    const answerElement = screen.getByText("こんにちは");
    const resultElement = screen.getByText("○");
    const achievementElement = screen.getByText("90");

    expect(questionElement).toBeInTheDocument();
    expect(answerElement).toBeInTheDocument();
    expect(resultElement).toBeInTheDocument();
    expect(achievementElement).toBeInTheDocument();
  });

  test("calls setResults and saveResults with the updated result", () => {
    render(
      <CardResult
        fileContent={fileContent}
        results={results}
        mode={mode}
        currentResult={currentResult}
        setResults={setResults}
        saveResults={saveResults}
      />
    );

    expect(setResults).toHaveBeenCalledWith({
      ...results,
      achievement: {
        ...results?.achievement,
        [mode]: {
          ...results?.achievement?.[mode],
          "eccaf203-6ad5-7f02-ff3b-9ad1629cbef0": 90,
          "eccaf203-6ad5-7f02-ff3b-9ad1629cbef1": 10,
        },
      },
    });
    expect(saveResults).toHaveBeenCalledWith({
      ...results,
      achievement: {
        ...results?.achievement,
        [mode]: {
          ...results?.achievement?.[mode],
          "eccaf203-6ad5-7f02-ff3b-9ad1629cbef0": 90,
          "eccaf203-6ad5-7f02-ff3b-9ad1629cbef1": 10,
        },
      },
    });
  });
});
