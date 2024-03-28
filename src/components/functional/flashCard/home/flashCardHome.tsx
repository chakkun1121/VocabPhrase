import { flashCardSettings } from "@/types/flashCardSettings";
import { useState } from "react";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import { flashcardOptions } from "../flashcardOptions";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
      className="flex flex-col gap-4 p-4 w-full max-w-5xl mx-auto"
      onSubmit={e => {
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
      <div className="p-2 [&>*]:flex [&>*]:items-center grid gap-3 [&>*]:p-2 [&>*]:justify-between ">
        {flashcardOptions.map(option => (
          <React.Fragment key={option.name}>
            {typeof option.default === "boolean" && (
              <Label className="flex">
                <span className="flex-1"> {option.title}</span>
                <Switch
                  name={option.name}
                  id={option.id}
                  defaultChecked={previousSettings[option.name]}
                  onCheckedChange={c => {
                    if (option.name === "isRandom") {
                      setIsRandom(c);
                      setQuestionCount(Infinity);
                    }
                  }}
                  className="mr-2 flex-none"
                />
              </Label>
            )}
            {option.options && (
              <div>
                <p>{option.title}</p>
                <RadioGroup
                  defaultValue={previousSettings[option.name]}
                  onValueChange={(v: string) => {
                    if (option.name == "questionCount") {
                      setQuestionCount(Number(v));
                    }
                  }}
                >
                  {option.options?.map(o => (
                    <Label key={o.value} className="flex items-center">
                      <RadioGroupItem
                        type="radio"
                        name={option.name}
                        value={o.value || ""}
                        disabled={option.name == "questionCount" && !isRandom}
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
                                onChange={e => {
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
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <Input type="submit" value="Start" className="text-center" />
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
