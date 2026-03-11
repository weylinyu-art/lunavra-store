"use client";

import { useState } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import Link from "next/link";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGES } from "@/lib/config/whatsapp";

export default function CheckoutPage() {
  const { t, path } = useLocale();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
    orderNotes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getWhatsAppUrl = () =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGES.orderConfirmation)}`;

  if (orderPlaced) {
    return (
      <div className="mx-auto max-w-2xl bg-[#FDF2F4] px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-[#FFFEF9] p-8 text-center shadow-sm md:p-12">
          <h1 className="font-heading text-2xl font-light text-foreground md:text-3xl">
            {t.checkout.thankYou}
          </h1>
          <p className="mt-4 text-foreground/80">
            {t.checkout.confirmMessage}
          </p>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-8 py-4 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20BD5A] hover:shadow-md"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.checkout.confirmWhatsApp}
          </a>
          <Link
            href={path("/shop")}
            className="mt-6 block text-sm text-foreground/70 hover:text-foreground"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl bg-[#FDF2F4] px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12">
        <h1 className="font-heading text-3xl font-light tracking-wide text-foreground">
          {t.checkout.title}
        </h1>
        <p className="mt-2 text-sm text-foreground/70">
          {t.trust.cod} — {t.trust.codDesc}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl bg-[#FFFEF9] p-6 shadow-sm md:p-8">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-foreground">
            {t.checkout.fullName}
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="mt-2 w-full rounded-sm border border-foreground/20 bg-white px-4 py-3 text-foreground focus:border-[#C9A962] focus:outline-none focus:ring-1 focus:ring-[#C9A962]"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground">
            {t.checkout.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            className="mt-2 w-full rounded-sm border border-foreground/20 bg-white px-4 py-3 text-foreground focus:border-[#C9A962] focus:outline-none focus:ring-1 focus:ring-[#C9A962]"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-foreground">
            {t.checkout.city}
          </label>
          <input
            id="city"
            name="city"
            type="text"
            required
            value={formData.city}
            onChange={handleChange}
            className="mt-2 w-full rounded-sm border border-foreground/20 bg-white px-4 py-3 text-foreground focus:border-[#C9A962] focus:outline-none focus:ring-1 focus:ring-[#C9A962]"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-foreground">
            {t.checkout.address}
          </label>
          <input
            id="address"
            name="address"
            type="text"
            required
            value={formData.address}
            onChange={handleChange}
            className="mt-2 w-full rounded-sm border border-foreground/20 bg-white px-4 py-3 text-foreground focus:border-[#C9A962] focus:outline-none focus:ring-1 focus:ring-[#C9A962]"
          />
        </div>

        <div>
          <label htmlFor="orderNotes" className="block text-sm font-medium text-foreground">
            {t.checkout.orderNotes}
          </label>
          <textarea
            id="orderNotes"
            name="orderNotes"
            rows={3}
            value={formData.orderNotes}
            onChange={handleChange}
            className="mt-2 w-full rounded-sm border border-foreground/20 bg-white px-4 py-3 text-foreground focus:border-[#C9A962] focus:outline-none focus:ring-1 focus:ring-[#C9A962]"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-foreground py-4 text-sm font-medium text-[#FFFEF9] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/90 hover:shadow-md"
        >
          {t.checkout.placeOrder}
        </button>
      </form>
    </div>
  );
}
