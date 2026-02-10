import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find What You Lost.
            <br />
            <span className="text-blue-600">Return What You Found.</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The world's first AI-powered lost and found platform. Connect with people who found your lost items and earn rewards for helping others.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/search"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Search for Lost Items
            </Link>
            <Link
              href="/found-items/create"
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              Report Found Item
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-3">AI-Powered Matching</h3>
            <p className="text-gray-600">
              Our advanced AI analyzes descriptions and locations to find the best matches for your lost items.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="text-4xl mb-4">🗺️</div>
            <h3 className="text-xl font-bold mb-3">Interactive Map</h3>
            <p className="text-gray-600">
              Click on the map to pinpoint exactly where you lost or found an item. No typing addresses!
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-3">Earn Rewards</h3>
            <p className="text-gray-600">
              Found someone's item? Get rewarded through donations and earn money for helping others.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-24">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Lost Something */}
            <div className="bg-blue-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6 text-blue-900">Lost Something?</h3>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <span className="text-gray-700">Click on the map where you lost it</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <span className="text-gray-700">Describe your item in detail</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <span className="text-gray-700">Our AI finds matching found items</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                  <span className="text-gray-700">Contact the finder and get it back!</span>
                </li>
              </ol>
            </div>

            {/* Found Something */}
            <div className="bg-green-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6 text-green-900">Found Something?</h3>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <span className="text-gray-700">Report the found item with photos</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <span className="text-gray-700">AI matches it with lost items</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <span className="text-gray-700">Connect with the owner</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                  <span className="text-gray-700">Receive a reward for your kindness!</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of people reuniting with their lost items.</p>
          <Link
            href="/login"
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
          >
            Sign Up with Google
          </Link>
        </div>
      </div>
    </div>
  );
}
