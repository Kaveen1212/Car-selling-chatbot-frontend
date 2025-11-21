import { useState } from "react";

interface VehicleImageDisplayProps {
  images: string[];
  vehicleName: string;
  aspectRatio?: "9:16" | "16:9" | "auto";
  showThumbnails?: boolean;
}

export default function VehicleImageDisplay({
  images,
  vehicleName,
  aspectRatio = "auto",
  showThumbnails = true
}: VehicleImageDisplayProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDownload = async () => {
    try {
      const imageUrl = images[currentImageIndex];
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${vehicleName.replace(/\s+/g, '_')}_${currentImageIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  // Calculate aspect ratio class based on prop
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "9:16":
        return "aspect-[9/16]";
      case "16:9":
        return "aspect-[16/9]";
      default:
        return "";
    }
  };

  const getContainerStyle = () => {
    if (aspectRatio === "auto") {
      return { maxHeight: "600px" };
    }
    return {};
  };

  return (
    <div className="w-full">
      {/* Main image container */}
      <div className="relative bg-transparent rounded-lg overflow-hidden mb-3">
        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePreviousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Main image */}
        <div className={`w-full bg-transparent ${getAspectRatioClass()}`} style={getContainerStyle()}>
          <img
            src={images[currentImageIndex]}
            alt={`${vehicleName} - View ${currentImageIndex + 1}`}
            className={`w-full h-full object-contain ${aspectRatio === "auto" ? "max-h-[600px]" : ""}`}
          />
        </div>

        {/* Download button */}
        <button
          onClick={handleDownload}
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all"
          aria-label="Download image"
          title="Download image"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail images */}
      {showThumbnails && images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`bg-transparent rounded-md overflow-hidden hover:opacity-80 transition-all ${
                currentImageIndex === index ? 'ring-2 ring-[#FF0000]' : 'ring-1 ring-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`${vehicleName} thumbnail ${index + 1}`}
                className="w-full h-full object-contain aspect-video"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
