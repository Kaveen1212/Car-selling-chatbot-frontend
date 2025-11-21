import { useState } from "react";
import { Message } from "../types";
import CarCard from "./CarCard";
import MapLocation from "./MapLocation";
import VehicleImageDisplay from "./VehicleImageDisplay";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isAssistant = message.role === "assistant";
  const isCardType = message.type === "card" && message.cardData;
  const isMapType = message.type === "map" && message.locationData;
  const isImageType = message.type === "image" && message.imageData;

  // Local state to manage current card index
  const [currentCardIndex, setCurrentCardIndex] = useState(message.currentCardIndex || 0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [copied, setCopied] = useState(false);

  // Update the displayed card when index changes
  const handleCardChange = (newIndex: number) => {
    setCurrentCardIndex(newIndex);
  };

  // Get the current card data based on index
  const currentCardData = message.allCards ? message.allCards[currentCardIndex] : message.cardData;

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const handleCopy = () => {
    if (message.content) {
      navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mb-2">
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
          ) : isImageType ? (
            <VehicleImageDisplay
              images={message.imageData!.images}
              vehicleName={message.imageData!.vehicleName}
              aspectRatio={message.imageData!.aspectRatio || "auto"}
              showThumbnails={true}
            />
          ) : (
            <div className="text-text-100 text-[15px] leading-relaxed whitespace-pre-wrap">
              {message.content}
            </div>
          )}
        </div>
      </div>

      {/* Action buttons for assistant messages - Outside the box */}
      {isAssistant && (
        <div className="flex items-center gap-2 mt-2">
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-bg-200 transition-colors text-text-300 hover:text-text-100"
            aria-label="Copy message"
          >
            {copied ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>

          {/* Like button */}
          <button
            onClick={handleLike}
            className={`p-2 rounded-lg hover:bg-bg-200 transition-colors ${
              liked ? 'text-accent-main-100' : 'text-text-300 hover:text-text-100'
            }`}
            aria-label="Like message"
          >
            <svg className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
          </button>

          {/* Dislike button */}
          <button
            onClick={handleDislike}
            className={`p-2 rounded-lg hover:bg-bg-200 transition-colors ${
              disliked ? 'text-red-500' : 'text-text-300 hover:text-text-100'
            }`}
            aria-label="Dislike message"
          >
            <svg className="w-4 h-4" fill={disliked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
