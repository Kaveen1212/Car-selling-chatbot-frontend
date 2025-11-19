import { useState } from "react";
import { Message } from "../types";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import EmptyState from "./EmptyState";

interface MainAreaProps {
  initialMessages: Message[];
  onChatStart?: () => void;
}

export default function MainArea({ initialMessages, onChatStart }: MainAreaProps) {
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

    // Notify parent that chat has started (first message)
    if (messages.length === 0 && onChatStart) {
      onChatStart();
    }

    // Add hardcoded assistant response
    setTimeout(() => {
      const userInput = inputValue.toLowerCase().trim();

      // Check if user typed "card" to show car card
      if (userInput === "card") {
        const allCars = [
          {
            name: "Toyota Corolla Axio",
            oldPrice: 1450,
            newPrice: 1150,
            rating: 4,
            reviewCount: 12,
            description: "The Toyota Corolla Axio is a sophisticated compact sedan that exemplifies Toyota's commitment to quality, reliability, and fuel efficiency. This 4-door sedan measures 4360×1695×1485mm, offering a perfect balance of compact maneuverability and spacious comfort for up to 5 passengers.",
            images: [
              "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=200&h=150&fit=crop",
              "https://images.unsplash.com/photo-1619976215249-2b0b0f0b99e3?w=200&h=150&fit=crop",
              "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&h=150&fit=crop",
              "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=200&h=150&fit=crop"
            ]
          },
          {
            name: "Honda Civic",
            oldPrice: 1800,
            newPrice: 1500,
            rating: 5,
            reviewCount: 24,
            description: "The Honda Civic is a reliable and fuel-efficient compact car known for its sporty design and advanced technology features. Perfect for daily commuting with excellent handling and a comfortable interior that seats up to 5 passengers.",
            images: [
              "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=200&h=150&fit=crop",
              "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=200&h=150&fit=crop",
              "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=200&h=150&fit=crop",
              "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200&h=150&fit=crop"
            ]
          },
          {
            name: "BMW 3 Series",
            oldPrice: 3500,
            newPrice: 3200,
            rating: 5,
            reviewCount: 45,
            description: "The BMW 3 Series combines luxury with performance, offering a premium driving experience. This sports sedan features cutting-edge technology, elegant design, and powerful engine options that deliver an exhilarating ride.",
            images: [
              "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200&h=150&fit=crop",
              "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=200&h=150&fit=crop",
              "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=200&h=150&fit=crop",
              "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=200&h=150&fit=crop"
            ]
          }
        ];

        const carCardMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "",
          type: "card",
          allCards: allCars,
          currentCardIndex: 0,
          cardData: allCars[0]
        };
        setMessages((prevMessages) => [...prevMessages, carCardMessage]);
      } else if (userInput === "shipping" || userInput.includes("ship") || userInput.includes("location") || userInput.includes("deliver")) {
        // Show shipping location map
        const mapMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "",
          type: "map",
          locationData: {
            name: "Main Distribution Center",
            address: "1234 Harbor Boulevard",
            city: "Los Angeles",
            country: "United States",
            latitude: 34.0522,
            longitude: -118.2437,
            shippingInfo: "We ship from our Los Angeles distribution center to all 50 states. Standard shipping takes 5-7 business days. Express shipping (2-3 days) is available for an additional fee. Free shipping on orders over $50."
          }
        };
        setMessages((prevMessages) => [...prevMessages, mapMessage]);
      } else {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Hello! I'm Claude, your AI assistant. I received your message and I'm here to help. This is a hardcoded response for demonstration purposes.",
        };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      }
    }, 500);

    console.log("Message sent:", inputValue);
  };

  // Check if we have any messages (conversation started)
  const hasMessages = messages.length > 0;

  return (
    <main className="flex-1 flex flex-col bg-bg-100 h-screen overflow-hidden">
      {/* Content area */}
      {!hasMessages ? (
        /* Empty state - input stays centered while typing */
        <>
          <EmptyState userName="D" />

          {/* Centered input - exact match to screenshot */}
          <div className="px-4 pb-12 flex-shrink-0">
            <div className="max-w-5xl mx-auto">
              <div className="relative flex items-center gap-2 bg-bg-300 border border-border-300 rounded-xl px-3 py-2.5 shadow-sm">
                {/* Left icons */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    className="w-8 h-8 rounded-md hover:bg-bg-200 flex items-center justify-center text-text-300 hover:text-text-100 transition-colors"
                    aria-label="Add"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  
                  
                </div>

                {/* Textarea */}
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  placeholder="How can I help you today?"
                  className="flex-1 bg-transparent text-text-100 text-sm placeholder:text-text-400 resize-none outline-none h-[24px] leading-6"
                  rows={1}
                />

                {/* Right side buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Model selector */}
                  <button className="flex items-center gap-1 px-2 h-8 rounded-md hover:bg-bg-200 text-text-200 hover:text-text-100 text-sm transition-colors">
                    <span>Sonnet 4.5</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Send button */}
                  <button
                    onClick={handleSubmit}
                    disabled={!inputValue.trim()}
                    className="w-8 h-8 rounded-md bg-accent-main-100 hover:bg-accent-main-200 disabled:opacity-40 disabled:cursor-not-allowed text-text-000 flex items-center justify-center transition-all active:scale-95"
                    aria-label="Send message"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Conversation started - input moves to bottom */
        <>
          {/* Messages */}
          <MessageList messages={messages} />

          {/* Input at bottom */}
          <ChatInput value={inputValue} onChange={setInputValue} onSubmit={handleSubmit} />
        </>
      )}
    </main>
  );
}
