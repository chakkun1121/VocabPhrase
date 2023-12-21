export type fileType = {
  content: (
    | {
        title: string; // 多分いらない
      }
    | {
        id: string; // uuid-v7
        en: string;
        ja: string;
        options: object;
      }
  )[];
};
