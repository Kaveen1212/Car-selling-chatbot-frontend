import { NavItem, RecentChat, Message } from "./types";

// Navigation items with icons
export const navItems: NavItem[] = [
  {
    id: "chats",
    label: "Chats",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
  {
    id: "artifacts",
    label: "Artifacts",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
      </svg>
    ),
  },
  {
    id: "code",
    label: "Code",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

// Recent chats list - matching the screenshots
export const recentChats: RecentChat[] = [
  { id: "1", title: "Greeting" },
  { id: "2", title: "Greeting" },
  { id: "3", title: "Professional customer approval ..." },
  { id: "4", title: "Next.js component generation w ..." },
  { id: "5", title: "Untitled" },
  { id: "6", title: "Hybrid CNN-Transformer model ..." },
  { id: "7", title: "Starting a conversation" },
  { id: "8", title: "Starting a conversation" },
  { id: "9", title: "Starting a conversation" },
  { id: "10", title: "Website table redesign" },
  { id: "11", title: "Supervisor email for project sub..." },
  { id: "12", title: "Clarifying AI assistant capabiliti..." },
  { id: "13", title: "AI HR system proposal feedbac..." },
  { id: "14", title: "Comprehensive professional pr..." },
];

// Initial messages - empty by default for the "Back at it" screen
export const initialMessages: Message[] = [];
