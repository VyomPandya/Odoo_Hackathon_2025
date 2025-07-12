'use client'

import { useState, useEffect } from 'react'
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
  XCircle,
  LogOut,
  Moon,
  Sun
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Select from 'react-select'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import { Fragment } from 'react';

// Force dynamic rendering for this page
export const dynamicFlag = 'force-dynamic'

// Move ReactQuill definition outside the component to avoid re-creation
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

function Spinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [questions, setQuestions] = useState<any[]>([])
  const [showAskModal, setShowAskModal] = useState(false)
  const [askForm, setAskForm] = useState({ title: '', content: '', tags: [] as any[] })
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null)
  const [questionDetails, setQuestionDetails] = useState<any>(null)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [limit] = useState(5)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [filterAnswered, setFilterAnswered] = useState<'all' | 'answered' | 'unanswered'>('all');
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('stackit-dark');
    if (stored === 'true') {
      setDarkMode(true);
    } else if (stored === 'false') {
      setDarkMode(false);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('stackit-dark', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('stackit-dark', 'false');
    }
  }, [darkMode]);

  const tagOptions = [
    { value: 'react', label: 'React' },
    { value: 'jwt', label: 'JWT' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'authentication', label: 'Authentication' },
    { value: 'redux', label: 'Redux' },
    { value: 'zustand', label: 'Zustand' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
  ]

  useEffect(() => {
    setLoading(true)
    setError('')
    fetch(`/api/questions?page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.questions || [])
        setTotal(data.total || 0)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load questions.')
        setLoading(false)
      })
  }, [page, limit])

  const handleAskChange = (e: any) => {
    setAskForm({ ...askForm, [e.target.name]: e.target.value })
  }
  const handleQuillChange = (value: string) => {
    setAskForm({ ...askForm, content: value })
  }
  const handleTagsChange = (selected: any) => {
    setAskForm({ ...askForm, tags: selected })
  }

  const handleAskSubmit = async (e: any) => {
    e.preventDefault()
    if (!user) {
      setShowAskModal(false);
      router.push('/login');
      return;
    }
    if (!askForm.tags || askForm.tags.length === 0) {
      alert('Please select at least one tag.')
      return
    }
    const res = await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: askForm.title,
        content: askForm.content,
        tags: askForm.tags.map((t: any) => t.value),
        author: user.name || 'User',
      })
    })
    if (res.ok) {
      setAskForm({ title: '', content: '', tags: [] })
      setShowAskModal(false)
      fetch('/api/questions')
        .then(res => res.json())
        .then(data => setQuestions(data.questions || []))
    }
  }

  const handleOpenQuestion = async (questionId: number) => {
    setShowQuestionModal(true)
    setLoadingDetails(true)
    setSelectedQuestion(questionId)
    await fetch(`/api/questions/${questionId}?incrementViews=1`)
    const res = await fetch(`/api/questions/${questionId}`)
    const data = await res.json()
    setQuestionDetails(data.question)
    setLoadingDetails(false)
  }
  const handleCloseQuestion = () => {
    setShowQuestionModal(false)
    setSelectedQuestion(null)
    setQuestionDetails(null)
  }

  function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }
  function timeAgo(dateString: string) {
    const now = new Date()
    const date = new Date(dateString)
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }

  const tabs = [
    { id: 'all', label: 'All Questions' },
    { id: 'unanswered', label: 'Unanswered' },
    { id: 'answered', label: 'Answered' },
    { id: 'trending', label: 'Trending' }
  ]

  const [answerContent, setAnswerContent] = useState('')
  const [submittingAnswer, setSubmittingAnswer] = useState(false)

  const handleAnswerSubmit = async (e: any) => {
    e.preventDefault()
    if (!user || !selectedQuestion) {
      router.push('/login');
      return;
    }
    setSubmittingAnswer(true)
    const res = await fetch(`/api/questions/${selectedQuestion}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: answerContent,
        author: user.name || 'User',
      })
    })
    if (res.ok) {
      setAnswerContent('')
      const res2 = await fetch(`/api/questions/${selectedQuestion}`)
      const data2 = await res2.json()
      setQuestionDetails(data2.question)
    }
    setSubmittingAnswer(false)
  }

  const handleVoteAnswer = async (answerId: number, vote: 'up' | 'down') => {
    if (!selectedQuestion) return
    await fetch(`/api/questions/${selectedQuestion}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vote, answerId })
    })
    const res2 = await fetch(`/api/questions/${selectedQuestion}`)
    const data2 = await res2.json()
    setQuestionDetails(data2.question)
  }

  const handleAcceptAnswer = async (answerId: number) => {
    if (!selectedQuestion) return
    await fetch(`/api/questions/${selectedQuestion}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accept: true, answerId })
    })
    const res2 = await fetch(`/api/questions/${selectedQuestion}`)
    const data2 = await res2.json()
    setQuestionDetails(data2.question)
  }

  const handleVoteQuestion = async (questionId: number, vote: 'up' | 'down') => {
    if (!user) return
    await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vote, user: user.name, questionId })
    })
    fetch('/api/questions')
      .then(res => res.json())
      .then(data => setQuestions(data.questions || []))
  }

  const tagCounts: Record<string, number> = {}
  questions.forEach(q => {
    (q.tags || []).forEach((tag: string) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const hasVoted = (question: any) => question.voters && user && question.voters.some((v: any) => v.user === user.name)

  const filteredQuestions = questions.filter((q) => {
    if (activeTab === 'unanswered' && (q.isAnswered || (q.answers && q.answers.length > 0))) return false;
    if (activeTab === 'answered' && (!q.isAnswered && (!q.answers || q.answers.length === 0))) return false;
    if (activeTab === 'trending' && q.votes <= 10) return false;
    const query = searchQuery.trim().toLowerCase();
    if (query && !(
      q.title.toLowerCase().includes(query) ||
      q.content.toLowerCase().includes(query) ||
      (q.tags && q.tags.some((tag: string) => tag.toLowerCase().includes(query)))
    )) return false;
    if (filterTag && !(q.tags && q.tags.includes(filterTag))) return false;
    if (filterAnswered === 'answered' && !(q.isAnswered || (q.answers && q.answers.length > 0))) return false;
    if (filterAnswered === 'unanswered' && (q.isAnswered || (q.answers && q.answers.length > 0))) return false;
    return true;
  });

  const handleSearch = () => {
    setPage(1);
  };
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <>
      <div className={"min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300"}>
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  StackIt
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <button className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setShowNotifications((v) => !v)}>
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      3
                    </span>
                  </button>
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50 p-4">
                      <h4 className="font-semibold mb-2 dark:text-white">Notifications</h4>
                      <ul className="text-sm text-slate-700 dark:text-slate-200 space-y-2">
                        <li>You have 3 new answers.</li>
                        <li>Your question was upvoted!</li>
                        <li>Welcome to StackIt!</li>
                      </ul>
                      <button className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:underline" onClick={() => setShowNotifications(false)}>Close</button>
                    </div>
                  )}
                </div>
                {/* Settings */}
                <div className="relative">
                  <button className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setShowSettings((v) => !v)}>
                    <Settings size={20} />
                  </button>
                  {showSettings && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50 p-4">
                      <h4 className="font-semibold mb-2 dark:text-white">Settings</h4>
                      <ul className="text-sm text-slate-700 dark:text-slate-200 space-y-2">
                        <li><button className="hover:underline w-full text-left" onClick={() => { setShowProfile(true); setShowSettings(false); }}>Profile</button></li>
                        <li><button className="hover:underline w-full text-left" onClick={() => { setDarkMode((d) => !d); setShowSettings(false); }}>Theme: {darkMode ? 'Dark' : 'Light'}</button></li>
                        <li><button className="hover:underline w-full text-left" onClick={logout}>Logout</button></li>
                      </ul>
                      <button className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:underline" onClick={() => setShowSettings(false)}>Close</button>
                    </div>
                  )}
                </div>
                {/* User Info */}
                {user ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <User size={16} className="text-blue-600 dark:text-blue-300" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{user?.name || 'User'}</span>
                  </div>
                ) : (
                  <a href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Login</a>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Profile Modal */}
        {showProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg w-full max-w-xs mx-auto">
              <h4 className="font-semibold mb-4 dark:text-white">Profile</h4>
              <div className="mb-2 text-slate-700 dark:text-slate-200"><b>Name:</b> {user?.name}</div>
              <div className="mb-2 text-slate-700 dark:text-slate-200"><b>Email:</b> {user?.email}</div>
              <div className="flex justify-end mt-4">
                <button className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded" onClick={() => setShowProfile(false)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Main Layout */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 lg:gap-8">
            {/* Sidebar */}
            <div className="w-full mb-4 lg:mb-0 lg:col-span-1">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button onClick={() => user ? setShowAskModal(true) : router.push('/login')} className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center">
                    <Plus className="mr-2" size={16} />
                    Ask Question
                  </button>
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mt-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Popular Tags</h3>
                <div className="space-y-3">
                  {popularTags.map(([tag, count]) => (
                    <div key={tag} className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-200">#{tag}</span>
                      <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 px-2 py-1 rounded-lg">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full lg:col-span-3">
              {/* Search and Filters */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-300 cursor-pointer" size={20} onClick={handleSearch} />
                    <input
                      type="text"
                      placeholder="Search questions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                  <button type="button" className="border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 dark:text-slate-200 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center" onClick={() => setShowFilterModal(true)}>
                    <Filter className="mr-2" size={16} />
                    Filters
                  </button>
                </div>
              </div>

              {/* Filter Modal */}
              {showFilterModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg w-full max-w-xs mx-auto">
                    <h4 className="font-semibold mb-4 dark:text-white">Filter Questions</h4>
                    <div className="mb-3">
                      <label className="block text-sm mb-1 dark:text-slate-200">By Tag</label>
                      <select className="w-full border rounded p-2 dark:bg-slate-900 dark:text-white dark:border-slate-700" value={filterTag || ''} onChange={e => setFilterTag(e.target.value || null)}>
                        <option value="">All</option>
                        {Object.keys(tagCounts).map(tag => (
                          <option key={tag} value={tag}>{tag}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm mb-1 dark:text-slate-200">Answered Status</label>
                      <select className="w-full border rounded p-2 dark:bg-slate-900 dark:text-white dark:border-slate-700" value={filterAnswered} onChange={e => setFilterAnswered(e.target.value as any)}>
                        <option value="all">All</option>
                        <option value="answered">Answered</option>
                        <option value="unanswered">Unanswered</option>
                      </select>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <button className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded" onClick={() => setShowFilterModal(false)}>Close</button>
                      <button className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded" onClick={() => setShowFilterModal(false)}>Apply</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tabs */}
              <div className="flex space-x-1 bg-white dark:bg-slate-800 rounded-xl p-1 mb-6 shadow-sm border border-slate-200 dark:border-slate-700">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Questions List */}
              {loading ? (
                <Spinner />
              ) : error ? (
                <div className="text-center text-red-500 py-10">{error}</div>
              ) : (
                <div className="space-y-4">
                  {filteredQuestions.map((question) => (
                    <div key={question.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6 hover:shadow-md transition-shadow w-full">
                      <div className="flex gap-6">
                        {/* Vote Section */}
                        <div className="flex flex-col items-center space-y-2">
                          <button
                            className={`p-2 ${hasVoted(question) ? 'text-blue-400' : 'text-slate-400'} hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900`}
                            onClick={() => handleVoteQuestion(question.id, 'up')}
                            disabled={hasVoted(question)}
                          >
                            <ThumbsUp size={18} />
                          </button>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">{question.votes}</span>
                          <button
                            className={`p-2 ${hasVoted(question) ? 'text-red-400' : 'text-slate-400'} hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700`}
                            onClick={() => handleVoteQuestion(question.id, 'down')}
                            disabled={hasVoted(question)}
                          >
                            <ThumbsDown size={18} />
                          </button>
                        </div>

                        {/* Question Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3
                              className="text-lg font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                              onClick={() => handleOpenQuestion(question.id)}
                            >
                              {question.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              {question.isAnswered ? (
                                <CheckCircle className="text-green-500" size={20} />
                              ) : (
                                <XCircle className="text-slate-400" size={20} />
                              )}
                            </div>
                          </div>
                          
                          <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: question.content }} />

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                              <div className="flex items-center space-x-1">
                                <MessageCircle size={16} />
                                <span>{question.answers?.length || 0} answers</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye size={16} />
                                <span>{question.views || 0} views</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock size={16} />
                                <span>{timeAgo(question.createdAt)}</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900">
                                <Bookmark size={16} />
                              </button>
                              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700">
                                <Share2 size={16} />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                <span className="text-xs font-medium text-blue-600 dark:text-blue-300">{getInitials(question.author)}</span>
                              </div>
                              <span className="text-sm text-slate-600 dark:text-slate-200">{question.author}</span>
                            </div>

                            <div className="flex items-center space-x-2">
                              {question.tags.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 text-xs rounded-lg flex items-center"
                                >
                                  <Tag size={12} className="mr-1" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      {total > limit && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button onClick={() => setPage(page - 1)} disabled={page === 1} className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-700 disabled:opacity-50">Prev</button>
          {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => setPage(page + 1)} disabled={page === Math.ceil(total / limit)} className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-700 disabled:opacity-50">Next</button>
        </div>
      )}

      {/* Ask Question Modal */}
      {showAskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 overflow-auto p-2 sm:p-0">
          <form onSubmit={handleAskSubmit} className="bg-white dark:bg-slate-800 p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Ask a Question</h2>
            <input name="title" value={askForm.title} onChange={handleAskChange} placeholder="Title" className="w-full mb-3 p-2 border rounded bg-white text-slate-900 border-slate-300" required />
            <div className="mb-3">
              <div className="quill-white-bg">
                <ReactQuill value={askForm.content} onChange={handleQuillChange} theme="snow" placeholder="Description" />
              </div>
            </div>
            <div className="mb-3">
              <Select
                isMulti
                name="tags"
                options={tagOptions}
                value={askForm.tags}
                onChange={handleTagsChange}
                placeholder="Select tags..."
                classNamePrefix="select-white-bg"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowAskModal(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded">Submit</button>
            </div>
          </form>
        </div>
      )}

      {/* Question Details Modal */}
      {showQuestionModal && questionDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 overflow-auto p-2 sm:p-0">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-2xl relative">
            <button onClick={handleCloseQuestion} className="absolute top-2 right-2 text-slate-400 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white">✕</button>
            <h2 className="text-2xl font-bold mb-2 dark:text-white">{questionDetails.title}</h2>
            <div className="mb-2 flex flex-wrap gap-2">
              {questionDetails.tags.map((tag: string) => (
                <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 text-xs rounded-lg flex items-center">
                  <Tag size={12} className="mr-1" />{tag}
                </span>
              ))}
            </div>
            <div className="mb-4">
              <ReactQuill value={questionDetails.content} readOnly theme="bubble" />
            </div>
            <div className="mb-4 text-sm text-slate-500 dark:text-slate-400">Asked by {questionDetails.author} on {new Date(questionDetails.createdAt).toLocaleString()}</div>
            <hr className="my-4" />
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Answers</h3>
            {questionDetails.answers && questionDetails.answers.length > 0 ? (
              <div className="space-y-4">
                {questionDetails.answers.map((answer: any) => (
                  <div key={answer.id} className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center mb-2 gap-2">
                      <button type="button" onClick={() => handleVoteAnswer(answer.id, 'up')} className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"><ThumbsUp size={16} /></button>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{answer.votes || 0}</span>
                      <button type="button" onClick={() => handleVoteAnswer(answer.id, 'down')} className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400"><ThumbsDown size={16} /></button>
                      {questionDetails.acceptedAnswerId === answer.id && <CheckCircle className="text-green-500 ml-2" size={18} />}
                      {user && user.name === questionDetails.author && questionDetails.acceptedAnswerId !== answer.id && (
                        <button type="button" onClick={() => handleAcceptAnswer(answer.id)} className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Accept</button>
                      )}
                    </div>
                    <ReactQuill value={answer.content} readOnly theme="bubble" />
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">By {answer.author} on {new Date(answer.createdAt).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-400 dark:text-slate-500">No answers yet.</div>
            )}
            {user ? (
              <form onSubmit={handleAnswerSubmit} className="mt-6">
                <h4 className="font-semibold mb-2 dark:text-white">Your Answer</h4>
                <ReactQuill value={answerContent} onChange={setAnswerContent} theme="snow" placeholder="Write your answer..." />
                <div className="flex justify-end mt-2">
                  <button type="submit" className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded" disabled={submittingAnswer || !answerContent.trim()}>
                    {submittingAnswer ? 'Submitting...' : 'Submit Answer'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-6 text-center">
                <a href="/login" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Sign in to answer</a>
              </div>
            )}
          </div>
        </div>
      )}
      <style jsx global>{`
        .quill-white-bg .ql-toolbar {
          background: #fff !important;
          color: #1e293b !important;
          border-radius: 0.5rem 0.5rem 0 0;
        }
        .quill-white-bg .ql-toolbar button,
        .quill-white-bg .ql-toolbar .ql-picker-label,
        .quill-white-bg .ql-toolbar .ql-picker-item {
          color: #1e293b !important;
          fill: #1e293b !important;
          opacity: 1 !important;
        }
        .quill-white-bg .ql-toolbar button:hover,
        .quill-white-bg .ql-toolbar .ql-picker-label:hover,
        .quill-white-bg .ql-toolbar .ql-picker-item:hover {
          color: #2563eb !important;
          fill: #2563eb !important;
        }
        .quill-white-bg .ql-container {
          background: #fff !important;
          color: #1e293b !important;
          border-radius: 0 0 0.5rem 0.5rem;
        }
        .quill-white-bg .ql-editor {
          background: #fff !important;
          color: #1e293b !important;
          min-height: 120px;
          border-radius: 0.5rem;
        }
        .select-white-bg__control {
          background: #fff !important;
          color: #1e293b !important;
          border-radius: 0.5rem;
        }
        .select-white-bg__menu {
          background: #fff !important;
          color: #1e293b !important;
        }
      `}</style>
    </>
  )
} 