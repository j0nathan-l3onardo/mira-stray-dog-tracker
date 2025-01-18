import { useState } from 'react';
import { MdMyLocation } from 'react-icons/md';

interface AddressInputProps {
  onAddressSelect: (data: { address: string; coordinates: [number, number] }) => void;
}

const AddressInput = ({ onAddressSelect }: AddressInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGeolocation = async () => {
    setIsLoading(true);
    setError('');

    if ("geolocation" in navigator) {
      try {
        const position: GeolocationPosition = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch address');
        }

        const data = await response.json();
        const address = data.display_name;
        
        setInputValue(address);
        onAddressSelect({
          address,
          coordinates: [latitude, longitude]
        });
      } catch (error: any) {
        let errorMessage = 'Failed to get location';
        if (error.code === 1) {
          errorMessage = 'Location access denied. Please enable location services.';
        } else if (error.code === 2) {
          errorMessage = 'Location unavailable. Please try again.';
        }
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter address..."
          className="w-full px-4 py-2 border rounded-lg"
          disabled={isLoading}
        />
        <button
          onClick={handleGeolocation}
          className={`absolute right-2 p-2 ${
            isLoading ? 'text-gray-400' : 'text-gray-600 hover:text-gray-800'
          }`}
          disabled={isLoading}
          title="Use current location"
        >
          <MdMyLocation className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default AddressInput; 