export interface User {
  id: string;
  fullName: string | null;
  email: string | null;
  imageUrl: string | null;
  role?: 'admin' | 'user'; // Example roles, can be expanded
  createdAt?: number;
}

export interface AuthSession {
  token: string | null;
  // Other session properties can be added here
}

export interface AuthService {
  user: User | null;
  session: AuthSession | null;
  isSignedIn: boolean;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  // getCurrentUser and getSession are implicitly handled by the hook's state
}
