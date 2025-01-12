'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import { DogInfo } from '../types'

interface DogMapProps {
  dogs: DogInfo[]
}

export default function DogMap({ dogs }: DogMapProps) {
  useEffect(() => {
    // This is needed to fix the map marker icons
    delete (Icon.Default.prototype as any)._getIconUrl
    Icon.Default.mergeOptions({
      iconRetinaUrl: '/marker-icon-2x.png',
      iconUrl: '/marker-icon.png',
      shadowUrl: '/marker-shadow.png',
    })
  }, [])

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

