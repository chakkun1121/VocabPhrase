export type flashCardSettings = {
  isRandom: boolean;
  isAnswerWithKeyboard: boolean;
  removeChecked?: boolean;
  mode: flashCardMode;
};

export type flashCardMode = "ja-en" | "en-ja";
