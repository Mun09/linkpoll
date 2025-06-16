"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPoll, votePoll } from "../../lib/api";
import { Poll } from "../../types/poll";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1"];

export default function PollPage() {
  const { id } = useParams();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    if (id) {
      getPoll(id.toString()).then((res) => setPoll(res.data));
    }
  }, [id]);

  const vote = async (index: number) => {
    if (!poll || !id || voted) return;
    const ip = await fetch("/api/get-ip").then((res) => res.text());
    const res = await votePoll(id.toString(), index, ip);
    setPoll(res.data);
    setVoted(true);
  };

  if (!poll) return <p>로딩 중...</p>;

  const totalVotes = poll.options.reduce(
    (sum, opt) => sum + (opt.votes || 0),
    0
  );
  const chartData = poll.options.map((opt, i) => ({
    name: opt.text,
    votes: opt.votes || 0,
    color: COLORS[i % COLORS.length],
  }));

  return (
    <div className="max-w-xl mx-auto mt-20 p-4">
      <h1 className="text-xl font-bold mb-4">{poll.title}</h1>

      {!voted ? (
        poll.options.map((opt, i) => (
          <button
            key={i}
            className="block w-full bg-gray-200 hover:bg-gray-300 px-4 py-2 mb-2 rounded"
            onClick={() => vote(i)}
            disabled={voted}
          >
            {opt.text}
          </button>
        ))
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-4">투표 결과</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="votes">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-2 text-sm text-gray-600">
            총 투표수: {totalVotes}표
          </p>
        </div>
      )}
    </div>
  );
}
