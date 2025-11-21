interface CollapsedSidebarProps {
  onToggle: () => void;
  onNewChat: () => void;
}

export default function CollapsedSidebar({ onToggle, onNewChat }: CollapsedSidebarProps) {
  return (
    <aside className="flex flex-col w-14 bg-bg-300 border-r border-border-300 h-screen items-center py-3 flex-shrink-0">
      {/* Hamburger menu */}
      <button
        onClick={onToggle}
        className="w-9 h-9 rounded-lg hover:bg-bg-200 flex items-center justify-center text-text-200 hover:text-text-100 transition-colors mb-2"
        aria-label="Open sidebar"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* New chat button */}
      <button
        onClick={onNewChat}
        className="w-9 h-9 rounded-lg bg-[#c6613f] hover:bg-[#df5b2f] flex items-center justify-center text-white transition-colors mb-4"
        aria-label="New chat"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* User avatar at bottom */}
      <button
        className="w-9 h-9 rounded-lg bg-bg-400 hover:bg-bg-200 flex items-center justify-center text-text-100 text-xs font-medium transition-colors"
        aria-label="Account"
      >
        KC
      </button>
    </aside>
  );
}
