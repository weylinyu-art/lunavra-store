"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale } from "@/contexts/LocaleContext";
import type { SocialProviderId } from "@/lib/auth/social-providers";

const ORDER: SocialProviderId[] = ["google", "facebook", "twitter"];

function labelFor(
  login: {
    google: string;
    facebook: string;
    twitter: string;
  },
  id: SocialProviderId
): string {
  switch (id) {
    case "google":
      return login.google;
    case "facebook":
      return login.facebook;
    case "twitter":
      return login.twitter;
    default: {
      const _x: never = id;
      return _x;
    }
  }
}

export default function SocialLoginButtons() {
  const { t } = useLocale();
  const { signInWithSocial, firebaseReady } = useAuth();
  const [busy, setBusy] = useState<SocialProviderId | null>(null);

  const login = t.login;

  const handle = async (id: SocialProviderId) => {
    if (!firebaseReady) return;
    setBusy(id);
    try {
      await signInWithSocial(id);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-6">
      {!firebaseReady && (
        <p className="rounded-xl border border-amber-200/80 bg-amber-50 px-4 py-3 text-sm text-amber-950/90">
          {login.configRequired}
        </p>
      )}

      <ul className="grid gap-3 sm:grid-cols-2">
        {ORDER.map((id) => {
          const label = labelFor(login, id);
          const isFacebook = id === "facebook";
          return (
            <li key={id} className={id === "google" ? "sm:col-span-2" : undefined}>
              <button
                type="button"
                disabled={!firebaseReady || busy !== null}
                onClick={() => handle(id)}
                className="flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl border border-foreground/12 bg-white px-4 py-3 text-sm font-medium text-foreground shadow-sm transition hover:border-[#C9A962]/45 hover:bg-[#C9A962]/6 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busy === id ? <span className="text-foreground/70">{login.signingIn}</span> : <span>{label}</span>}
              </button>
              {isFacebook && (
                <p className="mt-1.5 text-center text-xs text-foreground/55">{login.facebookMeta}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
