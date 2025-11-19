interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function ChatInput({ value, onChange, onSubmit }: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className=" px-4 py-4">
      <div className="max-w-5xl mx-auto">
        <div className="relative flex items-end gap-2 bg-bg-100 border border-border-200 rounded-2xl px-4 py-3 shadow-sm focus-within:border-border-100 transition-colors">
          {/* Add button */}
          <button
            className="flex-shrink-0 w-8 h-8 rounded-md hover:bg-bg-200 flex items-center justify-center text-text-300 hover:text-text-100 transition-colors self-end"
            aria-label="Add"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>

          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Claude..."
            className="flex-1 bg-transparent text-text-100 text-[15px] placeholder:text-text-400 resize-none outline-none min-h-[24px] max-h-[200px]"
            rows={1}
            style={{
              height: "auto",
              minHeight: "24px",
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
            }}
          />
          <button
            onClick={onSubmit}
            disabled={!value.trim()}
            className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-main-100 hover:bg-accent-main-200 disabled:bg-bg-400 disabled:cursor-not-allowed text-text-000 flex items-center justify-center transition-colors active:scale-95 disabled:active:scale-100"
            aria-label="Send message"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-xs text-text-400 text-center">
          Claude can make mistakes. Please double-check responses.
        </p>
      </div>
    </div>
  );
}
