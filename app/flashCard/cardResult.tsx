import { cardResult } from "@/@types/cardResult";
import { fileType } from "@/@types/fileType";
import { getAchievement } from "./main";

export default function CardResult({
  fileContent,
  results,
}: {
  fileContent: fileType;
  results: cardResult;
}) {
  const achievement = getAchievement(results, fileContent);
  console.log('achievement: ', achievement);
  console.log("results: ", results);
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
              <th className="px-4"></th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            {results.results[0].cardsResult.map((result, i) => {
              const currentQuestion = fileContent.content.find(
                (c) => c.id === result.id
              ) as fileType["content"][0];
              const checked =
                achievement?.find((a) => a.id === result.id)?.achievement ??
                false;
              return (
                <tr key={currentQuestion.id} className="even:bg-gray-100">
                  <td className="text-center py-5">{i + 1}</td>
                  <td>{currentQuestion.en}</td>
                  <td>{currentQuestion.ja}</td>
                  {/* <td className="text-center">{result ? "○" : "×"}</td> */}
                  <td className="">
                    <input
                      type="checkbox"
                      checked={checked}
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
