import { updateResults } from "./updateResults";
import { cardResult } from "@/types/cardResult";
import { fileType } from "@/types/fileType";
import { flashCardMode } from "@/types/flashCardSettings";

describe("updateResults", () => {
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
  it("should update the results correctly", () => {
    const updatedResults = updateResults(results, currentResult, mode);
    expect(updatedResults).toEqual({
      fileInfo: {
        id: "test",
      },
      achievement: {
        "ja-en": {
          "eccaf203-6ad5-7f02-ff3b-9ad1629cbef0": 90,
          "eccaf203-6ad5-7f02-ff3b-9ad1629cbef1": 10,
        },
      },
    });
  });
});
