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
    <div className="relative flex items-center gap-2 md:gap-4 max-w-3xl mx-auto w-full">
      {/* Previous button - Outside the card on the left */}
      {allCards && (
        <button
          onClick={handlePreviousCard}
          className="hidden md:flex flex-shrink-0 w-10 h-10 rounded-full bg-[#c6613f] hover:bg-[#df5b2f] text-white items-center justify-center transition-all shadow-lg"
          aria-label="Previous car"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Card Container */}
      <div className="bg-white rounded-xl overflow-hidden flex-1 shadow-lg p-3 md:p-5 relative">
        {/* Mobile navigation buttons */}
        {allCards && (
          <div className="md:hidden absolute top-2 left-2 right-2 z-10 flex justify-between pointer-events-none">
            <button
              onClick={handlePreviousCard}
              className="w-8 h-8 rounded-full bg-[#c6613f] hover:bg-[#df5b2f] text-white flex items-center justify-center transition-all shadow-lg pointer-events-auto"
              aria-label="Previous car"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextCard}
              className="w-8 h-8 rounded-full bg-[#c6613f] hover:bg-[#df5b2f] text-white flex items-center justify-center transition-all shadow-lg pointer-events-auto"
              aria-label="Next car"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Main image */}
        <div className="rounded-lg overflow-hidden mb-2 md:mb-3 relative bg-transparent">
          <img
            src={data.images[currentImageIndex]}
            alt={data.name}
            className="w-full h-auto object-contain"
            style={{
              aspectRatio: 'auto',
              maxHeight: '300px'
            }}
          />
        </div>

        {/* Thumbnail images */}
        <div className="grid grid-cols-5 gap-1 md:gap-2 mb-3 md:mb-4">
          {data.images.map((image, index) => (
            <div
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`bg-transparent rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition-all ${
                currentImageIndex === index ? 'ring-2 ring-[#c6613f]' : 'ring-1 ring-gray-200'
              }`}
            >
              <img
                src={image}
                alt={`${data.name} view ${index + 1}`}
                className="w-full h-full object-contain aspect-video"
              />
            </div>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-black text-base md:text-xl font-bold mb-1 md:mb-2">
          {data.name}
        </h2>

        {/* Pricing */}
        <div className="flex flex-wrap items-center gap-1 md:gap-2 mb-2 md:mb-3">
          <span className="text-gray-400 text-sm md:text-base line-through">
            $ {data.oldPrice.toLocaleString()}
          </span>
          <span className="text-black text-lg md:text-2xl font-bold">
            $ {data.newPrice.toLocaleString()}
          </span>
          <span className="bg-black text-white text-[10px] md:text-xs font-medium px-2 md:px-3 py-0.5 md:py-1 rounded-full">
            New Price
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3">
          {/* Stars */}
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-3 h-3 md:w-4 md:h-4 ${
                  star <= Math.floor(data.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300 fill-gray-300'
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
          <span className="text-black text-[10px] md:text-xs font-medium">
            {data.rating}
          </span>
          <span className="text-gray-400 text-[10px] md:text-xs">
            / 5
          </span>
          <span className="text-gray-400 text-[10px] md:text-xs ml-0.5 md:ml-1">
            {data.reviewCount} Reviews
          </span>
        </div>

        {/* Description */}
        <div className="mb-3 md:mb-4">
          <h3 className="text-black text-xs md:text-sm font-bold mb-1">
            Description
          </h3>
          <p className="text-gray-600 text-[10px] md:text-xs leading-relaxed line-clamp-3 md:line-clamp-none">
            {data.description}
          </p>
        </div>

        {/* View Cart Button */}
        <button className="w-full bg-[#c6613f] hover:bg-[#df5b2f] text-white font-bold text-xs md:text-sm py-2 md:py-3 px-4 rounded-full transition-all active:scale-98">
          View Cart
        </button>
      </div>

      {/* Next button - Outside the card on the right (Desktop only) */}
      {allCards && (
        <button
          onClick={handleNextCard}
          className="hidden md:flex flex-shrink-0 w-10 h-10 rounded-full bg-[#c6613f] hover:bg-[#df5b2f] text-white items-center justify-center transition-all shadow-lg"
          aria-label="Next car"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
