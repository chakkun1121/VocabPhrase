export const speakingMode: {
  id: string;
  name: { ja: string; en: string };
  description: { ja: string; en: string };
}[] = [
  {
    id: "repeat",
    name: { ja: "リピート", en: "Repeat" },
    description: {
      ja: "流れてきた英文に続いて読む練習です。",
      en: "Repeat the English sentence that comes out.",
    },
  },
  {
    id: "shadowing",
    name: { ja: "シャドーイング", en: "Shadowing" },
    description: {
      ja: "流れてきた英文と同時に読む練習です。",
      en: "Practice reading at the same time as the English text that comes to you.",
    },
  },
  {
    id: "ja2en",
    name: { ja: "日本語→英語", en: "Japanese to English" },
    description: {
      ja: "流れてきた日本語を英語に翻訳して読む練習です。",
      en: "Practice translating Japanese into English and reading it.",
    },
  },
];
export type SpeakingMode = (typeof speakingMode)[number]["id"];
