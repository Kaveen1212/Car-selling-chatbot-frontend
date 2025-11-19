"use client";

import { useState } from "react";

// Types
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface RecentChat {
  id: string;
  title: string;
}

// Mock Data
const navItems: NavItem[] = [
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

const recentChats: RecentChat[] = [
  { id: "1", title: "Next.js component generation with Tailwind CSS" },
  { id: "2", title: "TypeScript generics and type inference patterns" },
  { id: "3", title: "React Server Components best practices" },
  { id: "4", title: "Building a custom design system" },
  { id: "5", title: "Advanced React hooks patterns" },
  { id: "6", title: "API route handlers in Next.js 14" },
];

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm Claude, an AI assistant. I can help you with a wide variety of tasks like writing, analysis, math, coding, and more. What would you like to work on today?",
  },
  {
    id: "2",
    role: "user",
    content: "I need help recreating the Claude interface as a React component with Tailwind CSS.",
  },
  {
    id: "3",
    role: "assistant",
    content: "I'd be happy to help you recreate the Claude interface! To build a faithful recreation, we'll want to focus on:\n\n1. **Layout Structure**: A sidebar for navigation and recent chats, plus a main area for the conversation\n2. **Color Scheme**: Dark theme with subtle borders and backgrounds\n3. **Component Architecture**: Breaking down the UI into reusable components\n4. **Styling Details**: Rounded corners, hover states, and proper spacing\n\nWould you like me to create a complete implementation using React and Tailwind CSS?",
  },
];

// Subcomponents
function Sidebar() {
  return (
    <aside className="flex flex-col w-64 bg-bg-300 border-r border-border-300 h-screen">
      {/* Top section with logo */}
      <div className="flex items-center justify-between p-3 border-b border-border-300">
        <button
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent-main-100 hover:bg-accent-main-200 transition-colors active:scale-95"
          aria-label="Claude Home"
        >
          <svg className="w-5 h-5 text-text-000" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </button>
      </div>

      {/* New Chat Button */}
      <div className="p-2">
        <button className="flex items-center gap-3 w-full h-9 px-3 rounded-lg bg-bg-200 hover:bg-bg-100 transition-colors text-text-100 text-sm font-medium active:scale-[0.98]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>New chat</span>
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="px-2 space-y-0.5">
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

      {/* Recents Section */}
      <div className="flex-1 overflow-y-auto px-2 mt-4">
        <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wide text-text-400">
          Recents
        </h3>
        <div className="space-y-0.5">
          {recentChats.map((chat) => (
            <button
              key={chat.id}
              className="flex items-center w-full h-9 px-3 rounded-lg hover:bg-bg-200 transition-colors text-text-200 hover:text-text-100 text-sm text-left active:scale-[0.98]"
            >
              <span className="truncate">{chat.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom section (user profile, settings, etc.) */}
      <div className="p-2 border-t border-border-300">
        <button className="flex items-center gap-3 w-full h-9 px-3 rounded-lg hover:bg-bg-200 transition-colors text-text-200 hover:text-text-100 text-sm active:scale-[0.98]">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Account</span>
        </button>
      </div>
    </aside>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={`flex gap-4 px-4 py-6 ${
        isAssistant ? "bg-bg-200" : "bg-transparent"
      }`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isAssistant
              ? "bg-accent-main-100 text-text-000"
              : "bg-bg-400 text-text-100"
          }`}
        >
          {isAssistant ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="text-text-100 text-[15px] leading-relaxed whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    </div>
  );
}

function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}

function ChatInput({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="border-t border-border-300 bg-bg-300 px-4 py-4">
      <div className="max-w-3xl mx-auto">
        <div className="relative flex items-end gap-2 bg-bg-100 border border-border-200 rounded-2xl px-4 py-3 shadow-sm focus-within:border-border-100 transition-colors">
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

function MainArea() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
    console.log("Message sent:", inputValue);
  };

  return (
    <main className="flex-1 flex flex-col bg-bg-100 h-screen overflow-hidden">
      {/* Header */}
      <header className="border-b border-border-300 bg-bg-300 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <h1 className="text-text-100 text-sm font-medium">Claude 3.5 Sonnet</h1>
          <div className="flex items-center gap-2">
            <button
              className="w-8 h-8 rounded-lg hover:bg-bg-200 flex items-center justify-center text-text-200 hover:text-text-100 transition-colors"
              aria-label="More options"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <MessageList messages={messages} />

      {/* Input */}
      <ChatInput value={inputValue} onChange={setInputValue} onSubmit={handleSubmit} />
    </main>
  );
}

// Main Layout Component
export default function ChatLayout() {
  return (
    <div className="flex min-h-screen bg-bg-100 text-text-100">
      <Sidebar />
      <MainArea />
    </div>
  );
}
