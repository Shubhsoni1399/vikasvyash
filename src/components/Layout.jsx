import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { CONFIG, telHref, mailHref, WA_DEFAULT } from '../config';
import { NAV, MANTRA_SHORT, MANTRA_FULL } from '../data/site';
import { SERVICES } from '../data/services';
import { getLang, onLangChange, setLang } from '../utils/translate';
import useReveal from '../hooks/useReveal';
import {
  PhoneIcon, MailIcon, WaIcon, WaFillIcon, ClockIcon, LogoMark, InstaIcon, FbIcon, YtIcon
} from './Icons';

/* ---------------- Preloader ---------------- */
function Preloader() {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const done = () => setTimeout(() => setHide(true), 300);
    if (document.readyState === 'complete') done(); else window.addEventListener('load', done, { once: true });
    const safety = setTimeout(() => setHide(true), 2500);
    return () => clearTimeout(safety);
  }, []);
  return (
    <div className={`preloader${hide ? ' hide' : ''}`} aria-hidden="true">
      <div className="preloader__om">ॐ</div>
      <p className="preloader__text">जय माँ बगलामुखी</p>
    </div>
  );
}

/* ---------------- Logo ---------------- */
const Logo = () => (
  <Link to="/" className="logo" aria-label="माँ बगलामुखी — होम">
    <span className="logo__mark"><LogoMark /></span>
    <span className="logo__text">
      <strong>माँ बगलामुखी</strong>
      <small>पं. विकास व्यास</small>
    </span>
  </Link>
);

/* ---------------- Topbar ---------------- */
const Topbar = () => (
  <div className="topbar">
    <div className="container topbar__inner">
      <p className="topbar__mantra notranslate" translate="no"><span className="dot" /> {MANTRA_SHORT}</p>
      <div className="topbar__links">
        <a href={telHref}><PhoneIcon /><span>{CONFIG.phoneDisplay}</span></a>
        <a href={mailHref} data-mail><MailIcon /><span>{CONFIG.email}</span></a>
        <span className="topbar__time"><ClockIcon />प्रातः 6 – रात्रि 9 बजे</span>
      </div>
    </div>
  </div>
);

/* ---------------- Language toggle ---------------- */
function LangToggle() {
  const [lang, setL] = useState(getLang());
  useEffect(() => onLangChange(setL), []);
  return (
    <button
      type="button" className="lang notranslate" translate="no"
      aria-label="भाषा बदलें / Change language" aria-pressed={lang === 'en'}
      title={lang === 'en' ? 'हिंदी में देखें' : 'View in English'}
      onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
    >
      <span>हिं</span><span>EN</span>
    </button>
  );
}

/* ---------------- Header (sabhi pages par same) ---------------- */
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.documentElement.classList.toggle('no-scroll', open);
    const onKey = e => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth > 1180 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); };
  }, [open]);

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
        <div className="container header__inner">
          <Logo />
          <nav className={`nav${open ? ' open' : ''}`} id="nav" aria-label="मुख्य मेनू">
            <ul>
              {NAV.map(n => (
                <li key={n.to}>
                  <NavLink to={n.to} end={n.to === '/'} className={({ isActive }) => (isActive ? 'active' : undefined)}>
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link to="/booking" className="btn btn--primary nav__cta">अनुष्ठान बुक करें</Link>
            <div className="nav__contact">
              <a href={telHref}><PhoneIcon /><span>{CONFIG.phoneDisplay}</span></a>
              <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer"><WaIcon /><span>WhatsApp पर बात करें</span></a>
              <a href={mailHref}><MailIcon /><span>{CONFIG.email}</span></a>
            </div>
          </nav>
          <div className="header__actions">
            <LangToggle />
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn btn--wa btn--sm header__wa" aria-label="WhatsApp">
              <WaFillIcon /><span>WhatsApp</span>
            </a>
            <button
              className="burger" id="burger" aria-label={open ? 'मेनू बंद करें' : 'मेनू खोलें'}
              aria-expanded={open} aria-controls="nav" onClick={() => setOpen(o => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>
      <div className={`nav-backdrop${open ? ' show' : ''}`} onClick={() => setOpen(false)} />
    </>
  );
}

/* ---------------- Footer (sabhi pages par same) ---------------- */
const Footer = () => (
  <footer className="footer">
    <div className="footer__mantra notranslate" translate="no" aria-hidden="true">{MANTRA_FULL}</div>
    <div className="container footer__grid">
      <div className="footer__brand">
        <Logo />
        <p>शास्त्रोक्त विधि से माँ बगलामुखी सिद्ध हवन एवं अनुष्ठान — ऑनलाइन एवं मंदिर में उपलब्ध।</p>
        <div className="social">
          <a href={CONFIG.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstaIcon /></a>
          <a href={CONFIG.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FbIcon /></a>
          <a href={CONFIG.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><YtIcon /></a>
          <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WaIcon /></a>
        </div>
      </div>
      <div>
        <h4>त्वरित लिंक</h4>
        <ul role="list">
          <li><Link to="/about">पंडित जी का परिचय</Link></li>
          <li><Link to="/services">सेवाएं</Link></li>
          <li><Link to="/booking">अनुष्ठान बुकिंग</Link></li>
          <li><Link to="/gallery">फोटो एवं वीडियो गैलरी</Link></li>
          <li><Link to="/blog">ब्लॉग</Link></li>
          <li><Link to="/faq">प्रश्न-उत्तर</Link></li>
          <li><Link to="/contact">संपर्क करें</Link></li>
        </ul>
      </div>
      <div>
        <h4>अनुष्ठान</h4>
        <ul role="list">
          {SERVICES.slice(0, 6).map(s => <li key={s.id}><Link to={`/services#${s.id}`}>{s.name}</Link></li>)}
        </ul>
      </div>
      <div>
        <h4>संपर्क</h4>
        <ul role="list" className="footer__contact">
          <li><a href={telHref}>{CONFIG.phoneDisplay}</a></li>
          <li><a href={mailHref}>{CONFIG.email}</a></li>
          <li><span>{CONFIG.address}</span></li>
          <li><span>दर्शन: प्रातः 6 – रात्रि 9 बजे</span></li>
        </ul>
      </div>
    </div>
    <div className="footer__bottom">
      <div className="container footer__bottom-inner">
        <p>© {new Date().getFullYear()} mabaglamukhi.co — सर्वाधिकार सुरक्षित।</p>
        <p>Designed &amp; Developed by <a href="#">Digital Whopper</a></p>
      </div>
    </div>
  </footer>
);

/* ---------------- Floating buttons + mobile bar + toast ---------------- */
function Floaters() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const f = () => setShowTop(window.scrollY > 700);
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <>
      <div className="floaters">
        <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="floater floater--wa" aria-label="WhatsApp"><WaFillIcon /></a>
        <a href={telHref} className="floater floater--call" aria-label="कॉल करें"><PhoneIcon /></a>
        <button className={`floater floater--top${showTop ? ' show' : ''}`} aria-label="ऊपर जाएं"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19.5v-15M6 10.5l6-6 6 6" /></svg>
        </button>
      </div>
      <div className="mbar">
        <a href={telHref}><PhoneIcon />कॉल</a>
        <Link to="/booking" className="mbar__main">अनुष्ठान बुक करें</Link>
        <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer"><WaIcon />WhatsApp</a>
      </div>
    </>
  );
}

function Toast() {
  const [msg, setMsg] = useState('');
  useEffect(() => {
    let t;
    const f = e => { setMsg(e.detail); clearTimeout(t); t = setTimeout(() => setMsg(''), 2800); };
    window.addEventListener('mb-toast', f);
    return () => window.removeEventListener('mb-toast', f);
  }, []);
  return <div className={`toast${msg ? ' show' : ''}`} role="status" aria-live="polite">{msg}</div>;
}

/* ---------------- Scroll: naye page par top, #hash par us section tak ---------------- */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 120);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

/* ---------------- Layout ---------------- */
export default function Layout() {
  useReveal();
  return (
    <>
      <ScrollManager />
      <Preloader />
      <Topbar />
      <Header />
      <main><Outlet /></main>
      <Footer />
      <Floaters />
      <Toast />
      <div id="google_translate_element" aria-hidden="true" />
    </>
  );
}
