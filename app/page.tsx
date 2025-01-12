import DogForm from './components/DogForm'
import { DogList } from './components/DogList'
import { DogMap } from './components/DogMap'

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

