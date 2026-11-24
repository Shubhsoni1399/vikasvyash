import { useEffect } from 'react';

/* Har page ka title + description (SEO) */
export default function useMeta(title, description) {
  useEffect(() => {
    document.title = title;
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m); }
    if (description) m.content = description;
    const og = document.querySelector('meta[property="og:title"]');
    if (og) og.content = title;
  }, [title, description]);
}
