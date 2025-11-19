interface EmptyStateProps {
  userName?: string;
}

export default function EmptyState({ userName = "there" }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
      {/* Free plan / Upgrade badge at top right */}
      <div className="absolute top-6 right-6 flex items-center gap-1 text-sm">
        <span className="text-text-200">Free plan</span>
        <span className="text-text-400">·</span>
        <button className="text-text-200 hover:text-text-100 underline underline-offset-2 transition-colors">
          Upgrade
        </button>
      </div>

      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Greeting with icon */}
        <div className="flex items-center justify-center gap-3">
          {/* Claude starburst icon */}
          <svg className="w-8 h-8 text-accent-main-100" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L12.7 4.5L15 3.2L14.3 5.7L17 5.7L15 7.5L17 9.3L14.3 9.3L15 11.8L12.7 10.5L12 13L11.3 10.5L9 11.8L9.7 9.3L7 9.3L9 7.5L7 5.7L9.7 5.7L9 3.2L11.3 4.5L12 2Z"/>
            <circle cx="12" cy="17" r="2" />
            <circle cx="6" cy="12" r="1.5" />
            <circle cx="18" cy="12" r="1.5" />
          </svg>
          <h1 className="text-[32px] font-light text-text-100 tracking-tight">
            Back at it RAMA, {userName}
          </h1>
        </div>
      </div>
    </div>
  );
}
