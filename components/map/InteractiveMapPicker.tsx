'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const useMapEvents = dynamic(
  () => import('react-leaflet').then((mod) => mod.useMapEvents),
  { ssr: false }
);

interface InteractiveMapPickerProps {
  onLocationSelect: (lat: number, lng: number, address: string, city?: string, country?: string) => void;
  initialPosition?: [number, number];
}

export default function InteractiveMapPicker({
  onLocationSelect,
  initialPosition = [40.7128, -74.0060], // NYC default
}: InteractiveMapPickerProps) {
  const [position, setPosition] = useState<[number, number]>(initialPosition);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fix Leaflet icon issue
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    }
  }, []);

  function LocationMarker() {
    useMapEvents({
      click(e: any) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);

        // Reverse geocoding using OpenStreetMap Nominatim
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
          .then(res => res.json())
          .then(data => {
            const city = data.address?.city || data.address?.town || data.address?.village || '';
            const country = data.address?.country || '';
            onLocationSelect(lat, lng, data.display_name, city, country);
          })
          .catch(err => {
            console.error('Geocoding error:', err);
            onLocationSelect(lat, lng, `${lat.toFixed(4)}, ${lng.toFixed(4)}`);
          });
      },
    });

    return <Marker position={position} />;
  }

  if (!mounted) {
    return (
      <div className="h-96 w-full rounded-lg border-2 border-blue-500 bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden border-2 border-blue-500">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>
      <p className="text-sm text-gray-600 mt-2 text-center">
        📍 Click anywhere on the map to select location
      </p>
    </div>
  );
}
