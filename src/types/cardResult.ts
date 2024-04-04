// 保存するファイル名は result/<本体のファイルID>.jsonとすること
export type cardResult = {
  fileInfo: {
    id: string;
  };
  check?: {
    //古いやつ
    ["en-ja"]?: string[]; //チェック済みのカードのID 英語→日本語
    ["ja-en"]?: string[]; //チェック済みのカードのID 日本語→英語
  };
  achievement?: {
    //達成度
    // 0: まだ一度もやっていない(ここで正解したら90へ)
    // 10 : 一回はやった(正解する事に+20)
    // 20~80: 正解する事に+20
    // 90: これが今のチェック状態(間違えたら-10)
    // 90以降は開けておく
    ["en-ja"]?: {
      [key: string]: number;
    }; //英語→日本語
    ["ja-en"]?: {
      [key: string]: number;
    }; //日本語→英語
  };
};
