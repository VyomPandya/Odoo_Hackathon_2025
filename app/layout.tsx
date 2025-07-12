import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StackIt - A Minimal Q&A Forum Platform',
  description: 'StackIt is a minimal question-and-answer platform that supports collaborative learning and structured knowledge sharing.',
  keywords: 'Q&A, forum, questions, answers, community, learning, knowledge sharing',
  authors: [{ name: 'Team BitStorm' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-secondary-100">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
} 