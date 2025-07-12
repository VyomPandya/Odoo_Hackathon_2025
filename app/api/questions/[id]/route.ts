import { NextRequest, NextResponse } from 'next/server'
import { questions } from '../../../../lib/questionsStore'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const question = questions.find(q => q.id === id)
  if (!question) {
    return NextResponse.json({ error: 'Question not found' }, { status: 404 })
  }
  // Increment views if requested
  const { searchParams } = new URL(req.url)
  if (searchParams.get('incrementViews') === '1') {
    question.views = (question.views || 0) + 1
  }
  return NextResponse.json({ question })
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const question = questions.find(q => q.id === id)
  if (!question) {
    return NextResponse.json({ error: 'Question not found' }, { status: 404 })
  }
  const data = await req.json()
  if (data.vote && data.answerId) {
    // Voting on an answer
    const answer = question.answers.find((a: any) => a.id === data.answerId)
    if (!answer) {
      return NextResponse.json({ error: 'Answer not found' }, { status: 404 })
    }
    if (data.vote === 'up') answer.votes = (answer.votes || 0) + 1
    if (data.vote === 'down') answer.votes = (answer.votes || 0) - 1
    return NextResponse.json({ answer })
  }
  if (data.accept && data.answerId) {
    // Accepting an answer
    question.acceptedAnswerId = data.answerId
    return NextResponse.json({ question })
  }
  const { content, author } = data
  if (!content || !author) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }
  const answer = {
    id: question.answers.length + 1,
    content,
    author,
    votes: 0,
    createdAt: new Date().toISOString(),
  }
  question.answers.push(answer)
  question.isAnswered = true
  return NextResponse.json({ answer })
} 