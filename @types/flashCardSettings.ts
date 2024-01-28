export type flashCardSettings =
  | {
      isRandom: boolean;
      isAnswerWithKeyboard: false;
      removeChecked?: boolean;
      questionCount?: number;
      mode: flashCardMode;
    }
  | {
      isRandom: boolean;
      isAnswerWithKeyboard: true;
      removeChecked: boolean;
      questionCount?: number;
      mode: "ja-en";
    };
export type flashCardMode = "ja-en" | "en-ja";
