export type flashCardSettings = {
  isRandom: boolean;
  isAnswerWithKeyboard: boolean;
  removeChecked?: boolean;
  questionCount?: number;
  mode: flashCardMode;
};

export type flashCardMode = "ja-en" | "en-ja";
