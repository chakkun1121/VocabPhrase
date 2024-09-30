import { Option } from "@/common/formContent";

export const flashcardOptions: Option[] = [
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
    name: "efficiencyMode",
    id: "flashcard.efficiencyMode",
    title: "効率モード - 達成率の低い問題から出題する",
    default: false,
  },
];
