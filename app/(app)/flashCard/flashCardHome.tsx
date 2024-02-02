import { flashCardSettings } from "@/@types/flashCardSettings";
import { useState } from "react";

export default function FlashCardHome({
  setMode,
  setFlashCardSettings,
}: {
  setMode: (mode: "cards") => void;
  setFlashCardSettings: React.Dispatch<React.SetStateAction<flashCardSettings>>;
}) {
  const [isRandom, setIsRandom] = useState(false);
  const [infiniteProblem, setInfiniteProblem] = useState(true);
  return (
    <form
      className="flex flex-col gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        setFlashCardSettings({
          isRandom: e.currentTarget.isRandom.checked,
          isAnswerWithKeyboard: e.currentTarget.isAnswerWithKeyboard.checked,
          removeChecked: e.currentTarget.removeChecked.checked,
          mode: e.currentTarget.mode.value as flashCardSettings["mode"],
          questionCount: infiniteProblem
            ? Infinity
            : e.currentTarget.problemNumberInput.value,
        });
        setMode("cards");
      }}
    >
      <div className="my-4 [&>label]:block grid gap-2">
        <p>オプション</p>
        {[
          {
            name: "isRandom",
            title: "ランダムに出題する",
            default: false,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setIsRandom(e.target.checked),
          },
          {
            name: "isAnswerWithKeyboard",
            title: "キーボードで解答する",
            default: false,
          },
          {
            name: "removeChecked",
            title: "チェック済みの問題を除外する",
            default: true,
          },
        ].map((c) => (
          <label key={c.name}>
            <input
              className="p-2 w-4 h-4"
              type="checkbox"
              defaultChecked={c.default}
              name={c.name}
              onChange={c.onChange}
            />
            {c.title}
          </label>
        ))}
        <label>
          出題モード:
          <select
            className="p-2 rounded border"
            defaultValue="ja-en"
            name="mode"
          >
            <option value="ja-en">日本語→英語</option> {/*←初期設定*/}
            <option value="en-ja">英語→日本語</option>
          </select>
        </label>
        <div>
          出題数:
          <label
            className={`p-2 border ${
              infiniteProblem ? "bg-primary-200" : "bg-gray-100"
            }`}
          >
            <input
              type="radio"
              name="problemNumber"
              value="Infinity"
              defaultChecked
              className="hidden"
              onChange={() => setInfiniteProblem(true)}
            />
            すべて
          </label>
          <label
            className={`p-2 border ${
              infiniteProblem ? "bg-gray-100" : "bg-primary-200"
            } ${isRandom ? "" : "cursor-not-allowed bg-gray-400"}`}
          >
            <input
              type="radio"
              name="problemNumber"
              className="hidden"
              disabled={!isRandom}
              onChange={() => setInfiniteProblem(false)}
            />
            {infiniteProblem ? (
              <span className="w-16 inline-block">10</span>
            ) : (
              <input
                type="number"
                defaultValue={10}
                placeholder="10"
                className="w-16 bg-primary-200"
                name="problemNumberInput"
                disabled={infiniteProblem}
              />
            )}
            問
          </label>
          {isRandom
            ? "※設定した問題数が出題可能数よりも少ない場合はすべての問題が出題されます。"
            : "※この機能はランダム出題時のみしか利用できません。"}
        </div>
      </div>
      <input
        type="submit"
        value="Start"
        className="p-4 text-2xl text-center text-white bg-primary-400 disabled:bg-primary-300 rounded-xl"
      />
    </form>
  );
}
