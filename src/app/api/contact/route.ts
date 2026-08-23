import { NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'nodejs'

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(10).max(5000),
})

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.CONTACT_TO_EMAIL || 'powusu050@gmail.com'
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>'

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Email service is not configured. Missing RESEND_API_KEY.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, message } = parsed.data
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message).replaceAll('\n', '<br />')

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Portfolio contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; color: #111;">
            <h2 style="margin: 0 0 12px;">New portfolio message</h2>
            <p style="margin: 0 0 8px;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin: 0 0 8px;"><strong>Email:</strong> ${safeEmail}</p>
            <p style="margin: 16px 0 8px;"><strong>Message:</strong></p>
            <p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
          </div>
        `,
      }),
    })

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      console.error('Resend error:', result)
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true, id: result.id ?? null })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 })
  }
}
