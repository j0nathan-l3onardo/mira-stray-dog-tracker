'use client'

import { useState } from 'react';
import AddressInput from './AddressInput';
import DogMap from './DogMap';

const MainContent = () => {
  const [mapCoordinates, setMapCoordinates] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('');

  const handleAddressSelect = ({ address, coordinates }) => {
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

