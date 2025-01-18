import { MainContent } from './components/MainContent'

export default function Home() {
  return (
    <main className="container mx-auto p-4 flex flex-col items-center">
      <div className="flex flex-col items-center mt-8 mb-8">
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mira%20SVG%20logo-vyH3WWJZmpWqkBwPBGV8XIDbSptDdb.svg" 
          alt="Mira Logo" 
          className="w-16 h-16 mb-2" // Resized to 64x64 pixels
        />
        <h1 className="text-4xl font-bold text-center text-primary">mira</h1>
        <p className="text-lg text-center mt-2 text-base-content font-light">
          Our mission is to give a voice to those that cannot speak.
        </p>
      </div>
      <MainContent />
    </main>
  )
}
