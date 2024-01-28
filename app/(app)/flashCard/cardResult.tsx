import { cardResult } from "@/@types/cardResult";
import { fileType } from "@/@types/fileType";

export default function CardResult({
  fileContent,
  results,
  currentProblemIdList,
}: {
  fileContent: fileType;
  results: cardResult;
  currentProblemIdList: string[];
}) {
  return (
    <div className="flex-1 flex flex-col p-4 w-full max-w-7xl mx-auto gap-4">
      <div className="">
        <table className="w-full rounded">
          <caption className="text-heading-S">結果</caption>
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-6"></th>
              <th className="px-4 py-6">英文</th>
              <th className="px-4 py-6">日本語訳</th>
              {/* <th className="px-4"></th> */}
              <th className="px-4 py-6 w-20">
                英語→
                <br />
                日本語
              </th>
              <th className="px-4 py-6 w-20">
                日本語
                <br />
                →英語
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            {currentProblemIdList.map((id, i) => {
              const currentQuestion = fileContent.content.find(
                (c) => c.id === id
              ) as fileType["content"][0];

              return (
                <tr key={currentQuestion.id} className="even:bg-gray-100">
                  <td className="text-center py-5">{i + 1}</td>
                  <td className="py-5">{currentQuestion.en}</td>
                  <td className="py-5">{currentQuestion.ja}</td>
                  {/* <td className="text-center">{result ? "○" : "×"}</td> */}
                  <td className="py-5 text-center">
                    <input
                      type="checkbox"
                      checked={
                        !!results.check?.["ja-en"]?.find((r) => r === id)
                      }
                      disabled
                      className="w-4 h-4 bg-primary-500"
                    />
                  </td>
                  <td className="text-center py-5">
                    <input
                      type="checkbox"
                      checked={
                        !!results.check?.["en-ja"]?.find((r) => r === id)
                      }
                      disabled
                      className="w-4 h-4 bg-primary-500"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
    </div>
  );
}
