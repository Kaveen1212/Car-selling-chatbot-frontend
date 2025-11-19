import { useState } from "react";
import Sidebar from "./components/Sidebar";
import CollapsedSidebar from "./components/CollapsedSidebar";
import MainArea from "./components/MainArea";
import { navItems, recentChats } from "./mockData";

export default function ChatLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChatStart = () => {
    setHasStartedChat(true);
  };

  return (
    <div className="flex min-h-screen bg-bg-100 text-text-100">
      {/* Always show sidebar - collapsed by default, full when open */}
      {isSidebarOpen ? (
        <Sidebar
          navItems={navItems}
          recentChats={recentChats}
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
        />
      ) : (
        <CollapsedSidebar onToggle={toggleSidebar} />
      )}
      <MainArea
        initialMessages={[]}
        onChatStart={handleChatStart}
      />
    </div>
  );
}
