import { useState } from "react";

interface LocationData {
  name: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  shippingInfo?: string;
}

interface MapLocationProps {
  location: LocationData;
}

export default function MapLocation({ location }: MapLocationProps) {
  const [mapType, setMapType] = useState<"roadmap" | "satellite">("roadmap");

  // Generate Google Maps embed URL
  const getMapUrl = () => {
    const { latitude, longitude } = location;
    const apiKey = ""; // Note: In production, use environment variable

    // Using Google Maps embed (free tier, no API key needed for basic embed)
    // Alternative: Use iframe with coordinates
    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}&zoom=15&maptype=${mapType}`;
  };

  // Generate static map URL (works without API key)
  const getStaticMapUrl = () => {
    const { latitude, longitude } = location;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;
  };

  // Generate Google Maps link for "View in Google Maps"
  const getGoogleMapsLink = () => {
    const { latitude, longitude } = location;
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  };

  return (
    <div className="bg-bg-300 border border-border-300 rounded-xl overflow-hidden max-w-4xl">
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-text-100 text-2xl font-bold mb-2">
            Shipping Location
          </h3>
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <div>
              <p className="text-text-100 text-lg font-semibold">{location.name}</p>
              <p className="text-text-300 text-sm">{location.address}</p>
              <p className="text-text-300 text-sm">{location.city}, {location.country}</p>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-bg-200 rounded-lg overflow-hidden mb-4 relative">
          <iframe
            src={getStaticMapUrl()}
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            title="Shipping Location Map"
            className="w-full"
          ></iframe>

          {/* Map type toggle */}
          <div className="absolute top-3 right-3 bg-bg-100/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => setMapType("roadmap")}
              className={`px-3 py-2 text-sm transition-colors ${
                mapType === "roadmap"
                  ? "bg-accent-main-100 text-text-000"
                  : "text-text-300 hover:bg-bg-300"
              }`}
            >
              Map
            </button>
            <button
              onClick={() => setMapType("satellite")}
              className={`px-3 py-2 text-sm transition-colors ${
                mapType === "satellite"
                  ? "bg-accent-main-100 text-text-000"
                  : "text-text-300 hover:bg-bg-300"
              }`}
            >
              Satellite
            </button>
          </div>

          {/* Coordinates display */}
          <div className="absolute bottom-3 left-3 bg-bg-100/90 backdrop-blur-sm px-3 py-2 rounded-lg text-text-100 text-xs font-mono">
            {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
          </div>
        </div>

        {/* Shipping Info */}
        {location.shippingInfo && (
          <div className="bg-bg-200 border border-border-300 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-accent-main-100 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="text-text-100 font-semibold mb-1">Shipping Information</h4>
                <p className="text-text-300 text-sm leading-relaxed">{location.shippingInfo}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <a
            href={getGoogleMapsLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-accent-main-100 hover:bg-accent-main-200 text-text-000 font-semibold text-sm py-3 px-4 rounded-lg transition-all active:scale-98 text-center flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View in Google Maps
          </a>
          <button className="flex-1 bg-bg-100 hover:bg-bg-400 text-text-100 font-semibold text-sm py-3 px-4 rounded-lg transition-all active:scale-98 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share Location
          </button>
        </div>
      </div>
    </div>
  );
}
