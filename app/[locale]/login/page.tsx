"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "@/contexts/LocaleContext";
import { useAuth } from "@/contexts/AuthContext";
import SocialLoginButtons from "@/components/SocialLoginButtons";

function LoginContent() {
  const { t, path } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, lastError, clearError, firebaseReady } = useAuth();

  const returnTo = searchParams.get("return") || "/account";
  const safeReturn = returnTo.startsWith("/") ? returnTo : "/account";

  useEffect(() => {
    if (!loading && user) {
      router.replace(path(safeReturn));
    }
  }, [loading, user, router, path, safeReturn]);

  const login = t.login;

  return (
    <>
      <h1 className="font-heading text-center text-2xl font-semibold text-foreground">{login.title}</h1>
      <p className="mt-2 text-center text-sm text-foreground/65">{login.subtitle}</p>

      {lastError && (
        <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900">
          <p>{login.error}</p>
          <p className="mt-1 font-mono text-xs opacity-90">{lastError}</p>
          <button
            type="button"
            onClick={clearError}
            className="mt-2 text-xs font-medium text-neutral-800 underline"
          >
            {login.dismissError}
          </button>
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm">
        {loading ? (
          <p className="text-center text-sm text-foreground/60">{login.loading}</p>
        ) : user ? (
          <p className="text-center text-sm text-foreground/70">{login.redirecting}</p>
        ) : (
          <SocialLoginButtons />
        )}
      </div>

      <p className="mt-6 text-center text-xs leading-relaxed text-foreground/50">
        {firebaseReady ? login.footerHint : login.footerHintNoFirebase}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
        <Link href={path("/")} className="font-medium text-neutral-900 hover:underline">
          {login.backHome}
        </Link>
        <Link href={path("/account")} className="font-medium text-foreground/70 hover:text-neutral-900 hover:underline">
          {login.goAccount}
        </Link>
      </div>
    </>
  );
}

export default function LoginPage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-neutral-100 px-4 py-10">
      <div className="mx-auto max-w-lg">
        <Suspense
          fallback={
            <>
              <h1 className="font-heading text-center text-2xl font-semibold text-foreground">{t.login.title}</h1>
              <p className="mt-8 text-center text-sm text-foreground/60">{t.login.loading}</p>
            </>
          }
        >
          <LoginContent />
        </Suspense>
      </div>
    </div>
  );
}
