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
  Settings,
  Eye,
  CheckCircle,
  XCircle
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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">
                StackIt
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="p-2 text-slate-600 hover:text-blue-600 transition-colors">
                <Settings size={20} />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User size={16} className="text-blue-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center">
                  <Plus className="mr-2" size={16} />
                  Ask Question
                </button>
                <button className="w-full border border-slate-300 hover:border-slate-400 text-slate-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center">
                  <TrendingUp className="mr-2" size={16} />
                  View Trends
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Popular Tags</h3>
              <div className="space-y-3">
                {['javascript', 'react', 'python', 'nodejs', 'typescript'].map((tag) => (
                  <div key={tag} className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">#{tag}</span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
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
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                <button className="border border-slate-300 hover:border-slate-400 text-slate-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center">
                  <Filter className="mr-2" size={16} />
                  Filters
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-white rounded-xl p-1 mb-6 shadow-sm border border-slate-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {mockQuestions.map((question) => (
                <div key={question.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex gap-6">
                    {/* Vote Section */}
                    <div className="flex flex-col items-center space-y-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
                        <ThumbsUp size={18} />
                      </button>
                      <span className="text-sm font-semibold text-slate-900">{question.votes}</span>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-50">
                        <ThumbsDown size={18} />
                      </button>
                    </div>

                    {/* Question Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-slate-900 hover:text-blue-600 cursor-pointer">
                          {question.title}
                        </h3>
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
                          <Bookmark size={18} className={question.isBookmarked ? 'fill-current' : ''} />
                        </button>
                      </div>
                      
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {question.content}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {question.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg hover:bg-blue-100 cursor-pointer transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Meta Information */}
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-slate-600">
                                {question.authorAvatar}
                              </span>
                            </div>
                            <span className="text-slate-700">{question.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock size={14} />
                            <span>{question.timeAgo}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye size={14} />
                            <span>{question.views} views</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-1">
                            <MessageCircle size={14} />
                            <span>{question.answers} answers</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {question.isAnswered ? (
                              <CheckCircle size={14} className="text-green-500" />
                            ) : (
                              <XCircle size={14} className="text-slate-400" />
                            )}
                            <span className={question.isAnswered ? 'text-green-600' : 'text-slate-500'}>
                              {question.isAnswered ? 'Answered' : 'Unanswered'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="border border-slate-300 hover:border-slate-400 text-slate-700 font-medium py-3 px-6 rounded-xl transition-colors">
                Load More Questions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 