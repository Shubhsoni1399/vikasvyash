/* =========================================================
   Inspect / View Source / Right-click block
   (sirf live website par chalega — npm run dev me nahi, taaki aap kaam kar sako)
   ========================================================= */
export function enableProtection() {
  if (!import.meta.env.PROD) return;

  // 1) Right-click band (form fields me allow — taaki log paste kar sakein)
  document.addEventListener('contextmenu', e => {
    if (e.target.closest('input, textarea, select')) return;
    e.preventDefault();
  });

  // 2) Keyboard shortcuts band
  document.addEventListener('keydown', e => {
    const k = e.key.toLowerCase();
    const ctrl = e.ctrlKey || e.metaKey;           // Windows: Ctrl, Mac: Cmd

    if (
      e.key === 'F12' ||                                           // DevTools
      (ctrl && e.shiftKey && ['i', 'j', 'c', 'k'].includes(k)) || // Ctrl+Shift+I / J / C / K
      (ctrl && e.altKey && ['i', 'j', 'c', 'u'].includes(k)) ||   // Mac: Cmd+Option+I/J/C/U
      (ctrl && ['u', 's'].includes(k))                            // Ctrl+U (source), Ctrl+S (save)
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);

  // 3) Images drag karke save na ho
  document.addEventListener('dragstart', e => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });
}