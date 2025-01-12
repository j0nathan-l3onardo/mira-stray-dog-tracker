'use client'

import dynamic from 'next/dynamic'
import { DogForm } from './DogForm'
import { DogList } from './DogList'

const DogMap = dynamic(() => import('./DogMap').then(mod => mod.DogMap), {
  ssr: false,
  loading: () => <div>Loading map...</div>
})

export function MainContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <DogForm />
        <DogList />
      </div>
      <DogMap />
    </div>
  )
}

