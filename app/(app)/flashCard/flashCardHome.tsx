import { flashCardSettings } from "@/@types/flashCardSettings";
import { useState } from "react";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import { flashcardOptions } from "./flashcardOptions";
import React from "react";

export default function FlashCardHome({
  setMode,
  setFlashCardSettings,
}: {
  setMode: (mode: "cards") => void;
  setFlashCardSettings: React.Dispatch<React.SetStateAction<flashCardSettings>>;
}) {
  const [previousSettings, setPreviousSettings] = useRecoilState(
    previousSettingsState
  );
  const [isRandom, setIsRandom] = useState(previousSettings.isRandom);
  const [questionCount, setQuestionCount] = useState<number>(
    previousSettings.questionCount || Infinity
  );
  return (
    <form
      className="flex flex-col gap-4 p-4 w-full max-w-7xl mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        const settings = {
          isRandom: e.currentTarget.isRandom.checked,
          isAnswerWithKeyboard: e.currentTarget.isAnswerWithKeyboard.checked,
          removeChecked: e.currentTarget.removeChecked.checked,
          mode: e.currentTarget.mode.value as flashCardSettings["mode"],
          questionCount: questionCount,
        };
        setPreviousSettings(settings);
        setFlashCardSettings(settings);
        setMode("cards");
      }}
    >
      <div className="p-2 [&>*]:flex [&>*]:items-center grid gap-3 [&>*]:bg-gray-100 [&>*]:rounded [&>*]:p-2 [&>*]:justify-between bg-gray-50 rounded">
        {flashcardOptions.map((option) => (
          <React.Fragment key={option.name}>
            {typeof option.default === "boolean" && (
              <label>
                {option.title}
                <input
                  type="checkbox"
                  name={option.name}
                  id={option.id}
                  defaultChecked={previousSettings[option.name]}
                  onChange={(e) => {
                    if (option.name === "isRandom") {
                      setIsRandom(e.currentTarget.checked);
                      setQuestionCount(Infinity);
                    }
                  }}
                  className="mr-2"
                />
              </label>
            )}
            {option.options && (
              <div>
                <p>{option.title}</p>
                <div>
                  {option.options?.map((o) => (
                    <label key={o.value} className="flex items-center">
                      <input
                        type="radio"
                        name={option.name}
                        value={o.value || ""}
                        defaultChecked={
                          option.name == "questionCount"
                            ? o.value
                              ? o.value == questionCount
                              : ![5, 10, Infinity].includes(questionCount)
                            : o.value == previousSettings[option.name]
                        }
                        disabled={option.name == "questionCount" && !isRandom}
                        onChange={(e) => {
                          if (option.name == "questionCount") {
                            setQuestionCount(Number(e.currentTarget.value));
                          }
                        }}
                      />
                      {!o.value && (
                        <>
                          {[5, 10, Infinity].includes(questionCount) ? (
                            <p>カスタム</p>
                          ) : (
                            <>
                              <input
                                className="w-16"
                                type="number"
                                name="problemNumberInput"
                                onChange={(e) => {
                                  setQuestionCount(
                                    Number(e.currentTarget.value)
                                  );
                                }}
                                placeholder="カスタム 例:10"
                                defaultValue={questionCount.toString()}
                              />
                              問
                            </>
                          )}
                        </>
                      )}
                      {o.value && o.label}
                    </label>
                    // Todo: 出題数が
                  ))}
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <input
        type="submit"
        value="Start"
        className="p-4 text-2xl text-center text-white bg-primary-400 disabled:bg-primary-300 rounded-xl"
      />
    </form>
  );
}
const { persistAtom } = recoilPersist({
  key: "previousFlashcardSettings",
  storage: typeof window === "undefined" ? undefined : localStorage,
});
const previousSettingsState = atom<flashCardSettings>({
  key: "previousSettings",
  default: {
    isRandom: false,
    isAnswerWithKeyboard: false,
    removeChecked: true,
    mode: "ja-en",
    questionCount: Infinity,
  },
  effects_UNSTABLE: [persistAtom],
});
