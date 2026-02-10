'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AIMatchResult } from '@/lib/types/item';

export default function SearchResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<{ matches: AIMatchResult[], count: number, message: string } | null>(null);

  useEffect(() => {
    const storedResults = sessionStorage.getItem('searchResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      router.push('/search');
    }
  }, [router]);

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/search" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Search
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          <p className="text-gray-600">
            Found {results.count} matching {results.count === 1 ? 'item' : 'items'}
          </p>
        </div>

        {/* Results */}
        {results.matches.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Matches Found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any items matching your description in this area.
            </p>
            <Link
              href="/search"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Another Search
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.matches.map((match, index) => (
              <div
                key={match.itemId || index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Match Score Badge */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">AI Match Score</span>
                    <span className="text-3xl font-bold">{match.score}%</span>
                  </div>
                </div>

                {/* Item Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {match.item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {match.item.description}
                  </p>

                  {/* Location & Date */}
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-start gap-2">
                      <span className="text-lg">📍</span>
                      <span>{match.item.locationName}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">📅</span>
                      <span>
                        Found on {new Date(match.item.dateFound).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">🏷️</span>
                      <span className="capitalize">{match.item.category}</span>
                    </div>
                  </div>

                  {/* AI Reason */}
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-blue-900">
                      <span className="font-semibold">Why this matches:</span> {match.reason}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                      Contact Finder
                    </button>
                    <button className="px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                      ℹ️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
