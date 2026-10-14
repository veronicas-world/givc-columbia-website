export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export type ContactField = keyof ContactMessage;

export type ContactErrors = Partial<Record<ContactField, string>>;

/**
 * A real delivery service (form backend, transactional email API, or similar) that the chapter has
 * approved. None exists yet; see "Contact form and email delivery" in the README.
 */
export interface ContactDeliveryProvider {
  send(message: ContactMessage, recipientInbox: string): Promise<void>;
}

export interface ContactDeliveryConfig {
  /** The chapter's approved inbox. Setting this alone does not enable sending. */
  recipientInbox: string | null;
  provider: ContactDeliveryProvider | null;
}

export const contactDeliveryConfig: ContactDeliveryConfig = {
  recipientInbox: null,
  provider: null,
};

export type ContactSubmitResult = { status: 'unavailable' } | { status: 'sent' } | { status: 'failed' };

// The HTML "valid email address" syntax (what type="email" checks), plus a required dot in the
// domain. noValidate disables the browser check, so this is the only guard. Deliverability is the
// provider's job.
const emailPattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function validateContactMessage(values: ContactMessage): ContactErrors {
  const errors: ContactErrors = {};
  const email = values.email.trim();
  if (!values.name.trim()) errors.name = 'Enter your name.';
  if (!email) errors.email = 'Enter your email address.';
  else if (!emailPattern.test(email)) errors.email = 'Enter an email address in the format name@example.com.';
  if (!values.message.trim()) errors.message = 'Enter a message.';
  return errors;
}

export function isContactDeliveryConfigured(
  config: ContactDeliveryConfig,
): config is { recipientInbox: string; provider: ContactDeliveryProvider } {
  return Boolean(config.recipientInbox?.trim()) && config.provider !== null;
}

export async function submitContactMessage(
  values: ContactMessage,
  config: ContactDeliveryConfig = contactDeliveryConfig,
): Promise<ContactSubmitResult> {
  if (!isContactDeliveryConfigured(config)) return { status: 'unavailable' };
  const message: ContactMessage = {
    name: values.name.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
  };
  try {
    await config.provider.send(message, config.recipientInbox.trim());
    return { status: 'sent' };
  } catch {
    return { status: 'failed' };
  }
}
