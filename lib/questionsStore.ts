interface Answer {
  id: number;
  content: string;
  author: string;
  votes: number;
  createdAt: string;
}

interface Question {
  id: number;
  title: string;
  content: string;
  author: string;
  tags: string[];
  votes: number;
  answers: Answer[];
  views: number;
  createdAt: string;
  isAnswered: boolean;
  isBookmarked: boolean;
  acceptedAnswerId?: number;
  voters?: Array<{ user: string; vote: 'up' | 'down' }>;
}

let questions: Question[] = globalThis._questions || [
  {
    id: 1,
    title: 'How to implement authentication in Next.js with JWT?',
    content: '<p>I\'m building a Next.js application and need to implement user authentication using JWT tokens. What\'s the best approach for handling token storage and refresh?</p>',
    author: 'Sarah Chen',
    tags: ['nextjs', 'authentication', 'jwt', 'javascript'],
    votes: 24,
    answers: [
      {
        id: 1,
        content: '<p>You can use <b>httpOnly cookies</b> for storing JWTs securely. Use a refresh token mechanism for long sessions.</p>',
        author: 'Mike Johnson',
        votes: 5,
        createdAt: new Date().toISOString(),
      }
    ],
    views: 156,
    createdAt: new Date().toISOString(),
    isAnswered: true,
    isBookmarked: false
  },
  {
    id: 2,
    title: 'Best practices for state management in React applications',
    content: '<p>Should I use Redux, Zustand, or Context API? What are the pros and cons?</p>',
    author: 'Mike Johnson',
    tags: ['react', 'state-management', 'redux', 'zustand'],
    votes: 18,
    answers: [],
    views: 203,
    createdAt: new Date().toISOString(),
    isAnswered: false,
    isBookmarked: true
  }
]
let nextId = globalThis._nextId || 3

if (!globalThis._questions) {
  globalThis._questions = questions
  globalThis._nextId = nextId
}

function getNextId(): number {
  globalThis._nextId = (globalThis._nextId || 3) + 1
  return globalThis._nextId - 1
}

function addQuestion(question: Question): void {
  globalThis._questions.push(question)
}

export { questions, getNextId, addQuestion }
export type { Question, Answer } 