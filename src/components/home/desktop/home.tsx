import { ArchiveSection } from '@/components/archive-section';
import { ContactSection } from '@/components/contact-section';
import type { Locale } from '@/i18n/routing';
import { DesktopAbout } from './about';
import { DesktopHero } from './hero';
import { PrinciplesList } from './principles-list';
import { ServicesGrid } from './services-grid';
import { WorkRows } from './work-rows';

/** Home page, desktop: who I am → my work → my story → how I can help → how I work → more work → contact. */
export function DesktopHome({ locale }: { locale: Locale }) {
  return (
    <>
      <DesktopHero locale={locale} />
      <WorkRows locale={locale} />
      <DesktopAbout locale={locale} />
      <ServicesGrid locale={locale} />
      <PrinciplesList locale={locale} />
      <ArchiveSection />
      <ContactSection />
    </>
  );
}
