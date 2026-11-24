export const toast = msg => window.dispatchEvent(new CustomEvent('mb-toast', { detail: msg }));
