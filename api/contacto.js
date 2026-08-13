import { google } from 'googleapis';

const clean = (value, max = 2000) =>
  String(value ?? '').replace(/[<>]/g, '').trim().slice(0, max);

const emailOk = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, code: 'METHOD_NOT_ALLOWED' });
  }

  try {
    const requiredEnv = [
      'GOOGLE_CLIENT_ID',
      'GOOGLE_CLIENT_SECRET',
      'GOOGLE_REFRESH_TOKEN',
      'GOOGLE_EMAIL',
      'CONTACT_EMAIL'
    ];

    const missingEnv = requiredEnv.filter((key) => !process.env[key]);
    if (missingEnv.length) {
      console.error('DellTech contacto: faltan variables', missingEnv);
      return res.status(500).json({
        ok: false,
        code: 'MISSING_ENVIRONMENT_VARIABLES'
      });
    }

    const { nombre, telefono, email, modelo, mensaje, website } = req.body || {};

    // Honeypot antispam
    if (website) {
      return res.status(200).json({ ok: true });
    }

    const n = clean(nombre, 80);
    const t = clean(telefono, 30);
    const e = clean(email, 120);
    const mo = clean(modelo, 120);
    const msg = clean(mensaje, 2000);

    if (!n || !t || !e || !msg || !emailOk(e)) {
      return res.status(400).json({
        ok: false,
        code: 'INVALID_FORM_DATA'
      });
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    // Fuerza la obtención de un access token aquí para detectar
    // errores OAuth antes de intentar enviar el mensaje.
    await oauth2Client.getAccessToken();

    const gmail = google.gmail({
      version: 'v1',
      auth: oauth2Client
    });

    const subject = 'Nueva consulta DellTech - informaticosmoncloa.com.es';

    const html = `
      <h2>Nueva consulta DellTech</h2>
      <p><strong>Web:</strong> informaticosmoncloa.com.es</p>
      <p><strong>Nombre:</strong> ${n}</p>
      <p><strong>Teléfono:</strong> ${t}</p>
      <p><strong>Email:</strong> ${e}</p>
      <p><strong>Modelo:</strong> ${mo || 'No indicado'}</p>
      <p><strong>Avería:</strong><br>${msg.replace(/\n/g, '<br>')}</p>
    `;

    const rawMessage = [
      `From: DellTech <${process.env.GOOGLE_EMAIL}>`,
      `To: ${process.env.CONTACT_EMAIL}`,
      `Reply-To: ${e}`,
      `Subject: =?UTF-8?B?${Buffer.from(subject).toString('base64')}?=`,
      'MIME-Version: 1.0',
      'Content-Type: text/html; charset=UTF-8',
      '',
      html
    ].join('\r\n');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: Buffer.from(rawMessage).toString('base64url')
      }
    });

    return res.status(200).json({
      ok: true,
      message: 'Consulta enviada correctamente'
    });

  } catch (error) {
    // No devolvemos secretos ni tokens al navegador.
    console.error('DellTech contacto Gmail API:', {
      name: error?.name,
      message: error?.message,
      code: error?.code,
      status: error?.response?.status,
      data: error?.response?.data?.error
    });

    const oauthError =
      error?.response?.data?.error === 'invalid_grant' ||
      String(error?.message || '').includes('invalid_grant');

    return res.status(500).json({
      ok: false,
      code: oauthError ? 'GOOGLE_OAUTH_INVALID_GRANT' : 'EMAIL_SEND_FAILED'
    });
  }
}
