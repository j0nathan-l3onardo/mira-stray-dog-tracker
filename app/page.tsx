import DogForm from './components/DogForm'
import DogMap from './components/DogMap'
import DogList from './components/DogList'
import { DogInfo } from './types'

async function getDogs(): Promise<DogInfo[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dogs`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch dogs')
  }
  return res.json()
}

export default async function Home() {
  const dogs = await getDogs()

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">MIRA - Stray Dog Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <DogForm />
          <DogList dogs={dogs} />
        </div>
        <DogMap dogs={dogs} />
      </div>
    </main>
  )
}

