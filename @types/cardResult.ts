import { flashCardMode } from "./flashCardSettings";

// 保存するファイル名は result/<本体のファイルID>.jsonとすること
export type cardResult = {
  fileInfo: {
    id: string;
  };
  check: {
    //英語→日本語
    ["en-ja"]?: string[]; //チェック済みのカードのID 英語→日本語
    ["ja-en"]?: string[]; //チェック済みのカードのID 日本語→英語
  };
  results: {
    //キーボード入力での解答時のみ使用
    date: string;
    mode?: flashCardMode; //初期値は"ja-en"
    cardsResult: {
      id: string;
      result: boolean; //正解かどうか
    }[];
  }[];
};
