import { useState } from "react";
import Sidebar from "./components/Sidebar";
import CollapsedSidebar from "./components/CollapsedSidebar";
import MainArea from "./components/MainArea";
import { Message, RecentChat } from "./types";

export default function ChatLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [recentChats, setRecentChats] = useState<RecentChat[]>([
    { id: "1", title: "Greeting", messages: [] },
  ]);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [chatCounter, setChatCounter] = useState(2);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNewChat = () => {
    // If there are current messages, save them to history
    if (currentMessages.length > 0) {
      const firstUserMessage = currentMessages.find((msg) => msg.role === "user");
      const chatTitle = firstUserMessage
        ? firstUserMessage.content.substring(0, 50)
        : "New conversation";

      const newChat: RecentChat = {
        id: chatCounter.toString(),
        title: chatTitle,
        messages: currentMessages,
      };

      setRecentChats([newChat, ...recentChats]);
      setChatCounter(chatCounter + 1);
    }

    // Clear current messages to start new chat
    setCurrentMessages([]);
    setCurrentChatId(null);
  };

  const handleDeleteChat = (chatId: string) => {
    setRecentChats(recentChats.filter((chat) => chat.id !== chatId));

    // If the deleted chat was the current one, clear the messages
    if (currentChatId === chatId) {
      setCurrentMessages([]);
      setCurrentChatId(null);
    }
  };

  const handleLoadChat = (chatId: string) => {
    const chat = recentChats.find((c) => c.id === chatId);
    if (chat) {
      setCurrentMessages(chat.messages);
      setCurrentChatId(chatId);
    }
  };

  const handleUpdateCurrentChat = (messages: Message[]) => {
    setCurrentMessages(messages);

    // If we're editing an existing chat, update it in the history
    if (currentChatId) {
      setRecentChats(recentChats.map((chat) =>
        chat.id === currentChatId
          ? { ...chat, messages }
          : chat
      ));
    }
  };

  return (
    <div className="flex min-h-screen bg-transparent text-text-100 relative z-10">
      {/* Always show sidebar - collapsed by default, full when open */}
      {isSidebarOpen ? (
        <Sidebar
          recentChats={recentChats}
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
          onNewChat={handleNewChat}
          onDeleteChat={handleDeleteChat}
          onLoadChat={handleLoadChat}
        />
      ) : (
        <CollapsedSidebar onToggle={toggleSidebar} onNewChat={handleNewChat} />
      )}
      <MainArea
        messages={currentMessages}
        onMessagesChange={handleUpdateCurrentChat}
      />
    </div>
  );
}
