/**
 * Contact & WhatsApp config.
 */

/** WhatsApp: country code + number, no + or spaces. Example: 971582981520 for UAE */
export const WHATSAPP_NUMBER = "971582981520";

/** WhatsApp number formatted for display (e.g. +971 582981520) */
export const WHATSAPP_DISPLAY = "+971 582981520";

/** Support email */
export const CONTACT_EMAIL = "support@nilechic.com";

export const WHATSAPP_MESSAGES = {
  /** Default message when clicking floating button (general inquiry) */
  generalInquiry: "Hi, I'd like to inquire about NileChic products.",

  /** Pre-filled message after checkout (order confirmation) */
  orderConfirmation: "Hello, I just placed an order on Lunavra. Please confirm my order.",
} as const;
