import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getPoll, votePoll } from "../lib/api";
import { Poll } from "../types/poll";

export default function PollPage() {
  const router = useRouter();
  const { id } = router.query;
  const [poll, setPoll] = useState<Poll | null>(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    if (id) getPoll(id as string).then((res) => setPoll(res.data));
  }, [id]);

  const vote = async (index: number) => {
    if (!poll || voted) return;
    const ip = await fetch("/api/get-ip").then((res) => res.text());
    const res = await votePoll(id as string, index, ip);
    setPoll(res.data);
    setVoted(true);
  };

  if (!poll) return <p>로딩 중...</p>;

  return (
    <div className="max-w-xl mx-auto mt-20 p-4">
      <h1 className="text-xl font-bold mb-4">{poll.title}</h1>
      {poll.options.map((opt, i) => (
        <button
          key={i}
          className="block w-full bg-gray-200 hover:bg-gray-300 px-4 py-2 mb-2 rounded"
          onClick={() => vote(i)}
          disabled={voted}
        >
          {opt.text}
        </button>
      ))}
      {voted && (
        <button
          className="mt-4 text-blue-600 underline"
          onClick={() => router.push(`/poll/${id}/result`)}
        >
          👉 결과 보기 (광고 포함)
        </button>
      )}
    </div>
  );
}
