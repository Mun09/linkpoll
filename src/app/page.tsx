"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPoll } from "./lib/api";
import { OptionCard } from "@/components/optionCard";

export default function Home() {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [pollLink, setPollLink] = useState("");
  const router = useRouter();

  const handleCreate = async () => {
    const trimmedOptions = options.filter((opt) => opt.trim() !== "");
    const res = await createPoll({ title, options: trimmedOptions });
    const link = `${window.location.origin}/polls/${res.data.id}`;
    setPollLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pollLink);
    alert("링크가 클립보드에 복사되었습니다!");
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleDeleteOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    } else {
      alert("최소 2개의 선택지가 필요합니다.");
    }
  };

  return (
    <>
      <div>
        <h1 className="text-center text-4xl font-bold text-blue-600">
          📊 투표 만들기
        </h1>{" "}
        {pollLink && (
          <div className="bg-green-50 p-4 rounded-xl border border-green-300 space-y-2">
            <p className="text-sm text-green-800 font-medium">
              투표가 생성되었습니다! 아래 링크를 공유하세요:
            </p>
            <div className="flex">
              <input
                type="text"
                value={pollLink}
                readOnly
                className="flex-grow p-2 border rounded-l-lg text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-r-lg"
              >
                복사
              </button>
            </div>
            <button
              onClick={() => router.push(pollLink)}
              className="block text-green-700 text-sm underline hover:text-green-900"
            >
              투표 페이지로 이동
            </button>
          </div>
        )}
        <div className="space-y-4 text-center">
          <label className="text-center">질문</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-xl shadow-sm"
            placeholder="질문을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-4 text-center items-center">
          <label className="block text-sm font-medium text-gray-700">
            선택지
          </label>
          <div className="grid grid-cols-1 gap-4">
            {options.map((option, index) => (
              <OptionCard
                key={index}
                index={index}
                value={option}
                onChange={(value) => handleOptionChange(index, value)}
                onDelete={() => handleDeleteOption(index)}
              />
            ))}
          </div>

          <button onClick={() => setOptions([...options, ""])}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            선택지 추가
          </button>
        </div>
        <button
          className="space-y-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          onClick={handleCreate}
          disabled={
            title.trim() === "" ||
            options.filter((opt) => opt.trim() !== "").length < 2
          }
        >
          설문 생성
        </button>
      </div>
    </>
  );
}
