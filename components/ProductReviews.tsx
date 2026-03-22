"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import { productReviews } from "@/lib/data/reviews";

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface ProductReviewsProps {
  productId: string;
  /** When true, no outer border / top title — for use inside PDP section cards */
  embedded?: boolean;
}

const STORAGE_KEY = (id: string) => `nilechic-reviews-${id}`;

function getStoredReviews(productId: string): Review[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY(productId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveReviews(productId: string, reviews: Review[]) {
  try {
    localStorage.setItem(STORAGE_KEY(productId), JSON.stringify(reviews));
  } catch {
    /* ignore */
  }
}

export default function ProductReviews({ productId, embedded = false }: ProductReviewsProps) {
  const { t } = useLocale();
  const preloaded = productReviews.filter((r) => r.productId === productId);
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const allReviews = [...preloaded, ...userReviews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  useEffect(() => {
    setUserReviews(getStoredReviews(productId));
  }, [productId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const newReview: Review = {
      id: `u-${Date.now()}`,
      author: name.trim(),
      rating: 5,
      text: text.trim(),
      date: new Date().toISOString().slice(0, 10),
    };
    const updated = [newReview, ...userReviews];
    setUserReviews(updated);
    saveReviews(productId, updated);
    setName("");
    setText("");
    setSubmitted(true);
  };

  return (
    <div className={embedded ? "" : "mt-10 border-t border-neutral-200/80 pt-8"}>
      {!embedded && (
        <h2 className="font-heading text-lg font-medium text-foreground">
          {t.productReviews.title} ({allReviews.length})
        </h2>
      )}

      <div className={embedded ? "space-y-6" : "mt-6 space-y-6"}>
        {allReviews.map((r) => (
          <div key={r.id} className="rounded-lg bg-white p-4">
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">{r.author}</span>
              <span className="text-amber-500">
                {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </span>
              <span className="text-xs text-foreground/50">{r.date}</span>
            </div>
            <p className="mt-2 text-sm text-foreground/80">{r.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 rounded-lg bg-white p-6">
        <h3 className="text-sm font-medium text-foreground">{t.productReviews.writeReview}</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.productReviews.yourName}
          className="mt-3 w-full rounded-lg border border-foreground/20 bg-white px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
          required
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.productReviews.yourReview}
          rows={3}
          className="mt-3 w-full rounded-lg border border-foreground/20 bg-white px-3 py-2 text-sm focus:border-neutral-400 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="mt-3 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-foreground/90"
        >
          {t.productReviews.submit}
        </button>
        {submitted && (
          <p className="mt-2 text-sm text-neutral-900">{t.productReviews.thankYou}</p>
        )}
      </form>
    </div>
  );
}
