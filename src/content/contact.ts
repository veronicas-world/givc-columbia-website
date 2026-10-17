export const presidentContact = {
  name: 'Diane Lang',
  role: 'President',
};

/** Only an anonymous FormSubmit ID may be published, never a recipient address. */
export function formSubmitAction(id: string | undefined): string | undefined {
  const value = id?.trim();
  return value && /^[A-Za-z0-9_-]{16,128}$/.test(value)
    ? `https://formsubmit.co/${value}`
    : undefined;
}

export const contactFormAction = formSubmitAction(import.meta.env.VITE_CONTACT_FORM_ID);
