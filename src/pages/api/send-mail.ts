import type { APIRoute } from "astro";
import { google } from "googleapis";
import MailComposer from "nodemailer/lib/mail-composer";

// Force server-side functionality
export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.formData();

  // 1. Invisible Honeypot Security
  const botField = data.get("bot-field");
  if (botField) {
    // Silently success for bots (Shadowban)
    return new Response(
      JSON.stringify({ message: "Message sent successfully." }),
      { status: 200 }
    );
  }

  const name = data.get("name") as string;
  const email = data.get("email") as string;
  const message = data.get("message") as string;

  if (!name || !email || !message) {
    return new Response("All fields are required.", { status: 400 });
  }

  try {
    const clientId = import.meta.env.GMAIL_CLIENT_ID || import.meta.env.GOOGLE_CLIENT_ID || process.env.GMAIL_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
    const clientSecret = import.meta.env.GMAIL_CLIENT_SECRET || import.meta.env.GOOGLE_CLIENT_SECRET || process.env.GMAIL_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET;
    const refreshToken = import.meta.env.GMAIL_REFRESH_TOKEN || import.meta.env.GOOGLE_REFRESH_TOKEN || process.env.GMAIL_REFRESH_TOKEN || process.env.GOOGLE_REFRESH_TOKEN;
    const user = import.meta.env.GMAIL_USER || import.meta.env.EMAIL_USER || process.env.GMAIL_USER || process.env.EMAIL_USER;
    const to = import.meta.env.EMAIL_TO || process.env.EMAIL_TO || user;

    if (!clientId || !clientSecret || !refreshToken || !user || !to) {
      console.error("Missing Environment Variables for Email Service");
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Server Configuration Error: Missing environment variables.",
          timestamp: new Date().toISOString()
        }), 
        { 
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // 1.5. Validate Cloudflare Turnstile
    const turnstileToken = data.get("cf-turnstile-response") as string;
    const turnstileSecret = import.meta.env.TURNSTILE_SECRET_KEY || process.env.TURNSTILE_SECRET_KEY;

    if (turnstileSecret && turnstileToken) {
      const turnstileVerify = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            secret: turnstileSecret,
            response: turnstileToken,
          }),
        }
      );

      const turnstileResult = await turnstileVerify.json();
      if (!turnstileResult.success) {
        return new Response("Human verification failed. Please try again.", {
          status: 400,
        });
      }
    } else if (turnstileSecret && !turnstileToken) {
      return new Response("Human verification missing. Please try again.", {
        status: 400,
      });
    }

    // 2. Authenticate with Gmail
    const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oAuth2Client.setCredentials({ refresh_token: refreshToken });

    // 3. Construct MIME Message
    const mail = new MailComposer({
      from: `"${name}" <${user}>`,
      to: to,
      replyTo: email,
      subject: `New Message from ${name} (Olaf Klein Website)`,
      text: `From: ${name} (${email})\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>New Message from Website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr/>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    const messageBuffer = await mail.compile().build();
    const encodedMessage = messageBuffer
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // 4. Send via Gmail API
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
    const result = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    // 5. Success
    return new Response(
      JSON.stringify({
        success: true,
        message: "Message sent successfully!",
        id: result.data.id,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Email Send Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message:
          error.message || "Failed to send email. Please try again later.",
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
