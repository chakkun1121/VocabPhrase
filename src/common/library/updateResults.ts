import { cardResult } from "@/types/cardResult";
import { flashCardMode } from "@/types/flashCardSettings";

export function updateResults(
  prev: cardResult | undefined,
  currentResult: { [problemId: string]: boolean },
  mode: flashCardMode
): cardResult {
  if (!prev) throw new Error("prev is undefined");
  /* achievementについて
    0: まだ一度もやっていない(ここで正解したら90へ)
    10 : 一回はやった(正解する事に+20)
    20~80: 正解する事に+20
    90: これが今のチェック状態(間違えたら-10)
    90以降は開けておく
    */
  // 今回分の結果を全体の結果とマージ
  return {
    ...prev,
    achievement: {
      ...prev?.achievement,
      [mode]: {
        ...prev?.achievement?.[mode],
        ...Object.fromEntries(
          Object.entries(currentResult).map(([key, value]) => {
            const prevResult = prev?.achievement?.[mode]?.[key] || 0;
            if (prevResult === 0 && value) {
              return [key, 90];
            }
            if (value == true) return [key, Math.min(prevResult + 20, 90)];
            if (value === false) return [key, 10];
            return [key, prevResult];
          })
        ),
      },
    },
  };
}
