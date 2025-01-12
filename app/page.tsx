import { Suspense } from 'react'
import DogForm from './components/DogForm'
import DogMap from './components/DogMap'
import DogList from './components/DogList'
import { DogInfo } from './types'

async function getDogs(): Promise<DogInfo[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dogs`, { cache: 'no-store' })
    if (!res.ok) {
      throw new Error(`Failed to fetch dogs: ${res.status}`)
    }
    return res.json()
  } catch (error) {
    console.error('Error fetching dogs:', error)
    return []
  }
}

export default async function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">MIRA - Stray Dog Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <DogForm />
          <Suspense fallback={<div>Loading dogs...</div>}>
            <DogListWrapper />
          </Suspense>
        </div>
        <Suspense fallback={<div>Loading map...</div>}>
          <DogMapWrapper />
        </Suspense>
      </div>
    </main>
  )
}

async function DogListWrapper() {
  const dogs = await getDogs()
  return <DogList dogs={dogs} />
}

async function DogMapWrapper() {
  const dogs = await getDogs()
  return <DogMap dogs={dogs} />
}

