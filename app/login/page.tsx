'use client'

import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { authenticateUser, generateToken, setAuthToken } from '../../lib/auth'
import { useRouter } from 'next/navigation'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const user = await authenticateUser(formData.email, formData.password)
      
      if (user) {
        const token = generateToken(user)
        setAuthToken(token)
        login(user)
        router.push('/dashboard')
      } else {
        setError('Invalid email or password. Please check your credentials and try again.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred during login. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Back to Home */}
        <div className="text-center">
          <a href="/" className="inline-flex items-center text-slate-600 hover:text-blue-600 transition-colors mb-8">
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </a>
        </div>

        {/* Logo and Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            StackIt
          </h1>
          <h2 className="text-2xl font-bold text-slate-900">
            Welcome back
          </h2>
          <p className="mt-2 text-slate-600">
            Sign in to your account to continue learning
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  disabled={isLoading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-xl text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                className="flex items-center gap-3 px-5 py-3 bg-white border w-auto mx-auto"
                style={{
                  borderColor: '#d1d5db',
                  borderRadius: '24px',
                  boxShadow: '0 1px 2px rgba(60,64,67,.08), 0 1.5px 6px rgba(60,64,67,.08)',
                  fontFamily: 'Roboto, Arial, sans-serif',
                  fontWeight: 500,
                  color: '#3c4043',
                  fontSize: 16,
                  transition: 'background 0.2s',
                }}
                onMouseOver={e => (e.currentTarget.style.background = '#f7f7f7')}
                onMouseOut={e => (e.currentTarget.style.background = '#fff')}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" style={{ display: 'block' }} xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path fill="#4285F4" d="M17.64 9.2045c0-.638-.0573-1.252-.1636-1.836H9v3.481h4.844c-.2082 1.12-.8346 2.068-1.779 2.708v2.243h2.877c1.684-1.553 2.658-3.841 2.658-6.596z"/>
                    <path fill="#34A853" d="M9 18c2.43 0 4.47-.806 5.96-2.188l-2.877-2.243c-.799.535-1.82.85-3.083.85-2.37 0-4.377-1.601-5.096-3.757H1.94v2.293C3.43 16.293 6.01 18 9 18z"/>
                    <path fill="#FBBC05" d="M3.904 10.662A5.41 5.41 0 0 1 3.5 9c0-.577.099-1.137.276-1.662V5.045H1.94A8.996 8.996 0 0 0 0 9c0 1.465.354 2.85.94 4.045l2.964-2.383z"/>
                    <path fill="#EA4335" d="M9 3.579c1.32 0 2.5.454 3.43 1.346l2.572-2.572C13.47.806 11.43 0 9 0 6.01 0 3.43 1.707 1.94 4.045l2.964 2.293C4.623 6.137 6.63 3.579 9 3.579z"/>
                  </g>
                </svg>
                <span style={{ lineHeight: 1 }}>Google</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 