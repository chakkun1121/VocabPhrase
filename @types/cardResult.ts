// 保存するファイル名は result/<本体のファイルID>.jsonとすること
export type cardResult = {
  fileInfo: {
    id: string;
  };
  results: {
    date: string;
    cardsResult: {
      id: string;
      result: boolean; //正解かどうか
    }[] ;
  }[];
};
