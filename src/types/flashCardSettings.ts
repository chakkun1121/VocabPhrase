export type flashCardSettings = {
  isRandom: boolean;
  isAnswerWithKeyboard: boolean;
  removeChecked?: boolean;
  mode: flashCardMode;
  efficiencyMode: boolean;
};

export type flashCardMode = "ja-en" | "en-ja";
