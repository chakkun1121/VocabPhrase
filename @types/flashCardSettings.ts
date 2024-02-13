export type flashCardSettings = {
  [keyof: string]: any;
  isRandom: boolean;
  isAnswerWithKeyboard: boolean;
  removeChecked?: boolean;
  questionCount?: number;
  mode: flashCardMode;
};

export type flashCardMode = "ja-en" | "en-ja";
