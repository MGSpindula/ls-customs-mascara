export const metadata = {
  title: 'LS Customs Mascara',
  description: 'Stock management application',
};

import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Run beforeInteractive to strip browser-extension attributes that can
            mutate the DOM before React hydrates (e.g. Grammarly). This prevents
            hydration mismatch errors in development. */}
        <Script
          id="strip-extension-attributes"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var removeAttrs=function(){if(document && document.body){document.body.removeAttribute('data-new-gr-c-s-check-loaded');document.body.removeAttribute('data-gr-ext-installed');}}; if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',removeAttrs);}else{removeAttrs();}}catch(e){} })();`,
          }}
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
