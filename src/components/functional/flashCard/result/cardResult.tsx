import { DisabledCheckBox } from "@/components/ui-parts/disabledCheckBox";
import { cardResult } from "@/types/cardResult";
import { fileType } from "@/types/fileType";
import { flashCardMode } from "@/types/flashCardSettings";
import { useEffect } from "react";

export default function CardResult({
  fileContent,
  results,
  mode,
  currentProblemIdList,
  saveResults,
}: {
  fileContent: fileType;
  results: cardResult;
  mode: flashCardMode;
  currentProblemIdList: string[];
  saveResults: () => void;
}) {
  useEffect(() => {
    saveResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="grid p-4 w-full max-w-7xl mx-auto gap-4">
      <div>
        <div>
          <h2>チェック率</h2>
          <p
            className={
              mode == "ja-en" ? "bg-SelectivYellow-100 rounded w-max" : ""
            }
          >
            日本語→英語:
            {Math.round(
              ((results.check["ja-en"]?.length || 0) /
                fileContent.content.length) *
                100
            )}
            %
          </p>
          <p
            className={
              mode == "en-ja" ? "bg-SelectivYellow-100 rounded w-max" : ""
            }
          >
            英語→日本語:
            {Math.round(
              ((results.check["en-ja"]?.length || 0) /
                fileContent.content.length) *
                100
            )}
            %
          </p>
        </div>
      </div>
      <nav className="flex-none flex gap-4">
        <button
          onClick={() => window.location.reload()}
          className="p-2 rounded bg-gray-100 hover:bg-gray-200"
        >
          もう一度
        </button>
        <button
          onClick={() => window.close()}
          className="p-2 rounded bg-gray-100 hover:bg-gray-200"
        >
          閉じる
        </button>
      </nav>
      <table className="w-full rounded">
        <caption className="text-heading-S">結果</caption>
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-6"></th>
            <th className="px-4 py-6">英文</th>
            <th className="px-4 py-6">日本語訳</th>
            {/* <th className="px-4"></th> */}
            <th
              className={
                "px-4 py-6 w-20 " +
                (mode == "ja-en" ? "bg-SelectivYellow-100" : "")
              }
            >
              日本語
              <br />
              →英語
            </th>
            <th
              className={
                "px-4 py-6 w-20 " +
                (mode == "en-ja" ? "bg-SelectivYellow-100" : "")
              }
            >
              英語→
              <br />
              日本語
            </th>
          </tr>
        </thead>
        <tbody className="overflow-y-scroll">
          {currentProblemIdList.map((id, i) => {
            const currentQuestion = fileContent.content.find(
              c => c.id === id
            ) as fileType["content"][0];
            return (
              <tr
                key={currentQuestion.id}
                className="even:bg-gray-100 [&>td]:py-5"
              >
                <td className="text-center">{i + 1}</td>
                <td>{currentQuestion.en}</td>
                <td>{currentQuestion.ja}</td>
                {/* <td className="text-center">{result ? "○" : "×"}</td> */}
                <td
                  className={
                    "text-center " +
                    (mode == "ja-en"
                      ? i % 2 == 0
                        ? "bg-SelectivYellow-50"
                        : "bg-SelectivYellow-100"
                      : "")
                  }
                >
                  <DisabledCheckBox
                    className="w-6 h-6 m-auto"
                    checked={results.check["ja-en"]?.includes(id) as boolean}
                  />
                </td>
                <td
                  className={
                    "text-center " +
                    (mode == "en-ja"
                      ? i % 2 == 0
                        ? "bg-SelectivYellow-50"
                        : "bg-SelectivYellow-100"
                      : "")
                  }
                >
                  <DisabledCheckBox
                    className="w-6 h-6 m-auto"
                    checked={results.check["en-ja"]?.includes(id) as boolean}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
