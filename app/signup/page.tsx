'use client'

import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Check } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { registerUser, generateToken, setAuthToken } from '../../lib/auth'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    // Validate password requirements
    const passwordRequirements = [
      formData.password.length >= 8,
      /[A-Z]/.test(formData.password),
      /[a-z]/.test(formData.password),
      /\d/.test(formData.password),
    ]

    if (!passwordRequirements.every(req => req)) {
      setError('Password does not meet requirements')
      setIsLoading(false)
      return
    }

    try {
      const user = await registerUser(formData.name, formData.email, formData.password)
      
      if (user) {
        const token = generateToken(user)
        setAuthToken(token)
        login(user)
        router.push('/dashboard')
      } else {
        setError('Email already exists or registration failed. Please use a different email or try logging in.')
      }
    } catch (err) {
      console.error('Registration error:', err)
      setError('An error occurred during registration. Please try again.')
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

  const passwordRequirements = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(formData.password) },
    { label: 'One lowercase letter', met: /[a-z]/.test(formData.password) },
    { label: 'One number', met: /\d/.test(formData.password) },
  ]

  // Add Google sign-in handler
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) {
        setError('Google sign-in failed. Please try again.');
      }
      // On success, Supabase will redirect automatically
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
            Create your account
          </h2>
          <p className="mt-2 text-slate-600">
            Join the community and start learning together
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                  disabled={isLoading}
                />
              </div>
            </div>

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
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Create a password"
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
              
              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-3 p-3 bg-slate-50 rounded-lg space-y-2">
                  <p className="text-sm font-medium text-slate-700 mb-2">Password requirements:</p>
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <Check 
                        className={`mr-2 ${req.met ? 'text-green-500' : 'text-slate-300'}`} 
                        size={16} 
                      />
                      <span className={req.met ? 'text-green-600' : 'text-slate-500'}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-slate-300'
                  }`}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
              )}
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded mt-1"
                disabled={isLoading}
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-slate-700">
                I agree to the{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-xl text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
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
                type="button"
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
                onClick={handleGoogleSignIn}
                onMouseOver={e => (e.currentTarget.style.background = '#f7f7f7')}
                onMouseOut={e => (e.currentTarget.style.background = '#fff')}
                disabled={isLoading}
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
              Already have an account?{' '}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 