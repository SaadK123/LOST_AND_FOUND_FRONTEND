import apiClient from './client';

export interface LostItemRequest {
  title: string;
  description: string;
  category: string;
  dateLost: string;
  locationName: string;
  country?: string;
  city?: string;
  latitude: number;
  longitude: number;
  rewardOffered?: number;
}

export interface SearchRequest {
  description: string;
  category: string;
  country?: string;
  city?: string;
  latitude: number;
  longitude: number;
  radiusKm?: number;
}

export const itemsApi = {
  // Lost Items
  getAllLostItems: () => apiClient.get('/lost-items'),
  getLostItemById: (id: string) => apiClient.get(`/lost-items/${id}`),
  createLostItem: (data: LostItemRequest) => apiClient.post('/lost-items', data),
  getLostItemsByCategory: (category: string) => apiClient.get(`/lost-items/category/${category}`),
  getLostItemsByCity: (city: string) => apiClient.get(`/lost-items/city/${city}`),

  // Found Items
  getAllFoundItems: () => apiClient.get('/found-items'),
  getFoundItemById: (id: string) => apiClient.get(`/found-items/${id}`),
  createFoundItem: (data: any) => apiClient.post('/found-items', data),
  getFoundItemsByCategory: (category: string) => apiClient.get(`/found-items/category/${category}`),
  getFoundItemsByCity: (city: string) => apiClient.get(`/found-items/city/${city}`),

  // AI Search
  aiSearch: (data: SearchRequest) => apiClient.post('/search', data),

  // Users
  testApi: () => apiClient.get('/users/test'),
};

export default itemsApi;
