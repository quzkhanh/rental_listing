export interface Room {
  id: string;
  title: string;
  price: number;
  address: string;
  district: string;
  city: string;
  lat: number;
  lng: number;
  images: string[];
  description: string;
  utilities?: string;
  created_at: string;
}

export interface RoomFilters {
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
  district?: string;
}
