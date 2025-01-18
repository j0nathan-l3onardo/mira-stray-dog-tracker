'use client'

import { useState } from 'react'
import { PhotoIcon } from '@heroicons/react/24/solid'
import AddressAutocomplete from './AddressAutocomplete'

export default function ReportForm() {
  const [coordinates, setCoordinates] = useState({
    address: '',
    latitude: '',
    longitude: ''
  })

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords
        
        // Reverse geocode to get address
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
          )
          const data = await response.json()
          
          if (data.results[0]) {
            setCoordinates({
              address: data.results[0].formatted_address,
              latitude,
              longitude
            })
          }
        } catch (error) {
          console.error('Error getting address:', error)
        }
      })
    }
  }

  const handleAddressSelect = (location) => {
    setCoordinates(location)
  }

  return (
    <form className="space-y-6">
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <AddressAutocomplete
          onSelectAddress={handleAddressSelect}
          onGetLocation={handleGetLocation}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
            Latitude
          </label>
          <input
            type="text"
            name="latitude"
            id="latitude"
            value={coordinates.latitude}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
          />
        </div>
        <div>
          <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
            Longitude
          </label>
          <input
            type="text"
            name="longitude"
            id="longitude"
            value={coordinates.longitude}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
          />
        </div>
      </div>

      {/* Rest of your form */}
    </form>
  )
} 