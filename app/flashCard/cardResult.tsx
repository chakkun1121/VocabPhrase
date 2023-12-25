export default function CardResult({ result }: { result: any }) {
  return (
    <div className="flex-1 flex flex-col p-4 w-full max-w-7xl mx-auto gap-4">
      <nav className="flex-none">
        <button onClick={() => window.close()}>閉じる</button>
      </nav>
    </div>
  );
}
