/* =========================================================
   Form submit → 1) Mail (FormSubmit.co)  2) WhatsApp (template ready)
   ========================================================= */
import { CONFIG, waLink } from '../config';

export const nowIST = () =>
  new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

export const waTemplate = (meta, data) => {
  const line = '━━━━━━━━━━━━━━━';
  const rows = Object.entries(data)
    .filter(([, v]) => String(v ?? '').trim() !== '')
    .map(([k, v]) => `▪️ *${k}:* ${v}`)
    .join('\n');
  return `🙏 *जय माँ बगलामुखी* 🙏
${line}
${meta.icon} *${meta.form}*
🎯 *किसलिए:* ${meta.purpose}
${line}
${rows}
${line}
🕐 ${nowIST()}
🌐 mabaglamukhi.co`;
};

export const sendMail = (meta, data) => {
  const body = new URLSearchParams();
  body.append('_subject', `${meta.icon} ${meta.form} — ${data['नाम'] || ''} (${data['मोबाइल'] || ''}) | mabaglamukhi.co`);
  body.append('_template', 'table');
  body.append('_captcha', 'false');
  if (data['ईमेल']) body.append('_replyto', data['ईमेल']);
  body.append('📋 फॉर्म', meta.form);
  body.append('🎯 किसलिए', meta.purpose);
  Object.entries(data).forEach(([k, v]) => body.append(k, String(v ?? '').trim() || '—'));
  body.append('🕐 समय', nowIST());
  body.append('🌐 पेज', window.location.href);

  // simple request (no preflight) + keepalive → WhatsApp khulne par bhi mail jaata rahe
  return fetch(`https://formsubmit.co/ajax/${CONFIG.notifyEmail}`, {
    method: 'POST', body, keepalive: true, headers: { Accept: 'application/json' }
  })
    .then(r => r.json())
    .then(j => {
      if (String(j.success) !== 'true') console.warn('[Form] Mail:', j.message);
      else console.info('[Form] Mail sent ✓');
      return j;
    })
    .catch(err => { console.error('[Form] Mail error:', err); return null; });
};

/**
 * Submit: mail background me + WhatsApp turant (click ke saath, popup block na ho).
 * returns { waUrl, popupBlocked, mail: Promise }
 */
export const submitLead = (meta, data) => {
  const mail = sendMail(meta, data);
  const waUrl = waLink(waTemplate(meta, data));
  const win = window.open(waUrl, '_blank');
  return { waUrl, popupBlocked: !win, mail };
};

/* simple validation helpers */
export const isPhone = v => /^[0-9]{10}$/.test(v || '');
export const onlyDigits = v => (v || '').replace(/\D/g, '').slice(0, 10);
