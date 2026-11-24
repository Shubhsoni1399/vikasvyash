import { useEffect, useState } from 'react';

/**
 * Photo ko uski original width/height (ratio) me dikhata hai — bina crop.
 * File na mile to design placeholder (label) dikhta hai.
 *   <Media src="/images/about.jpg" className="about__img ph" label="पंडित जी की फोटो" />
 */
export default function Media({ src, alt = '', label, hint, onReady, className = '', as: Tag = 'div', children, ...rest }) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (!src) return;
    let alive = true;
    const img = new Image();
    img.onload = () => { if (alive) { setOk({ w: img.naturalWidth, h: img.naturalHeight }); onReady && onReady(true); } };
    img.onerror = () => { if (alive) { setOk(false); onReady && onReady(false); } };
    img.src = src;
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    <Tag className={`${className}${ok ? ' has-img' : ''}`} {...rest}>
      {ok && <img className="fit-img" src={src} alt={alt || label || ''} width={ok.w} height={ok.h} decoding="async" />}
      {!ok && (label || hint) && (
        <span className="ph-label">{label}{hint && <><br /><small>{hint}</small></>}</span>
      )}
      {children}
    </Tag>
  );
}
