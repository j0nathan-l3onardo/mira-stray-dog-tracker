'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { DogInfo } from '../types'

export function DogMap() {
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
        setError('Failed to load map data')
        console.error('Error fetching dogs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDogs()
  }, [])

  if (loading) {
    return <div className="text-center">Loading map...</div>
  }

  if (error) {
    return <div className="text-red-600">{error}</div>
  }

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {dogs.map((dog) => (
        <Marker key={dog.id} position={[dog.latitude, dog.longitude]}>
          <Popup>
            <div className="text-sm">
              <h3 className="font-semibold">{dog.name || 'Unnamed Dog'}</h3>
              <p className="mt-1">{dog.description}</p>
              <p className="mt-1 text-xs text-gray-500">{dog.address}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

