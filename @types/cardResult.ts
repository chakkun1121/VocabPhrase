// 保存するファイル名は result/<本体のファイルID>.jsonとすること
export type cardResult = {
  fileInfo: {
    id: string;
  };
  check: {
    en2ja?: {
      id: string;
      checked: boolean;
    }[];
    ja2en?: {
      id: string;
      checked: boolean;
    }[];
  };
  results: {
    //キーボード入力での解答時のみ使用
    date: string;
    mode?: "en2ja" | "ja2en"; //初期値は"en2ja"
    cardsResult: {
      id: string;
      result: boolean; //正解かどうか
    }[];
  }[];
};
