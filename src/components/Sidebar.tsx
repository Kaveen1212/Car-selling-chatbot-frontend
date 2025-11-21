import { RecentChat } from "../types";
import { useState, useRef, useEffect } from "react";

interface SidebarProps {
  recentChats: RecentChat[];
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
  onLoadChat: (chatId: string) => void;
}

export default function Sidebar({ recentChats, isOpen, onToggle, onNewChat, onDeleteChat, onLoadChat }: SidebarProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }

    if (openMenuId) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openMenuId]);

  const handleEdit = (chatId: string) => {
    onLoadChat(chatId);
    setOpenMenuId(null);
  };

  const handleDelete = (chatId: string) => {
    onDeleteChat(chatId);
    setOpenMenuId(null);
  };
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-bg-300 border-r border-border-300 h-screen transition-all duration-300 ${
          isOpen ? "w-64" : "w-0 border-r-0"
        } overflow-hidden fixed lg:relative top-0 left-0 z-50 lg:z-auto`}
      >
        {/* Top section with logo and close button */}
        <div className="flex items-center justify-between p-3 border-b border-border-300 flex-shrink-0">
          <button
            className="flex items-center justify-center w-auto h-9 rounded-lg text-xl text-[#c6613f] font-bold transition-colors active:scale-95"
            aria-label="Claude Home"
          >
            KAVEEN AGENT
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
          <button
            onClick={onNewChat}
            className="flex items-center gap-3 w-full h-9 px-3 rounded-lg bg-[#c6613f] hover:bg-[#df5b2f] transition-colors text-white text-sm font-medium active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New chat</span>
          </button>
        </div>

        {/* Navigation Items */}

        {/* Recents Section */}
        <div className="flex-1 overflow-y-auto px-2 mt-4">
          <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wide text-text-400">
            Recents
          </h3>
          <div className="space-y-0.5">
            {recentChats.map((chat) => (
              <div key={chat.id} className="relative">
                <div className="flex items-center justify-between w-full h-9 px-3 rounded-lg hover:bg-bg-200 transition-colors text-text-200 hover:text-text-100 text-sm group">
                  <button
                    onClick={() => onLoadChat(chat.id)}
                    className="flex-1 text-left truncate"
                  >
                    <span className="truncate">{chat.title}</span>
                  </button>
                  <button
                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0"
                    aria-label="More options"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === chat.id ? null : chat.id);
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>

                {/* Dropdown Menu */}
                {openMenuId === chat.id && (
                  <div
                    ref={menuRef}
                    className="absolute right-0 top-10 w-48 bg-bg-200 border border-border-300 rounded-lg shadow-lg z-50 py-1"
                  >
                    <button
                      onClick={() => handleEdit(chat.id)}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-text-100 hover:bg-bg-100 transition-colors text-left"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(chat.id)}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-500 hover:bg-bg-100 transition-colors text-left"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                )}
              </div>
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
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40 backdrop-blur-sm"
          onClick={onToggle}
          aria-label="Close sidebar overlay"
        />
      )}
    </>
  );
}
