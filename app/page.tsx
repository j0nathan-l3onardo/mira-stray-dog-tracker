import { MainContent } from './components/MainContent'
import { MiraLogo } from './components/MiraLogo'

export default function Home() {
  return (
    <main className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mt-8 mb-4 text-center text-purple-700">Mira</h1>
      <MiraLogo />
      <p className="text-lg text-center mb-8 text-gray-600 font-light">
        Our mission is to give a voice to those that cannot speak.
      </p>
      <MainContent />
    </main>
  )
}

