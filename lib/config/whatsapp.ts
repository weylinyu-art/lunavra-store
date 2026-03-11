/**
 * WhatsApp integration config.
 * Replace with your actual business number (with country code, no + or spaces).
 * Example: 971501234567 for UAE
 */
export const WHATSAPP_NUMBER = "1234567890";

export const WHATSAPP_MESSAGES = {
  /** Default message when clicking floating button (general inquiry) */
  generalInquiry: "Hi, I'd like to inquire about NileChic products.",

  /** Pre-filled message after checkout (order confirmation) */
  orderConfirmation: "Hello, I just placed an order on Lunavra. Please confirm my order.",
} as const;
