'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface AddressSuggestion {
  display_name: string;
  lat: string;
  lon: string;
}

export function DogForm() {
  const [address, setAddress] = useState('')
  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([])
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [addressError, setAddressError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const autocompleteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setAddressSuggestions([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const fetchAddressSuggestions = async () => {
      if (address.length < 2) {
        setAddressSuggestions([])
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
        const data = await response.json()
        setAddressSuggestions(data)
      } catch (error) {
        console.error('Error fetching address suggestions:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchAddressSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [address])

  const handleAddressSelect = (suggestion: AddressSuggestion) => {
    setAddress(suggestion.display_name)
    setLatitude(suggestion.lat)
    setLongitude(suggestion.lon)
    setAddressSuggestions([])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!latitude || !longitude) {
      setAddressError('Please select a valid address from the suggestions.')
      return
    }

    const formData = new FormData()
    formData.append('address', address)
    formData.append('latitude', latitude)
    formData.append('longitude', longitude)
    formData.append('description', description)
    formData.append('name', name)
    if (image) {
      formData.append('image', image)
    }

    try {
      const response = await fetch('/api/dogs', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to submit dog information')
      }

      setAddress('')
      setLatitude('')
      setLongitude('')
      setDescription('')
      setName('')
      setImage(null)
      router.refresh()
    } catch (error) {
      console.error('Error submitting dog information:', error)
      setError('Failed to submit dog information. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="relative">
        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
          Address
        </label>
        <input
          type="text"
          name="address"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="mt-2 block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
          placeholder="Enter address"
        />
        {isLoading && <div className="absolute right-3 top-9">Loading...</div>}
        {addressSuggestions.length > 0 && (
          <div ref={autocompleteRef} className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {addressSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-primary-50"
                onClick={() => handleAddressSelect(suggestion)}
              >
                <span className="block truncate">{suggestion.display_name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {addressError && (
        <p className="mt-2 text-sm text-red-600" id="address-error">
          {addressError}
        </p>
      )}
      <div>
        <label htmlFor="latitude" className="block text-sm font-medium leading-6 text-gray-900">
          Latitude
        </label>
        <input
          type="number"
          name="latitude"
          id="latitude"
          value={latitude}
          readOnly
          disabled
          className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-gray-50"
        />
      </div>
      <div>
        <label htmlFor="longitude" className="block text-sm font-medium leading-6 text-gray-900">
          Longitude
        </label>
        <input
          type="number"
          name="longitude"
          id="longitude"
          value={longitude}
          readOnly
          disabled
          className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-gray-50"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-2 block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
          placeholder="Describe the dog's condition"
        />
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
          Name (optional)
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
          placeholder="Dog's name (if known)"
        />
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
          Image
        </label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="mt-2 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
        />
      </div>
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

