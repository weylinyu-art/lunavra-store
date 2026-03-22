"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User, AuthError } from "firebase/auth";
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase/client";
import { getFirebaseAuthProvider } from "@/lib/auth/social-providers";
import type { SocialProviderId } from "@/lib/auth/social-providers";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  firebaseReady: boolean;
  signInWithSocial: (id: SocialProviderId) => Promise<void>;
  signOutUser: () => Promise<void>;
  lastError: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  /** True only while waiting for first `onAuthStateChanged` when Firebase is configured. */
  const [loading, setLoading] = useState(() => isFirebaseConfigured());
  const [lastError, setLastError] = useState<string | null>(null);

  const firebaseReady = isFirebaseConfigured();

  useEffect(() => {
    if (!firebaseReady) return;
    const auth = getFirebaseAuth();
    if (!auth) {
      queueMicrotask(() => setLoading(false));
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, [firebaseReady]);

  const signInWithSocial = useCallback(async (id: SocialProviderId) => {
    setLastError(null);
    const auth = getFirebaseAuth();
    if (!auth) {
      setLastError("Firebase not configured");
      return;
    }
    const provider = getFirebaseAuthProvider(id);
    try {
      await signInWithPopup(auth, provider);
    } catch (e: unknown) {
      const err = e as AuthError;
      if (err?.code === "auth/popup-closed-by-user" || err?.code === "auth/cancelled-popup-request") {
        return;
      }
      setLastError(err?.message ?? String(e));
    }
  }, []);

  const signOutUser = useCallback(async () => {
    setLastError(null);
    const auth = getFirebaseAuth();
    if (!auth) return;
    await firebaseSignOut(auth);
  }, []);

  const clearError = useCallback(() => setLastError(null), []);

  const value = useMemo(
    () => ({
      user,
      loading,
      firebaseReady,
      signInWithSocial,
      signOutUser,
      lastError,
      clearError,
    }),
    [user, loading, firebaseReady, signInWithSocial, signOutUser, lastError, clearError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
