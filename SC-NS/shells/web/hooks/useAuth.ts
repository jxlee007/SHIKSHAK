import { useClerk, useUser } from '@clerk/nextjs';
import { useCallback } from 'react';
import type { AuthService, User, AuthSession } from '../lib/authInterface';

export const useAuth = (): AuthService => {
  const { user: clerkUser, isLoaded, isSignedIn } = useUser();
  const { signOut: clerkSignOut, openSignIn } = useClerk();

  const user: User | null = clerkUser
    ? {
        id: clerkUser.id,
        fullName: clerkUser.fullName,
        email: clerkUser.primaryEmailAddress?.emailAddress ?? null,
        imageUrl: clerkUser.imageUrl,
        createdAt: clerkUser.createdAt?.getTime(),
        // Clerk's user object doesn't have a 'role' by default.
        // This would be loaded from public or private metadata.
        // For now, we'll leave it undefined.
        role: (clerkUser.publicMetadata?.role as 'admin' | 'user') || undefined,
      }
    : null;

  // This is a simplified session object. Clerk's session management is more complex.
  // We can expand this later if needed. For now, we just need a placeholder.
  const session: AuthSession | null = isSignedIn
    ? { token: 'dummy-token-for-now' } // Clerk's session token is managed internally by the SDK
    : null;

  const signIn = useCallback(async () => {
    openSignIn();
  }, [openSignIn]);

  const signOut = useCallback(async () => {
    await clerkSignOut();
  }, [clerkSignOut]);

  return {
    user,
    session,
    isSignedIn: !!isSignedIn,
    isLoading: !isLoaded,
    signIn,
    signOut,
  };
};
