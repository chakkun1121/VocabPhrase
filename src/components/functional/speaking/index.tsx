"use client";

import { useFile } from "@/googledrive/useFile";
import {
  SpeakingMode,
  speakingMode,
} from "../../../app/[lang]/(app)/[fileId]/speaking/menu";
import { useEffect, useState } from "react";
import SpeechButton from "@/components/ui-parts/speechButton";
import { removeExtension } from "@/common/library/removeExtension";
import { useToken } from "@/common/hooks/useToken";
import { useSpeech } from "@/common/hooks/useSpeech";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
export default function Speaking({
  fileId,
  mode,
  lang,
}: {
  fileId: string;
  mode: SpeakingMode;
  lang: "ja" | "en";
}) {
  const token = useToken();
  const { title, fileContent, loading } = useFile(token, fileId);
  const [isShowEn, setIsShowEn] = useState(
    speakingMode.find(m => m.id === mode)?.defaultShow[lang] ?? true
  );
  const [isShowJa, setIsShowJa] = useState(
    speakingMode.find(m => m.id === mode)?.defaultShow[lang] ?? true
  );
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingIndex, setRecordingIndex] = useState<number | undefined>(
    undefined
  );
  const [playingIndex, setPlayingIndex] = useState<number | undefined>(
    undefined
  );
  useEffect(() => {
    if (!recordingIndex && !playingIndex) {
      window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
      return;
    }
    const element = document.getElementById(
      "content_" + (recordingIndex || playingIndex)
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [playingIndex, recordingIndex]);
  const [recordedData, setRecordedData] = useState<
    | {
        url: string;
        info: {
          id: string;
          start: number;
          end: number;
        }[];
      }
    | undefined
  >(undefined);
  const [speed, setSpeed] = useState(1);
  async function recording() {
    setIsRecording(true);
    // 録音開始
    const info: { id: string; start: number; end: number }[] = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const recordedStart = Date.now();
    const chunks: Blob[] = [];
    mediaRecorder.ondataavailable = e => {
      chunks.push(e.data);
    };
    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
      const url = URL.createObjectURL(blob);
      setRecordedData({ url, info });
    };
    mediaRecorder.start();
    // 音声を順に流していく
    for (const content of fileContent?.content ?? []) {
      setRecordingIndex(fileContent?.content.indexOf(content));
      let start = Date.now();
      const useLang = mode == "ja2en" ? "ja" : "en";
      await speech(content[useLang], useLang);
      const end = Date.now();
      await new Promise(resolve =>
        setTimeout(resolve, (end - start) / (mode == "shadowing" ? 10 : 1))
      );
      info.push({
        id: content.id,
        start: start - recordedStart,
        end: Date.now() - recordedStart,
      });
    }
    setRecordingIndex(undefined);
    mediaRecorder.stop();
    setIsRecording(false);
  }
  async function play() {
    if (!recordedData) return;
    setIsPlaying(true);
    const audio = new Audio(recordedData.url);
    audio.play();
    await Promise.all([
      new Promise(resolve => {
        audio.onended = resolve;
      }),
      (async () => {
        let i = 0;
        for (const { start, end } of recordedData.info) {
          setPlayingIndex(i);
          await new Promise(resolve => setTimeout(resolve, end - start));
          setPlayingIndex(undefined);
          i++;
        }
      })(),
    ]);
    setIsPlaying(false);
  }
  if (loading) return <p className="text-center">loading...</p>;
  return (
    <>
      <nav className="p-2">
        <div className="[&>label]:block grid gap-2">
          <Label>
            <Switch checked={isShowEn} onCheckedChange={c => setIsShowEn(c)} />
            英文を表示する
          </Label>
          <Label>
            <Switch checked={isShowJa} onCheckedChange={c => setIsShowJa(c)} />
            日本語訳を表示する
          </Label>
          <Label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
            />
            英文、日本語再生速度(x{speed})
          </Label>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={recording}
            disabled={isRecording || isPlaying}
            className="p-2 disabled:opacity-50">
            録音{isRecording && "中"}
          </Button>
          <Button
            onClick={play}
            disabled={isRecording || isPlaying}
            className="p-2 disabled:opacity-50">
            再生{isPlaying && "中"}
          </Button>
        </div>
      </nav>
      <div className="py-4 px-2">
        <div>
          <h2 className="text-2xl">{removeExtension(title)}</h2>
        </div>
        <div className="grid gap-2">
          {fileContent &&
            fileContent?.content?.map((content, index) => (
              <Content
                key={index}
                index={index}
                content={content}
                isShowEn={isShowEn}
                isShowJa={isShowJa}
                canPlay={!isRecording}
                isForced={index === recordingIndex || index === playingIndex}
              />
            ))}
        </div>
      </div>
    </>
  );
}
function Content({
  index,
  content,
  isShowEn,
  isShowJa,
  isForced,
  canPlay,
}: {
  index: number;
  content: { en: string; ja: string };
  isShowEn: boolean;
  isShowJa: boolean;
  isForced?: boolean;
  canPlay?: boolean;
}) {
  return (
    <div
      className={` p-2 rounded ${isForced && "bg-card"}`}
      id={"content_" + index}>
      <div className="flex items-center">
        <div className="flex-1">
          {isShowEn ? (
            <p className="select-text">{content.en}</p>
          ) : (
            <p className="text-gray-500">英文非表示</p>
          )}
        </div>
        <Speech text={content.en} canPlay={canPlay} />
      </div>
      <div className="flex items-center">
        <div className="flex-1">
          {isShowJa ? (
            <p className="select-text">{content.ja}</p>
          ) : (
            <p className="text-gray-500">日本語訳非表示</p>
          )}
        </div>
        <Speech text={content.ja} lang="ja" canPlay={canPlay} />
      </div>
    </div>
  );
}
function Speech({
  text,
  lang = "en",
  canPlay,
}: {
  text: string;
  lang?: string;
  canPlay?: boolean;
}) {
  window.addEventListener("beforeunload", () => {
    stop();
  });
  useEffect(() => {
    if (!canPlay) stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canPlay]);
  const { isSpeaking, speech, stop } = useSpeech(text, lang);
  return (
    <SpeechButton
      isSpeaking={isSpeaking}
      speech={speech}
      className="flex-none hover:bg-primary-200 rounded-full p-2 disabled:opacity-50"
      disabled={!canPlay}
    />
  );
}
export async function speech(text: string, lang = "en") {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  speechSynthesis.speak(utterance);
  await new Promise(resolve => {
    utterance.onend = resolve;
  });
}
