// Shared TypeScript interfaces

export interface CarData {
  name: string;
  oldPrice: number;
  newPrice: number;
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
}

export interface LocationData {
  name: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  shippingInfo?: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: "text" | "card" | "map";
  cardData?: CarData;
  allCards?: CarData[];
  currentCardIndex?: number;
  locationData?: LocationData;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface RecentChat {
  id: string;
  title: string;
}
