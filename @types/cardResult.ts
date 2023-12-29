// 保存するファイル名は result/<本体のファイルID>.jsonとすること
export type cardResult = {
  fileInfo: {
    id: string;
  };
  results: {
    date: string;
    mode?: "en2ja" | "ja2en"; //初期値は"en2ja"
    cardsResult: {
      id: string;
      result: boolean; //正解かどうか
    }[];
  }[];
};
