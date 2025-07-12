import { NextRequest, NextResponse } from 'next/server'
import { questions, getNextId, addQuestion, type Question } from '../../../lib/questionsStore'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const start = (page - 1) * limit
  const end = start + limit
  const paginated = questions.slice(start, end)
  return NextResponse.json({ questions: paginated, total: questions.length })
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  // Voting on a question
  if (data.vote && data.user && data.questionId) {
    const question = questions.find((q: Question) => q.id === data.questionId)
    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }
    if (!question.voters) question.voters = []
    const existing = question.voters.find((v: { user: string; vote: 'up' | 'down' }) => v.user === data.user)
    if (existing) {
      // Already voted, do not allow again
      return NextResponse.json({ error: 'Already voted' }, { status: 400 })
    }
    const voteValue = data.vote === 'up' ? 1 : -1
    question.votes = (question.votes || 0) + voteValue
    question.voters.push({ user: data.user, vote: data.vote })
    return NextResponse.json({ question })
  }
  const { title, content, tags, author } = data
  if (!title || !content || !author || !tags || !Array.isArray(tags) || tags.length === 0) {
    return NextResponse.json({ error: 'Missing fields or tags' }, { status: 400 })
  }
  const question: Question = {
    id: getNextId(),
    title,
    content,
    tags: tags || [],
    author,
    votes: 0,
    answers: [],
    views: 0,
    createdAt: new Date().toISOString(),
    isAnswered: false,
    isBookmarked: false
  }
  addQuestion(question)
  return NextResponse.json({ question })
} 