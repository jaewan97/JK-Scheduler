"use client";

interface FabProps {
  onClick: () => void;
}

export function Fab({ onClick }: FabProps) {
  return (
    <button
      onClick={onClick}
      aria-label="새 일정 추가"
      className="fixed bottom-7 right-6 z-20 grid h-14 w-14 place-items-center rounded-full bg-coral text-white shadow-fab transition-transform duration-200 ease-spring active:scale-90"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2V18M2 10H18"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
