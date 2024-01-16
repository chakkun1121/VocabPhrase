export type flashCardSettings =
  | {
      isRandom: boolean;
      isAnswerWithKeyboard: false;
      removeChecked?: boolean;
      questionCount?: number;
      mode: "en2ja" | "ja2en";
    }
  | {
      isRandom: boolean;
      isAnswerWithKeyboard: true;
      removeChecked: boolean;
      questionCount?: number;
      mode: "en2ja";
    };
