import { renderHook, act } from "@testing-library/react-hooks";
import { useCard } from "./useCard";
import { fileType } from "@/types/fileType";
import { flashCardSettings } from "@/types/flashCardSettings";
import { cardResult } from "@/types/cardResult";

describe("useCard", () => {
  const fileContent: fileType = {
    mode: "words",
    content: [
      { id: "1", ja: "こんにちは", en: "Hello" },
      { id: "2", ja: "ありがとう", en: "Thank you" },
      { id: "3", ja: "さようなら", en: "Goodbye" },
    ],
  };
  const flashCardSettings: flashCardSettings = {
    isRandom: false,
    efficiencyMode: true,
    mode: "ja-en",
    isAnswerWithKeyboard: false,
  };
  const setMode = jest.fn();
  const cardResult: cardResult = {
    fileInfo: {
      id: "1",
    },
    achievement: {
      ["ja-en"]: {
        "1": 10,
        "2": 50,
      },
    },
  };

  test("should initialize currentProblemIdList and questionIndex", () => {
    const { result } = renderHook(() =>
      useCard({ fileContent, flashCardSettings, setMode, cardResult })
    );

    expect(result.current.currentProblemIdList).toEqual(["3", "1", "2"]);
    expect(result.current.questionIndex).toBe(0);
  });

  test("should increment questionIndex when calling next", () => {
    const { result } = renderHook(() =>
      useCard({ fileContent, flashCardSettings, setMode, cardResult })
    );

    act(() => {
      result.current.next();
    });

    expect(result.current.questionIndex).toBe(1);
  });

  test("should not decrement questionIndex when calling back at index 0", () => {
    const { result } = renderHook(() =>
      useCard({ fileContent, flashCardSettings, setMode, cardResult })
    );

    act(() => {
      result.current.back();
    });

    expect(result.current.questionIndex).toBe(0);
  });

  test('should call setMode with "result" when calling finish', () => {
    const { result } = renderHook(() =>
      useCard({ fileContent, flashCardSettings, setMode, cardResult })
    );

    act(() => {
      result.current.finish();
    });

    expect(setMode).toHaveBeenCalledWith("result");
  });
});
