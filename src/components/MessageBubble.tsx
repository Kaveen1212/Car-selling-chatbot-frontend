import { useState } from "react";
import { Message } from "../types";
import CarCard from "./CarCard";
import MapLocation from "./MapLocation";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isAssistant = message.role === "assistant";
  const isCardType = message.type === "card" && message.cardData;
  const isMapType = message.type === "map" && message.locationData;

  // Local state to manage current card index
  const [currentCardIndex, setCurrentCardIndex] = useState(message.currentCardIndex || 0);

  // Update the displayed card when index changes
  const handleCardChange = (newIndex: number) => {
    setCurrentCardIndex(newIndex);
  };

  // Get the current card data based on index
  const currentCardData = message.allCards ? message.allCards[currentCardIndex] : message.cardData;

  return (
    <div
      className={`flex gap-4 px-4 py-6 ${
        isAssistant ? "bg-bg-200 rounded-xl" : "bg-transparent"
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
        {isCardType ? (
          <CarCard
            data={currentCardData!}
            allCards={message.allCards}
            currentCardIndex={currentCardIndex}
            onCardChange={handleCardChange}
          />
        ) : isMapType ? (
          <MapLocation location={message.locationData!} />
        ) : (
          <div className="text-text-100 text-[15px] leading-relaxed whitespace-pre-wrap">
            {message.content}
          </div>
        )}
      </div>
    </div>
  );
}
