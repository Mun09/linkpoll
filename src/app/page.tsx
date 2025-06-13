"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPoll } from "./lib/api";

export default function Home() {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const router = useRouter();

  const handleCreate = async () => {
    const trimmedOptions = options.filter((opt) => opt.trim() !== "");
    const res = await createPoll({ title, options: trimmedOptions });
    router.push(`/polls/${res.data.id}`);
  };

  return (
    <main className="max-w-xl mx-auto mt-20 p-4">
      <h1 className="text-2xl font-bold mb-4">📊 투표 만들기</h1>
      <input
        className="w-full p-2 border mb-4"
        placeholder="질문을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {options.map((opt, i) => (
        <input
          key={i}
          className="w-full p-2 border mb-2"
          placeholder={`선택지 ${i + 1}`}
          value={opt}
          onChange={(e) => {
            const newOpts = [...options];
            newOpts[i] = e.target.value;
            setOptions(newOpts);
          }}
        />
      ))}
      <button
        onClick={() => setOptions([...options, ""])}
        className="text-blue-500 underline mb-4"
      >
        선택지 추가
      </button>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleCreate}
      >
        설문 생성
      </button>
    </main>
  );
}
