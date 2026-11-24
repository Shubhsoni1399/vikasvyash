import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useMeta from '../hooks/useMeta';
import { CONFIG, WA_DEFAULT } from '../config';
import { MANTRA_FULL } from '../data/site';
import { BLOGS, BLOG_CATS, getBlog, blogCover } from '../data/blogs';
import { PageHero, SectionHead, Filters } from '../components/Ui';
import Media from '../components/Media';
import { SearchIcon } from '../components/Icons';
import { toast } from '../utils/toast';
import {
  Hero, Marquee, AboutSection, ServicesGrid, ServicesDetail, Process, BookingSection, DaanSection,
  PhotoGallery, VideoGallery, Testimonials, WhyUs, CtaBand, FaqSection, FaqFull, ContactSection
} from '../sections/Sections';
import { PostCard, PostFeatured, PostMeta, ArticleBody, catLabel } from '../sections/Blog';

/* ================= HOME ================= */
export function Home() {
  useMeta('माँ बगलामुखी — पं. विकास व्यास | सिद्ध हवन, अनुष्ठान एवं पूजा',
    'पं. विकास व्यास द्वारा माँ बगलामुखी सिद्ध हवन एवं अनुष्ठान — शत्रु बाधा निवारण, कोर्ट केस विजय, व्यापार वृद्धि और रक्षा अनुष्ठान।');
  return (
    <>
      <Hero /><Marquee /><AboutSection home /><ServicesGrid more /><Process /><BookingSection />
      {CONFIG.showDaan && <DaanSection />}
      <PhotoGallery preview /><VideoGallery /><Testimonials /><WhyUs /><CtaBand /><FaqSection /><ContactSection />
    </>
  );
}

/* ================= ABOUT ================= */
const JOURNEY = [
  ['प्रथम चरण', 'बाल्यकाल से भक्ति', 'धार्मिक परिवेश में पालन-पोषण, बचपन से ही माँ पीताम्बरा की आराधना में रुचि।'],
  ['द्वितीय चरण', 'गुरु परंपरा से दीक्षा', 'गुरु के सान्निध्य में वैदिक कर्मकांड, मंत्र-विधान और दस महाविद्या साधना का अध्ययन।'],
  ['तृतीय चरण', 'माँ बगलामुखी साधना', 'वर्षों तक नियमपूर्वक जप, हवन और अनुष्ठान द्वारा बगलामुखी साधना में सिद्धि का मार्ग।'],
  ['वर्तमान', 'भक्तों की सेवा', 'देश-विदेश के हजारों भक्तों के लिए मंदिर में एवं ऑनलाइन सिद्ध अनुष्ठान का संचालन।']
];
export function About() {
  useMeta('परिचय — पं. विकास व्यास | माँ बगलामुखी', 'पं. विकास व्यास — माँ बगलामुखी के उपासक। साधना यात्रा, अनुष्ठान विधि और भक्तों के अनुभव।');
  return (
    <>
      <PageHero title={<>पं. विकास व्यास — <em>परिचय</em></>} sub="माँ पीताम्बरा की कृपा से वर्षों की साधना, शास्त्रोक्त विधि और भक्तों की निःस्वार्थ सेवा।" crumbs={[{ label: 'परिचय' }]} />
      <AboutSection />
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="साधना यात्रा" title={<>भक्ति से <em>सेवा</em> तक</>} />
          <div className="journey">
            {JOURNEY.map(([y, t, p]) => (
              <div className="journey__item reveal" key={t}>
                <div className="journey__card"><span className="journey__year">{y}</span><h3>{t}</h3><p>{p}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section process">
        <div className="container quote-band reveal">
          <blockquote className="notranslate" translate="no">“{MANTRA_FULL}”</blockquote>
          <cite>— माँ बगलामुखी मूल मंत्र</cite>
        </div>
      </section>
      <WhyUs /><Testimonials /><CtaBand />
    </>
  );
}

/* ================= SERVICES ================= */
export function Services() {
  useMeta('सेवाएं — माँ बगलामुखी सिद्ध अनुष्ठान | पं. विकास व्यास', 'शत्रु बाधा निवारण, कोर्ट केस विजय, व्यापार वृद्धि, रक्षा अनुष्ठान, ग्रह दोष शांति — सभी सिद्ध अनुष्ठान।');
  return (
    <>
      <PageHero title={<>माँ बगलामुखी <em>सिद्ध अनुष्ठान</em></>} sub="हर समस्या के लिए अलग विधि, अलग संकल्प — आपकी आवश्यकता के अनुसार अनुष्ठान चुनें।" crumbs={[{ label: 'सेवाएं' }]} />
      <ServicesDetail /><Process /><WhyUs /><CtaBand />
    </>
  );
}

/* ================= BOOKING ================= */
export function Booking() {
  useMeta('अनुष्ठान बुकिंग — माँ बगलामुखी | पं. विकास व्यास', 'माँ बगलामुखी अनुष्ठान ऑनलाइन बुक करें — लाइव वीडियो कॉल पर हवन दर्शन या मंदिर में पूजा।');
  return (
    <>
      <PageHero title={<>बुक करें अपना <em>अनुष्ठान</em></>} sub="फॉर्म भरें — पंडित जी की टीम 24 घंटे में आपसे संपर्क कर मुहूर्त एवं विधि बताएगी।" crumbs={[{ label: 'बुकिंग' }]} />
      <BookingSection /><Process /><WhyUs /><FaqSection />
    </>
  );
}

/* ================= GALLERY ================= */
export function Gallery() {
  useMeta('गैलरी — माँ बगलामुखी मंदिर, हवन एवं अनुष्ठान', 'माँ बगलामुखी मंदिर, सिद्ध हवन, अनुष्ठान और भक्तों की फोटो एवं वीडियो गैलरी।');
  return (
    <>
      <PageHero title={<>फोटो एवं <em>वीडियो गैलरी</em></>} sub="मंदिर दर्शन, सिद्ध हवन और भक्तों के पावन क्षण।" crumbs={[{ label: 'गैलरी' }]} />
      <PhotoGallery /><VideoGallery /><CtaBand />
    </>
  );
}

/* ================= FAQ ================= */
export function Faq() {
  useMeta('प्रश्न-उत्तर (FAQ) — माँ बगलामुखी अनुष्ठान', 'अनुष्ठान, ऑनलाइन हवन, बुकिंग, भुगतान और प्रसाद से जुड़े सभी प्रश्नों के उत्तर।');
  return (
    <>
      <PageHero title={<>अक्सर पूछे जाने वाले <em>प्रश्न</em></>} sub="अनुष्ठान, बुकिंग, ऑनलाइन हवन और भुगतान से जुड़े आपके सभी प्रश्नों के उत्तर।" crumbs={[{ label: 'प्रश्न' }]} />
      <FaqFull /><CtaBand />
    </>
  );
}

/* ================= CONTACT ================= */
export function Contact() {
  useMeta('संपर्क करें — पं. विकास व्यास | माँ बगलामुखी', 'पं. विकास व्यास से संपर्क करें — फोन, WhatsApp, ईमेल या संदेश भेजें।');
  return (
    <>
      <PageHero title={<><em>संपर्क</em> करें</>} sub="अनुष्ठान, परामर्श या किसी भी जानकारी के लिए हमसे जुड़ें।" crumbs={[{ label: 'संपर्क' }]} />
      <ContactSection timings />
    </>
  );
}

/* ================= BLOG LIST ================= */
export function Blog() {
  useMeta('ब्लॉग — माँ बगलामुखी, अनुष्ठान एवं ज्योतिष लेख', 'माँ बगलामुखी, अनुष्ठान, बगलामुखी जयंती, हवन और ज्योतिष से जुड़े आध्यात्मिक लेख।');
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const [featured, ...rest] = BLOGS;
  const filtering = cat !== 'all' || q.trim();
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return (filtering ? BLOGS : rest).filter(b =>
      (cat === 'all' || b.cat === cat) &&
      (!s || `${b.title} ${b.excerpt} ${catLabel(b.cat)}`.toLowerCase().includes(s)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat, q]);

  return (
    <>
      <PageHero title={<>आध्यात्मिक <em>ब्लॉग</em></>} sub="माँ बगलामुखी, अनुष्ठान, त्योहार और ज्योतिष से जुड़े लेख — सरल भाषा में।" crumbs={[{ label: 'ब्लॉग' }]} />
      <section className="section">
        <div className="container">
          {!filtering && <PostFeatured b={featured} />}
          <div className="blog-tools reveal">
            <Filters items={BLOG_CATS} value={cat} onChange={setCat} label="ब्लॉग श्रेणी" />
            <label className="search">
              <SearchIcon />
              <input type="search" placeholder="लेख खोजें…" aria-label="लेख खोजें" value={q} onChange={e => setQ(e.target.value)} />
            </label>
          </div>
          <div className="blog-grid">{list.map(b => <PostCard b={b} key={b.slug} />)}</div>
          <p className={`blog-empty${list.length ? '' : ' show'}`}>कोई लेख नहीं मिला। कृपया दूसरा शब्द खोजें।</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

/* ================= BLOG POST ================= */
export function BlogPost() {
  const { slug } = useParams();
  const b = getBlog(slug);
  useMeta(b ? `${b.title} | ब्लॉग — माँ बगलामुखी` : 'लेख नहीं मिला', b?.excerpt);
  if (!b) return <NotFound />;

  const toc = b.content.filter(x => x.h2);
  const others = BLOGS.filter(x => x.slug !== b.slug);
  const related = [...others.filter(x => x.cat === b.cat), ...others.filter(x => x.cat !== b.cat)].slice(0, 3);
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const share = {
    wa: `https://wa.me/?text=${encodeURIComponent(`${b.title} ${url}`)}`,
    fb: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(b.title)}&url=${encodeURIComponent(url)}`
  };

  return (
    <>
      <PageHero
        meta={<PostMeta b={b} extra={<span>· पं. विकास व्यास</span>} style={{ justifyContent: 'center', marginBottom: 16 }} />}
        title={b.title}
        crumbs={[{ to: '/blog', label: 'ब्लॉग' }, { label: b.title.split('?')[0].split(':')[0] }]}
      />
      <section className="section">
        <div className="container article-layout">
          <article>
            <Media src={blogCover(b)} className="article__cover ph" label="कवर फोटो" hint={`images/blog/${b.slug}.jpg`} alt={b.title} />
            <ArticleBody blocks={b.content} />
            <div className="article__share">
              <span>शेयर करें:</span>
              <a href={share.wa} target="_blank" rel="noopener noreferrer" className="btn btn--wa btn--sm">WhatsApp</a>
              <a href={share.fb} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--sm">Facebook</a>
              <a href={share.x} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--sm">X</a>
              <button type="button" className="btn btn--ghost btn--sm"
                onClick={() => navigator.clipboard?.writeText(window.location.href).then(() => toast('✓ लिंक कॉपी हो गया'))}>लिंक कॉपी करें</button>
            </div>
          </article>

          <aside className="sidebar">
            {toc.length > 0 && (
              <div className="widget toc">
                <h3>इस लेख में</h3>
                <ul role="list">{toc.map(t => <li key={t.id}><a href={`#${t.id}`} onClick={e => { e.preventDefault(); document.getElementById(t.id)?.scrollIntoView({ behavior: 'smooth' }); }}>{t.h2}</a></li>)}</ul>
              </div>
            )}
            <div className="side-card">
              <div className="side-card__ic">🔥</div>
              <h3>अनुष्ठान बुक करें</h3>
              <p>आपके नाम-गोत्र से संकल्प लेकर लाइव हवन।</p>
              <Link to="/booking" className="btn btn--primary">अभी बुक करें</Link>
              <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="btn btn--wa">WhatsApp करें</a>
            </div>
            <div className="widget">
              <h3>हाल के लेख</h3>
              <ul role="list">
                {others.slice(0, 4).map(o => (
                  <li key={o.slug}>
                    <Link to={`/blog/${o.slug}`}>
                      <Media as="span" src={blogCover(o)} className="widget__thumb ph" label=" " alt="" />
                      {o.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <section className="section process">
        <div className="container">
          <SectionHead eyebrow="और पढ़ें" title={<>संबंधित <em>लेख</em></>} />
          <div className="blog-grid">{related.map(r => <PostCard b={r} key={r.slug} />)}</div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

/* ================= 404 ================= */
export function NotFound() {
  useMeta('पेज नहीं मिला — माँ बगलामुखी', '');
  return (
    <>
      <PageHero title={<>पेज <em>नहीं मिला</em></>} sub="आप जो पेज ढूँढ रहे हैं वह उपलब्ध नहीं है।" crumbs={[{ label: '404' }]} />
      <section className="section"><div className="container center"><Link to="/" className="btn btn--primary">होम पर जाएं</Link></div></section>
    </>
  );
}
