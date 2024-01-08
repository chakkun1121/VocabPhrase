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
              <th className="px-4">英文</th>
              <th className="px-4">日本語訳</th>
              {/* <th className="px-4"></th> */}
              <th className="px-4">英語→日本語</th>
              <th className="px-4">日本語→英語</th>
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
                  <td>{currentQuestion.en}</td>
                  <td>{currentQuestion.ja}</td>
                  {/* <td className="text-center">{result ? "○" : "×"}</td> */}
                  <td className="">
                    <input
                      type="checkbox"
                      checked={
                        results.check?.en2ja?.find((r) => r.id === id)?.checked
                      }
                      disabled
                      className="w-4 h-4 bg-primary-500"
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      checked={
                        results.check?.ja2en?.find((r) => r.id === id)?.checked
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
      <nav className="flex-none">
        <button onClick={() => window.close()}>閉じる</button>
      </nav>
    </div>
  );
}
