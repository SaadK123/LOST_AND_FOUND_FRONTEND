export interface User {
  id: string;
  email: string;
  fullName: string;
  profileImageUrl?: string;
  createdAt: string;
}

export interface ItemImage {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
  uploadOrder: number;
}

export interface LostItem {
  id: string;
  user?: User;
  title: string;
  description: string;
  category: string;
  dateLost: string;
  locationName: string;
  country?: string;
  city?: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'found' | 'closed';
  rewardOffered?: number;
  images?: ItemImage[];
  createdAt: string;
  updatedAt: string;
}

export interface FoundItem {
  id: string;
  user?: User;
  title: string;
  description: string;
  category: string;
  dateFound: string;
  locationName: string;
  country?: string;
  city?: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'claimed' | 'closed';
  images?: ItemImage[];
  createdAt: string;
  updatedAt: string;
}

export interface AIMatchResult {
  itemId: string;
  item: FoundItem;
  score: number;
  reason: string;
}

export const ITEM_CATEGORIES = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'documents', label: 'Documents' },
  { value: 'pets', label: 'Pets' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'bags', label: 'Bags & Luggage' },
  { value: 'keys', label: 'Keys' },
  { value: 'wallet', label: 'Wallet' },
  { value: 'phone', label: 'Phone' },
  { value: 'other', label: 'Other' },
] as const;
