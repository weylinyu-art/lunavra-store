import { WHATSAPP_MESSAGES, WHATSAPP_NUMBER } from "@/lib/config/whatsapp";
import type { OrderSnapshot } from "@/lib/orders/types";

export function buildOrderWhatsAppUrl(
  snap: OrderSnapshot,
  labels: {
    placeOrderTitle: string;
    contactSection: string;
    mapSection: string;
    cityLabel: string;
    coordsLabel: string;
    orderNotesLabel: string;
    phonePrefix: string;
    sizeWord: string;
    /** e.g. "Country" */
    countryField: string;
  }
): string {
  const phoneFull = `+${labels.phonePrefix}${snap.formData.phoneLocal.replace(/\D/g, "")}`;
  const coords = `${snap.mapLat.toFixed(5)}, ${snap.mapLng.toFixed(5)}`;
  const linesText = snap.lines
    .map(
      (r) =>
        `• ${r.name} ×${r.qty} (${labels.sizeWord} ${r.size}) — $${r.lineTotal.toFixed(2)}`
    )
    .join("\n");

  const msg =
    `${WHATSAPP_MESSAGES.orderConfirmation}\n\n` +
    `*${labels.placeOrderTitle}*\n` +
    `${linesText}\n` +
    `Subtotal: $${snap.subtotal.toFixed(2)}\n\n` +
    `*${labels.contactSection}*\n` +
    `${snap.formData.fullName}\n` +
    `${phoneFull}\n` +
    `${snap.formData.email}\n\n` +
    `*${labels.mapSection}*\n` +
    `${labels.countryField}: Saudi Arabia\n` +
    `${labels.cityLabel}: ${snap.formData.city}\n` +
    `${snap.formData.addressDetail}\n` +
    `${labels.coordsLabel}: ${coords}\n` +
    (snap.formData.orderNotes ? `\n${labels.orderNotesLabel}: ${snap.formData.orderNotes}` : "");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
