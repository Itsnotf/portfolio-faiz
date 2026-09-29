import { profile } from '@/content/profile';

/** The WhatsApp number written for people, e.g. "+62 895 1307 8184". */
export const whatsappDisplay = profile.whatsapp;

/**
 * WhatsApp chat link. With a message, the chat opens with an opening line already typed, so a visitor who is not
 * sure what to write does not face an empty box.
 */
export function whatsappUrl(message?: string): string {
  const number = profile.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}
