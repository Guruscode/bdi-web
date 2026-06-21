import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
})

export function buildRegistrationEmail(event: {
  title: string
  date: string
  time: string
}) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:520px;">
          <tr>
            <td style="text-align:center;padding-bottom:24px;">
              <span style="font-size:20px;font-weight:700;color:#1a1a2e;">Beyond Degree</span>
            </td>
          </tr>
          <tr>
            <td style="background-color:#ffffff;border-radius:12px;padding:40px 32px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
              <div style="width:56px;height:56px;background-color:#d1fae5;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:20px;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#1a1a2e;">You're Registered!</h1>
              <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.5;">
                You've successfully registered for<br>
                <strong style="color:#1a1a2e;">${event.title}</strong>
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;border-radius:10px;padding:20px;margin-bottom:24px;">
                <tr>
                  <td style="padding:6px 0;">
                    <span style="font-size:13px;color:#9ca3af;display:block;">Date</span>
                    <span style="font-size:15px;font-weight:600;color:#1a1a2e;">${formattedDate}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;">
                    <span style="font-size:13px;color:#9ca3af;display:block;">Time</span>
                    <span style="font-size:15px;font-weight:600;color:#1a1a2e;">${event.time}</span>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 20px;font-size:14px;color:#6b7280;line-height:1.6;">
                We'll send you reminders and any updates about this event. See you there!
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:20px;margin-bottom:24px;">
                <tr>
                  <td align="center">
                    <span style="font-size:20px;display:inline-block;vertical-align:middle;margin-right:6px;">💬</span>
                    <span style="font-size:14px;font-weight:600;color:#166534;display:inline-block;vertical-align:middle;">Join our WhatsApp Community</span>
                    <p style="margin:8px 0 16px;font-size:13px;color:#15803d;line-height:1.5;">
                      Connect with fellow attendees, get event reminders, and stay updated on future programs.
                    </p>
                    <a href="https://chat.whatsapp.com/Kg3aLiYmR5p92XXb5YEVCI?mode=gi_t" target="_blank" style="display:inline-block;padding:12px 28px;background-color:#25D366;color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">
                      Join WhatsApp Community
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:12px;color:#9ca3af;">
                Beyond Degree Initiative &mdash; Empowering the next generation
              </p>
            </td>
          </tr>
          <tr>
            <td style="text-align:center;padding-top:20px;">
              <span style="font-size:12px;color:#9ca3af;">
                You received this email because you registered for an event with Beyond Degree Initiative.
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function sendRegistrationEmail({
  to,
  name,
  eventTitle,
  eventDate,
  eventTime,
}: {
  to: string
  name: string
  eventTitle: string
  eventDate: string
  eventTime: string
}) {
  const html = buildRegistrationEmail({
    title: eventTitle,
    date: eventDate,
    time: eventTime,
  })

  await transporter.sendMail({
    from: `"Beyond Degree" <${process.env.SMTP_EMAIL}>`,
    to,
    subject: `You're registered for ${eventTitle} — Beyond Degree`,
    html,
  })
}
