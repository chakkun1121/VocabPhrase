export type fileType = {
  mode: "words" | "phrases" | "sentences" | null; //初期設定はnull
  content: {
    id: string; // uuid-v7
    en: string;
    ja: string;
    options?: object;
  }[]; //これ以外は作らない
};
