import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/* Section heading */
export const Eyebrow = ({ children, left }) => (
  <p className={`eyebrow${left ? ' eyebrow--left' : ''} reveal`}><span />{children}{!left && <span />}</p>
);

export const SectionHead = ({ eyebrow, title, text, row, right }) =>
  row ? (
    <div className="section-head section-head--row">
      <div>
        <Eyebrow left>{eyebrow}</Eyebrow>
        <h2 className="title reveal">{title}</h2>
      </div>
      {right}
    </div>
  ) : (
    <div className="section-head">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="title reveal">{title}</h2>
      {text && <p className="section-head__text reveal">{text}</p>}
    </div>
  );

/* Inner page hero */
export const YantraBg = () => (
  <svg className="page-hero__yantra" viewBox="0 0 400 400" aria-hidden="true">
    <g fill="none" stroke="#FFC107" strokeWidth="1.2">
      <path d="M40 40 H170 V20 H230 V40 H360 V170 H380 V230 H360 V360 H230 V380 H170 V360 H40 V230 H20 V170 H40 Z" />
      <circle cx="200" cy="200" r="150" strokeDasharray="3 6" />
      <circle cx="200" cy="200" r="120" />
      <path d="M200 110 L278 245 H122 Z" />
      <path d="M200 290 L122 155 H278 Z" stroke="#E63946" />
      <circle cx="200" cy="200" r="60" />
    </g>
  </svg>
);

export const PageHero = ({ title, sub, crumbs = [], meta }) => (
  <section className="page-hero">
    <YantraBg />
    <div className="container">
      {meta || <Eyebrow>जय माँ बगलामुखी</Eyebrow>}
      <h1 className="reveal">{title}</h1>
      {sub && <p className="reveal">{sub}</p>}
      <ol className="breadcrumb reveal" aria-label="Breadcrumb">
        <li><Link to="/">होम</Link></li>
        {crumbs.map((c, i) => (
          <li key={i} aria-current={i === crumbs.length - 1 ? 'page' : undefined}>
            {c.to ? <Link to={c.to}>{c.label}</Link> : c.label}
          </li>
        ))}
      </ol>
    </div>
  </section>
);

/* Number counter (scroll par 0 se ginti) */
export function Counter({ to }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (reduce) { setVal(to); return; }
      const start = performance.now();
      const tick = now => {
        const p = Math.min((now - start) / 1800, 1);
        setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{val.toLocaleString('en-IN')}</span>;
}

/* Hero ke udte hue diye ke kan */
export function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    let w, h, parts = [], running = true, raf;
    const spawn = (anywhere = false) => ({
      x: Math.random() * w, y: anywhere ? Math.random() * h : h + 10,
      r: Math.random() * 1.8 + 0.4, vy: Math.random() * 0.6 + 0.2, vx: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.6 + 0.2, red: Math.random() < 0.25
    });
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = Array.from({ length: Math.round(Math.min(70, w / 18)) }, () => spawn(true));
    };
    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      parts.forEach((p, i) => {
        p.y -= p.vy; p.x += p.vx + Math.sin(p.y / 40) * 0.15;
        if (p.y < -10) parts[i] = spawn();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.red ? `rgba(230,57,70,${p.a})` : `rgba(255,193,7,${p.a})`;
        ctx.shadowBlur = 10; ctx.shadowColor = p.red ? '#E63946' : '#FFC107';
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener('resize', resize);
    const io = new IntersectionObserver(([e]) => {
      const was = running; running = e.isIntersecting;
      if (running && !was) draw();
    });
    io.observe(canvas);
    return () => { running = false; cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas className="hero__particles" ref={ref} aria-hidden="true" />;
}

/* Filter chips */
export const Filters = ({ items, value, onChange, label, className = '' }) => (
  <div className={`filters ${className}`} role="tablist" aria-label={label}>
    {items.map(it => (
      <button key={it.id} type="button" role="tab" aria-selected={value === it.id}
        className={`filter${value === it.id ? ' active' : ''}`} onClick={() => onChange(it.id)}>
        {it.label}
      </button>
    ))}
  </div>
);

/* Modal */
export function Modal({ open, onClose, label, children, extra }) {
  const closeRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    document.documentElement.classList.add('no-scroll');
    closeRef.current?.focus();
    const onKey = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.classList.remove('no-scroll');
      window.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={label} onClick={e => e.target === e.currentTarget && onClose()}>
      <button className="modal__close" aria-label="बंद करें" ref={closeRef} onClick={onClose}>×</button>
      {extra}
      {children}
    </div>
  );
}
