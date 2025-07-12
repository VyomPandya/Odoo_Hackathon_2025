'use client'

import { useState } from 'react'
import { 
  Search, 
  Plus, 
  MessageCircle, 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Bookmark,
  User,
  Clock,
  Tag,
  Filter,
  TrendingUp,
  Bell,
  Settings
} from 'lucide-react'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const mockQuestions = [
    {
      id: 1,
      title: "How to implement authentication in Next.js with JWT?",
      content: "I'm building a Next.js application and need to implement user authentication using JWT tokens. What's the best approach for handling token storage and refresh?",
      author: "Sarah Chen",
      authorAvatar: "SC",
      tags: ["nextjs", "authentication", "jwt", "javascript"],
      votes: 24,
      answers: 8,
      views: 156,
      timeAgo: "2 hours ago",
      isAnswered: true,
      isBookmarked: false
    },
    {
      id: 2,
      title: "Best practices for state management in React applications",
      content: "I'm working on a large React application and struggling with state management. Should I use Redux, Zustand, or Context API? What are the pros and cons?",
      author: "Mike Johnson",
      authorAvatar: "MJ",
      tags: ["react", "state-management", "redux", "zustand"],
      votes: 18,
      answers: 12,
      views: 203,
      timeAgo: "5 hours ago",
      isAnswered: false,
      isBookmarked: true
    },
    {
      id: 3,
      title: "Understanding TypeScript generics with practical examples",
      content: "Can someone explain TypeScript generics with real-world examples? I understand the basic syntax but struggle with practical applications.",
      author: "Alex Rodriguez",
      authorAvatar: "AR",
      tags: ["typescript", "generics", "programming"],
      votes: 31,
      answers: 15,
      views: 342,
      timeAgo: "1 day ago",
      isAnswered: true,
      isBookmarked: false
    }
  ]

  const tabs = [
    { id: 'all', label: 'All Questions', count: 156 },
    { id: 'unanswered', label: 'Unanswered', count: 23 },
    { id: 'answered', label: 'Answered', count: 133 },
    { id: 'trending', label: 'Trending', count: 8 }
  ]

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <header className="bg-white border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                StackIt
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-secondary-600 hover:text-primary-600 transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="p-2 text-secondary-600 hover:text-primary-600 transition-colors">
                <Settings size={20} />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User size={16} className="text-primary-600" />
                </div>
                <span className="text-sm font-medium text-secondary-700">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="btn-primary w-full flex items-center justify-center">
                  <Plus className="mr-2" size={16} />
                  Ask Question
                </button>
                <button className="btn-outline w-full flex items-center justify-center">
                  <TrendingUp className="mr-2" size={16} />
                  View Trends
                </button>
              </div>
            </div>

            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Popular Tags</h3>
              <div className="space-y-2">
                {['javascript', 'react', 'python', 'nodejs', 'typescript'].map((tag) => (
                  <div key={tag} className="flex items-center justify-between">
                    <span className="text-sm text-secondary-600">#{tag}</span>
                    <span className="text-xs bg-secondary-100 text-secondary-600 px-2 py-1 rounded">
                      {Math.floor(Math.random() * 100) + 10}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="card mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
                <button className="btn-outline flex items-center justify-center">
                  <Filter className="mr-2" size={16} />
                  Filters
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-white rounded-lg p-1 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-600 hover:text-secondary-900'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 text-xs bg-secondary-100 text-secondary-600 px-2 py-1 rounded">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {mockQuestions.map((question) => (
                <div key={question.id} className="card hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    {/* Vote Section */}
                    <div className="flex flex-col items-center space-y-2">
                      <button className="p-1 text-secondary-400 hover:text-primary-600 transition-colors">
                        <ThumbsUp size={16} />
                      </button>
                      <span className="text-sm font-medium text-secondary-900">{question.votes}</span>
                      <button className="p-1 text-secondary-400 hover:text-secondary-600 transition-colors">
                        <ThumbsDown size={16} />
                      </button>
                    </div>

                    {/* Question Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-secondary-900 hover:text-primary-600 cursor-pointer">
                          {question.title}
                        </h3>
                        <button className="p-1 text-secondary-400 hover:text-primary-600 transition-colors">
                          <Bookmark size={16} className={question.isBookmarked ? 'fill-current' : ''} />
                        </button>
                      </div>
                      
                      <p className="text-secondary-600 text-sm mb-3 line-clamp-2">
                        {question.content}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {question.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-md hover:bg-primary-100 cursor-pointer transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Meta Information */}
                      <div className="flex items-center justify-between text-sm text-secondary-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <div className="w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-secondary-600">
                                {question.authorAvatar}
                              </span>
                            </div>
                            <span className="text-secondary-700">{question.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock size={14} />
                            <span>{question.timeAgo}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <MessageCircle size={14} />
                            <span>{question.answers} answers</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span>{question.views} views</span>
                          </div>
                          {question.isAnswered && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md">
                              Answered
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="btn-outline">
                Load More Questions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 