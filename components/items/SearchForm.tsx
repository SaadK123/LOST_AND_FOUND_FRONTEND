'use client';

import { useState } from 'react';
import { Path, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InteractiveMapPicker from '../map/InteractiveMapPicker';
import { itemsApi } from '@/lib/api/items';
import { ITEM_CATEGORIES } from '@/lib/types/item';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const searchSchema = z.object({
  description: z.string().min(10, 'Describe your item in detail (min 10 chars)'),
  category: z.string().min(1, 'Please select a category'),
  dateLost: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
  locationName: z.string().min(1, 'Please select a location on the map'),
  city: z.string().optional(),
  country: z.string().optional(),
  radiusKm: z.number(),
});

type SearchFormData = z.infer<typeof searchSchema>;

export default function SearchForm() {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<SearchFormData>({
    resolver: zodResolver<SearchFormData>(searchSchema),
    defaultValues: {
      radiusKm: 10,
      description: '',
      category: '',
      latitude: 0,
      longitude: 0,
      locationName: '',
      city: '',
      country: '',
      dateLost: '',
    }
  });

  const locationName = watch('locationName');

  const onLocationSelect = (lat: number, lng: number, address: string, city?: string, country?: string) => {
    setValue('latitude', lat);
    setValue('longitude', lng);
    setValue('locationName', address);
    // Explicitly cast field names to Path to satisfy react-hook-form's generic constraint
    if (city) setValue('city' as Path<SearchFormData>, city);
    if (country) setValue('country' as Path<SearchFormData>, country);
  };

  const onSubmit = async (data: SearchFormData) => {
    setIsSearching(true);
    const searchPromise = itemsApi.aiSearch({
      description: data.description,
      category: data.category,
      country: data.country,
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude,
      radiusKm: data.radiusKm,
    });

    toast.promise(searchPromise, {
      loading: '🔍 AI is searching for matches...',
      success: 'Search completed!',
      error: 'Search failed. Please try again.',
    });

    try {
      const response = await searchPromise;
      const results = response.data;

      // Store results in sessionStorage and navigate to results page
      sessionStorage.setItem('searchResults', JSON.stringify(results));
      router.push('/search/results');
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Lost Item</h1>
        <p className="text-gray-600">Use AI to search for items that match your description</p>
      </div>

      {/* Interactive Map */}
      <div>
        <label className="block text-lg font-semibold mb-2 text-gray-700">
          Where did you lose it? <span className="text-red-500">*</span>
        </label>
        <InteractiveMapPicker onLocationSelect={onLocationSelect} />
        {locationName && (
          <p className="text-sm text-green-600 mt-2">✓ Location: {locationName}</p>
        )}
        {errors.locationName && (
          <p className="text-red-500 text-sm mt-1">{errors.locationName.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-lg font-semibold mb-2 text-gray-700">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          {...register('category')}
          className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-700 focus:border-blue-500 focus:outline-none"
        >
          <option value="">Select a category</option>
          {ITEM_CATEGORIES.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-lg font-semibold mb-2 text-gray-700">
          Describe your item <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('description')}
          rows={5}
          className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-700 focus:border-blue-500 focus:outline-none"
          placeholder="Describe your lost item in detail. Include color, brand, size, distinctive features..."
        />
        <p className="text-sm text-gray-500 mt-1">
          💡 Tip: The more detailed your description, the better the AI can find matches
        </p>
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Date Lost */}
      <div>
        <label className="block text-lg font-semibold mb-2 text-gray-700">
          When did you lose it? (optional)
        </label>
        <input
          type="date"
          {...register('dateLost')}
          className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-700 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Search Radius */}
      <div>
        <label className="block text-lg font-semibold mb-2 text-gray-700">
          Search Radius: {watch('radiusKm')} km
        </label>
        <input
          type="range"
          {...register('radiusKm', { valueAsNumber: true })}
          min="1"
          max="50"
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>1 km</span>
          <span>50 km</span>
        </div>
      </div>

      {/* Search Button - Bottom Right */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSearching}
          className="bg-blue-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? '🔍 Searching...' : '🔍 Search for Matches'}
        </button>
      </div>
    </form>
  );
}
