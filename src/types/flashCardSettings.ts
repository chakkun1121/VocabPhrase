export type flashCardSettings = {
  isRandom: boolean;
  isAnswerWithKeyboard: boolean;
  mode: flashCardMode;
  efficiencyMode: boolean;
  // range?: [number, number];
};

export type flashCardMode = "ja-en" | "en-ja";
