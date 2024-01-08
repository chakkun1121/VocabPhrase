import { cardResult } from "@/@types/cardResult";
import { fileType } from "@/@types/fileType";
import { flashCardSettings } from "@/@types/flashCardSettings";

export default function FlashCardHome({
  fileContent,
  setMode,
  flashCardSettings,
  setFlashCardSettings,
  checked,
}: {
  fileContent: fileType;
  setMode: (mode: "home" | "cards" | "result") => void;
  flashCardSettings: flashCardSettings;
  setFlashCardSettings: React.Dispatch<React.SetStateAction<flashCardSettings>>;
  checked: cardResult["check"];
}) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="my-4">
        <p>オプション</p>
        {[
          {
            name: "isRandom",
            title: "ランダムに出題する",
          },
          // {
          //   name: "isAnswerWithKeyboard",
          //   title: "キーボードで解答する",
          // },
          {
            name: "removeChecked",
            title: "チェック済みの問題を除外する",
          },
        ].map((c) => (
          <label className="block m-2" key={c.name}>
            <input
              className="p-2 w-4 h-4"
              type="checkbox"
              defaultChecked={flashCardSettings.isRandom}
              onChange={(e) => {
                setFlashCardSettings({
                  ...flashCardSettings,
                  [c.name]: e.target.checked,
                });
              }}
            />
            {c.title}
          </label>
        ))}
        <label className="block m-2">
          出題数:
          <input
            className="p-2 disabled:bg-gray-300   dark:disabled:border-none dark:bg-gray-800 rounded border w-20"
            disabled={!flashCardSettings.isRandom}
            type="number"
            value={flashCardSettings?.questionCount}
            defaultValue={
              fileContent.content.length -
              ((flashCardSettings?.removeChecked
                ? checked?.[flashCardSettings.mode]?.filter((a) => a.checked)
                    .length
                : 0) ?? 0)
            }
            max={
              fileContent.content.length -
              ((flashCardSettings?.removeChecked
                ? checked?.[flashCardSettings.mode]?.filter((a) => a.checked)
                    .length
                : 0) ?? 0)
            }
            min={1}
            onChange={(e) => {
              setFlashCardSettings({
                ...flashCardSettings,
                questionCount: Number(e.target.value),
              });
            }}
          />
          問/全
          {fileContent.content.length -
            ((flashCardSettings?.removeChecked
              ? checked?.[flashCardSettings.mode]?.filter((a) => a.checked)
                  .length
              : 0) ?? 0)}
          問
          {!flashCardSettings.isRandom &&
            "※この機能はランダム出題時のみしか利用できません。ランダム出題機能をオフにした場合はすべての問題が順に出題されます。"}
        </label>
      </div>
      <button
        className="p-4 text-2xl text-center text-white bg-primary-400 disabled:bg-primary-300 rounded-xl"
        onClick={() => setMode("cards")}
        disabled={
          fileContent.content.length -
            ((flashCardSettings?.removeChecked
              ? checked?.[flashCardSettings.mode]?.filter((a) => a.checked)
                  .length
              : 0) ?? 0) ===
          0
        }
      >
        Start
      </button>
    </div>
  );
}
