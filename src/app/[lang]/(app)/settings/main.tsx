"use client";

import { useServerSettings } from "../../../../common/hooks/useServerSettings";
import { useRecoilState } from "recoil";
import { localSettingsState } from "../../../../common/hooks/localSettings";
import { useToken } from "@/common/hooks/useToken";

export default function Settings() {
  const token = useToken();
  const [localSettings, setLocalSettings] = useRecoilState(localSettingsState);
  const { serverSettings, setServerSettings, isLoading, isSaving } =
    useServerSettings(token);
  if (isLoading) return <p className="text-center">loading...</p>;
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const serverSettings = form.serverSettings.value;
        const localSettings = form.localSettings.value;
        setServerSettings(serverSettings);
        setLocalSettings(JSON.parse(localSettings));
      }}
    >
      <div>
        <h2>サーバー保存の設定</h2>
        <textarea
          name="serverSettings"
          defaultValue={JSON.stringify(serverSettings, null, 2)}
        />
      </div>
      <div>
        <h2>ローカル保存の設定</h2>
        <textarea
          name="localSettings"
          defaultValue={JSON.stringify(localSettings || "{}", null, 2)}
        />
      </div>
      <button disabled={isSaving} type="submit">
        保存
      </button>
    </form>
  );
}
