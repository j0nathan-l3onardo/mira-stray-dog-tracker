'use client'

import dynamic from 'next/dynamic'
import { DogForm } from './DogForm'
import { DogList } from './DogList'

// Dynamically import DogMap with SSR disabled
const DogMap = dynamic(
  () => import('./DogMap').then((mod) => mod.DogMap),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-96 bg-gray-50">
        <div className="text-sm text-gray-500">Loading map...</div>
      </div>
    )
  }
)

export function MainContent() {
  return (
    <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Report a Stray Dog</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Fill out this form to report a stray dog in need of assistance.</p>
          </div>
          <div className="mt-5">
            <DogForm />
          </div>
        </div>
      </div>
      <div className="space-y-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Reported Dogs</h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>List of recently reported stray dogs.</p>
            </div>
            <div className="mt-5">
              <DogList />
            </div>
          </div>
        </div>
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Dog Locations</h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Map showing the locations of reported stray dogs.</p>
            </div>
            <div className="mt-5 h-96">
              <DogMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

