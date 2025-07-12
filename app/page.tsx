'use client'

import { useState } from 'react'
import { Search, MessageCircle, Users, TrendingUp, ArrowRight, Menu, X } from 'lucide-react'

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-secondary-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  StackIt
                </h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#features" className="text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Features
                </a>
                <a href="#about" className="text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  About
                </a>
                <a href="#contact" className="text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Contact
                </a>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                <a href="/login" className="btn-outline">
                  Sign In
                </a>
                <a href="/signup" className="btn-primary">
                  Get Started
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-secondary-600 hover:text-primary-600 focus:outline-none focus:text-primary-600"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-secondary-200">
              <a href="#features" className="text-secondary-600 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">
                Features
              </a>
              <a href="#about" className="text-secondary-600 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">
                About
              </a>
              <a href="#contact" className="text-secondary-600 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">
                Contact
              </a>
              <div className="pt-4 space-y-2">
                <a href="/login" className="btn-outline block text-center">
                  Sign In
                </a>
                <a href="/signup" className="btn-primary block text-center">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
              Ask Questions.
              <span className="block text-transparent bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text">
                Get Answers.
              </span>
              <span className="block text-transparent bg-gradient-to-r from-accent-600 to-primary-600 bg-clip-text">
                Learn Together.
              </span>
            </h1>
            <p className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto">
              StackIt is a minimal question-and-answer platform that supports collaborative 
              learning and structured knowledge sharing within your community.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
                <input
                  type="text"
                  placeholder="Search questions, topics, or users..."
                  className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/signup" className="btn-primary text-lg px-8 py-3 inline-flex items-center">
                Start Asking Questions
                <ArrowRight className="ml-2" size={20} />
              </a>
              <a href="#features" className="btn-outline text-lg px-8 py-3">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
              Why Choose StackIt?
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Simple, focused, and designed for meaningful knowledge exchange
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                Structured Q&A
              </h3>
              <p className="text-secondary-600">
                Ask clear questions and get detailed answers with proper formatting and organization.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-accent-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                Community Driven
              </h3>
              <p className="text-secondary-600">
                Build a community of learners and experts who help each other grow.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-secondary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                Knowledge Growth
              </h3>
              <p className="text-secondary-600">
                Track your learning progress and discover trending topics in your field.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-bg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of learners and experts sharing knowledge on StackIt
          </p>
          <a href="/signup" className="bg-white text-primary-600 hover:bg-secondary-50 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 inline-flex items-center">
            Create Your Account
            <ArrowRight className="ml-2" size={20} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">StackIt</h3>
              <p className="text-secondary-400">
                A minimal Q&A platform for collaborative learning and knowledge sharing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-secondary-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-secondary-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-secondary-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-800 mt-8 pt-8 text-center text-secondary-400">
            <p>&copy; 2025 StackIt. Built by Team BitStorm for Odoo Hackathon 2025.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 