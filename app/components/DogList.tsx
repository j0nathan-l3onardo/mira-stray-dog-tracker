import { DogInfo } from '../types'

interface DogListProps {
  dogs: DogInfo[]
}

export default function DogList({ dogs }: DogListProps) {
  return (
    <ul className="space-y-4 mt-4">
      {dogs.map((dog) => (
        <li key={dog.id} className="border p-4 rounded">
          {dog.name && <h3 className="font-bold">{dog.name}</h3>}
          <p>{dog.description}</p>
          <p>Location: {dog.latitude}, {dog.longitude}</p>
          {dog.imageUrl && <img src={dog.imageUrl} alt="Dog" className="w-full max-w-xs mt-2" />}
        </li>
      ))}
    </ul>
  )
}

