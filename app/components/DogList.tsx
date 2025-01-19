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
    return <div className="text-center">Loading dogs...</div>
  }

  if (error) {
    return <div className="text-red-600">{error}</div>
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {dogs.map((dog) => (
        <li key={dog.id} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            {dog.imageUrl && (
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={dog.imageUrl} alt="" />
            )}
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{dog.name || 'Unnamed Dog'}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{dog.address}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{dog.description}</p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              Lat: {dog.latitude}, Lon: {dog.longitude}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

