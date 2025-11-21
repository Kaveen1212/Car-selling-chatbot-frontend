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
];

// Recent chats list - matching the screenshots
export const recentChats: RecentChat[] = [
  { id: "1", title: "Greeting", messages: [] },
];

// Initial messages - empty by default for the "Back at it" screen
export const initialMessages: Message[] = [];
