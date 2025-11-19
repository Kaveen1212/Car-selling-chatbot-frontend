import { useState } from "react";
import { CarData } from "../types";

interface CarCardProps {
  data: CarData;
  allCards?: CarData[];
  currentCardIndex?: number;
  onCardChange?: (newIndex: number) => void;
}

export default function CarCard({ data, allCards, currentCardIndex = 0, onCardChange }: CarCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePreviousCard = () => {
    if (allCards && onCardChange) {
      const newIndex = currentCardIndex === 0 ? allCards.length - 1 : currentCardIndex - 1;
      onCardChange(newIndex);
      setCurrentImageIndex(0); // Reset to first image when changing cards
    }
  };

  const handleNextCard = () => {
    if (allCards && onCardChange) {
      const newIndex = currentCardIndex === allCards.length - 1 ? 0 : currentCardIndex + 1;
      onCardChange(newIndex);
      setCurrentImageIndex(0); // Reset to first image when changing cards
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="relative flex items-center gap-4 max-w-5xl mx-auto">
      {/* Previous button - Outside the card on the left */}
      {allCards && (
        <button
          onClick={handlePreviousCard}
          className="flex-shrink-0 w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all shadow-lg"
          aria-label="Previous car"
        >
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Card Container */}
      <div className="bg-bg-300 border border-border-300 rounded-xl overflow-hidden flex-1">
        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* Left side - Images */}
          <div className="flex-1">
            {/* Main image */}
            <div className="bg-bg-200 rounded-lg overflow-hidden mb-4 relative">
              <img
                src={data.images[currentImageIndex]}
                alt={data.name}
                className="w-full h-auto object-cover"
              />

              {/* Card counter - shows which car card you're viewing */}
              {allCards && (
                <div className="absolute bottom-3 right-3 bg-bg-100/80 backdrop-blur-sm text-text-100 text-sm px-3 py-1 rounded-full">
                  {currentCardIndex + 1} / {allCards.length}
                </div>
              )}
            </div>

          {/* Thumbnail images */}
          <div className="grid grid-cols-5 gap-2">
            {data.images.map((image, index) => (
              <div
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`bg-bg-200 rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition-all ${
                  currentImageIndex === index ? 'ring-2 ring-accent-main-100' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${data.name} view ${index + 1}`}
                  className="w-full h-full object-cover aspect-video"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Details */}
        <div className="flex-1 flex flex-col">
          {/* Title */}
          <h2 className="text-text-100 text-3xl font-bold mb-4">
            {data.name}
          </h2>

          {/* Pricing */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-text-400 text-xl line-through">
              $ {data.oldPrice.toLocaleString()}
            </span>
            <span className="text-text-100 text-3xl font-bold">
              $ {data.newPrice.toLocaleString()}
            </span>
            <span className="bg-bg-100 text-text-100 text-sm px-3 py-1 rounded-full">
              New Price
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            {/* Stars */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.floor(data.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-text-400 fill-text-400'
                  }`}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              ))}
            </div>
            <span className="text-text-200 text-sm">
              {data.rating} / 5
            </span>
            <span className="text-text-400 text-sm">
              {data.reviewCount} Reviews
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-text-100 text-lg font-semibold mb-2">
              Description
            </h3>
            <p className="text-text-300 text-sm leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Buy Now Button */}
          <button className="w-full bg-bg-100 hover:bg-bg-400 text-text-100 font-semibold text-lg py-4 px-6 rounded-full transition-all active:scale-98 mt-auto">
            Buy now
          </button>
        </div>
      </div>
    </div>

    {/* Next button - Outside the card on the right */}
    {allCards && (
      <button
        onClick={handleNextCard}
        className="flex-shrink-0 w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all shadow-lg"
        aria-label="Next car"
      >
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    )}
  </div>
  );
}
