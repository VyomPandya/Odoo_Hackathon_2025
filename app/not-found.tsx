'use client'

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-50 to-secondary-100">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">
            Page Not Found
          </h2>
          <p className="text-secondary-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link 
            href="/"
            className="btn-primary inline-flex items-center"
          >
            <Home className="mr-2" size={20} />
            Go Home
          </Link>
          
          <div>
            <button 
              onClick={handleGoBack}
              className="btn-outline inline-flex items-center"
            >
              <ArrowLeft className="mr-2" size={20} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 