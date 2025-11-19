import { NavItem, RecentChat } from "../types";

interface SidebarProps {
  navItems: NavItem[];
  recentChats: RecentChat[];
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ navItems, recentChats, isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-bg-300 border-r border-border-300 h-screen transition-all duration-300 ${
          isOpen ? "w-64" : "w-0 border-r-0"
        } overflow-hidden`}
      >
        {/* Top section with logo and close button */}
        <div className="flex items-center justify-between p-3 border-b border-border-300 flex-shrink-0">
          <button
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent-main-100 hover:bg-accent-main-200 transition-colors active:scale-95"
            aria-label="Claude Home"
          >
            <svg className="w-5 h-5 text-text-000" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" />
            </svg>
          </button>
          <button
            onClick={onToggle}
            className="w-8 h-8 rounded-lg hover:bg-bg-200 flex items-center justify-center text-text-200 hover:text-text-100 transition-colors"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-2 flex-shrink-0">
          <button className="flex items-center gap-3 w-full h-9 px-3 rounded-lg bg-bg-200 hover:bg-bg-100 transition-colors text-text-100 text-sm font-medium active:scale-[0.98]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New chat</span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="px-2 space-y-0.5 flex-shrink-0">
          {navItems.map((item) => (
            <button
              key={item.id}
              className="flex items-center gap-3 w-full h-9 px-3 rounded-lg hover:bg-bg-200 transition-colors text-text-200 hover:text-text-100 text-sm active:scale-[0.98]"
              aria-label={`Open ${item.label}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Starred Section */}
        <div className="px-2 mt-6 flex-shrink-0">
          <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wide text-text-400">
            Starred
          </h3>
          <div className="px-3 py-2 text-text-300 text-sm">
            Redesigning Vehicle Inventory I...
          </div>
        </div>

        {/* Recents Section */}
        <div className="flex-1 overflow-y-auto px-2 mt-4">
          <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wide text-text-400">
            Recents
          </h3>
          <div className="space-y-0.5">
            {recentChats.map((chat) => (
              <button
                key={chat.id}
                className="flex items-center justify-between w-full h-9 px-3 rounded-lg hover:bg-bg-200 transition-colors text-text-200 hover:text-text-100 text-sm text-left active:scale-[0.98] group"
              >
                <span className="truncate">{chat.title}</span>
                <button
                  className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0"
                  aria-label="More options"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom section (user profile) */}
        <div className="p-2 border-t border-border-300 flex-shrink-0">
          <button className="flex items-center gap-3 w-full h-10 px-3 rounded-lg hover:bg-bg-200 transition-colors text-text-200 hover:text-text-100 text-sm active:scale-[0.98]">
            <div className="w-6 h-6 rounded-full bg-bg-400 flex items-center justify-center text-xs font-medium text-text-100">
              KC
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm text-text-100">kaveen chamlndu</div>
              <div className="text-xs text-text-300">Free plan</div>
            </div>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={onToggle}
          aria-label="Close sidebar overlay"
        />
      )}
    </>
  );
}
