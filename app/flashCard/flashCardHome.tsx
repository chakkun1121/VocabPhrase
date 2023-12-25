import { fileType } from "@/@types/fileType";
import { flashCardSettings } from "@/@types/flashCardSettings";

export default function FlashCardHome({
  fileContent,
  setMode,
  flashCardSettings,
  setFlashCardSettings,
}: {
  fileContent: fileType;
  setMode: (mode: "home" | "cards" | "result") => void;
  flashCardSettings: flashCardSettings;
  setFlashCardSettings: (settings: {
    isRandom: boolean;
    isAnswerWithKeyboard: boolean;
    questionCount?: number;
  }) => void;
}) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="my-4">
        <p>オプション</p>
        <label className="block m-2">
          <input
            className="p-2 w-4 h-4"
            type="checkbox"
            defaultChecked={flashCardSettings.isRandom}
            onChange={(e) => {
              setFlashCardSettings({
                ...flashCardSettings,
                isRandom: e.target.checked,
              });
            }}
          />
          ランダムに出題する
        </label>
        <label className="block m-2">
          <input
            type="checkbox"
            className="p-2 w-4 h-4"
            defaultChecked={flashCardSettings.isAnswerWithKeyboard}
            onChange={(e) => {
              setFlashCardSettings({
                ...flashCardSettings,
                isAnswerWithKeyboard: e.target.checked,
              });
            }}
          />
          キーボードで解答する
        </label>
        <label className="block m-2">
          出題数:
          <input
            className="p-2 disabled:bg-gray-300   dark:disabled:border-none dark:bg-gray-800 rounded border w-20"
            disabled={!flashCardSettings.isRandom}
            type="number"
            value={flashCardSettings?.questionCount}
            defaultValue={fileContent.content.length}
            max={fileContent.content.length}
            min={1}
            onChange={(e) => {
              setFlashCardSettings({
                ...flashCardSettings,
                questionCount: Number(e.target.value),
              });
            }}
          />
          問/全{fileContent.content.length}問
          {!flashCardSettings.isRandom &&
            "※この機能はランダム出題時のみしか利用できません。ランダム出題機能をオフにした場合はすべての問題が順に出題されます。"}
        </label>
      </div>
      <button
        className="p-4 text-2xl text-center text-white bg-primary-400 rounded-xl"
        onClick={() => setMode("cards")}
      >
        Start
      </button>
    </div>
  );
}
