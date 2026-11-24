import { Fragment, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CONFIG, telHref, mailHref, WA_DEFAULT } from '../config';
import { STATS, MARQUEE, PROCESS, WHY, TESTIMONIALS, GALLERY, VIDEOS } from '../data/site';
import { SERVICES } from '../data/services';
import { FAQS, FAQ_CATS } from '../data/faqs';
import Media from '../components/Media';
import { SectionHead, Eyebrow, Counter, Particles, Filters, Modal } from '../components/Ui';
import { ArrowIcon, ArrowLeftIcon, Svg, PhoneIcon, WaIcon, MailIcon, PinIcon, PlayIcon, WaFillIcon } from '../components/Icons';
import { BookingForm, ContactForm, DaanForm } from './Forms';
import { toast } from '../utils/toast';

/* ================= HERO ================= */
export const Hero = () => (
  <section className="hero" id="home">
    <Particles />
    <div className="hero__glow" aria-hidden="true" />
    <div className="container hero__inner">
      <div className="hero__content">
        <Eyebrow>माँ बगलामुखी सिद्ध अनुष्ठान</Eyebrow>
        <h1 className="hero__title reveal">
          शत्रु पर विजय,<br /><em>न्याय</em> और <em className="red">रक्षा</em> का<br />सिद्ध मार्ग
        </h1>
        <p className="hero__text reveal">
          पं. विकास व्यास द्वारा शास्त्रोक्त विधि से माँ बगलामुखी का सिद्ध हवन एवं अनुष्ठान —
          शत्रु बाधा, कोर्ट केस, व्यापार और परिवार की हर बाधा का निवारण।
        </p>
        <div className="hero__btns reveal">
          <Link to="/booking" className="btn btn--primary btn--lg">अनुष्ठान बुक करें <ArrowIcon /></Link>
          <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--lg"><WaFillIcon /> पंडित जी से बात करें</a>
        </div>
        <ul className="hero__stats reveal" role="list">
          {STATS.map(s => <li key={s.label}><strong><Counter to={s.n} />{s.suffix}</strong><small>{s.label}</small></li>)}
        </ul>
      </div>

      <div className="hero__visual reveal">
        <div className="yantra" aria-hidden="true">
          <svg viewBox="0 0 400 400" className="yantra__outer">
            <defs>
              <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#FFE082" /><stop offset=".5" stopColor="#FFC107" /><stop offset="1" stopColor="#B8860B" />
              </linearGradient>
            </defs>
            <path d="M40 40 H170 V20 H230 V40 H360 V170 H380 V230 H360 V360 H230 V380 H170 V360 H40 V230 H20 V170 H40 Z" fill="none" stroke="url(#gold)" strokeWidth="2" />
            <path d="M52 52 H178 V32 H222 V52 H348 V178 H368 V222 H348 V348 H222 V368 H178 V348 H52 V222 H32 V178 H52 Z" fill="none" stroke="url(#gold)" strokeWidth=".8" opacity=".6" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="url(#gold)" strokeWidth="1.2" strokeDasharray="3 6" />
          </svg>
          <svg viewBox="0 0 400 400" className="yantra__petals">
            <g fill="none" stroke="url(#gold)" strokeWidth="1.4">
              {[0, 45, 90, 135, 180, 225, 270, 315].map(r => (
                <path key={r} d="M200 70 C215 95 215 115 200 130 C185 115 185 95 200 70 Z" transform={`rotate(${r} 200 200)`} />
              ))}
            </g>
            <circle cx="200" cy="200" r="128" fill="none" stroke="url(#gold)" strokeWidth="1" />
          </svg>
          <svg viewBox="0 0 400 400" className="yantra__core">
            <circle cx="200" cy="200" r="72" fill="none" stroke="url(#gold)" strokeWidth="1.2" />
            <path d="M200 135 L256 232 H144 Z" fill="none" stroke="url(#gold)" strokeWidth="1.8" />
            <path d="M200 265 L144 168 H256 Z" fill="none" stroke="#C1121F" strokeWidth="1.8" />
            <circle cx="200" cy="200" r="7" fill="#C1121F" />
            <circle cx="200" cy="200" r="14" fill="none" stroke="url(#gold)" strokeWidth="1" />
          </svg>
        </div>
        <Media src="/images/hero-pandit.png" className="hero__portrait" label="पंडित जी की फोटो" hint="public/images/hero-pandit.png" alt="पं. विकास व्यास" />
        <div className="hero__badge">
          <span className="hero__badge-ic">🔥</span>
          <span><strong>लाइव हवन</strong><small>वीडियो कॉल पर दर्शन</small></span>
        </div>
      </div>
    </div>
    <a href="#marquee" className="hero__scroll" aria-label="नीचे जाएं"><span /></a>
  </section>
);

/* ================= MARQUEE ================= */
export const Marquee = () => (
  <div className="marquee-wrap" id="marquee">
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[...MARQUEE, ...MARQUEE].map((m, i) => <Fragment key={i}><span>{m}</span><i>✦</i></Fragment>)}
      </div>
    </div>
  </div>
);

/* ================= ABOUT ================= */
export const AboutSection = ({ home }) => (
  <section className="section about" id="about">
    <div className="container about__grid">
      <div className="about__media reveal">
        <Media src="/images/about.jpg" className="about__img ph" label="पंडित जी / मंदिर फोटो" hint="images/about.jpg" alt="पं. विकास व्यास" />
        <Media src="/images/about-2.jpg" className="about__img about__img--sm ph" label="हवन फोटो" hint="images/about-2.jpg" alt="हवन" />
        <div className="about__exp"><strong><Counter to={15} />+</strong><small>वर्षों की<br />साधना</small></div>
      </div>
      <div className="about__content">
        <Eyebrow left>पंडित जी का परिचय</Eyebrow>
        <h2 className="title reveal">पं. विकास व्यास — <em>माँ बगलामुखी</em> के उपासक</h2>
        <p className="lead reveal">
          माँ पीताम्बरा की कृपा से पं. विकास व्यास वर्षों से शास्त्रोक्त विधि द्वारा बगलामुखी साधना, हवन एवं
          अनुष्ठान संपन्न करा रहे हैं। हर अनुष्ठान भक्त के नाम, गोत्र और संकल्प के साथ पूर्ण श्रद्धा और नियम से किया जाता है।
        </p>
        <ul className="about__list reveal" role="list">
          {['वैदिक एवं तांत्रिक शास्त्रों के अनुसार पूर्ण विधि-विधान', 'भक्त के नाम-गोत्र से व्यक्तिगत संकल्प',
            'ऑनलाइन लाइव दर्शन या मंदिर में स्वयं उपस्थित होकर पूजा', 'अनुष्ठान के बाद प्रसाद एवं अभिमंत्रित सामग्री आपके घर तक'
          ].map(t => <li key={t}><span>✓</span>{t}</li>)}
        </ul>
        <div className="about__sign reveal">
          <div>
            <p className="about__sign-name">पं. विकास व्यास</p>
            <small>माँ बगलामुखी मंदिर, मुख्य पुजारी</small>
          </div>
          {home
            ? <Link to="/about" className="btn btn--outline">पूरा परिचय पढ़ें</Link>
            : <Link to="/booking" className="btn btn--outline">अनुष्ठान बुक करें</Link>}
        </div>
      </div>
    </div>
  </section>
);

/* ================= SERVICES GRID ================= */
export const ServicesGrid = ({ more }) => (
  <section className="section services" id="services">
    <div className="container">
      <SectionHead eyebrow="हमारी सेवाएं" title={<>माँ बगलामुखी <em>सिद्ध अनुष्ठान</em></>}
        text="हर समस्या के लिए अलग विधि, अलग संकल्प — आपकी आवश्यकता के अनुसार अनुष्ठान चुनें।" />
      <div className="services__grid">
        {SERVICES.map(s => (
          <article className="service reveal" key={s.id}>
            <div className="service__ic"><Svg d={s.icon} /></div>
            <h3>{s.name}</h3>
            <p>{s.short}</p>
            <Link to={`/services#${s.id}`}>विस्तार से जानें <ArrowIcon /></Link>
          </article>
        ))}
      </div>
      {more && <div className="home-more reveal"><Link to="/services" className="btn btn--outline">सभी सेवाएं देखें <ArrowIcon /></Link></div>}
    </div>
  </section>
);

/* ================= SERVICES DETAIL (services page) ================= */
export const ServicesDetail = () => (
  <section className="section">
    <div className="container">
      <div className="svc-list">
        {SERVICES.map((s, i) => (
          <article className="svc-row reveal" id={s.id} key={s.id}>
            <Media src={s.image} className="svc-row__img ph" label={s.name} hint={`images/services/${i + 1}.jpg`} alt={s.name} />
            <div className="svc-row__body">
              <span className="svc-row__tag">✦ {s.tag}</span>
              <h2>{s.name}</h2>
              <p>{s.desc}</p>
              <ul role="list">{s.benefits.map(b => <li key={b}>{b}</li>)}</ul>
              <div className="svc-row__btns">
                <Link to={`/booking?service=${encodeURIComponent(s.name)}`} className="btn btn--primary">अनुष्ठान बुक करें <ArrowIcon /></Link>
                <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">WhatsApp पर पूछें</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

/* ================= PROCESS ================= */
export const Process = () => (
  <section className="section process">
    <div className="container">
      <SectionHead eyebrow="अनुष्ठान प्रक्रिया" title={<>केवल <em>4 सरल चरण</em> में अनुष्ठान</>} />
      <ol className="process__list">
        {PROCESS.map((p, i) => (
          <li className="step reveal" key={p.title}>
            <span className="step__no">{String(i + 1).padStart(2, '0')}</span>
            <h3>{p.title}</h3><p>{p.text}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

/* ================= BOOKING ================= */
export const BookingSection = () => (
  <section className="section booking" id="booking">
    <div className="container">
      <SectionHead eyebrow="अनुष्ठान बुकिंग" title={<>बुक करें अपना <em>अनुष्ठान</em></>} />
      <div className="booking__grid">
        <div className="booking__media reveal">
          <Media src="/images/booking-havan.jpg" className="booking__img ph" label="हवन फोटो" hint="images/booking-havan.jpg" alt="लाइव हवन" />
          <div className="booking__overlay">
            <p className="eyebrow eyebrow--left"><span />लाइव दर्शन</p>
            <h3>घर बैठे देखें आपके नाम का हवन</h3>
            <ul role="list">
              <li><strong>100%</strong><small>शास्त्रोक्त विधि</small></li>
              <li><strong>Live</strong><small>वीडियो कॉल</small></li>
              <li><strong>24h</strong><small>प्रतिक्रिया</small></li>
            </ul>
          </div>
        </div>
        <BookingForm />
      </div>
    </div>
  </section>
);

/* ================= DAAN ================= */
export const DaanSection = () => (
  <section className="section daan" id="daan">
    <div className="container">
      <SectionHead eyebrow="सेवा एवं दान" title={<>माँ बगलामुखी के <em>चरणों में दान</em></>}
        text="आपका दान मंदिर सेवा, नित्य हवन, भंडारा और गौ-सेवा में उपयोग होता है।" />
      <div className="daan__grid">
        <aside className="daan__info reveal">
          <h3>दान का उपयोग</h3>
          <ul role="list" className="daan__uses">
            {[['🔥', 'नित्य हवन', 'प्रतिदिन माँ का हवन एवं आरती'], ['🍲', 'अन्नदान / भंडारा', 'भक्तों एवं ज़रूरतमंदों को भोजन'],
              ['🐄', 'गौ-सेवा', 'गौशाला में चारा एवं देखभाल'], ['🛕', 'मंदिर सेवा', 'मंदिर का रख-रखाव एवं श्रृंगार']
            ].map(([ic, t, s]) => <li key={t}><span>{ic}</span><div><strong>{t}</strong><small>{s}</small></div></li>)}
          </ul>
          <div className="upi">
            <Media src="/images/upi-qr.png" className="upi__qr ph" label="UPI QR" hint="images/upi-qr.png" alt="UPI QR" />
            <div className="upi__txt">
              <small>UPI ID</small>
              <strong>{CONFIG.upiId}</strong>
              <button type="button" className="btn btn--outline btn--sm"
                onClick={() => navigator.clipboard?.writeText(CONFIG.upiId).then(() => toast('✓ UPI ID कॉपी हो गई'))}>कॉपी करें</button>
            </div>
          </div>
        </aside>
        <DaanForm />
      </div>
    </div>
  </section>
);

/* ================= PHOTO GALLERY ================= */
const GAL_CATS = [{ id: 'all', label: 'सभी' }, { id: 'havan', label: 'हवन' }, { id: 'mandir', label: 'मंदिर' }, { id: 'bhakt', label: 'भक्तगण' }];

export function PhotoGallery({ preview }) {
  const [cat, setCat] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [ready, setReady] = useState({});
  const [lb, setLb] = useState(-1);

  const base = preview || !showAll ? GALLERY.slice(0, 8) : GALLERY;
  const list = base.filter(g => cat === 'all' || g.cat === cat);
  const viewable = list.filter(g => ready[g.src]);
  const openLb = g => {
    if (!ready[g.src]) return toast('फोटो जल्द ही जोड़ी जाएगी');
    setLb(viewable.indexOf(g));
  };
  const step = d => setLb(i => (i + d + viewable.length) % viewable.length);

  useEffect(() => {
    if (lb < 0) return;
    const f = e => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); };
    window.addEventListener('keydown', f);
    return () => window.removeEventListener('keydown', f);
  });

  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <SectionHead row eyebrow="दर्शन" title={<>फोटो <em>गैलरी</em></>}
          right={<Filters className="reveal" items={GAL_CATS} value={cat} onChange={setCat} label="गैलरी फिल्टर" />} />
        <div className="gallery__grid">
          {list.map((g, i) => (
            <Media key={g.src} as="button" type="button" src={g.src} alt={`फोटो ${i + 1}`}
              className={`g-item${g.tall ? ' g-item--tall' : ''}`} hint={g.src.replace('/images/', '')}
              onReady={ok => setReady(r => ({ ...r, [g.src]: ok }))} onClick={() => openLb(g)} aria-label={`फोटो ${i + 1}`} />
          ))}
        </div>
        <div className="center">
          {preview
            ? <Link to="/gallery" className="btn btn--outline">पूरी गैलरी देखें <ArrowIcon /></Link>
            : !showAll && GALLERY.length > 8 && <button className="btn btn--outline" onClick={() => setShowAll(true)}>और फोटो देखें</button>}
        </div>
      </div>
      <Modal open={lb >= 0} onClose={() => setLb(-1)} label="फोटो" extra={viewable.length > 1 && (
        <>
          <button className="modal__arrow modal__arrow--prev" aria-label="पिछली" onClick={() => step(-1)}>‹</button>
          <button className="modal__arrow modal__arrow--next" aria-label="अगली" onClick={() => step(1)}>›</button>
        </>
      )}>
        <div className="modal__body">{viewable[lb] && <img src={viewable[lb].src} alt="" />}</div>
      </Modal>
    </section>
  );
}

/* ================= VIDEO GALLERY ================= */
export function VideoGallery() {
  const [vid, setVid] = useState(null);
  return (
    <section className="section videos" id="videos">
      <div className="container">
        <SectionHead row eyebrow="लाइव हवन" title={<>वीडियो <em>गैलरी</em></>}
          right={<a href={CONFIG.youtube} target="_blank" rel="noopener noreferrer" className="btn btn--outline reveal">YouTube पर देखें</a>} />
        <div className="videos__grid">
          {VIDEOS.map(v => (
            <Media key={v.title} as="button" type="button" src={v.thumb} alt={v.title}
              className={`v-item${v.big ? ' v-item--big' : ''} reveal`} onClick={() => setVid(v)}>
              <span className="v-play"><PlayIcon /></span>
              <span className="v-cap"><strong>{v.title}</strong><small>{v.sub}</small></span>
            </Media>
          ))}
        </div>
      </div>
      <Modal open={!!vid} onClose={() => setVid(null)} label="वीडियो">
        <div className="modal__body modal__body--video">
          {vid?.yt
            ? <iframe src={`https://www.youtube-nocookie.com/embed/${vid.yt}?autoplay=1&rel=0`} title={vid.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
            : <div className="no-video"><p>🎥 वीडियो जल्द ही उपलब्ध होगा।</p><p><a href={CONFIG.youtube} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--sm" style={{ marginTop: 14 }}>YouTube चैनल देखें</a></p></div>}
        </div>
      </Modal>
    </section>
  );
}

/* ================= TESTIMONIALS ================= */
export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [per, setPer] = useState(3);
  const [paused, setPaused] = useState(false);
  const [touchX, setTouchX] = useState(0);
  useEffect(() => {
    const f = () => setPer(window.innerWidth <= 680 ? 1 : window.innerWidth <= 1024 ? 2 : 3);
    f(); window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);
  const max = Math.max(0, TESTIMONIALS.length - per);
  const go = i => setIdx(i > max ? 0 : i < 0 ? max : i);
  useEffect(() => { if (idx > max) setIdx(0); }, [max, idx]);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx(i => (i + 1 > max ? 0 : i + 1)), 5000);
    return () => clearInterval(t);
  }, [paused, max]);

  return (
    <section className="section testi" id="testimonials">
      <div className="container">
        <SectionHead eyebrow="भक्तों की वाणी" title={<>भक्तों के <em>अनुभव</em></>} />
        <div className="testi__slider reveal" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="testi__track"
            style={{ transform: `translateX(calc(-${idx} * (100% + 24px) / ${per}))` }}
            onTouchStart={e => setTouchX(e.touches[0].clientX)}
            onTouchEnd={e => { const dx = e.changedTouches[0].clientX - touchX; if (Math.abs(dx) > 50) go(idx + (dx < 0 ? 1 : -1)); }}>
            {TESTIMONIALS.map(t => (
              <figure className="testi__card" key={t.name}>
                <div className="testi__stars">★★★★★</div>
                <blockquote>“{t.text}”</blockquote>
                <figcaption><span className="testi__av">{t.av}</span><span><strong>{t.name}</strong><small>{t.place}</small></span></figcaption>
              </figure>
            ))}
          </div>
          <div className="testi__nav">
            <button className="round-btn" aria-label="पिछला" onClick={() => go(idx - 1)}><ArrowLeftIcon /></button>
            <div className="testi__dots">
              {Array.from({ length: max + 1 }, (_, i) => (
                <button key={i} aria-label={`स्लाइड ${i + 1}`} className={i === idx ? 'active' : ''} onClick={() => go(i)} />
              ))}
            </div>
            <button className="round-btn" aria-label="अगला" onClick={() => go(idx + 1)}><ArrowIcon /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= WHY ================= */
export const WhyUs = () => (
  <section className="section why">
    <div className="container">
      <SectionHead eyebrow="विश्वास का आधार" title={<>क्यों चुनें <em>पं. विकास व्यास</em>?</>} />
      <div className="why__grid">
        {WHY.map(w => (
          <div className="why__card reveal" key={w.title}>
            <span className="why__ic">{w.ic}</span><h3>{w.title}</h3><p>{w.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ================= CTA BAND ================= */
export const CtaBand = () => (
  <section className="cta-band">
    <div className="container cta-band__inner reveal">
      <div>
        <h2>आज ही अपनी समस्या का समाधान पाएं</h2>
        <p>पंडित जी से सीधे बात करें — पहला परामर्श निःशुल्क।</p>
      </div>
      <div className="cta-band__btns">
        <a href={telHref} className="btn btn--dark btn--lg">अभी कॉल करें</a>
        <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn btn--wa btn--lg">WhatsApp करें</a>
      </div>
    </div>
  </section>
);

/* ================= FAQ ================= */
function FaqList({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq__list">
      {items.map((f, i) => (
        <details className="faq__item reveal" key={f.q} open={open === i}
          onToggle={e => { if (e.currentTarget.open) setOpen(i); else if (open === i) setOpen(-1); }}>
          <summary onClick={e => { e.preventDefault(); setOpen(open === i ? -1 : i); }}>{f.q}</summary>
          <div className="faq__ans"><p>{f.a}</p></div>
        </details>
      ))}
    </div>
  );
}

export const FaqSection = () => (
  <section className="section faq" id="faq">
    <div className="container faq__wrap">
      <SectionHead eyebrow="आपके प्रश्न" title={<>अक्सर पूछे जाने वाले <em>प्रश्न</em></>} />
      <FaqList items={FAQS.filter(f => f.home)} />
      <div className="home-more reveal"><Link to="/faq" className="btn btn--outline">सभी प्रश्न देखें <ArrowIcon /></Link></div>
    </div>
  </section>
);

export function FaqFull() {
  const [cat, setCat] = useState('all');
  const items = useMemo(() => FAQS.filter(f => cat === 'all' || f.cat === cat), [cat]);
  return (
    <section className="section faq">
      <div className="container faq-layout">
        <div>
          <Filters className="faq-cats reveal" items={FAQ_CATS} value={cat} onChange={setCat} label="प्रश्न श्रेणी" />
          <FaqList key={cat} items={items} />
        </div>
        <aside className="side-card reveal">
          <div className="side-card__ic">🙏</div>
          <h3>आपका प्रश्न यहाँ नहीं है?</h3>
          <p>पंडित जी से सीधे बात करें — पहला परामर्श निःशुल्क।</p>
          <a href={telHref} className="btn btn--dark">अभी कॉल करें</a>
          <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn btn--wa">WhatsApp करें</a>
          <Link to="/contact" className="btn btn--ghost">संदेश भेजें</Link>
        </aside>
      </div>
    </section>
  );
}

/* ================= CONTACT ================= */
export const ContactSection = ({ timings }) => (
  <section className="section contact" id="contact">
    <div className="container">
      <SectionHead eyebrow="हमसे जुड़ें" title={<><em>संपर्क</em> करें</>} /> 
      <div className="contact__cards">
        <a href={telHref} className="c-card reveal"><span className="c-card__ic"><PhoneIcon /></span><strong>फोन</strong><small>{CONFIG.phoneDisplay}</small></a>
        <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="c-card reveal"><span className="c-card__ic"><WaIcon /></span><strong>WhatsApp</strong><small>{CONFIG.phoneDisplay}</small></a>
        <a href={mailHref} className="c-card reveal"><span className="c-card__ic"><MailIcon /></span><strong>ईमेल</strong><small>{CONFIG.email}</small></a>
        <a href={CONFIG.mapLink} target="_blank" rel="noopener noreferrer" className="c-card reveal"><span className="c-card__ic"><PinIcon /></span><strong>मंदिर का पता</strong><small>{CONFIG.address}</small></a>
      </div>
      <div className="contact__grid">
        <ContactForm />
        <div className="contact__map reveal">
          <iframe title="मंदिर का नक्शा" src={CONFIG.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </div>
      </div>
      {timings && (
        <div className="timings">
          <div className="timing reveal"><strong>मंदिर दर्शन</strong><span>प्रातः 6 – रात्रि 9 बजे</span></div>
          <div className="timing reveal"><strong>आरती</strong><span>प्रातः 7 बजे एवं संध्या 7 बजे</span></div>
          <div className="timing reveal"><strong>फोन / WhatsApp</strong><span>प्रातः 8 – रात्रि 8 बजे</span></div>
        </div>
      )}
    </div>
  </section>
);
