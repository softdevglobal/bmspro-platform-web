export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  product?: string;
  message?: string;
};

export async function submitContactForm(
  data: ContactFormData,
  subject = "Contact from BMS Pro website"
) {
  let response: Response;

  try {
    response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, subject }),
    });
  } catch {
    throw new Error(
      "Could not reach the mail API. Restart with npm run dev (API + web)."
    );
  }

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      typeof result.error === "string" ? result.error : "Failed to send message"
    );
  }

  return result;
}
