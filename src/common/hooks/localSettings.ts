import { localSettings } from "@/types/settings";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// recoil
const { persistAtom } = recoilPersist({
  key: "settings",
  storage: typeof window === "undefined" ? undefined : localStorage,
});
export const localSettingsState = atom<localSettings>({
  key: "settings",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
