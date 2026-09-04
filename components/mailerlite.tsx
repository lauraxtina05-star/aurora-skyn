'use client';

import { useEffect } from 'react';

/**
 * MailerLite Universal loader.
 *
 * Injects the vendor snippet once, client-side, on mount so it never races React
 * hydration. This would normally live in `app/layout.tsx` <head>, but the current
 * vinext beta renders client components placed directly in the root layout during
 * the RSC pass (their hooks throw), so it is mounted from the page tree instead.
 * It still loads site-wide — add <MailerLite /> to any new route.
 *
 * Account 2614510. Powers the embedded Skyn Notes form (data-form="ylJLrW").
 */
const SCRIPT_ID = 'mailerlite-universal';

const SNIPPET = `(function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
.push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
ml('account', '2614510');`;

export default function MailerLite() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.textContent = SNIPPET;
    document.body.appendChild(script);
  }, []);

  return null;
}
