interface CollapsedSidebarProps {
  onToggle: () => void;
}

export default function CollapsedSidebar({ onToggle }: CollapsedSidebarProps) {
  return (
    <aside className="flex flex-col w-14 bg-bg-300 border-r border-border-300 h-screen items-center py-3">
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
        className="w-9 h-9 rounded-lg bg-accent-main-100 hover:bg-accent-main-200 flex items-center justify-center text-text-000 transition-colors mb-4"
        aria-label="New chat"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Navigation buttons */}
      <div className="space-y-1">
        <button
          className="w-9 h-9 rounded-lg hover:bg-bg-200 flex items-center justify-center text-text-200 hover:text-text-100 transition-colors"
          aria-label="Chats"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>

        <button
          className="w-9 h-9 rounded-lg hover:bg-bg-200 flex items-center justify-center text-text-200 hover:text-text-100 transition-colors"
          aria-label="Projects"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </button>

        <button
          className="w-9 h-9 rounded-lg hover:bg-bg-200 flex items-center justify-center text-text-200 hover:text-text-100 transition-colors"
          aria-label="Artifacts"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
          </svg>
        </button>

        <button
          className="w-9 h-9 rounded-lg hover:bg-bg-200 flex items-center justify-center text-text-200 hover:text-text-100 transition-colors"
          aria-label="Code"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </button>
      </div>

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
