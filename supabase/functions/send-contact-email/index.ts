import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  product: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, company, product, message }: ContactFormRequest = await req.json();
    
    console.log("Received contact form submission:", { firstName, lastName, email, company, product });

    const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
    if (!SENDGRID_API_KEY) {
      console.error("SENDGRID_API_KEY is not configured");
      throw new Error("Email service not configured");
    }

    // Email to admin
    const adminEmailContent = `
      <h2>New Demo Request from BMS Pro Website</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${firstName} ${lastName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
          <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Company</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${company}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Product Interest</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${product || "Not specified"}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Message</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${message || "No message provided"}</td>
        </tr>
      </table>
    `;

    // Confirmation email to submitter
    const confirmationEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Thanks for reaching out, ${firstName}!</h1>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
          We've received your demo request and our team will be in touch within 24 hours.
        </p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Here's a summary of your request:</h3>
          <p style="color: #666; margin: 5px 0;"><strong>Company:</strong> ${company}</p>
          <p style="color: #666; margin: 5px 0;"><strong>Product Interest:</strong> ${product || "Not specified"}</p>
          ${message ? `<p style="color: #666; margin: 5px 0;"><strong>Your Message:</strong> ${message}</p>` : ""}
        </div>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
          In the meantime, feel free to explore our products or reach out directly if you have any questions.
        </p>
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
          Best regards,<br>
          <strong>The BMS Pro Team</strong><br>
          <a href="mailto:admin@bmspros.com.au" style="color: #0066cc;">admin@bmspros.com.au</a> | 
          <a href="tel:0387973795" style="color: #0066cc;">03 8797 3795</a>
        </p>
      </div>
    `;

    // Send email to admin
    const adminResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: "admin@bmspros.com.au" }] }],
        from: { email: "noreply@bmspros.com.au", name: "BMS Pro Website" },
        reply_to: { email: email, name: `${firstName} ${lastName}` },
        subject: `Demo Request from ${firstName} ${lastName} - ${company}`,
        content: [{ type: "text/html", value: adminEmailContent }],
      }),
    });

    if (!adminResponse.ok) {
      const errorText = await adminResponse.text();
      console.error("SendGrid API error (admin email):", adminResponse.status, errorText);
      throw new Error(`Failed to send admin email: ${adminResponse.status}`);
    }

    console.log("Admin email sent successfully to admin@bmspros.com.au");

    // Send confirmation email to submitter
    const confirmationResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: email }] }],
        from: { email: "noreply@bmspros.com.au", name: "BMS Pro" },
        reply_to: { email: "admin@bmspros.com.au", name: "BMS Pro Support" },
        subject: `Thanks for your demo request, ${firstName}!`,
        content: [{ type: "text/html", value: confirmationEmailContent }],
      }),
    });

    if (!confirmationResponse.ok) {
      const errorText = await confirmationResponse.text();
      console.error("SendGrid API error (confirmation email):", confirmationResponse.status, errorText);
      // Don't throw - admin email was sent, just log the confirmation failure
      console.warn("Confirmation email failed but admin email was sent successfully");
    } else {
      console.log("Confirmation email sent successfully to", email);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
