import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* .reveal elements scroll par animate hote hain — har route change par dobara */
export default function useReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let io;
    const run = () => {
      const els = [...document.querySelectorAll('.reveal:not(.in)')];
      if (reduce || !('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
      io = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const sibs = [...e.target.parentElement.children].filter(c => c.classList.contains('reveal'));
          e.target.style.transitionDelay = `${Math.min(sibs.indexOf(e.target), 6) * 80}ms`;
          e.target.classList.add('in');
          obs.unobserve(e.target);
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
      els.forEach(el => io.observe(el));
    };
    const t = setTimeout(run, 30);
    // naye elements (filter, load more) ke liye
    const mo = new MutationObserver(() => {
      document.querySelectorAll('.reveal:not(.in)').forEach(el => io && io.observe(el));
    });
    mo.observe(document.querySelector('main') || document.body, { childList: true, subtree: true });
    return () => { clearTimeout(t); io && io.disconnect(); mo.disconnect(); };
  }, [pathname]);
}
