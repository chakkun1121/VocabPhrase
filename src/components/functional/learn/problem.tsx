import { Button } from "@/components/ui/button";
import { fileType } from "@/types/fileType";

export default function Problem({
  currentProblem,
  next,
}: {
  currentProblem: fileType["content"][0];
  next: (result: boolean) => void;
}) {
  return (
    <div>
      <h1>{currentProblem.en}</h1>
      <p>{currentProblem.ja}</p>
      <Button onClick={() => next(false)}>覚えていない</Button>
      <Button onClick={() => next(true)}>覚えた</Button>
    </div>
  );
}
