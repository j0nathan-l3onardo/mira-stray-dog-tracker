'use client'

import { useState, useEffect, useRef } from 'react'
import { MapPinIcon } from '@heroicons/react/24/solid'
import { Spinner } from './Spinner' // We'll create this next

export default function AddressAutocomplete({ onSelectAddress, onGetLocation }) {
  const [autocomplete, setAutocomplete] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingScript, setIsLoadingScript] = useState(true)
  const inputRef = useRef(null)

  useEffect(() => {
    // Load Google Maps JavaScript API script
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
    script.async = true
    script.onload = () => {
      setIsLoadingScript(false)
      initAutocomplete()
    }
    script.onerror = () => {
      setError('Failed to load Google Maps. Please try again later.')
      setIsLoadingScript(false)
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const initAutocomplete = () => {
    if (!inputRef.current) return

    try {
      const autocompleteInstance = new google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'US' }, // Adjust country as needed
        fields: ['formatted_address', 'geometry']
      })

      autocompleteInstance.addListener('place_changed', () => {
        setIsLoading(true)
        setError(null)
        
        try {
          const place = autocompleteInstance.getPlace()
          if (!place.geometry) {
            setError('Please select an address from the dropdown.')
            return
          }

          onSelectAddress({
            address: place.formatted_address,
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
          })
        } catch (err) {
          setError('Failed to process the selected address.')
        } finally {
          setIsLoading(false)
        }
      })

      setAutocomplete(autocompleteInstance)
    } catch (err) {
      setError('Failed to initialize address autocomplete.')
    }
  }

  const handleGetLocation = async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser.')
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        })
      })

      const { latitude, longitude } = position.coords

      // Reverse geocode to get address
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      )

      if (!response.ok) {
        throw new Error('Failed to get address from coordinates.')
      }

      const data = await response.json()
      
      if (!data.results[0]) {
        throw new Error('No address found for this location.')
      }

      onSelectAddress({
        address: data.results[0].formatted_address,
        latitude,
        longitude
      })
    } catch (err) {
      setError(
        err.code === 1 ? 'Location access denied. Please enable location services.' :
        err.code === 2 ? 'Unable to determine your location. Please try again.' :
        err.code === 3 ? 'Location request timed out. Please try again.' :
        err.message || 'Failed to get your location.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={isLoadingScript ? 'Loading...' : 'Enter address'}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pl-3 pr-10 py-2"
          minLength={2}
          disabled={isLoadingScript || isLoading}
        />
        <button
          type="button"
          onClick={handleGetLocation}
          disabled={isLoadingScript || isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Use current location"
        >
          {isLoading ? <Spinner className="h-5 w-5" /> : <MapPinIcon className="h-5 w-5" />}
        </button>
      </div>
      
      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
} 