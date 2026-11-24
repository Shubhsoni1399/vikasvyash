export const Svg = ({ d, fill, className, ...rest }) => (
  <svg viewBox="0 0 24 24" className={fill ? `ic-fill ${className || ''}` : className} aria-hidden="true" {...rest}>
    {(Array.isArray(d) ? d : [d]).map((p, i) => <path key={i} d={p} />)}
  </svg>
);

export const ArrowIcon = () => <Svg d="M4.5 12h15M13.5 6l6 6-6 6" />;
export const ArrowLeftIcon = () => <Svg d="M19.5 12h-15M10.5 6l-6 6 6 6" />;
export const PhoneIcon = () => <Svg d="M5 3.5h3.3l1.9 4.6-2.4 1.5a11 11 0 0 0 6.6 6.6l1.5-2.4 4.6 1.9v3.3a1.5 1.5 0 0 1-1.6 1.5A17 17 0 0 1 3.5 5.1 1.5 1.5 0 0 1 5 3.5z" />;
export const MailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M3.5 6l8.5 7 8.5-7" /></svg>
);
export const WaIcon = () => <Svg d="M4 20l1.2-3.9A8.5 8.5 0 1 1 8 19z" />;
export const WaFillIcon = () => (
  <Svg fill d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.3-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.2z" />
);
export const ClockIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const PinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const PlayIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>;
export const SearchIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
);
export const InstaIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /></svg>
);
export const FbIcon = () => <Svg fill d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21z" />;
export const YtIcon = () => (
  <svg viewBox="0 0 24 24" className="ic-fill" aria-hidden="true"><path fillRule="evenodd" d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z" /></svg>
);

export const LogoMark = () => (
  <svg viewBox="0 0 60 60" aria-hidden="true">
    <circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="30" cy="30" r="22" fill="none" stroke="currentColor" strokeWidth=".8" strokeDasharray="2 3" />
    <path d="M30 10 L47 40 H13 Z" fill="none" stroke="currentColor" strokeWidth="1.3" />
    <path d="M30 50 L13 20 H47 Z" fill="none" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="30" cy="30" r="3" fill="#C1121F" />
  </svg>
);
