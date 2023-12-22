export type fileType = {
  content: {
    id: string; // uuid-v7
    en: string;
    ja: string;
    options?: object;
  }[]; //これ以外は作らない
};
