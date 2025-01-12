import dynamic from 'next/dynamic'
import { DogForm } from './components/DogForm'
import { DogList } from './components/DogList'

const DogMap = dynamic(() => import('./components/DogMap').then(mod => mod.DogMap), {
  ssr: false,
  loading: () => <div>Loading map...</div>
})

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">MIRA - Stray Dog Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <DogForm />
          <DogList />
        </div>
        <DogMap />
      </div>
    </main>
  )
}

