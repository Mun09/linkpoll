type OptionCardProps = {
  index: number;
  value: string;
  onChange: (value: string) => void;
  onDelete: () => void;
};

export function OptionCard({
  index,
  value,
  onChange,
  onDelete,
}: OptionCardProps) {
  return (
    <div>
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
        {index + 1}
      </div>
      <input
        className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder={`선택지 ${index + 1}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-700"
        aria-label="선택지 삭제"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        삭제
      </button>
    </div>
  );
}
