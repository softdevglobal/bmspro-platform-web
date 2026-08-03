export const BUSINESS_TYPES = ["Workshop", "Trade", "Salon", "Other"] as const;
export type BusinessType = (typeof BUSINESS_TYPES)[number];

export type ContactFormData = {
  /** Preferred when the UI collects a single name field */
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  company: string;
  phone?: string;
  /** Business type shown in the contact email (Workshop / Trade / Salon / Other) */
  product?: string;
  currentProblem?: string;
  preferredContactTime?: string;
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
