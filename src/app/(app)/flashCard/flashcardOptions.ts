export const flashcardOptions = [
  {
    name: "isRandom",
    id: "flashcard.isRandom",
    title: "ランダムに出題する",
    default: false,
  },
  {
    name: "isAnswerWithKeyboard",
    id: "flashcard.isAnswerWithKeyboard",
    title: "キーボードで解答する",
    default: false,
  },
  {
    name: "removeChecked",
    id: "flashcard.removeChecked",
    title: "チェック済みの問題を除外する",
    default: true,
  },
  {
    name: "mode",
    id: "flashcard.mode",
    title: "出題モード",
    default: "ja-en",
    options: [
      { value: "ja-en", label: "日本語→英語" },
      { value: "en-ja", label: "英語→日本語" },
    ],
  },
  {
    name: "questionCount",
    id: "flashcard.questionCount",
    title: "出題数",
    default: Infinity,
    options: [
      { value: Infinity, label: "すべて" },
      { value: 5, label: "5問" },
      { value: 10, label: "10問" },
      { value: null, label: "カスタム", inputType: "number" },
    ],
  },
];
