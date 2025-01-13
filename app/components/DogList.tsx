'use client'

import { useEffect, useState } from 'react'
import { DogInfo } from '../types'

export function DogList() {
  const [dogs, setDogs] = useState<DogInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDogs() {
      try {
        const res = await fetch('/api/dogs')
        if (!res.ok) {
          throw new Error('Failed to fetch dogs')
        }
        const data = await res.json()
        setDogs(data)
      } catch (err) {
        setError('Failed to load dogs')
        console.error('Error fetching dogs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDogs()
  }, [])

  if (loading) {
    return <div>Loading dogs...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <ul className="space-y-4 mt-4">
      {dogs.map((dog) => (
        <li key={dog.id} className="border p-4 rounded">
          {dog.name && <h3 className="font-bold">{dog.name}</h3>}
          <p>{dog.description}</p>
          <p>Address: {dog.address}</p>
          <p>Location: {dog.latitude}, {dog.longitude}</p>
          {dog.imageUrl && <img src={dog.imageUrl} alt="Dog" className="w-full max-w-xs mt-2" />}
        </li>
      ))}
    </ul>
  )
}

