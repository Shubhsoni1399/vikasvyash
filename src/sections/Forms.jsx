import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SERVICE_NAMES } from '../data/services';
import { CONFIG } from '../config';
import { submitLead, isPhone, onlyDigits } from '../utils/form';
import { toast } from '../utils/toast';
import { ArrowIcon } from '../components/Icons';

/* ---------- shared form logic ---------- */
function useLeadForm(initial, required) {
  const [v, setV] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // {ok, text, waUrl}
  const [busy, setBusy] = useState(false);

  const set = (k, val) => { setV(s => ({ ...s, [k]: val })); setErrors(e => ({ ...e, [k]: false })); };
  const bind = k => ({
    value: v[k], name: k,
    onChange: e => set(k, e.target.type === 'tel' ? onlyDigits(e.target.value) : e.target.value)
  });
  const validate = () => {
    const err = {};
    required.forEach(k => {
      const val = String(v[k] ?? '').trim();
      if (!val || (k === 'phone' && !isPhone(val))) err[k] = true;
    });
    setErrors(err);
    return !Object.keys(err).length;
  };
  const submit = async (meta, data) => {
    if (v.website) return; // spam bot (honeypot)
    setBusy(true);
    const { waUrl, popupBlocked, mail } = submitLead(meta, data);
    await mail;
    setBusy(false);
    setV(initial);
    setStatus({ ok: true, text: '✓ धन्यवाद! आपका विवरण भेज दिया गया है। WhatsApp में संदेश तैयार है — कृपया “Send” दबाएँ। 🙏', waUrl: popupBlocked ? waUrl : null });
    toast('✓ विवरण भेज दिया गया');
  };
  const fail = text => setStatus({ ok: false, text });
  return { v, set, bind, errors, status, busy, validate, submit, fail };
}

const Field = ({ id, label, error, children }) => (
  <div className={`field${error ? ' error' : ''}`}>
    <label htmlFor={id}>{label}</label>
    {children}
  </div>
);

const Honeypot = ({ f }) => (
  <input type="text" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" {...f.bind('website')} />
);

const Status = ({ s }) => s && (
  <p className={`form-msg${s.ok ? ' ok' : ''}`} role="status" aria-live="polite">
    {s.text}
    {s.waUrl && (<><br /><a href={s.waUrl} target="_blank" rel="noopener noreferrer" className="btn btn--wa btn--block" style={{ marginTop: 10 }}>WhatsApp पर भेजें</a></>)}
  </p>
);

const SubmitBtn = ({ busy, children }) => (
  <button type="submit" className={`btn btn--primary btn--block btn--lg${busy ? ' is-loading' : ''}`} disabled={busy}>
    {children} <ArrowIcon />
  </button>
);

/* ---------- Booking ---------- */
export function BookingForm() {
  const [params] = useSearchParams();
  const pre = params.get('service');
  const f = useLeadForm(
    { mode: 'ऑनलाइन (लाइव)', service: SERVICE_NAMES.includes(pre) ? pre : '', name: '', phone: '', email: '', gotra: '', date: '', message: '', website: '' },
    ['service', 'name', 'phone']
  );
  const today = new Date().toISOString().split('T')[0];

  const onSubmit = e => {
    e.preventDefault();
    if (!f.validate()) return f.fail('कृपया सभी आवश्यक (*) जानकारी सही भरें।');
    const { v } = f;
    const data = {
      'नाम': v.name.trim(), 'मोबाइल': v.phone, 'ईमेल': v.email, 'अनुष्ठान': v.service, 'प्रकार': v.mode,
      'गोत्र': v.gotra, 'इच्छित तिथि': v.date ? new Date(v.date).toLocaleDateString('en-IN') : '', 'समस्या / संदेश': v.message.trim()
    };
    f.submit({ icon: '🔥', form: 'अनुष्ठान बुकिंग फॉर्म', purpose: `${v.service} अनुष्ठान बुक करना — ${v.mode}` }, data);
  };

  return (
    <form className="form-card reveal" onSubmit={onSubmit} noValidate>
      <h3 className="form-card__title">अनुष्ठान विवरण</h3>
      <Honeypot f={f} />
      <div className="chips" role="radiogroup" aria-label="पूजा का प्रकार">
        {['ऑनलाइन (लाइव)', 'मंदिर में उपस्थित'].map(m => (
          <label className="chip" key={m}>
            <input type="radio" name="mode" value={m} checked={f.v.mode === m} onChange={() => f.set('mode', m)} />
            <span>{m}</span>
          </label>
        ))}
      </div>
      <Field id="bService" label="अनुष्ठान चुनें *" error={f.errors.service}>
        <select id="bService" {...f.bind('service')}>
          <option value="">— अनुष्ठान चुनें —</option>
          {SERVICE_NAMES.map(n => <option key={n}>{n}</option>)}
          <option>अन्य (संदेश में लिखें)</option>
        </select>
      </Field>
      <div className="field-row">
        <Field id="bName" label="पूरा नाम *" error={f.errors.name}>
          <input id="bName" type="text" placeholder="आपका नाम" autoComplete="name" {...f.bind('name')} />
        </Field>
        <Field id="bPhone" label="मोबाइल नंबर *" error={f.errors.phone}>
          <input id="bPhone" type="tel" placeholder="10 अंकों का नंबर" inputMode="numeric" maxLength={10} autoComplete="tel" {...f.bind('phone')} />
        </Field>
      </div>
      <Field id="bEmail" label="ईमेल (वैकल्पिक)">
        <input id="bEmail" type="email" placeholder="आपका ईमेल" autoComplete="email" {...f.bind('email')} />
      </Field>
      <div className="field-row">
        <Field id="bGotra" label="गोत्र">
          <input id="bGotra" type="text" placeholder="गोत्र (यदि ज्ञात हो)" {...f.bind('gotra')} />
        </Field>
        <Field id="bDate" label="इच्छित तिथि">
          <input id="bDate" type="date" min={today} {...f.bind('date')} />
        </Field>
      </div>
      <Field id="bMsg" label="समस्या / संदेश">
        <textarea id="bMsg" rows={3} placeholder="अपनी समस्या संक्षेप में लिखें" {...f.bind('message')} />
      </Field>
      <Status s={f.status} />
      <SubmitBtn busy={f.busy}>अभी बुक करें</SubmitBtn>
      <p className="form-note">🔒 आपकी जानकारी पूर्णतः गोपनीय रखी जाएगी।</p>
    </form>
  );
}

/* ---------- Contact ---------- */
export function ContactForm() {
  const subjects = ['अनुष्ठान की जानकारी', 'परामर्श', 'दान संबंधी', 'अन्य'];
  const f = useLeadForm({ name: '', phone: '', subject: subjects[0], message: '', website: '' }, ['name', 'phone', 'message']);
  const onSubmit = e => {
    e.preventDefault();
    if (!f.validate()) return f.fail('कृपया सभी आवश्यक (*) जानकारी सही भरें।');
    const { v } = f;
    f.submit({ icon: '✉️', form: 'संपर्क फॉर्म', purpose: v.subject },
      { 'नाम': v.name.trim(), 'मोबाइल': v.phone, 'विषय': v.subject, 'संदेश': v.message.trim() });
  };
  return (
    <form className="form-card reveal" onSubmit={onSubmit} noValidate>
      <h3 className="form-card__title">संदेश भेजें</h3>
      <Honeypot f={f} />
      <div className="field-row">
        <Field id="cName" label="नाम *" error={f.errors.name}>
          <input id="cName" type="text" placeholder="आपका नाम" {...f.bind('name')} />
        </Field>
        <Field id="cPhone" label="मोबाइल *" error={f.errors.phone}>
          <input id="cPhone" type="tel" placeholder="10 अंकों का नंबर" inputMode="numeric" maxLength={10} {...f.bind('phone')} />
        </Field>
      </div>
      <Field id="cSubject" label="विषय">
        <select id="cSubject" {...f.bind('subject')}>{subjects.map(s => <option key={s}>{s}</option>)}</select>
      </Field>
      <Field id="cMsg" label="संदेश *" error={f.errors.message}>
        <textarea id="cMsg" rows={4} placeholder="अपना संदेश लिखें" {...f.bind('message')} />
      </Field>
      <Status s={f.status} />
      <SubmitBtn busy={f.busy}>संदेश भेजें</SubmitBtn>
    </form>
  );
}

/* ---------- Daan (CONFIG.showDaan = true par dikhega) ---------- */
export function DaanForm() {
  const amounts = [501, 1100, 2100, 5100, 11000, 21000];
  const purposes = ['सामान्य दान', 'नित्य हवन', 'अन्नदान / भंडारा', 'गौ-सेवा', 'मंदिर सेवा'];
  const f = useLeadForm({ amount: 1100, custom: '', purpose: purposes[0], name: '', phone: '', website: '' }, ['name', 'phone']);
  const total = Number(f.v.custom) > 0 ? Number(f.v.custom) : f.v.amount;
  const onSubmit = e => {
    e.preventDefault();
    if (!f.validate()) return f.fail('कृपया नाम और मोबाइल नंबर भरें।');
    if (!total) return f.fail('कृपया दान राशि चुनें।');
    const { v } = f;
    const amt = `₹${total.toLocaleString('en-IN')}`;
    f.submit({ icon: '🙏', form: 'दान फॉर्म', purpose: `${amt} दान — ${v.purpose}` },
      { 'नाम': v.name.trim(), 'मोबाइल': v.phone, 'राशि': amt, 'उद्देश्य': v.purpose });
  };
  return (
    <form className="form-card reveal" onSubmit={onSubmit} noValidate>
      <h3 className="form-card__title">दान राशि चुनें</h3>
      <Honeypot f={f} />
      <div className="amounts" role="radiogroup" aria-label="दान राशि">
        {amounts.map(a => (
          <label className="amount" key={a}>
            <input type="radio" name="amount" checked={!f.v.custom && f.v.amount === a} onChange={() => { f.set('amount', a); f.set('custom', ''); }} />
            <span>₹{a.toLocaleString('en-IN')}</span>
          </label>
        ))}
      </div>
      <Field id="dCustom" label="या अपनी राशि लिखें (₹)">
        <input id="dCustom" type="number" min="11" placeholder="जैसे 751" inputMode="numeric" {...f.bind('custom')} />
      </Field>
      <Field id="dPurpose" label="दान का उद्देश्य">
        <select id="dPurpose" {...f.bind('purpose')}>{purposes.map(p => <option key={p}>{p}</option>)}</select>
      </Field>
      <div className="field-row">
        <Field id="dName" label="नाम *" error={f.errors.name}>
          <input id="dName" type="text" placeholder="आपका नाम" {...f.bind('name')} />
        </Field>
        <Field id="dPhone" label="मोबाइल *" error={f.errors.phone}>
          <input id="dPhone" type="tel" placeholder="10 अंकों का नंबर" inputMode="numeric" maxLength={10} {...f.bind('phone')} />
        </Field>
      </div>
      <Status s={f.status} />
      <div className="daan__total">कुल राशि: <strong>₹{(total || 0).toLocaleString('en-IN')}</strong></div>
      <SubmitBtn busy={f.busy}>दान विवरण भेजें</SubmitBtn>
      <p className="form-note">भुगतान: QR कोड स्कैन करें या UPI ID <b>{CONFIG.upiId}</b> पर राशि भेजें।</p>
    </form>
  );
}
