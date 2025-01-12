'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import { DogInfo } from '../types'

export function DogMap() {
  const [dogs, setDogs] = useState<DogInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fix Leaflet icon issues
    delete (Icon.Default.prototype as any)._getIconUrl
    Icon.Default.mergeOptions({
      iconRetinaUrl: '/marker-icon-2x.png',
      iconUrl: '/marker-icon.png',
      shadowUrl: '/marker-shadow.png',
    })

    // Fetch dogs data
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
    return <div>Loading map...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {dogs.map((dog) => (
        <Marker key={dog.id} position={[dog.latitude, dog.longitude]}>
          <Popup>
            {dog.name && <h3>{dog.name}</h3>}
            <p>{dog.description}</p>
            {dog.imageUrl && <img src={dog.imageUrl} alt="Dog" className="w-full max-w-xs" />}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

