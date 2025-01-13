import { MainContent } from './components/MainContent'
import { MiraLogo } from './components/MiraLogo'

export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block text-primary-600 xl:inline">Mira</span>
          </h1>
          <div className="mt-6 flex justify-center">
            <MiraLogo />
          </div>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Our mission is to give a voice to those that cannot speak.
          </p>
        </div>
        <div className="mt-10">
          <MainContent />
        </div>
      </div>
    </main>
  )
}

