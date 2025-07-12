# Odoo_Hackathon_2025
Problem Statement 2
" StackIt – A Minimal Q&A Forum Platform "
# StackIt - A Minimal Q&A Forum Platform

## 🧩 Problem Statement

**Problem Statement 2: "StackIt – A Minimal Q&A Forum Platform"**

StackIt is a minimal question-and-answer platform that supports collaborative learning and structured knowledge sharing. It's designed to be simple, user-friendly, and focused on the core experience of asking and answering questions within a community.

## 🚀 Features

### 🔐 Authentication System
- **JWT-based Authentication**: Secure token-based authentication with localStorage persistence
- **User Registration**: Custom signup with password validation and requirements
- **User Login**: Email/password authentication with session management
- **Supabase Integration**: Optional Supabase authentication for enhanced features
- **Google OAuth**: Social login integration (when Supabase is configured)

### 📝 Question Management
- **Ask Questions**: Rich text editor with Quill.js for detailed question formatting
- **Tag System**: Categorize questions with relevant tags (React, JWT, Next.js, TypeScript, etc.)
- **Question Details**: View full question content with formatted text
- **Voting System**: Upvote/downvote questions to highlight quality content
- **View Tracking**: Track question popularity through view counts

### 💬 Answer System
- **Post Answers**: Rich text editor for detailed responses
- **Answer Voting**: Community voting on answer quality
- **Accept Answers**: Question authors can mark best answers
- **Answer Sorting**: Answers displayed with voting and acceptance status

### 🔍 Search & Filtering
- **Real-time Search**: Search questions by title, content, or tags
- **Advanced Filters**: Filter by tags, answered/unanswered status
- **Tab Navigation**: Browse All, Unanswered, Answered, and Trending questions
- **Pagination**: Navigate through questions with 5 per page

### 🎨 User Interface
- **Modern Design**: Clean, responsive UI with Tailwind CSS
- **Dark Mode**: Toggle between light and dark themes with persistence
- **Mobile Responsive**: Optimized for all device sizes
- **Loading States**: Smooth loading indicators and transitions

### 👤 User Experience
- **Profile Management**: View user profile information
- **Settings Panel**: Access profile, theme toggle, and logout
- **Notifications**: Notification system with badge indicators
- **Quick Actions**: Easy access to ask questions from sidebar

### 📊 Community Features
- **Popular Tags**: Display trending tags with usage counts
- **Question Statistics**: View answer counts, votes, and timestamps
- **Time Tracking**: "Time ago" display for questions and answers
- **Author Attribution**: User initials and names on content

## 🛠️ Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Quill**: Rich text editor for questions and answers
- **React Select**: Multi-select component for tags
- **Lucide React**: Modern icon library

### Authentication
- **JWT Simple**: JWT token generation and verification
- **JS Cookie**: Cookie management for authentication
- **Supabase**: Optional backend authentication service
- **LocalStorage**: Client-side user data persistence

### Development
- **ESLint**: Code linting and quality
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VyomPandya/Odoo_Hackathon_2025.git
   cd Odoo_Hackathon_2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional for Supabase)
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Default Users
For testing, the app includes default users:
- **Email**: john@example.com | **Password**: password123
- **Email**: jane@example.com | **Password**: password123

## 📱 Usage

### For Visitors
- Browse questions without authentication
- Search and filter questions
- View question details and answers
- Sign up to participate

### For Registered Users
- Ask questions with rich text formatting
- Answer questions with detailed responses
- Vote on questions and answers
- Accept best answers for your questions
- Customize profile and settings

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   └── page.tsx           # Home page (dashboard)
├── components/            # Reusable UI components
├── contexts/              # React contexts (AuthContext)
├── lib/                   # Utility functions and configurations
│   ├── auth.ts           # Authentication logic
│   ├── questionsStore.ts # Questions data management
│   └── supabaseClient.ts # Supabase client configuration
└── public/               # Static assets
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch



## 👥 Team Name

**Team BitStorm**

## 📧 Contact Email

- 22it084@charusat.edu.in
- 22it157@charusat.edu.in  
- 22aiml002@charusat.edu.in

## 📄 License

This project is created for the Odoo Hackathon 2025.

## 🤝 Contributing

This is a hackathon project. For questions or issues, please contact the team members listed above.
