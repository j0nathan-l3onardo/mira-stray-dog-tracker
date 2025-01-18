import ReportForm from './components/ReportForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-7xl py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Help Stray Dogs Find Their Way Home
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Report stray dogs in your area and help us create a safer environment for our furry friends.
            </p>
          </div>
        </div>
      </section>

      {/* Report Form Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-12">
              Report a Stray Dog
            </h2>
            <ReportForm />
          </div>
        </div>
      </section>
    </main>
  )
} 