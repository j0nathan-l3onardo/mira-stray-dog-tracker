'use client'

import { useState } from 'react';
import AddressInput from './AddressInput';
import DogMap from './DogMap';

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
      <AddressInput onAddressSelect={handleAddressSelect} />
      <DogMap coordinates={mapCoordinates} />
    </div>
  );
};

export default MainContent;

