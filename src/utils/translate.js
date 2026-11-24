/* =========================================================
   Hindi ⇄ English (Google Translate) — bina page reload
   ========================================================= */
const KEY = 'mb-lang';
let combo = null;
let current = 'hi';
const listeners = new Set();

export const getLang = () => current;
export const onLangChange = fn => { listeners.add(fn); return () => listeners.delete(fn); };
const emit = () => listeners.forEach(fn => fn(current));

const readPref = () => {
  try { const v = localStorage.getItem(KEY); if (v) return v; } catch (e) { /* blocked */ }
  return /googtrans=\/hi\/en/.test(document.cookie) ? 'en' : 'hi';
};

const setCookie = lang => {
  const host = window.location.hostname;
  const base = host.replace(/^www\./, '');
  const past = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = `googtrans=; path=/; ${past}`;
  if (host.includes('.')) {
    document.cookie = `googtrans=; path=/; domain=${host}; ${past}`;
    document.cookie = `googtrans=; path=/; domain=.${base}; ${past}`;
  }
  if (lang === 'en') {
    document.cookie = 'googtrans=/hi/en; path=/';
    if (host.includes('.')) document.cookie = `googtrans=/hi/en; path=/; domain=.${base}`;
  }
};

const fire = value => {
  if (!combo) return false;
  combo.value = value;
  combo.dispatchEvent(new Event('change'));
  return true;
};

const restore = () => {
  const frames = [...document.querySelectorAll('iframe')].filter(f => /goog-te|VIpgJd/i.test(`${f.className} ${f.id}`));
  for (const f of frames) {
    try {
      const btn = (f.contentDocument || f.contentWindow.document).querySelector('[id$="restore"], button');
      if (btn) { btn.click(); return; }
    } catch (e) { /* cross-origin */ }
  }
  fire('hi');
};

export const setLang = lang => {
  current = lang;
  document.documentElement.classList.toggle('is-en', lang === 'en');
  try { localStorage.setItem(KEY, lang); } catch (e) { /* ignore */ }
  setCookie(lang);
  emit();
  if (!combo) { loadWidget(); return; }
  if (lang === 'en') fire('en');
  else {
    restore();
    setTimeout(() => {
      if (current === 'hi' && document.documentElement.classList.contains('translated-ltr')) fire('hi');
    }, 900);
  }
};

const loadWidget = () => {
  if (document.getElementById('gt-script')) return;
  window.googleTranslateElementInit = () => {
    /* global google */
    new window.google.translate.TranslateElement(
      { pageLanguage: 'hi', includedLanguages: 'en,hi', autoDisplay: false },
      'google_translate_element'
    );
    let tries = 0;
    const t = setInterval(() => {
      combo = document.querySelector('.goog-te-combo');
      if (combo || ++tries > 60) {
        clearInterval(t);
        if (combo && current === 'en' && !document.documentElement.classList.contains('translated-ltr')) fire('en');
      }
    }, 150);
  };
  const s = document.createElement('script');
  s.id = 'gt-script';
  s.async = true;
  s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  document.body.appendChild(s);
};

export const initTranslate = () => {
  current = readPref();
  document.documentElement.classList.toggle('is-en', current === 'en');
  if (current === 'en') loadWidget();
  else window.addEventListener('load', () => setTimeout(loadWidget, 800), { once: true });
  emit();
};

/* Google Translate DOM badalta hai — React crash (removeChild/insertBefore) se bachane ka patch */
export const patchDomForTranslate = () => {
  if (typeof Node !== 'function' || !Node.prototype) return;
  const origRemove = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child;
    return origRemove.call(this, child);
  };
  const origInsert = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, ref) {
    if (ref && ref.parentNode !== this) return newNode;
    return origInsert.call(this, newNode, ref);
  };
};
