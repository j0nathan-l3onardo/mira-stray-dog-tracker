'use client'

import { useState } from 'react';
import AddressInput from './AddressInput';
import DogMap from './DogMap';
import Image from 'next/image';

const MainContent = () => {
  const [mapCoordinates, setMapCoordinates] = useState<[number, number] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState('');

  const handleAddressSelect = ({ 
    address, 
    coordinates 
  }: { 
    address: string; 
    coordinates: [number, number] 
  }) => {
    setSelectedAddress(address);
    setMapCoordinates(coordinates);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-0.5 mb-4">
          <Image 
            src="/logo.png" 
            alt="Mira Logo" 
            width={160}
            height={160}
            priority
          />
          <span className="text-[#0F2936]">mira</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Mission</h2>
        <p className="text-gray-600">
          Help us track and care for stray dogs in our community. Together, we can make a difference in their lives.
        </p>
      </div>

      {/* Form Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Report a Stray Dog</h2>
        <AddressInput onAddressSelect={handleAddressSelect} />
      </div>

      {/* Map Section */}
      <div className="h-[500px] rounded-lg overflow-hidden">
        <DogMap coordinates={mapCoordinates} />
      </div>
    </div>
  );
};

export default MainContent;

