export interface flashCardSettings {
  isRandom: boolean;
  // isAnswerWithKeyboard: boolean;
  removeChecked?: boolean;
  questionCount?: number;
  mode: "en2ja" | "ja2en";
}
