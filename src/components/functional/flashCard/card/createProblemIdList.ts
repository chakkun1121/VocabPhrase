import { fileType } from "@/types/fileType";
import { flashCardSettings } from "@/types/flashCardSettings";
import { cardResult } from "@/types/cardResult";

export function createProblemIdList(
  fileContent: fileType,
  flashCardSettings: flashCardSettings,
  cardResult: cardResult
) {
  const problemIdList = fileContent.content.map(c => c.id);
  // 1.範囲設定があれば配列を切る
  // if (flashCardSettings.range) {
  //   const [start, end] = flashCardSettings.range;
  //   problemIdList.splice(end);
  //   problemIdList.splice(0, start);
  // }
  // 2. ランダム設定の場合は混ぜる
  if (flashCardSettings.isRandom) {
    problemIdList.sort(() => Math.random() - 0.5);
  }
  // 3.achievement を1~10->その他小さい順に並べる
  if (flashCardSettings.efficiencyMode) {
    problemIdList.sort((a, b) => {
      const aResult =
        cardResult?.achievement?.[flashCardSettings.mode]?.[a] ?? 0;

      const bResult =
        cardResult?.achievement?.[flashCardSettings.mode]?.[b] ?? 0;
      // 1~10->その他小さい順に並べる
      if (0 < aResult && aResult <= 10 && (bResult > 10 || bResult === 0))
        return -1;
      if (0 < bResult && bResult <= 10 && (aResult > 10 || aResult === 0))
        return 1;
      return aResult - bResult;
    });
  }
  return problemIdList;
}
