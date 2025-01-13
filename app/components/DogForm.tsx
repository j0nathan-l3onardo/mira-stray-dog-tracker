'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from 'next/navigation'

export function DogForm() {
  const [address, setAddress] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [addressError, setAddressError] = useState<string | null>(null)
  const router = useRouter()

  const validateAddress = async () => {
    setAddressError(null)
    setError(null)

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
      const data = await response.json()

      if (data.length === 0) {
        setAddressError('Address not found. Please try a different address.')
        setLatitude('')
        setLongitude('')
        return false
      }

      setLatitude(data[0].lat)
      setLongitude(data[0].lon)
      return true
    } catch (error) {
      console.error('Error validating address:', error)
      setAddressError('Error validating address. Please try again.')
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const isAddressValid = await validateAddress()
    if (!isAddressValid) return

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
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <Input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      {addressError && <div className="text-red-500">{addressError}</div>}
      <Input
        type="number"
        placeholder="Latitude"
        value={latitude}
        readOnly
        disabled
        className="bg-gray-100 text-gray-600 cursor-not-allowed"
      />
      <Input
        type="number"
        placeholder="Longitude"
        value={longitude}
        readOnly
        disabled
        className="bg-gray-100 text-gray-600 cursor-not-allowed"
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}

