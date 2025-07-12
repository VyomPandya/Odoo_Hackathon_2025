import jwt from 'jwt-simple';
import Cookies from 'js-cookie';
import { supabase } from './supabaseClient';

const JWT_SECRET = 'your-super-secret-jwt-key-change-this-in-production';
const TOKEN_EXPIRY = 7 * 24 * 60 * 60; // 7 days in seconds

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface AuthToken {
  user: Omit<User, 'password'>;
  iat: number;
  exp: number;
}

function getStoredUsers(): User[] {
  if (typeof window === 'undefined') return [];
  const users = localStorage.getItem('stackit-users');
  if (users) return JSON.parse(users);
  // Default users
  return [
    { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password123' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', password: 'password123' }
  ];
}

function saveUsers(users: User[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('stackit-users', JSON.stringify(users));
}

export const generateToken = (user: User): string => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + TOKEN_EXPIRY;
  // Do not include password in the token
  const { password, ...userWithoutPassword } = user;
  return jwt.encode({ user: userWithoutPassword, iat, exp }, JWT_SECRET);
};

export const verifyToken = (token: string): AuthToken | null => {
  try {
    const decoded = jwt.decode(token, JWT_SECRET) as AuthToken;
    if (decoded.exp < Math.floor(Date.now() / 1000)) return null;
    return decoded;
  } catch {
    return null;
  }
};

export const setAuthToken = (token: string): void => {
  Cookies.set('auth-token', token, { expires: 7, secure: false, sameSite: 'lax' });
};

export const getAuthToken = (): string | undefined => {
  return Cookies.get('auth-token');
};

export const removeAuthToken = (): void => {
  Cookies.remove('auth-token');
};

export const getCurrentUser = async (): Promise<User | null> => {
  const { data, error } = await supabase.auth.getSession();
  const session = data?.session;
  if (!session || !session.user) return null;
  return {
    id: session.user.id,
    name: session.user.user_metadata?.name || '',
    email: session.user.email || '',
    password: '', // Do not expose password
  };
};

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) {
    return null;
  }
  // Fetch user profile data if you have a users table (optional)
  return {
    id: data.user.id,
    name: data.user.user_metadata?.name || '',
    email: data.user.email || '',
    password: '', // Do not expose password
  };
};

export const registerUser = async (name: string, email: string, password: string): Promise<User | null> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });
  if (error || !data.user) {
    return null;
  }
  return {
    id: data.user.id,
    name: name,
    email: data.user.email || '',
    password: '', // Do not expose password
  };
}; 