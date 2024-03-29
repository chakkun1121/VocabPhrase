import { flashCardSettings } from "@/types/flashCardSettings";

export const flashcardOptions: (
  | {
      name: keyof flashCardSettings;
      id: string;
      title: string;
      default: string;
      options?: {
        value: string;
        label: string;
        inputType?: string;
      }[];
    }
  | {
      name: keyof flashCardSettings;
      id: string;
      title: string;
      default: boolean;
      options?: undefined;
    }
  | {
      name: keyof flashCardSettings;
      id: string;
      title: string;
      default: number;
      options?: undefined;
    }
)[] = [
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
];
