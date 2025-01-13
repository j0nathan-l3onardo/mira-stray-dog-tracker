import '../styles/globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Mira - Stray Dog Tracker',
  description: 'Help stray dogs in need by reporting their location and condition.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${roboto.className} flex flex-col items-center min-h-screen bg-base-100`}>
        {children}
      </body>
    </html>
  )
}

