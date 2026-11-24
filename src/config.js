/* =========================================================
   ⚙️ CONFIG — sirf yahan apni details badlein
   ========================================================= */
export const CONFIG = {
  notifyEmail: 'shubhsoni1399@gmail.com',   // form submit hone par details is mail par (FormSubmit.co)
  phone: '919999999999',                    // country code ke saath, bina + / space
  phoneDisplay: '+91 99999 99999',
  whatsapp: '919999999999',                 // Pandit ji ka WhatsApp number
  email: 'info@mabaglamukhi.co',
  upiId: 'vikasvyas@upi',
  upiName: 'Pandit Vikas Vyas',
  address: 'माँ बगलामुखी मंदिर, (पूरा पता यहाँ लिखें)',
  mapLink: 'https://maps.google.com/?q=Maa+Baglamukhi+Mandir',
  mapEmbed: 'https://www.google.com/maps?q=Maa+Baglamukhi+Mandir&output=embed',
  youtube: 'https://www.youtube.com/',
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
  showDaan: false                            // true karne par Home par Daan section dikhega
};

export const telHref = `tel:+${CONFIG.phone}`;
export const mailHref = `mailto:${CONFIG.email}`;
export const waLink = (text = '') =>
  `https://wa.me/${CONFIG.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
export const WA_DEFAULT = waLink('🙏 जय माँ बगलामुखी! पंडित जी, मुझे अनुष्ठान के बारे में जानकारी चाहिए।');
