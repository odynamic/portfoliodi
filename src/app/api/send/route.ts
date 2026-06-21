import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Semua field wajib diisi." }, { status: 400 });
    }

    const data = await resend.emails.send({
      // Mengubah nama display pengirim agar lebih personal & profesional
      from: 'Dyah Ghaniya Workspace <onboarding@resend.dev>', 
      to: 'ghaniyaputridyah@gmail.com', 
      // Mengubah format subjek email agar terlihat seperti inquiry resmi
      subject: `[Inquiry] ${subject} — via dyahgputri.com`,
      replyTo: email, 
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 32px 24px; color: #0f172a; max-width: 560px; margin: 0 auto; border: 1px solid #f1f5f9; border-radius: 12px; background-color: #ffffff;">
          
          <h2 style="color: #0f172a; margin-top: 0; font-size: 18px; font-weight: 700; letter-spacing: -0.02em;">New Professional Inquiry</h2>
          <p style="color: #64748b; font-size: 13px; margin-top: -4px; margin-bottom: 24px;">Received via digital workspace contact center.</p>
          
          <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0;" />
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; line-height: 1.5;">
            <tr>
              <td style="padding: 4px 0; color: #64748b; width: 120px;">Sender Name</td>
              <td style="padding: 4px 0; color: #0f172a; font-weight: 600;">: ${name}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #64748b;">Email Address</td>
              <td style="padding: 4px 0; color: #2563eb; font-weight: 600;">: ${email}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #64748b;">Topic/Subject</td>
              <td style="padding: 4px 0; color: #0f172a;">: ${subject}</td>
            </tr>
          </table>

          <div style="background-color: #f8fafc; padding: 18px; border-radius: 10px; border: 1px solid #f1f5f9;">
            <p style="margin: 0; font-size: 13px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}