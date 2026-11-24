import { Link } from 'react-router-dom';
import { BLOG_CATS, blogCover } from '../data/blogs';
import Media from '../components/Media';
import { ArrowIcon } from '../components/Icons';

export const catLabel = id => BLOG_CATS.find(c => c.id === id)?.label || '';

export const PostMeta = ({ b, extra, style }) => (
  <div className="post-meta" style={style}>
    <span className="post-cat">{catLabel(b.cat)}</span><span>{b.date}</span><span>· {b.read}</span>{extra}
  </div>
);

export const PostCard = ({ b }) => (
  <article className="post-card reveal">
    <Media as={Link} to={`/blog/${b.slug}`} src={blogCover(b)} className="post-card__img ph" hint={`images/blog/${b.slug}.jpg`} alt={b.title} aria-label={b.title} />
    <div className="post-card__body">
      <PostMeta b={b} />
      <h3><Link to={`/blog/${b.slug}`}>{b.title}</Link></h3>
      <p>{b.excerpt}</p>
      <Link to={`/blog/${b.slug}`} className="read-more">पूरा पढ़ें <ArrowIcon /></Link>
    </div>
  </article>
);

export const PostFeatured = ({ b }) => (
  <article className="post-featured reveal">
    <Media as={Link} to={`/blog/${b.slug}`} src={blogCover(b)} className="post-featured__img ph" label="विशेष लेख" hint={`images/blog/${b.slug}.jpg`} alt={b.title} aria-label={b.title} />
    <div className="post-featured__body">
      <PostMeta b={b} />
      <h2><Link to={`/blog/${b.slug}`}>{b.title}</Link></h2>
      <p>{b.excerpt}</p>
      <Link to={`/blog/${b.slug}`} className="btn btn--primary" style={{ alignSelf: 'flex-start' }}>पूरा लेख पढ़ें <ArrowIcon /></Link>
    </div>
  </article>
);

/* Article content blocks */
export const ArticleBody = ({ blocks }) => (
  <div className="article__body">
    {blocks.map((b, i) => {
      if (b.h2) return <h2 key={i} id={b.id}>{b.h2}</h2>;
      if (b.h3) return <h3 key={i}>{b.h3}</h3>;
      if (b.ul) return <ul key={i}>{b.ul.map(x => <li key={x}>{x}</li>)}</ul>;
      if (b.ol) return <ol key={i}>{b.ol.map(x => <li key={x}>{x}</li>)}</ol>;
      if (b.quote) return <blockquote key={i}>{b.quote}</blockquote>;
      if (b.note) return <p key={i} className="article__note">⚠️ {b.note}</p>;
      return <p key={i}>{b.p}</p>;
    })}
  </div>
);
