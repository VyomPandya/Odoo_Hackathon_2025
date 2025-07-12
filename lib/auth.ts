import jwt from 'jwt-simple';
import Cookies from 'js-cookie';

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

export const getCurrentUser = (): User | null => {
  const token = getAuthToken();
  if (!token) return null;
  
  const decoded = verifyToken(token);
  if (!decoded?.user) return null;
  // Find the user in storage to get the password (if needed)
  const users = getStoredUsers();
  const user = users.find(u => u.email === decoded.user.email);
  return user || null;
};

export const authenticateUser = (email: string, password: string): User | null => {
  const users = getStoredUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    return user;
  }
  return null;
};

export const registerUser = (name: string, email: string, password: string): User | null => {
  const users = getStoredUsers();
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return null;
  }
  const newUser: User = {
    id: (users.length + 1).toString(),
    name,
    email,
    password
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}; 