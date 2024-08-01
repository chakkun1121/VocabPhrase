import { fileType } from "@/types/fileType";
import { createProblemIdList } from "./createProblemIdList";
import { flashCardSettings } from "@/types/flashCardSettings";
import { cardResult } from "@/types/cardResult";

describe("createProblemIdList", () => {
  const fileContent: fileType = {
    mode: "words",
    content: [
      { id: "1", ja: "こんにちは", en: "Hello" },
      { id: "2", ja: "ありがとう", en: "Thank you" },
      { id: "3", ja: "さようなら", en: "Goodbye" },
      { id: "4", ja: "おはよう", en: "Good morning" },
    ],
  };
  const flashCardSettings: flashCardSettings = {
    isRandom: false,
    efficiencyMode: false,
    mode: "ja-en",
    isAnswerWithKeyboard: false,
  };
  const cardResult: cardResult = {
    fileInfo: {
      id: "1",
    },
    achievement: {
      "ja-en": {
        "1": 50,
        "2": 10,
        "3": 0,
      },
    },
  };

  test("should return problemIdList without any modifications", () => {
    const result = createProblemIdList(
      fileContent,
      flashCardSettings,
      cardResult
    );

    expect(result).toEqual(["1", "2", "3", "4"]);
  });

  test("should return problemIdList with range applied", () => {
    const modifiedFlashCardSettings: flashCardSettings = {
      ...flashCardSettings,
      range: [1, 2],
    };

    const result = createProblemIdList(
      fileContent,
      modifiedFlashCardSettings,
      cardResult
    );

    expect(result).toEqual(["2"]);
  });

  test("should return problemIdList with random order", () => {
    const modifiedFlashCardSettings = {
      ...flashCardSettings,
      isRandom: true,
    };

    const result = createProblemIdList(
      fileContent,
      modifiedFlashCardSettings,
      cardResult
    );

    expect(result).toContain("1");
    expect(result).toContain("2");
    expect(result).toContain("3");
    expect(result).toContain("4");
  });

  test("should return problemIdList sorted by achievement in efficiency mode", () => {
    const modifiedFlashCardSettings = {
      ...flashCardSettings,
      efficiencyMode: true,
    };
    const result = createProblemIdList(
      fileContent,
      modifiedFlashCardSettings,
      cardResult
    );

    expect(result).toEqual(["2", "3", "4", "1"]);
  });
});
