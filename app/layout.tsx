// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Providers from '../app/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextShop',
  description: 'Next.js E-commerce App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main
            className="fixed top-16 bottom-16 left-0 right-0 p-6 overflow-y-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}