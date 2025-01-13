'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      {error && <div className="text-red-500">{error}</div>}
      <div className="relative">
        <Input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="rounded-lg placeholder-gray-400"
        />
        {isLoading && <div className="absolute right-3 top-3">Loading...</div>}
        {addressSuggestions.length > 0 && (
          <div ref={autocompleteRef} className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
            {addressSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleAddressSelect(suggestion)}
              >
                {suggestion.display_name}
              </div>
            ))}
          </div>
        )}
      </div>
      {addressError && <div className="text-red-500">{addressError}</div>}
      <Input
        type="number"
        placeholder="Latitude"
        value={latitude}
        readOnly
        disabled
        className="bg-gray-100 text-gray-600 cursor-not-allowed rounded-lg"
      />
      <Input
        type="number"
        placeholder="Longitude"
        value={longitude}
        readOnly
        disabled
        className="bg-gray-100 text-gray-600 cursor-not-allowed rounded-lg"
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="rounded-lg placeholder-gray-400"
      />
      <Input
        type="text"
        placeholder="Name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="rounded-lg placeholder-gray-400"
      />
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="rounded-lg"
      />
      <Button type="submit" className="w-full bg-purple-600 text-cream-100 hover:bg-purple-700">Submit</Button>
    </form>
  )
}

