'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from 'next/navigation'

export default function DogForm() {
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('latitude', latitude)
    formData.append('longitude', longitude)
    formData.append('description', description)
    formData.append('name', name)
    if (image) {
      formData.append('image', image)
    }

    const response = await fetch('/api/dogs', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      setLatitude('')
      setLongitude('')
      setDescription('')
      setName('')
      setImage(null)
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="number"
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        required
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

