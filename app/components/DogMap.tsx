'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet default marker icons
const icon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})

L.Marker.prototype.options.icon = icon

interface MapUpdaterProps {
  coordinates: [number, number] | null;
}

interface DogMapProps {
  coordinates: [number, number] | null;
}

// This component handles map position updates
function MapUpdater({ coordinates }: MapUpdaterProps) {
  const map = useMap();
  
  useEffect(() => {
    if (coordinates) {
      map.setView(coordinates, 16);
    }
  }, [coordinates, map]);

  return null;
}

const DogMap = ({ coordinates }: DogMapProps) => {
  const defaultPosition: [number, number] = [51.505, -0.09]; // Default center position
  const position = coordinates || defaultPosition;

  return (
    <MapContainer 
      center={position} 
      zoom={13} 
      className="w-full h-[500px]"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {coordinates && (
        <Marker position={coordinates} />
      )}
      <MapUpdater coordinates={coordinates} />
    </MapContainer>
  );
};

export default DogMap;

