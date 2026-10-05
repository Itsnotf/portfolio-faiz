import { ContactSection } from '@/components/contact-section';
import type { Locale } from '@/i18n/routing';
import { MobileAbout } from './about';
import { MobileArchive } from './archive';
import { MobileHero } from './hero';
import { MobilePrinciples } from './principles';
import { MobileServices } from './services-list';
import { MobileWorkCards } from './work-cards';

/** Home page, phones: the same story and order as desktop, laid out for one thumb and one column. */
export function MobileHome({ locale }: { locale: Locale }) {
  return (
    <>
      <MobileHero locale={locale} />
      <MobileWorkCards locale={locale} />
      <MobileAbout locale={locale} />
      <MobileServices locale={locale} />
      <MobilePrinciples locale={locale} />
      <MobileArchive />
      <ContactSection />
    </>
  );
}
