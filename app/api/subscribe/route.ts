import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, childName, yearGroup, email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Scholairo <hello@scholairo.com>",
    to: email,
    subject: "Welcome to Scholairo",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;background:#f6f9fc;font-family:'DM Sans',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f9fc;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#0d1829 0%,#1a2e4a 100%);padding:40px 48px 36px;text-align:center;">
                      <div style="display:inline-block;background:rgba(150,200,162,0.2);color:#96C8A2;font-size:12px;font-weight:600;padding:5px 14px;border-radius:999px;letter-spacing:0.05em;margin-bottom:20px;">
                        Welcome to Scholairo
                      </div>
                      <h1 style="margin:0;font-size:30px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;line-height:1.2;">
                        You&rsquo;re in, ${name || "there"} 🎉
                      </h1>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:40px 48px;">
                      <p style="margin:0 0 20px;font-size:16px;color:#374151;line-height:1.7;">
                        Thanks for joining Scholairo. Every Sunday we&rsquo;ll send you a beautifully formatted weekly overview of everything happening at Eton — fixtures, concerts, societies and more${childName ? ` for ${childName}` : ""}.
                      </p>

                      ${yearGroup ? `<p style="margin:0 0 20px;font-size:16px;color:#374151;line-height:1.7;">We&rsquo;ve noted <strong>${childName || "your child"}&rsquo;s</strong> year group as <strong>${yearGroup}</strong> so we can tailor the digest accordingly.</p>` : ""}

                      <!-- Info card -->
                      <div style="background:#f0f6fb;border:1px solid #d0e6f7;border-radius:12px;padding:24px 28px;margin:28px 0;">
                        <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#4a6280;text-transform:uppercase;letter-spacing:0.08em;">What to expect</p>
                        <ul style="margin:0;padding-left:20px;color:#374151;font-size:15px;line-height:2;">
                          <li>A weekly email every Sunday evening</li>
                          <li>Events, fixtures &amp; concerts for the week ahead</li>
                          <li>School news &amp; notices relevant to ${childName || "your child"}&rsquo;s year</li>
                        </ul>
                      </div>

                      <p style="margin:0;font-size:15px;color:#6b7280;line-height:1.7;">
                        Your first digest will arrive this Sunday. In the meantime, feel free to reply to this email with any questions.
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:24px 48px;text-align:center;">
                      <p style="margin:0;font-size:12px;color:#9ca3af;">
                        You&rsquo;re receiving this because you signed up at scholairo.com.<br/>
                        To unsubscribe, reply to this email with &ldquo;unsubscribe&rdquo;.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
