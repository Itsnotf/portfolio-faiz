import { PageMotion } from '@/components/motion/page-motion';
import { SmootherInit } from '@/components/motion/smooth-scroll';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { WhatsAppFloat } from '@/components/whatsapp-float';

/** Desktop pages: full header, smooth scrolling and page motion. */
export function DesktopChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {/* ScrollSmoother moves #smooth-content; fixed UI (header, menu, cursor) must stay outside it. */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <SmootherInit />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter view="desktop" />
          <PageMotion />
        </div>
      </div>
      {/* Phones only, in case a phone is shown the desktop pages. Fixed like the header, so outside the smooth content. */}
      <WhatsAppFloat />
    </>
  );
}
